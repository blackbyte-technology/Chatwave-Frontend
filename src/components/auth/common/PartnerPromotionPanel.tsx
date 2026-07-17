"use client";

import Image from "next/image";
import { FileText, Users, MessageCircle, Calendar, ShieldCheck, Megaphone, RefreshCw, X } from "lucide-react";

/* ───────────────────────────────────────────────────────
   Floating chips data
   ─────────────────────────────────────────────────────── */
const floatingChips = [
  { icon: Users, label: "Contacts", top: "-5%", left: "50%", center: true, delay: "0.8s" },
  { icon: FileText, label: "Templates", top: "10%", left: "18%", center: true, delay: "0s" },
  { icon: MessageCircle, label: "Conversations", top: "10%", left: "82%", center: true, delay: "0.4s" },
  { icon: Calendar, label: "Policy Reminders", bottom: "12%", left: "18%", center: true, delay: "1.6s" },
  { icon: Megaphone, label: "Campaigns", bottom: "12%", left: "82%", center: true, delay: "1.2s" },
  { icon: ShieldCheck, label: "Secure API", bottom: "-5%", left: "50%", center: true, delay: "0.6s" },
];

/* ═══════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════ */
export const PartnerPromotionPanel = () => {
  return (
    <div
      className="hidden lg:flex flex-col relative overflow-hidden rounded-l-[24px] w-full border-r border-white/5"
      style={{
        background: "linear-gradient(180deg, #07192B 0%, #0A2744 100%)",
      }}
    >
      <BackgroundEffects />

      <div className="relative z-10 flex flex-col h-full px-12 py-6 xl1400:px-8 xl1400:py-8 w-full max-w-[800px] mx-auto">

        {/* Top Logos & Badge */}
        <LogoPartnership />

        {/* Heading & Subtitle */}
        <HeroHeading />

        {/* Integration Hub - The main diagram */}
        <div className="relative flex-1 mt-6 xl1400:mt-10 w-full flex items-center justify-center min-h-[420px] xl1400:min-h-[380px]">
          <IntegrationHub />
        </div>
      </div>
    </div>
  );
};

/* ───────────────────────────────────────────────────────
   BACKGROUND EFFECTS
   ─────────────────────────────────────────────────────── */
const BackgroundEffects = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
    {/* Concentric arcs radiating from center */}
    <div className="absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full border border-emerald-500/[0.04]" />
    <div className="absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] rounded-full border border-emerald-500/[0.03]" />
    <div className="absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[950px] h-[950px] rounded-full border border-emerald-500/[0.02]" />

    {/* Glows */}
    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-teal-500/[0.03] blur-[100px] rounded-full" />
    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-500/[0.04] blur-[100px] rounded-full" />

    {/* Dot pattern */}
    <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="dotPattern" width="30" height="30" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="#2DD4BF" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dotPattern)" />
    </svg>
  </div>
);

/* ───────────────────────────────────────────────────────
   LOGO PARTNERSHIP
   ─────────────────────────────────────────────────────── */
const LogoPartnership = () => (
  <div className="flex flex-col items-center gap-5 mt-2 w-full z-10 relative">
    <div className="flex items-center justify-center gap-6 text-white text-[24px] xl1400:text-[20px] font-bold">
      {/* InsuranceDesk */}
      <div className="flex items-center gap-3">
        <Image src="/assets/logos/apple-touch-icon.png" alt="InsuranceDesk" width={38} height={38} className="rounded-xl object-contain" unoptimized />
        <span className="tracking-tight">InsuranceDesk</span>
      </div>

      {/* X divider */}
      <span className="text-slate-500 font-light text-[24px]">✕</span>

      {/* ChatWave */}
      <div className="flex items-center gap-3">
        <Image src="/assets/logos/favicon.png" alt="ChatWave" width={40} height={40} unoptimized />
        <span className="tracking-tight">ChatWave</span>
      </div>
    </div>

    {/* Badge */}
    <div
      className="inline-flex items-center gap-2 px-5 py-2 rounded-full border shadow-[0_0_15px_rgba(34,197,94,0.15)]"
      style={{ background: "rgba(22, 163, 74, 0.18)", borderColor: "#16A34A" }}
    >
      <ShieldCheck className="w-4 h-4 text-emerald-400" />
      <span className="text-emerald-50 text-[14px] xl1400:text-[13px] font-semibold tracking-wide">Official Integration Partner</span>
    </div>
  </div>
);

/* ───────────────────────────────────────────────────────
   HERO HEADING
   ─────────────────────────────────────────────────────── */
const HeroHeading = () => (
  <div className="text-left mt-5 xl1400:mt-10 z-10 relative">
    <h1 className="text-[32px] xl1400:text-[28px] font-medium leading-[1.15] tracking-tight w-fit">
      <span className="text-white">Connect </span>
      <span style={{ background: "linear-gradient(90deg, #22C55E 0%, #10B981 50%, #2DD4BF 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>InsuranceDesk</span>
      <span className="text-white"> with</span>
      <span className="block text-center mt-1" style={{ background: "linear-gradient(90deg, #22C55E 0%, #10B981 50%, #2DD4BF 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>ChatWave</span>
    </h1>
  </div>
);

/* ───────────────────────────────────────────────────────
   INTEGRATION HUB
   ─────────────────────────────────────────────────────── */
const IntegrationHub = () => (
  <div className="relative w-full h-full min-h-[340px] xl1400:min-h-[300px] flex items-center justify-center z-10">
    
    {/* SVG for connecting dashed lines (Central Hub glowing dashed circle) */}
    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
      <circle cx="50%" cy="50%" r="130" stroke="rgba(34,197,94,0.4)" strokeWidth="1.5" strokeDasharray="4 6" fill="none" className="animate-spin-slow" />
      {/* Connection dots on the circle */}
      <circle cx="50%" cy="calc(50% - 130px)" r="5" fill="#22C55E" className="shadow-[0_0_10px_#22C55E]" />
      <circle cx="50%" cy="calc(50% + 130px)" r="5" fill="#22C55E" className="shadow-[0_0_10px_#22C55E]" />
    </svg>

    {/* Center ChatWave Hub */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-10">
      {/* Outer glow */}
      <div 
        className="absolute w-[150px] h-[150px] xl1400:w-[130px] xl1400:h-[130px] rounded-full bg-emerald-500/[0.05]" 
        style={{ boxShadow: "0 0 12px rgba(34, 197, 94, 0.25), 0 0 40px rgba(16, 185, 129, 0.25)" }} 
      />
      {/* Center Glass Circle */}
      <div 
        className="relative w-[100px] h-[100px] xl1400:w-[88px] xl1400:h-[88px] rounded-full flex items-center justify-center z-10"
        style={{
          background: "rgba(18, 36, 58, 0.82)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.25)",
        }}
      >
        <Image src="/assets/logos/favicon.png" alt="ChatWave" width={56} height={56} className="object-contain w-14 h-14 xl1400:w-12 xl1400:h-12" unoptimized />
      </div>
      <span className="absolute -bottom-8 text-[#22C55E] font-bold tracking-wide text-[14px]">ChatWave</span>
    </div>

    {/* Left InsuranceDesk Card */}
    <div className="absolute top-1/2 left-[calc(50%-130px)] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-3 z-20">
      <div 
        className="w-[104px] h-[104px] xl1400:w-[92px] xl1400:h-[92px] rounded-[24px] flex items-center justify-center"
        style={{
          background: "rgba(18, 36, 58, 0.82)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.25)",
        }}
      >
        <Image src="/assets/logos/apple-touch-icon.png" alt="InsuranceDesk" width={60} height={60} className="w-[60px] h-[60px] xl1400:w-[52px] xl1400:h-[52px] object-contain rounded-[14px]" unoptimized />
      </div>
      <span className="text-white font-bold tracking-wide text-[14px]">InsuranceDesk</span>
    </div>

    {/* Right WhatsApp Card */}
    <div className="absolute top-1/2 left-[calc(50%+130px)] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-3 z-20">
      <div 
        className="w-[104px] h-[104px] xl1400:w-[92px] xl1400:h-[92px] rounded-[24px] flex items-center justify-center"
        style={{
          background: "rgba(18, 36, 58, 0.82)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.25)",
        }}
      >
        <WhatsAppIcon />
      </div>
      <span className="text-white font-bold tracking-wide text-[14px] text-center leading-tight">WhatsApp<br/>Business</span>
    </div>

    {/* Floating chips */}
    {floatingChips.map((chip, i) => (
      <div
        key={i}
        className="absolute z-30"
        style={{
          ...(chip.top ? { top: chip.top } : {}),
          ...(chip.bottom ? { bottom: chip.bottom } : {}),
          ...(chip.left ? { left: chip.left } : {}),
          ...( (chip as any).right ? { right: (chip as any).right } : {}),
          transform: chip.center ? "translateX(-50%)" : "none",
        }}
      >
        <div
          className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.08] text-white whitespace-nowrap"
          style={{
            background: "rgba(18, 36, 58, 0.82)",
            backdropFilter: "blur(12px)",
            boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
            animation: `float 6s ease-in-out ${chip.delay} infinite`,
          }}
        >
          <chip.icon className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-[12px] font-medium tracking-wide">{chip.label}</span>
        </div>
      </div>
    ))}
  </div>
);

/* ───────────────────────────────────────────────────────
   WHATSAPP ICON
   ─────────────────────────────────────────────────────── */
const WhatsAppIcon = () => (
  <svg className="w-[52px] h-[52px] xl1400:w-[44px] xl1400:h-[44px]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.013 2.016c5.512 0 10.007 4.498 10.007 10.015 0 5.513-4.495 10.01-10.007 10.01a9.98 9.98 0 01-4.757-1.205L2 21.996l1.21-5.118A9.973 9.973 0 012.006 12.03C2.006 6.513 6.502 2.016 12.013 2.016z" fill="#25D366"/>
    <path d="M9.13 7.37c-.305 0-.742.115-1.133.535C7.6 8.324 6.438 9.4 6.438 11.21c0 1.808 1.176 3.553 1.34 3.764.16.21 2.502 3.99 6.2 5.378.88.33 1.564.526 2.094.673.882.247 1.688.213 2.32.13.705-.094 2.155-.884 2.457-1.74.305-.856.305-1.587.214-1.74-.088-.152-.333-.243-.7-.425-.37-.183-2.156-1.066-2.493-1.186-.337-.123-.585-.183-.83.183-.242.365-.943 1.186-1.157 1.43-.213.243-.43.274-.798.093-.37-.183-1.536-.567-2.923-1.806-1.08-1.015-1.81-2.27-2.023-2.636-.213-.365-.022-.562.16-.744.165-.164.368-.426.552-.64.183-.213.245-.365.367-.61.123-.242.062-.455-.03-.64-.093-.18-1.153-3.13-1.428-4.22-.27-.107-.542-.09-.763-.09-.187 0-.394-.002-.64-.002z" fill="#FEFEFE"/>
  </svg>
);
