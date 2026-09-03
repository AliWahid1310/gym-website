"use client";

import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const quickLinks = [
  { label: "Programs & Workouts", href: "#programs" },
  { label: "HIIT Workout Timer", href: "#interval-timer" },
  { label: "Class Schedule & Booking", href: "#schedule" },
  { label: "Live Gym Capacity Tracker", href: "#live-tracker" },
  { label: "AI Coach Matcher", href: "#coach-finder" },
  { label: "Commercial Equipment Guide", href: "#equipment" },
  { label: "Membership Plan Finder", href: "#pricing" },
  { label: "Pakistani Meal Planner", href: "#meal-planner" },
  { label: "Hydration & Electrolyte Target", href: "#hydration-calculator" },
  { label: "Muscle Soreness & Recovery", href: "#recovery-tracker" },
  { label: "Islamabad Branch Explorer", href: "#branches" },
  { label: "Contact & Free 1-Day Pass", href: "#contact" },
];

const branches = [
  { name: "F-7 Markaz (HQ)", address: "Block 12, Jinnah Super, F-7, Islamabad", phone: "+92 300 1234567", time: "5:00 AM – 11:00 PM" },
  { name: "Blue Area (Corporate)", address: "Executive Tower, Jinnah Ave, Blue Area, Islamabad", phone: "+92 300 7654321", time: "6:00 AM – 11:00 PM" },
  { name: "Bahria Town (Phase 7)", address: "Civic Center, Phase 7, Bahria Town, Islamabad", phone: "+92 300 9988776", time: "5:30 AM – 11:30 PM" },
  { name: "DHA Phase II", address: "Main Commercial Blvd, DHA Phase II, Islamabad", phone: "+92 300 4455667", time: "6:00 AM – 11:00 PM" },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "https://instagram.com/powerfitnesszone.pk",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://facebook.com/powerfitnesszonepk",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@powerfitnesszone",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 001.94-2A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://tiktok.com/@powerfitnesszone",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.11V9a6.27 6.27 0 00-.79-.05A6.34 6.34 0 003.15 15.3a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V9.26a8.35 8.35 0 004.76 1.49v-3.4a4.85 4.85 0 01-1-.66z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const [selectedBranchIdx, setSelectedBranchIdx] = useState(0);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [discountCode, setDiscountCode] = useState<string | null>(null);
  const [ref, isVisible] = useScrollReveal<HTMLElement>({ threshold: 0.05 });

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setDiscountCode("PFZ-VIP10OFF");
  };

  const activeBranch = branches[selectedBranchIdx];

  return (
    <footer
      ref={ref}
      className="relative bg-[#070707] text-white pt-20 pb-10 overflow-hidden border-t border-neutral-800"
      role="contentinfo"
    >
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
        {/* Newsletter Callout Banner */}
        <div className="mb-16 p-6 sm:p-8 rounded-3xl bg-neutral-900/90 border border-neutral-800 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs uppercase font-bold text-red-400 tracking-wider block">Join The VIP Athletic Club</span>
            <h3 className="text-xl sm:text-2xl font-black text-white mt-1">Get Weekly Nutrition Protocols & 10% Off Merch</h3>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">Curated training guides, Ramadan protocols, and supplement drops delivered straight to your inbox.</p>
          </div>

          <div className="w-full lg:w-auto">
            {!discountCode ? (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2 w-full max-w-md">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email..."
                  className="bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-red-500 min-w-[240px]"
                />
                <button
                  type="submit"
                  className="px-5 py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-red-600/30 whitespace-nowrap"
                >
                  Subscribe & Unlock Code
                </button>
              </form>
            ) : (
              <div className="p-3 bg-emerald-950/60 border border-emerald-800 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
                <span>✓ Welcome! Use coupon code <strong className="font-mono text-white text-sm bg-black px-2 py-0.5 rounded border border-emerald-600">{discountCode}</strong></span>
              </div>
            )}
          </div>
        </div>

        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Col 1: About + Social */}
          <div>
            <div className="flex items-center mb-6">
              <a
                href="#"
                className="flex items-center gap-2 font-display text-2xl font-black tracking-tight"
                aria-label="Power Fitness Zone — Home"
              >
                <span className="bg-brand-red text-white px-2 py-0.5 transform -skew-x-12 inline-block font-bold">PFZ</span>
                <span className="text-white tracking-widest text-xl">POWER FITNESS</span>
              </a>
            </div>
            <p className="text-white/50 text-sm font-body leading-relaxed mb-6">
              Islamabad&apos;s premier bodybuilding, powerlifting, and functional training facility. Where discipline meets community across 4 flagship multi-story clubs.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-white/50 hover:bg-brand-red hover:text-white transition-all duration-300"
                  aria-label={`Follow us on ${social.label}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="font-display text-white text-sm font-bold uppercase tracking-wider mb-6">
              Interactive Tools
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.slice(0, 7).map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-white/50 text-sm font-body hover:text-brand-red transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: More Tools */}
          <div>
            <h4 className="font-display text-white text-sm font-bold uppercase tracking-wider mb-6">
              Fitness & Nutrition
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.slice(7).map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-white/50 text-sm font-body hover:text-brand-red transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Branch Quick Selector & Contact */}
          <div>
            <h4 className="font-display text-white text-sm font-bold uppercase tracking-wider mb-4">
              Islamabad Branches
            </h4>

            {/* Branch selector pills */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {branches.map((b, idx) => (
                <button
                  key={b.name}
                  onClick={() => setSelectedBranchIdx(idx)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                    selectedBranchIdx === idx
                      ? "bg-brand-red text-white"
                      : "bg-neutral-900 text-neutral-400 hover:text-white"
                  }`}
                >
                  {b.name.split(" ")[0]}
                </button>
              ))}
            </div>

            <div className="bg-neutral-900/80 p-4 rounded-2xl border border-neutral-800 space-y-2.5 text-xs text-neutral-300">
              <div className="font-bold text-white text-sm">{activeBranch.name}</div>
              <div>
                <span className="text-neutral-500 block text-[10px] uppercase">Location</span>
                <span>{activeBranch.address}</span>
              </div>
              <div>
                <span className="text-neutral-500 block text-[10px] uppercase">Operating Hours</span>
                <span className="text-emerald-400 font-medium">{activeBranch.time}</span>
              </div>
              <div>
                <span className="text-neutral-500 block text-[10px] uppercase">Direct Helpline</span>
                <a href={`tel:${activeBranch.phone}`} className="text-red-400 hover:underline font-mono">
                  {activeBranch.phone}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs font-body">
            © {new Date().getFullYear()} Power Fitness Zone Pakistan. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-white/40 text-xs font-body hover:text-white/70 transition-colors duration-300"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-white/40 text-xs font-body hover:text-white/70 transition-colors duration-300"
            >
              Terms & Safety Protocols
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

