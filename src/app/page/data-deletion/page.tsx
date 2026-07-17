"use client";

import { Trash2, ArrowLeft, Mail, Phone, Globe, Clock, AlertTriangle, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function DataDeletionPage() {
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
              <Trash2 className="text-primary" size={18} />
            </div>
            <span className="font-bold text-slate-800 dark:text-white text-sm">ChatWave</span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-transparent to-orange-500/5" />
        <div className="max-w-4xl mx-auto px-6 py-16 relative">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-2xl bg-red-500/10 shadow-lg shadow-red-500/5">
              <Trash2 className="text-red-500" size={28} />
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">Data Deletion Instructions</h1>
          <p className="mt-3 text-slate-500 dark:text-gray-400 text-lg">Effective Date: June 14, 2026</p>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 pb-20">
        <div className="space-y-10">
          {/* Intro */}
          <p className="text-lg text-slate-600 dark:text-gray-400 leading-relaxed">
            At ChatWave, we respect users&apos; privacy and provide a process for requesting deletion of personal data associated with their account.
          </p>

          {/* Requesting Deletion */}
          <section>
            <h2 className="text-2xl font-black text-slate-800 dark:text-gray-200 mb-6 border-b border-slate-100 dark:border-gray-800 pb-3">Requesting Data Deletion</h2>
            <p className="text-slate-600 dark:text-gray-400 mb-6">If you wish to delete your ChatWave account and associated data, you may:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a href="mailto:support@chatwave.in" className="group flex items-center gap-4 p-5 rounded-xl border border-slate-100 dark:border-gray-700 bg-white dark:bg-gray-800/50 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
                <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-500/10 group-hover:bg-primary/10 transition-colors">
                  <Mail className="text-blue-600 dark:text-blue-400" size={22} />
                </div>
                <div>
                  <p className="font-bold text-slate-800 dark:text-gray-200">Email Us</p>
                  <p className="text-sm text-primary">support@chatwave.in</p>
                </div>
              </a>
              <a href="tel:+919537127708" className="group flex items-center gap-4 p-5 rounded-xl border border-slate-100 dark:border-gray-700 bg-white dark:bg-gray-800/50 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
                <div className="p-3 rounded-xl bg-green-50 dark:bg-green-500/10 group-hover:bg-primary/10 transition-colors">
                  <Phone className="text-green-600 dark:text-green-400" size={22} />
                </div>
                <div>
                  <p className="font-bold text-slate-800 dark:text-gray-200">Call Us</p>
                  <p className="text-sm text-primary">+91 9537127708</p>
                </div>
              </a>
            </div>
          </section>

          {/* Required Info */}
          <section>
            <h2 className="text-2xl font-black text-slate-800 dark:text-gray-200 mb-6 border-b border-slate-100 dark:border-gray-800 pb-3">Information to Include</h2>
            <div className="bg-amber-50 dark:bg-amber-500/5 border border-amber-100 dark:border-amber-500/20 rounded-xl p-6">
              <div className="flex gap-3 mb-4">
                <AlertTriangle className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" size={20} />
                <p className="text-sm font-semibold text-amber-800 dark:text-amber-300">Please include the following in your request:</p>
              </div>
              <ul className="space-y-3 ml-8">
                <li className="flex items-center gap-3 text-slate-700 dark:text-gray-300">
                  <CheckCircle2 size={16} className="text-amber-500 shrink-0" />
                  <span>Registered Mobile Number</span>
                </li>
                <li className="flex items-center gap-3 text-slate-700 dark:text-gray-300">
                  <CheckCircle2 size={16} className="text-amber-500 shrink-0" />
                  <span>Registered Email Address</span>
                </li>
                <li className="flex items-center gap-3 text-slate-700 dark:text-gray-300">
                  <CheckCircle2 size={16} className="text-amber-500 shrink-0" />
                  <span>Business Name (if applicable)</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Verification */}
          <section>
            <h2 className="text-2xl font-black text-slate-800 dark:text-gray-200 mb-6 border-b border-slate-100 dark:border-gray-800 pb-3">Verification Process</h2>
            <p className="text-slate-600 dark:text-gray-400 leading-relaxed">To protect account security, ChatWave may verify the identity of the requester before processing any deletion request.</p>
          </section>

          {/* Timeline */}
          <section>
            <h2 className="text-2xl font-black text-slate-800 dark:text-gray-200 mb-6 border-b border-slate-100 dark:border-gray-800 pb-3">Processing Timeline</h2>
            <div className="flex items-center gap-4 p-6 rounded-xl bg-blue-50 dark:bg-blue-500/5 border border-blue-100 dark:border-blue-500/20">
              <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-500/10">
                <Clock className="text-blue-600 dark:text-blue-400" size={24} />
              </div>
              <div>
                <p className="font-bold text-slate-800 dark:text-gray-200 text-lg">30 Days</p>
                <p className="text-sm text-slate-600 dark:text-gray-400">Once verification is completed, ChatWave will process the deletion request within 30 days.</p>
              </div>
            </div>
          </section>

          {/* Retention Notice */}
          <section>
            <h2 className="text-2xl font-black text-slate-800 dark:text-gray-200 mb-6 border-b border-slate-100 dark:border-gray-800 pb-3">Information That May Be Retained</h2>
            <p className="text-slate-600 dark:text-gray-400 leading-relaxed">Certain records may be retained where required by applicable laws, regulatory obligations, fraud prevention requirements, or dispute resolution purposes.</p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-black text-slate-800 dark:text-gray-200 mb-6 border-b border-slate-100 dark:border-gray-800 pb-3">Contact Us</h2>
            <div className="bg-slate-50 dark:bg-gray-800/50 rounded-xl p-6 border border-slate-100 dark:border-gray-700">
              <div className="space-y-3 text-slate-600 dark:text-gray-400">
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-slate-400" />
                  <span><span className="font-semibold">Email:</span> <a href="mailto:support@chatwave.in" className="text-primary hover:underline">support@chatwave.in</a></span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={16} className="text-slate-400" />
                  <span><span className="font-semibold">Phone:</span> +91 9537127708</span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe size={16} className="text-slate-400" />
                  <span><span className="font-semibold">Website:</span> <a href="https://chatwave.in" className="text-primary hover:underline">https://chatwave.in</a></span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-100 dark:border-gray-800 bg-slate-50/50 dark:bg-gray-900/50">
        <div className="max-w-4xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500 dark:text-gray-500">&copy; {new Date().getFullYear()} BlackByte Technology. All rights reserved.</p>
          <div className="flex items-center gap-6 text-sm">
            <Link href="/page/privacy-policy" className="text-slate-500 hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/page/terms-and-conditions" className="text-slate-500 hover:text-primary transition-colors">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
