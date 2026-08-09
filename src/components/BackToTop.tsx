"use client";

import { useState, useEffect } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.5);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`fixed bottom-20 lg:bottom-8 right-5 z-40 w-12 h-12 flex items-center justify-center bg-brand-red text-white shadow-lg shadow-brand-red/25 transition-all duration-500 group hover:bg-brand-red-dark hover:scale-110 hover:shadow-xl hover:shadow-brand-red/40 ${
        visible
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "translate-y-16 opacity-0 pointer-events-none"
      }`}
      aria-label="Back to top"
      style={{
        clipPath: "polygon(50% 0%, 100% 25%, 100% 100%, 0% 100%, 0% 25%)",
      }}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        className={`transition-transform duration-300 ${
          isHovered ? "-translate-y-0.5" : ""
        }`}
      >
        <path
          d="M9 15V3M9 3L3 9M9 3L15 9"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="square"
        />
      </svg>
    </button>
  );
}
