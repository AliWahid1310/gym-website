"use client";

import { useState } from "react";
import { pricingTiers, formatPKR } from "@/data/pricing";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import Button from "@/components/ui/Button";

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [ref, isVisible] = useScrollReveal<HTMLElement>({ threshold: 0.05 });

  return (
    <section
      id="pricing"
      ref={ref}
      className="relative bg-brand-white py-24 sm:py-32 lg:py-40"
    >
      {/* Red angled accent at top */}
      <div
        className="absolute top-0 left-0 w-full h-2 bg-brand-red"
        aria-hidden="true"
      />

      <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-[2px] bg-brand-red" />
            <span className="text-brand-red text-xs font-semibold uppercase tracking-[0.25em] font-body">
              Membership Plans
            </span>
            <div className="w-12 h-[2px] bg-brand-red" />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-black uppercase leading-[0.95] mb-6">
            Choose Your Plan
          </h2>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span
              className={`text-sm font-semibold font-body uppercase tracking-wider transition-colors duration-300 ${
                !isAnnual ? "text-brand-black" : "text-brand-black/40"
              }`}
            >
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative w-14 h-7 bg-brand-black/10 transition-colors duration-300 flex items-center"
              role="switch"
              aria-checked={isAnnual}
              aria-label="Toggle annual billing"
            >
              <span
                className={`absolute w-6 h-6 bg-brand-red transition-transform duration-300 ${
                  isAnnual ? "translate-x-7.5" : "translate-x-0.5"
                }`}
              />
            </button>
            <span
              className={`text-sm font-semibold font-body uppercase tracking-wider transition-colors duration-300 ${
                isAnnual ? "text-brand-black" : "text-brand-black/40"
              }`}
            >
              Annual
            </span>
            {isAnnual && (
              <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-brand-red px-2.5 py-1 font-body">
                Save 20%
              </span>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 max-w-5xl mx-auto">
          {pricingTiers.map((tier, i) => (
            <div
              key={tier.id}
              className={`relative flex flex-col border transition-all duration-700 ${
                tier.highlighted
                  ? "animate-gradient-shift text-white border-brand-red md:scale-105 md:z-10 md:-my-4 shadow-2xl shadow-brand-red/10"
                  : "bg-white text-brand-black border-black/10 hover:border-black/20"
              } ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
              style={{
                transitionDelay: isVisible ? `${i * 150}ms` : "0ms",
              }}
            >
              {/* Badge */}
              {tier.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-red text-white text-[10px] font-bold uppercase tracking-widest px-5 py-2 font-body z-10 animate-pulse-glow">
                  {tier.badge}
                </div>
              )}

              <div className="p-8 sm:p-10 flex-1 flex flex-col">
                {/* Tier Name */}
                <h3
                  className={`font-display text-2xl font-bold uppercase mb-2 ${
                    tier.highlighted ? "text-brand-red" : "text-brand-black"
                  }`}
                >
                  {tier.name}
                </h3>
                <p
                  className={`text-sm font-body mb-8 ${
                    tier.highlighted
                      ? "text-white/60"
                      : "text-brand-black/50"
                  }`}
                >
                  {tier.description}
                </p>

                {/* Price */}
                <div className="mb-8">
                  <div className="flex items-baseline gap-1">
                    <span
                      className={`font-display text-4xl sm:text-5xl font-bold ${
                        tier.highlighted ? "text-white" : "text-brand-black"
                      }`}
                    >
                      {formatPKR(
                        isAnnual
                          ? Math.round(tier.annualPrice / 12)
                          : tier.monthlyPrice
                      )}
                    </span>
                  </div>
                  <span
                    className={`text-xs font-body uppercase tracking-wider ${
                      tier.highlighted
                        ? "text-white/40"
                        : "text-brand-black/40"
                    }`}
                  >
                    per month{isAnnual ? ", billed annually" : ""}
                  </span>
                  {isAnnual && (
                    <div className="mt-1">
                      <span
                        className={`text-xs font-body ${
                          tier.highlighted
                            ? "text-white/30"
                            : "text-brand-black/30"
                        }`}
                      >
                        {formatPKR(tier.annualPrice)} /year
                      </span>
                    </div>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-10 flex-1">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        className={`flex-shrink-0 mt-0.5 ${
                          tier.highlighted
                            ? "text-brand-red"
                            : "text-brand-red"
                        }`}
                      >
                        <path
                          d="M3 8L6.5 11.5L13 4.5"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="square"
                          strokeLinejoin="miter"
                        />
                      </svg>
                      <span
                        className={`text-sm font-body ${
                          tier.highlighted
                            ? "text-white/70"
                            : "text-brand-black/60"
                        }`}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button
                  variant={tier.highlighted ? "primary" : "dark"}
                  size="lg"
                  className="w-full"
                  href="#contact"
                >
                  {tier.cta}
                </Button>
              </div>

              {/* Red side accent for highlighted tier */}
              {tier.highlighted && (
                <div
                  className="absolute left-0 top-0 bottom-0 w-1 bg-brand-red"
                  aria-hidden="true"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
