"use client";

import { useState } from "react";
import { pricingTiers, comparisonFeatures, formatPKR } from "@/data/pricing";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import Button from "@/components/ui/Button";

type BillingCycle = "monthly" | "quarterly" | "annual";

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");
  const [showComparison, setShowComparison] = useState(false);
  const [ref, isVisible] = useScrollReveal<HTMLElement>({ threshold: 0.05 });

  const getPriceDisplay = (tier: (typeof pricingTiers)[0]) => {
    if (billingCycle === "monthly") {
      return {
        amount: tier.monthlyPrice,
        sub: "per month",
        total: null,
      };
    } else if (billingCycle === "quarterly") {
      return {
        amount: Math.round(tier.quarterlyPrice / 3),
        sub: "per month (billed quarterly)",
        total: `${formatPKR(tier.quarterlyPrice)} /quarter (Save 10%)`,
      };
    } else {
      return {
        amount: Math.round(tier.annualPrice / 12),
        sub: "per month (billed annually)",
        total: `${formatPKR(tier.annualPrice)} /year (Save 25%)`,
      };
    }
  };

  return (
    <section
      id="pricing"
      ref={ref}
      className="relative bg-brand-white py-24 sm:py-32 lg:py-40"
    >
      {/* Red accent bar at top */}
      <div
        className="absolute top-0 left-0 w-full h-2 bg-brand-red"
        aria-hidden="true"
      />

      <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
        {/* Header */}
        <div
          className={`text-center mb-14 transition-all duration-1000 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-[2px] bg-brand-red" />
            <span className="text-brand-red text-xs font-semibold uppercase tracking-[0.25em] font-body">
              Membership Tiers
            </span>
            <div className="w-12 h-[2px] bg-brand-red" />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-black uppercase leading-[0.95] mb-6">
            Transparent Membership Plans
          </h2>
          <p className="max-w-2xl mx-auto text-neutral-600 text-sm sm:text-base">
            Zero hidden maintenance charges. Cancel anytime or commit longer to unlock up to 25% annual savings.
          </p>

          {/* 3-Way Billing Toggle */}
          <div className="inline-flex items-center p-1.5 rounded-2xl bg-neutral-200/80 border border-neutral-300 mt-8">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all ${
                billingCycle === "monthly"
                  ? "bg-brand-black text-white shadow"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("quarterly")}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                billingCycle === "quarterly"
                  ? "bg-brand-black text-white shadow"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              <span>Quarterly</span>
              <span className="text-[10px] bg-amber-500 text-black px-1.5 py-0.5 rounded font-black">
                -10%
              </span>
            </button>
            <button
              onClick={() => setBillingCycle("annual")}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                billingCycle === "annual"
                  ? "bg-brand-red text-white shadow-lg shadow-brand-red/30"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              <span>Annual</span>
              <span className="text-[10px] bg-white text-brand-red px-1.5 py-0.5 rounded font-black">
                -25%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 max-w-5xl mx-auto items-stretch">
          {pricingTiers.map((tier, i) => {
            const pricing = getPriceDisplay(tier);
            return (
              <div
                key={tier.id}
                className={`relative flex flex-col border transition-all duration-700 ${
                  tier.highlighted
                    ? "animate-gradient-shift text-white border-brand-red md:scale-105 md:z-10 md:-my-4 shadow-2xl shadow-brand-red/20"
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

                <div className="p-8 sm:p-10 flex-1 flex flex-col justify-between">
                  <div>
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
                          {formatPKR(pricing.amount)}
                        </span>
                      </div>
                      <span
                        className={`text-xs font-body uppercase tracking-wider block mt-1 ${
                          tier.highlighted
                            ? "text-white/50"
                            : "text-brand-black/50"
                        }`}
                      >
                        {pricing.sub}
                      </span>
                      {pricing.total && (
                        <span
                          className={`inline-block mt-2 text-xs font-semibold px-2.5 py-0.5 rounded ${
                            tier.highlighted
                              ? "bg-brand-red/30 text-brand-red border border-brand-red/40"
                              : "bg-neutral-100 text-neutral-800 border border-neutral-200"
                          }`}
                        >
                          {pricing.total}
                        </span>
                      )}
                    </div>

                    {/* Features */}
                    <ul className="space-y-3 mb-10">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            className="flex-shrink-0 mt-0.5 text-brand-red"
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
                                ? "text-white/80"
                                : "text-brand-black/70"
                            }`}
                          >
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

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
            );
          })}
        </div>

        {/* Feature Comparison Matrix Toggle */}
        <div className="text-center mt-10">
          <button
            onClick={() => setShowComparison(!showComparison)}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-black hover:text-brand-red transition-colors py-2 px-4 rounded-xl border border-neutral-300 hover:border-brand-red"
          >
            <span>{showComparison ? "▲ Hide Full Comparison Matrix" : "▼ Compare All Plan Features Side-by-Side"}</span>
          </button>
        </div>

        {/* Comparison Matrix Table */}
        {showComparison && (
          <div className="mt-8 max-w-5xl mx-auto bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 overflow-x-auto shadow-2xl animate-fadeIn text-white">
            <h4 className="text-xl font-bold uppercase tracking-wider mb-6 text-center">
              Complete Feature Comparison Matrix
            </h4>
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-neutral-800 text-neutral-400">
                  <th className="py-3 px-4 font-semibold">Features & Privileges</th>
                  <th className="py-3 px-4 font-semibold">Starter</th>
                  <th className="py-3 px-4 font-semibold text-brand-red">Pro Tier</th>
                  <th className="py-3 px-4 font-semibold text-amber-400">Elite VIP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/60">
                {comparisonFeatures.map((row, idx) => (
                  <tr key={idx} className="hover:bg-neutral-800/40 transition-colors">
                    <td className="py-3 px-4 font-medium text-neutral-200">{row.name}</td>
                    <td className="py-3 px-4 text-neutral-400">
                      {typeof row.starter === "boolean" ? (row.starter ? "✓ Included" : "—") : row.starter}
                    </td>
                    <td className="py-3 px-4 font-semibold text-white">
                      {typeof row.pro === "boolean" ? (row.pro ? "✓ Included" : "—") : row.pro}
                    </td>
                    <td className="py-3 px-4 font-bold text-amber-300">
                      {typeof row.elite === "boolean" ? (row.elite ? "✓ Included" : "—") : row.elite}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Student & Corporate Discount Banner */}
        <div
          className={`mt-14 max-w-5xl mx-auto rounded-2xl bg-neutral-900 border border-neutral-800 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-xl bg-[#D91E2A]/10 border border-[#D91E2A]/30 flex items-center justify-center text-2xl flex-shrink-0">
              🎓
            </div>
            <div>
              <h4 className="text-white font-bold text-base sm:text-lg">
                Student & Corporate Group Discounts Available
              </h4>
              <p className="text-neutral-400 text-xs sm:text-sm mt-0.5">
                Present a valid student ID or register with 3+ coworkers to unlock an additional 15% off any tier.
              </p>
            </div>
          </div>
          <a
            href="#contact"
            className="flex-shrink-0 px-6 py-3 rounded-lg border border-neutral-700 bg-neutral-800 text-white font-semibold text-xs uppercase tracking-wider hover:bg-[#D91E2A] hover:border-[#D91E2A] transition-all"
          >
            Inquire Group Rate
          </a>
        </div>
      </div>
    </section>
  );
}
