/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Script from "next/script";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { useAppSelector } from "../redux/hooks";

declare global {
  interface Window {
    FB?: any;
    fbAsyncInit?: () => void;
  }
}

const FacebookContext = createContext<boolean>(false);

export const useFacebookReady = () => useContext(FacebookContext);

export default function FacebookSDKProvider({ children }: { children: ReactNode }) {
  const { setting } = useAppSelector((state) => state.setting);
  const [ready, setReady] = useState(false);

  const isHttps = typeof window !== "undefined" && window.location.protocol === "https:";

  useEffect(() => {
    if (!setting?.app_id || !isHttps) return;

    const initFB = () => {
      window.FB.init({
        appId: setting.app_id,
        cookie: true,
        xfbml: false,
        version: "v25.0",
      });
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setReady(true);
    };

    if (window.FB) {
      // FB SDK already loaded (e.g. client-side navigation) — re-init with app_id
      initFB();
      return;
    }

    // FB SDK not yet loaded — set up async callback
    window.fbAsyncInit = initFB;
  }, [setting?.app_id]);

  return (
    <FacebookContext.Provider value={ready}>
      {isHttps && setting?.app_id && !window.FB && <Script id="facebook-sdk" src="https://connect.facebook.net/en_US/sdk.js" strategy="afterInteractive" />}
      {children}
    </FacebookContext.Provider>
  );
}
