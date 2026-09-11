"use client";

import { useState, useEffect } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, Math.round(progress))));
      setVisible(scrollY > window.innerHeight * 0.4);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const strokeDashoffset = 100 - scrollProgress;

  return (
    <div
      className={`fixed bottom-20 lg:bottom-8 right-5 z-40 flex flex-col items-center gap-3 transition-all duration-500 ${
        visible ? "translate-y-0 opacity-100 pointer-events-auto" : "translate-y-12 opacity-0 pointer-events-none"
      }`}
    >
      {/* WhatsApp Quick Chat Floating Trigger */}
      <a
        href="https://wa.me/923001234567?text=Hi%20Power%20Fitness%20Zone!%20I%20have%20a%20question%20about%20memberships%20and%20timings."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Direct WhatsApp helpline"
        className="w-11 h-11 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-900/40 transition-transform duration-300 hover:scale-110 group relative"
      >
        <span className="text-lg">💬</span>
        <span className="absolute right-12 px-2.5 py-1 bg-black/90 text-white text-[11px] font-semibold rounded-lg shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-white/10">
          WhatsApp Help
        </span>
      </a>

      {/* Back to Top with Circular Progress */}
      <button
        onClick={scrollToTop}
        className="relative w-12 h-12 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white shadow-xl shadow-black/50 transition-transform duration-300 hover:scale-110 flex items-center justify-center group"
        aria-label={`Back to top (${scrollProgress}% scrolled)`}
      >
        {/* SVG Circular Ring */}
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 36 36">
          <path
            className="text-neutral-800"
            strokeWidth="3"
            stroke="currentColor"
            fill="none"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            className="text-red-500 transition-all duration-150"
            strokeDasharray="100, 100"
            strokeDashoffset={strokeDashoffset}
            strokeWidth="3"
            strokeLinecap="round"
            stroke="currentColor"
            fill="none"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
        </svg>

        {/* Center Icon */}
        <div className="relative z-10 flex flex-col items-center justify-center">
          <svg
            width="14"
            height="14"
            viewBox="0 0 18 18"
            fill="none"
            className="transition-transform duration-300 group-hover:-translate-y-0.5 text-white"
          >
            <path
              d="M9 15V3M9 3L3 9M9 3L15 9"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </button>
    </div>
  );
}
