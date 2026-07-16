"use client";

import { useState, useEffect } from "react";
import Button from "@/components/ui/Button";

export default function MobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Show after scrolling past the hero (approximately 100vh)
      setVisible(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-brand-black/95 backdrop-blur-md border-t border-white/10 px-4 py-3 transition-transform duration-500 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      role="complementary"
      aria-label="Quick booking"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <span className="text-white text-sm font-display font-bold uppercase block leading-tight">
            Ready to start?
          </span>
          <span className="text-white/40 text-[11px] font-body">
            Free trial class — no commitment
          </span>
        </div>
        <Button variant="primary" size="sm" href="#contact" className="flex-shrink-0">
          Book Free Trial
        </Button>
      </div>
    </div>
  );
}
