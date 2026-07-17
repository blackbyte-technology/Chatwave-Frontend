import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | ChatWave",
  description:
    "Read ChatWave's Privacy Policy. Learn how BlackByte Technology collects, uses, and protects your personal information on our WhatsApp Business communication platform.",
};

export default function PrivacyPolicyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
