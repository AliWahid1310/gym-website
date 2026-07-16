"use client";

import { useCountUp } from "@/hooks/useCountUp";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const stats = [
  { end: 10, suffix: "+", label: "Years of\nExcellence" },
  { end: 500, suffix: "+", label: "Active\nMembers" },
  { end: 15, suffix: "+", label: "Certified\nTrainers" },
  { end: 50, suffix: "+", label: "Classes\nPer Week" },
];

function StatCounter({
  end,
  suffix,
  label,
  delay,
}: {
  end: number;
  suffix: string;
  label: string;
  delay: number;
}) {
  const { ref, displayValue } = useCountUp({ end, suffix, duration: 2200 });

  return (
    <div
      className="group"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <span
        ref={ref}
        className="font-display text-6xl sm:text-7xl lg:text-8xl font-bold text-brand-red leading-none block mb-2 transition-transform duration-300 group-hover:scale-105"
      >
        {displayValue}
      </span>
      <span className="text-white/60 text-sm sm:text-base font-body uppercase tracking-widest whitespace-pre-line leading-tight">
        {label}
      </span>
    </div>
  );
}

export default function About() {
  const [ref, isVisible] = useScrollReveal<HTMLElement>({ threshold: 0.1 });

  return (
    <section
      id="about"
      ref={ref}
      className="relative bg-brand-black py-24 sm:py-32 lg:py-40 overflow-hidden"
    >
      {/* Subtle red accent line top */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-brand-red via-brand-red to-transparent" aria-hidden="true" />

      <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left: Stats */}
          <div
            className={`grid grid-cols-2 gap-10 sm:gap-14 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-12"
            }`}
          >
            {stats.map((stat, i) => (
              <StatCounter
                key={stat.label}
                end={stat.end}
                suffix={stat.suffix}
                label={stat.label}
                delay={i * 150}
              />
            ))}
          </div>

          {/* Right: Mission */}
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-12"
            }`}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-[2px] bg-brand-red" />
              <span className="text-brand-red text-xs font-semibold uppercase tracking-[0.25em] font-body">
                Our Mission
              </span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white uppercase leading-[0.95] mb-8">
              More Than
              <br />
              A Gym.
            </h2>

            <p className="text-white/60 text-lg leading-relaxed font-body font-light mb-8">
              Power Fitness Zone was built on a single belief: that the right
              environment changes everything. We&apos;re not a place where you
              go through the motions. We&apos;re a place where you come to be
              challenged, coached, and transformed — by trainers who know
              your name, programs that evolve with you, and a community that
              holds you accountable.
            </p>

            <p className="text-white/60 text-lg leading-relaxed font-body font-light mb-10">
              From competitive athletes to first-time gym-goers, every member
              here earns the same thing: our full attention. No shortcuts.
              No cookie-cutter programs. Just honest work and real results.
            </p>

            <div className="flex items-center gap-4">
              <div className="w-16 h-[2px] bg-brand-red" />
              <span className="text-white/40 text-sm font-body italic">
                Discipline. Community. Results.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
