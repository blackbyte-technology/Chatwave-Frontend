/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from "react";
import { useAppSelector } from "@/src/redux/hooks";
import { useFacebookReady } from "@/src/app/FacebookSDKProvider";

export const useEmbeddedSignup = (onFinish: (code: string, data: any) => void) => {
  const [authCode, setAuthCode] = useState<string | null>(null);
  const [signupData, setSignupData] = useState<any>(null);
  const fbReady = useFacebookReady();
  const { setting } = useAppSelector((state) => state.setting);

  useEffect(() => {
    const handler = (event: MessageEvent) => {
      if (!event.origin.includes("facebook")) return;

      try {
        const payload = typeof event.data === "string" ? JSON.parse(event.data) : event.data;
        console.log("[EmbeddedSignup] Message from Facebook:", payload.type, payload.event);

        if (payload.type === "WA_EMBEDDED_SIGNUP" && payload.event === "FINISH") {
          console.log("[EmbeddedSignup] Got signupData:", payload.data);
          setSignupData(payload.data);
        } else if (payload.type === "WA_EMBEDDED_SIGNUP" && payload.event === "CANCEL") {
          console.log("[EmbeddedSignup] User cancelled signup");
        }
      } catch (e) {
        console.warn("[EmbeddedSignup] Failed to parse message:", e);
      }
    };

    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  useEffect(() => {
    console.log("[EmbeddedSignup] State check - authCode:", !!authCode, "signupData:", !!signupData);
    if (authCode && signupData) {
      console.log("[EmbeddedSignup] Both received! Calling onFinish...");
      onFinish(authCode, signupData);
      setAuthCode(null);
      setSignupData(null);
    }
  }, [authCode, signupData, onFinish]);

  const startSignup = useCallback(() => {
    // Facebook requires HTTPS — block entirely on HTTP to prevent console errors
    if (typeof window !== "undefined" && window.location.protocol !== "https:") {
      console.warn(
        "[Facebook SDK] FB.login() requires HTTPS. Use HTTPS in production or 'npx next dev --experimental-https' for local dev."
      );
      return;
    }

    if (!fbReady || !window.FB) {
      console.warn("[EmbeddedSignup] FB SDK not ready. fbReady:", fbReady, "window.FB:", !!window.FB);
      return;
    }

    console.log("[EmbeddedSignup] Starting FB.login with config_id:", setting?.configuration_id);

    window.FB.login(
      (res: any) => {
        console.log("[EmbeddedSignup] FB.login response:", res);
        if (res.authResponse?.code) {
          console.log("[EmbeddedSignup] Got authCode:", res.authResponse.code.substring(0, 20) + "...");
          setAuthCode(res.authResponse.code);
        } else {
          console.warn("[EmbeddedSignup] No authResponse.code in FB.login response");
        }
      },
      {
        config_id: setting?.configuration_id,
        response_type: "code",
        override_default_response_type: true,
        extras: {
          setup: {},
          sessionInfoVersion: 3,
          featureType: "whatsapp_business_app_onboarding",
        },
      }
    );
  }, [fbReady, setting?.configuration_id]);

  return { startSignup, fbReady };
};
