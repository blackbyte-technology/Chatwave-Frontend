"use client";

import { FileText, ArrowLeft } from "lucide-react";
import Link from "next/link";

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-2xl font-black text-slate-800 dark:text-gray-200 mt-12 mb-4 border-b border-slate-100 dark:border-gray-800 pb-3 tracking-tight">{children}</h2>
);

const Paragraph = ({ children }: { children: React.ReactNode }) => (
  <p className="text-slate-600 dark:text-gray-400 leading-relaxed mb-4">{children}</p>
);

const BulletList = ({ items }: { items: React.ReactNode[] }) => (
  <ul className="space-y-2 mb-6 ml-6">
    {items.map((item, i) => (
      <li key={i} className="text-slate-600 dark:text-gray-400 flex items-start gap-2">
        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-gray-950 dark:to-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-gray-950/80 border-b border-slate-100 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-primary transition-colors">
            <ArrowLeft size={16} />
            Back to ChatWave
          </Link>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-primary/10">
              <FileText className="text-primary" size={18} />
            </div>
            <span className="font-bold text-slate-800 dark:text-white text-sm">ChatWave</span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-primary/5" />
        <div className="max-w-4xl mx-auto px-6 py-16 relative">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-2xl bg-blue-500/10 shadow-lg shadow-blue-500/5">
              <FileText className="text-blue-600" size={28} />
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">Terms and Conditions</h1>
          <p className="mt-3 text-slate-500 dark:text-gray-400 text-lg">Effective Date: June 14, 2026</p>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 pb-20">
        <SectionTitle>1. Acceptance of Terms</SectionTitle>
        <Paragraph>By accessing or using ChatWave, you agree to comply with these Terms and Conditions.</Paragraph>
        <Paragraph>If you do not agree with these terms, you should discontinue use of the platform.</Paragraph>

        <SectionTitle>2. About ChatWave</SectionTitle>
        <Paragraph>ChatWave is a business communication platform operated by BlackByte Technology that enables businesses to communicate with customers through messaging, automation, and related services.</Paragraph>

        <SectionTitle>3. Account Registration</SectionTitle>
        <Paragraph>Users are responsible for:</Paragraph>
        <BulletList items={["Providing accurate information", "Maintaining account security", "Protecting login credentials", "Ensuring authorized use of their account"]} />

        <SectionTitle>4. Acceptable Use</SectionTitle>
        <Paragraph>Users agree not to:</Paragraph>
        <BulletList items={["Send spam or unsolicited communications", "Violate Meta's policies", "Engage in unlawful activities", "Attempt unauthorized access to systems", "Distribute malware or harmful content"]} />

        <SectionTitle>5. WhatsApp Business Platform</SectionTitle>
        <Paragraph>Use of WhatsApp-related services is subject to Meta&apos;s policies, including:</Paragraph>
        <BulletList items={["WhatsApp Business Messaging Policy", "Meta Platform Terms", "Commerce Policies"]} />
        <Paragraph>Users are solely responsible for ensuring compliance with applicable Meta requirements.</Paragraph>

        <SectionTitle>6. Fees and Payments</SectionTitle>
        <Paragraph>Where paid services are provided, users agree to pay all applicable charges.</Paragraph>
        <Paragraph>Payments are processed through authorized payment providers.</Paragraph>

        <SectionTitle>7. Service Availability</SectionTitle>
        <Paragraph>While ChatWave strives to provide reliable services, uninterrupted availability is not guaranteed.</Paragraph>
        <Paragraph>We may modify, suspend, or discontinue features at any time.</Paragraph>

        <SectionTitle>8. Intellectual Property</SectionTitle>
        <Paragraph>All rights, trademarks, software, branding, and platform content remain the property of BlackByte Technology unless otherwise stated.</Paragraph>

        <SectionTitle>9. Limitation of Liability</SectionTitle>
        <Paragraph>To the maximum extent permitted by law, ChatWave shall not be liable for indirect, incidental, special, or consequential damages arising from use of the platform.</Paragraph>

        <SectionTitle>10. Termination</SectionTitle>
        <Paragraph>We reserve the right to suspend or terminate accounts that violate these Terms, applicable laws, or platform policies.</Paragraph>

        <SectionTitle>11. Privacy</SectionTitle>
        <Paragraph>
          Use of ChatWave is also governed by our <Link href="/page/privacy-policy" className="text-primary font-semibold hover:underline">Privacy Policy</Link>.
        </Paragraph>

        <SectionTitle>12. Changes to Terms</SectionTitle>
        <Paragraph>We may update these Terms from time to time. Continued use of the platform after changes become effective constitutes acceptance of the revised Terms.</Paragraph>

        <SectionTitle>13. Contact Information</SectionTitle>
        <div className="bg-slate-50 dark:bg-gray-800/50 rounded-xl p-6 border border-slate-100 dark:border-gray-700">
          <p className="font-bold text-slate-800 dark:text-gray-200 text-lg mb-3">BlackByte Technology</p>
          <div className="space-y-2 text-slate-600 dark:text-gray-400 text-sm">
            <p><span className="font-semibold">Website:</span> <a href="https://chatwave.in" className="text-primary hover:underline">https://chatwave.in</a></p>
            <p><span className="font-semibold">Email:</span> <a href="mailto:support@chatwave.in" className="text-primary hover:underline">support@chatwave.in</a></p>
            <p><span className="font-semibold">Phone:</span> +91 9537127708</p>
            <p><span className="font-semibold">Address:</span> Rajpardi, Jhagadia, Bharuch, Gujarat, India</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-100 dark:border-gray-800 bg-slate-50/50 dark:bg-gray-900/50">
        <div className="max-w-4xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500 dark:text-gray-500">&copy; {new Date().getFullYear()} BlackByte Technology. All rights reserved.</p>
          <div className="flex items-center gap-6 text-sm">
            <Link href="/page/privacy-policy" className="text-slate-500 hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/page/data-deletion" className="text-slate-500 hover:text-primary transition-colors">Data Deletion</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
