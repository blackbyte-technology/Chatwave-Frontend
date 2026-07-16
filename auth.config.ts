/* eslint-disable @typescript-eslint/no-explicit-any */
import { ROUTES } from "@/src/constants";
import type { NextAuthConfig } from "next-auth";
import { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";

declare module "next-auth" {
  interface Session {
    accessToken: string | unknown;
    user: {
      id: string;
      role: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  interface User {
    role?: string;
    accessToken?: string;
    isImpersonated?: boolean;
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    id: string;
    role: string;
    accessToken?: string;
    isImpersonated?: boolean;
  }
}

export default {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  pages: {
    signIn: ROUTES.Landing,
    signOut: ROUTES.Landing,
    error: ROUTES.Login,
  },
  providers: [
    Credentials({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              identifier: credentials.email,
              password: credentials.password,
              role_id: credentials.role,
            }),
          });

          const data = await res.json();

          if (!res.ok) {
            const error = new CredentialsSignin(data?.message || "Invalid credentials");
            error.code = data?.message || "Invalid credentials";
            throw error;
          }

          if (!data.user || !data.token) {
            console.error("Invalid response structure");
            return null;
          }

          return {
            id: data.user.id,
            name: data.user.name,
            email: data.user.email,
            role: data.user.role,
            accessToken: data.token,
          };
        } catch (error) {
          if (error instanceof CredentialsSignin) throw error;
          console.error("Authorization error:", error);
          const signInError = new CredentialsSignin("Authentication failed");
          signInError.code = error instanceof Error ? error.message : "Authentication failed";
          throw signInError;
        }
      },
    }),
    Credentials({
      id: "impersonation",
      name: "Impersonation",
      credentials: {
        token: { label: "Token", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.token) {
          return null;
        }

        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/impersonation/status`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${credentials.token}`,
            },
          });

          const data = await res.json();

          if (!res.ok || !data.success) {
            const error = new CredentialsSignin(data?.message || "Invalid impersonation token");
            error.code = data?.message || "Invalid impersonation token";
            throw error;
          }

          const profileRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/profile`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${credentials.token}`,
            },
          });

          const profileData = await profileRes.json();

          if (!profileRes.ok || !profileData.user) {
            const error = new CredentialsSignin("Failed to fetch profiles for impersonated user");
            error.code = "ImpersonationFailed";
            throw error;
          }

          return {
            id: profileData.user.id,
            name: profileData.user.name,
            email: profileData.user.email,
            role: profileData.user.role,
            accessToken: credentials.token as string,
            isImpersonated: true,
          };
        } catch (error) {
          if (error instanceof CredentialsSignin) throw error;
          console.error("Impersonation authorization error:", error);
          const signInError = new CredentialsSignin("Impersonation failed");
          signInError.code = error instanceof Error ? error.message : "Impersonation failed";
          throw signInError;
        }
      },
    }),
    // Only include OAuth providers when valid credentials are configured
    ...(process.env.GITHUB_ID && process.env.GITHUB_SECRET && 
        !process.env.GITHUB_ID.startsWith("your-") ? [Github({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    })] : []),
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET && 
        !process.env.GOOGLE_CLIENT_ID.startsWith("your-") ? [Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    })] : []),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id!;
        token.name = user.name;
        token.email = user.email;
        token.role = (user as any).role;
        token.accessToken = (user as any).accessToken;
        token.isImpersonated = (user as any).isImpersonated ?? false;
      }
      return token;
    },

    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.role = token.role as string;
        session.accessToken = token.accessToken;
        (session as any).isImpersonated = token.isImpersonated;
      }
      return session;
    },

    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;
      return `${baseUrl}${ROUTES.Dashboard}`;
    },

    authorized({ auth, request: { nextUrl } }) {
      const isAuthenticated = !!auth?.user;
      const { pathname } = nextUrl;
      const isGuestAllowed = pathname.startsWith(ROUTES.Landing) || pathname.startsWith("/auth");

      if (isAuthenticated || isGuestAllowed) return true;
      return false;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
} satisfies NextAuthConfig;
