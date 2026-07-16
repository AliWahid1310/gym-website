"use client";

import Image from "next/image";
import Button from "@/components/ui/Button";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const stats = [
  { value: "500+", label: "Members" },
  { value: "15+", label: "Expert Trainers" },
  { value: "4.9★", label: "Google Rating" },
];

export default function Hero() {
  const [ref, isVisible] = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-brand-black"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-training-floor.jpg"
          alt="Athletes training on the Power Fitness Zone gym floor with professional equipment"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
          quality={85}
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/30" />
      </div>

      {/* Red angled accent block */}
      <div
        className="absolute top-0 left-0 w-[45%] h-full bg-brand-red/10 hidden lg:block"
        style={{
          clipPath: "polygon(0 0, 100% 0, 75% 100%, 0 100%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 w-full h-[6px] bg-brand-red"
        aria-hidden="true"
      />

      {/* Content */}
      <div
        ref={ref}
        className={`relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 w-full pt-32 pb-24 lg:pt-40 lg:pb-32 ${
          isVisible ? "revealed" : ""
        }`}
      >
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-6 reveal" style={{ transitionDelay: "0ms" }}>
            <div className="w-12 h-[2px] bg-brand-red" />
            <span className="text-brand-red text-xs font-semibold uppercase tracking-[0.25em] font-body">
              Premium Training Facility
            </span>
          </div>

          {/* Headline */}
          <h1
            className={`font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white uppercase leading-[0.9] tracking-tight mb-6 transition-all duration-1000 ease-out ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "150ms" }}
          >
            Train Like
            <br />
            <span className="text-brand-red">It Matters.</span>
          </h1>

          {/* Subheadline */}
          <p
            className={`text-white/70 text-lg sm:text-xl font-body font-light leading-relaxed mb-10 max-w-lg transition-all duration-1000 ease-out ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "300ms" }}
          >
            Where discipline meets community — a results-driven facility
            built for those who refuse to settle.
          </p>

          {/* CTAs */}
          <div
            className={`flex flex-col sm:flex-row gap-4 mb-14 transition-all duration-1000 ease-out ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "450ms" }}
          >
            <Button variant="primary" size="lg" href="#contact">
              Claim Your Free Trial Class
            </Button>
            <Button variant="secondary" size="lg" href="#schedule">
              View Class Schedule
            </Button>
          </div>

          {/* Trust Stats */}
          <div
            className={`flex items-center gap-6 sm:gap-10 transition-all duration-1000 ease-out ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "600ms" }}
          >
            {stats.map((stat, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-white font-display text-xl sm:text-2xl font-bold">
                  {stat.value}
                </span>
                <span className="text-white/50 text-xs sm:text-sm font-body uppercase tracking-wider">
                  {stat.label}
                </span>
                {i < stats.length - 1 && (
                  <div className="w-[1px] h-8 bg-white/20 ml-3 sm:ml-4 hidden sm:block" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Alternative headline options — hidden, for client review */}
        {/* Option 2: "YOUR STRONGEST CHAPTER STARTS HERE." */}
        {/* Option 3: "BUILT FOR THOSE WHO SHOW UP." */}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span className="text-white/40 text-[10px] uppercase tracking-[0.3em] font-body">
          Scroll
        </span>
        <div className="w-[1px] h-10 bg-white/20 relative overflow-hidden">
          <div className="w-full h-4 bg-brand-red absolute top-0 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
