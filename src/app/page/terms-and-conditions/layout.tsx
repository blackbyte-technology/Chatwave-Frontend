import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions | ChatWave",
  description:
    "Read ChatWave's Terms and Conditions. Understand the rules, policies, and guidelines for using our WhatsApp Business communication platform operated by BlackByte Technology.",
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
