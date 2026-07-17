"use client";

import { Shield, ArrowLeft } from "lucide-react";
import Link from "next/link";

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-2xl font-black text-slate-800 dark:text-gray-200 mt-12 mb-4 border-b border-slate-100 dark:border-gray-800 pb-3 tracking-tight">{children}</h2>
);

const SubTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-lg font-bold text-slate-700 dark:text-gray-300 mt-8 mb-3 tracking-tight">{children}</h3>
);

const Paragraph = ({ children }: { children: React.ReactNode }) => (
  <p className="text-slate-600 dark:text-gray-400 leading-relaxed mb-4">{children}</p>
);

const BulletList = ({ items }: { items: string[] }) => (
  <ul className="space-y-2 mb-6 ml-6">
    {items.map((item, i) => (
      <li key={i} className="text-slate-600 dark:text-gray-400 flex items-start gap-2">
        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

export default function PrivacyPolicyPage() {
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
              <Shield className="text-primary" size={18} />
            </div>
            <span className="font-bold text-slate-800 dark:text-white text-sm">ChatWave</span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-emerald-500/5" />
        <div className="max-w-4xl mx-auto px-6 py-16 relative">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-2xl bg-primary/10 shadow-lg shadow-primary/5">
              <Shield className="text-primary" size={28} />
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">Privacy Policy</h1>
          <p className="mt-3 text-slate-500 dark:text-gray-400 text-lg">Effective Date: June 14, 2026</p>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 pb-20">
        <SectionTitle>1. Introduction</SectionTitle>
        <Paragraph>Welcome to ChatWave.</Paragraph>
        <Paragraph>
          ChatWave is a business communication platform operated by BlackByte Technology (&quot;Company&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;). We provide communication, customer engagement, automation, and messaging services, including integrations with the WhatsApp Business Platform.
        </Paragraph>
        <Paragraph>We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, store, and protect information when you use our website, products, and services.</Paragraph>
        <Paragraph>By accessing or using ChatWave, you agree to the practices described in this Privacy Policy.</Paragraph>

        <SectionTitle>2. Information We Collect</SectionTitle>
        <SubTitle>Account Information</SubTitle>
        <Paragraph>When you register for ChatWave, we may collect:</Paragraph>
        <BulletList items={["Name", "Mobile Number", "Email Address", "Business Name"]} />

        <SubTitle>Communication Data</SubTitle>
        <Paragraph>While using our services, we may process:</Paragraph>
        <BulletList items={["WhatsApp phone numbers", "Message content", "Media files", "Message delivery information", "Communication metadata"]} />

        <SubTitle>Technical Information</SubTitle>
        <Paragraph>We may automatically collect:</Paragraph>
        <BulletList items={["IP address", "Browser type", "Device information", "Operating system information", "Login activity", "Usage statistics", "Error logs"]} />

        <SectionTitle>3. How We Use Information</SectionTitle>
        <Paragraph>We use information to:</Paragraph>
        <BulletList items={["Provide and maintain our services", "Manage user accounts", "Facilitate WhatsApp Business messaging", "Improve platform functionality", "Provide customer support", "Monitor platform security", "Prevent fraud and misuse", "Comply with legal obligations", "Process payments and billing"]} />

        <SectionTitle>4. WhatsApp Business Platform</SectionTitle>
        <Paragraph>ChatWave enables businesses to communicate using Meta&apos;s WhatsApp Business Platform.</Paragraph>
        <Paragraph>By using WhatsApp-related services through ChatWave:</Paragraph>
        <BulletList items={[
          "You acknowledge that Meta may independently process information according to its own policies and terms.",
          "Your use of WhatsApp messaging services must comply with Meta's Business Messaging Policies, Platform Terms, and applicable laws.",
          "ChatWave acts as a technology service provider facilitating access to WhatsApp Business Platform services."
        ]} />
        <Paragraph>For additional information, please review Meta&apos;s privacy and platform policies.</Paragraph>

        <SectionTitle>5. Artificial Intelligence Services</SectionTitle>
        <Paragraph>ChatWave may utilize third-party artificial intelligence services through OpenRouter infrastructure, including Google Gemini models, to provide platform functionality and automation features.</Paragraph>
        <Paragraph>Information submitted through such features may be processed by these service providers solely for delivering the requested functionality.</Paragraph>

        <SectionTitle>6. Data Sharing and Disclosure</SectionTitle>
        <Paragraph>We do not sell, rent, or trade personal information.</Paragraph>
        <Paragraph>We may share information with:</Paragraph>
        <BulletList items={["Cloud infrastructure providers", "Payment processing providers", "Communication service providers", "Technology partners", "Legal and regulatory authorities when required by law"]} />
        <Paragraph>Information is shared only when necessary for providing services or complying with legal obligations.</Paragraph>

        <SectionTitle>7. Third-Party Service Providers</SectionTitle>
        <Paragraph>We may use trusted third-party service providers, including:</Paragraph>
        <BulletList items={["Google Cloud Platform (Hosting Infrastructure)", "Razorpay (Payment Processing)", "OpenRouter (AI Infrastructure)", "Meta Platforms, Inc. (WhatsApp Business Platform)"]} />
        <Paragraph>These providers may process information solely for providing services on our behalf.</Paragraph>

        <SectionTitle>8. Data Retention</SectionTitle>
        <Paragraph>We retain information only for as long as necessary to provide services and comply with legal obligations.</Paragraph>
        <SubTitle>Retention Periods</SubTitle>
        <div className="overflow-x-auto mb-6">
          <table className="w-full border-collapse rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-slate-50 dark:bg-gray-800">
                <th className="px-5 py-3.5 text-left font-bold text-slate-700 dark:text-gray-300 border border-slate-200 dark:border-gray-700">Data Type</th>
                <th className="px-5 py-3.5 text-left font-bold text-slate-700 dark:text-gray-300 border border-slate-200 dark:border-gray-700">Retention Period</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["WhatsApp Messages", "90 Days"],
                ["Media Files", "90 Days"],
                ["Account Information", "Until Account Deletion"],
                ["Payment Records", "As required by applicable law"],
              ].map(([type, period], i) => (
                <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-gray-800/30 transition-colors">
                  <td className="px-5 py-3.5 border border-slate-200 dark:border-gray-700 text-slate-600 dark:text-gray-400">{type}</td>
                  <td className="px-5 py-3.5 border border-slate-200 dark:border-gray-700 text-slate-600 dark:text-gray-400">{period}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Paragraph>After the applicable retention period, data may be deleted, anonymized, or archived where legally required.</Paragraph>

        <SectionTitle>9. Data Security</SectionTitle>
        <Paragraph>We implement reasonable technical and organizational security measures designed to protect personal information from unauthorized access, disclosure, alteration, or destruction.</Paragraph>
        <Paragraph>These measures may include:</Paragraph>
        <BulletList items={["Secure server infrastructure", "Access controls", "Authentication systems", "Monitoring and logging", "Security reviews and updates"]} />
        <Paragraph>While we strive to protect information, no method of transmission or storage can be guaranteed to be completely secure.</Paragraph>

        <SectionTitle>10. User Responsibilities</SectionTitle>
        <Paragraph>Users are responsible for:</Paragraph>
        <BulletList items={["Maintaining account security", "Protecting login credentials", "Obtaining appropriate consent from their customers", "Complying with applicable laws and regulations", "Following Meta's messaging policies", "Ensuring lawful use of the platform"]} />

        <SectionTitle>11. User Rights</SectionTitle>
        <Paragraph>Subject to applicable laws, users may have the right to:</Paragraph>
        <BulletList items={["Access their information", "Correct inaccurate information", "Request deletion of information", "Restrict certain processing activities", "Object to processing activities"]} />
        <Paragraph>Requests may be submitted using the contact information provided below.</Paragraph>

        <SectionTitle>12. Account and Data Deletion</SectionTitle>
        <Paragraph>Users may request deletion of their account and associated personal information by:</Paragraph>
        <BulletList items={[
          "Sending an email to support@chatwave.in",
          "Contacting the support team"
        ]} />
        <Paragraph>After verification of ownership, the account deletion request will be processed and applicable data will be deleted within 30 days, unless retention is required by law.</Paragraph>

        <SectionTitle>13. Cookies and Similar Technologies</SectionTitle>
        <Paragraph>ChatWave may use cookies and similar technologies to:</Paragraph>
        <BulletList items={["Maintain user sessions", "Improve website performance", "Enhance security", "Remember user preferences"]} />
        <Paragraph>Users may manage cookie settings through their browser preferences.</Paragraph>

        <SectionTitle>14. Children&apos;s Privacy</SectionTitle>
        <Paragraph>ChatWave services are intended only for individuals who are at least 18 years of age.</Paragraph>
        <Paragraph>We do not knowingly collect personal information from children.</Paragraph>

        <SectionTitle>15. International Data Transfers</SectionTitle>
        <Paragraph>Information may be processed and stored on infrastructure operated by service providers located in different jurisdictions.</Paragraph>
        <Paragraph>Where applicable, reasonable safeguards are implemented to protect personal information.</Paragraph>

        <SectionTitle>16. Changes to this Privacy Policy</SectionTitle>
        <Paragraph>We may update this Privacy Policy periodically.</Paragraph>
        <Paragraph>Any modifications will be posted on this page with an updated Effective Date. Continued use of the platform after such updates constitutes acceptance of the revised Privacy Policy.</Paragraph>

        <SectionTitle>17. Contact Information</SectionTitle>
        <Paragraph>If you have questions regarding this Privacy Policy or our privacy practices, please contact us:</Paragraph>
        <div className="bg-slate-50 dark:bg-gray-800/50 rounded-xl p-6 border border-slate-100 dark:border-gray-700 mb-6">
          <p className="font-bold text-slate-800 dark:text-gray-200 text-lg mb-3">BlackByte Technology</p>
          <div className="space-y-2 text-slate-600 dark:text-gray-400 text-sm">
            <p><span className="font-semibold">Product:</span> ChatWave</p>
            <p><span className="font-semibold">Website:</span> <a href="https://chatwave.in" className="text-primary hover:underline">https://chatwave.in</a></p>
            <p><span className="font-semibold">Email:</span> <a href="mailto:support@chatwave.in" className="text-primary hover:underline">support@chatwave.in</a></p>
            <p><span className="font-semibold">Phone:</span> +91 9537127708</p>
            <p><span className="font-semibold">Address:</span> Rajpardi, Jhagadia, Bharuch, Gujarat, India</p>
          </div>
        </div>

        <SectionTitle>18. Compliance Statement</SectionTitle>
        <Paragraph>ChatWave is committed to complying with applicable privacy, data protection, and platform requirements, including requirements associated with Meta&apos;s WhatsApp Business Platform.</Paragraph>
        <Paragraph>Users remain responsible for ensuring that their use of ChatWave complies with all applicable laws, regulations, and messaging policies.</Paragraph>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-100 dark:border-gray-800 bg-slate-50/50 dark:bg-gray-900/50">
        <div className="max-w-4xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500 dark:text-gray-500">&copy; {new Date().getFullYear()} BlackByte Technology. All rights reserved.</p>
          <div className="flex items-center gap-6 text-sm">
            <Link href="/terms" className="text-slate-500 hover:text-primary transition-colors">Terms</Link>
            <Link href="/data-deletion" className="text-slate-500 hover:text-primary transition-colors">Data Deletion</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
