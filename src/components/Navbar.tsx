"use client";

import { useState, useEffect } from "react";
import Button from "@/components/ui/Button";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Programs", href: "#programs" },
  { label: "Schedule", href: "#schedule" },
  { label: "Live Crowd", href: "#live-tracker" },
  { label: "Coach Finder", href: "#coach-finder" },
  { label: "Equipment", href: "#equipment" },
  { label: "Pricing", href: "#pricing" },
  { label: "Supplements", href: "#supplements" },
  { label: "Reviews", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track which section is currently in view
  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-brand-black/95 backdrop-blur-md shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 flex items-center justify-between h-20">
        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-2 shrink-0 transition-transform duration-300 hover:scale-105 font-display text-2xl md:text-3xl font-black tracking-tight"
          aria-label="360 Fitness — Home"
        >
          <span className="bg-brand-red text-white px-2 py-0.5 transform -skew-x-12 inline-block font-bold">360</span>
          <span className="text-white tracking-widest">FITNESS</span>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-5 xl:gap-7">
          {navLinks.map((link) => {
            const sectionId = link.href.replace("#", "");
            const isActive = activeSection === sectionId;
            return (
              <a
                key={link.href}
                href={link.href}
                className={`text-[12px] xl:text-[13px] font-medium uppercase tracking-widest transition-all duration-300 relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-brand-red after:transition-all after:duration-300 whitespace-nowrap ${
                  isActive
                    ? "text-white after:w-full"
                    : "text-white/70 hover:text-white after:w-0 hover:after:w-full"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:block ml-4 shrink-0">
          <Button variant="primary" size="sm" href="#contact">
            Free Trial
          </Button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-[6px] group"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          <span
            className={`block w-6 h-[2px] bg-white transition-all duration-300 origin-center ${
              mobileOpen ? "rotate-45 translate-y-[8px]" : ""
            }`}
          />
          <span
            className={`block w-6 h-[2px] bg-white transition-all duration-300 ${
              mobileOpen ? "opacity-0 scale-x-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-[2px] bg-white transition-all duration-300 origin-center ${
              mobileOpen ? "-rotate-45 -translate-y-[8px]" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu Panel */}
      <div
        className={`lg:hidden fixed inset-0 top-20 bg-brand-black/98 backdrop-blur-lg transition-all duration-500 ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-6 -mt-20">
          {navLinks.map((link, i) => {
            const sectionId = link.href.replace("#", "");
            const isActive = activeSection === sectionId;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`text-2xl font-display font-bold uppercase tracking-wider transition-all duration-300 ${
                  isActive ? "text-brand-red" : "text-white hover:text-brand-red"
                }`}
                style={{
                  transitionDelay: mobileOpen ? `${i * 60}ms` : "0ms",
                  opacity: mobileOpen ? 1 : 0,
                  transform: mobileOpen
                    ? "translateY(0)"
                    : "translateY(16px)",
                }}
              >
                {link.label}
              </a>
            );
          })}
          <div
            className="mt-4"
            style={{
              transitionDelay: mobileOpen
                ? `${navLinks.length * 60}ms`
                : "0ms",
              opacity: mobileOpen ? 1 : 0,
              transform: mobileOpen ? "translateY(0)" : "translateY(16px)",
              transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <Button
              variant="primary"
              size="lg"
              href="#contact"
              onClick={() => setMobileOpen(false)}
            >
              Claim Your Free Trial
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
