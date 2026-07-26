"use client";

import { useState, useEffect } from "react";

const branches = [
  {
    id: "f8",
    name: "F-8 Branch",
    city: "Islamabad",
    icon: "01",
    tag: "Flagship",
  },
  {
    id: "g8",
    name: "G-8 Branch",
    city: "Islamabad",
    icon: "02",
    tag: "Popular",
  },
  {
    id: "f10",
    name: "F-10 Branch",
    city: "Islamabad",
    icon: "03",
    tag: "Newest",
  },
];

export default function BranchModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [isConfirming, setIsConfirming] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Only show modal if user hasn't already selected a branch this session
    const saved = sessionStorage.getItem("pfz_branch");
    if (!saved) {
      // Slight delay for a smooth entrance after page load
      const t = setTimeout(() => {
        setIsOpen(true);
        setMounted(true);
      }, 600);
      return () => clearTimeout(t);
    }
  }, []);

  const handleConfirm = () => {
    if (!selected) return;
    setIsConfirming(true);
    setTimeout(() => {
      sessionStorage.setItem("pfz_branch", selected);
      setIsOpen(false);
    }, 400);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[9998] bg-black/80 backdrop-blur-sm"
        style={{
          animation: "fadeIn 0.4s ease forwards",
        }}
      />

      {/* Modal */}
      <div
        className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="branch-modal-title"
      >
        <div
          className="relative w-full max-w-lg"
          style={{
            animation: "slideUp 0.45s cubic-bezier(0.16,1,0.3,1) forwards",
          }}
        >
          {/* Top red accent bar */}
          <div className="h-1 w-full bg-brand-red" />

          {/* Card */}
          <div className="bg-[#0f0f0f] border border-white/10 shadow-[0_32px_80px_rgba(0,0,0,0.8)]">
            {/* Header */}
            <div className="px-8 pt-10 pb-6 border-b border-white/8">
              {/* Logo mark */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-[2px] bg-brand-red" />
                <span className="text-brand-red text-[10px] font-semibold uppercase tracking-[0.3em] font-body">
                  Power Fitness Zone
                </span>
              </div>

              <h2
                id="branch-modal-title"
                className="font-display text-3xl sm:text-4xl font-bold text-white uppercase leading-[0.95] mb-3"
              >
                Select Your
                <br />
                <span className="text-brand-red">Branch</span>
              </h2>
              <p className="text-white/50 text-sm font-body leading-relaxed">
                Choose the Power Fitness Zone location closest to you. You can
                change this anytime.
              </p>
            </div>

            {/* Branch Options */}
            <div className="px-8 py-6 flex flex-col gap-3">
              {branches.map((branch) => {
                const isSelected = selected === branch.id;
                return (
                  <button
                    key={branch.id}
                    onClick={() => setSelected(branch.id)}
                    className={`group relative w-full text-left border transition-all duration-300 ${
                      isSelected
                        ? "border-brand-red bg-brand-red/8"
                        : "border-white/10 bg-white/3 hover:border-white/25 hover:bg-white/6"
                    }`}
                  >
                    <div className="flex items-center gap-5 p-5">
                      {/* Number badge */}
                      <div
                        className={`flex-shrink-0 w-10 h-10 flex items-center justify-center border text-xs font-display font-bold transition-all duration-300 ${
                          isSelected
                            ? "border-brand-red text-brand-red bg-brand-red/10"
                            : "border-white/20 text-white/40 group-hover:border-white/40 group-hover:text-white/60"
                        }`}
                      >
                        {branch.icon}
                      </div>

                      {/* Branch info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span
                            className={`font-display font-bold text-base uppercase tracking-wide transition-colors duration-300 ${
                              isSelected ? "text-white" : "text-white/80"
                            }`}
                          >
                            {branch.name}
                          </span>
                          <span
                            className={`text-[9px] font-semibold uppercase tracking-widest px-2 py-0.5 transition-all duration-300 ${
                              isSelected
                                ? "bg-brand-red text-white"
                                : "bg-white/10 text-white/40"
                            }`}
                          >
                            {branch.tag}
                          </span>
                        </div>
                        <span className="text-white/40 text-xs font-body uppercase tracking-widest">
                          {branch.city}
                        </span>
                      </div>

                      {/* Selection indicator */}
                      <div
                        className={`flex-shrink-0 w-5 h-5 border-2 flex items-center justify-center transition-all duration-300 ${
                          isSelected
                            ? "border-brand-red bg-brand-red"
                            : "border-white/20"
                        }`}
                      >
                        {isSelected && (
                          <svg
                            width="10"
                            height="8"
                            viewBox="0 0 10 8"
                            fill="none"
                          >
                            <path
                              d="M1 4L3.5 6.5L9 1"
                              stroke="white"
                              strokeWidth="1.8"
                              strokeLinecap="square"
                            />
                          </svg>
                        )}
                      </div>
                    </div>

                    {/* Selected left accent */}
                    {isSelected && (
                      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-brand-red" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Footer / CTA */}
            <div className="px-8 pb-8">
              <button
                onClick={handleConfirm}
                disabled={!selected}
                className={`w-full py-4 font-display font-bold text-sm uppercase tracking-[0.15em] transition-all duration-300 ${
                  selected
                    ? "bg-brand-red text-white hover:bg-brand-red-light cursor-pointer"
                    : "bg-white/10 text-white/30 cursor-not-allowed"
                } ${isConfirming ? "opacity-50 scale-95" : ""}`}
              >
                {isConfirming
                  ? "Confirming..."
                  : selected
                  ? `Confirm — ${branches.find((b) => b.id === selected)?.name}`
                  : "Select a Branch to Continue"}
              </button>
              <p className="text-center text-white/25 text-xs font-body mt-4 uppercase tracking-widest">
                Islamabad&apos;s Premier Training Facilities
              </p>
            </div>
          </div>

          {/* Bottom red accent line */}
          <div className="h-[3px] w-full bg-gradient-to-r from-brand-red via-brand-red to-transparent" />
        </div>
      </div>

      {/* Keyframe animations injected via a style tag */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)   scale(1);    }
        }
      `}</style>
    </>
  );
}
