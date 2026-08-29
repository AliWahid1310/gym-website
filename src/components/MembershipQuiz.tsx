"use client";

import { useState } from "react";
import { Calculator, Check, ArrowRight, ShieldCheck, Sparkles, HelpCircle, CheckCircle2, MessageSquareQuote } from "lucide-react";

interface PlanRecommendation {
  name: string;
  badge: string;
  monthlyFeePkr: number;
  savingsYearlyPkr: number;
  features: string[];
  bestFor: string;
}

export default function MembershipQuiz() {
  const [daysPerWeek, setDaysPerWeek] = useState<number>(4);
  const [memberType, setMemberType] = useState<"individual" | "student" | "couple" | "corporate">("individual");
  const [duration, setDuration] = useState<"monthly" | "quarterly" | "annual">("annual");
  const [needsTrainer, setNeedsTrainer] = useState<boolean>(false);
  const [needsSauna, setNeedsSauna] = useState<boolean>(true);

  // Compute recommended package
  const getRecommendation = (): PlanRecommendation => {
    if (memberType === "student") {
      return {
        name: "Student Athlete Pass",
        badge: "🎓 25% Off with Valid ID",
        monthlyFeePkr: duration === "annual" ? 6500 : duration === "quarterly" ? 7500 : 8500,
        savingsYearlyPkr: 24000,
        features: ["Full Strength Floor & Cardio Deck Access", "Islamabad Student Discount Included", "Free Lockers & Shower", "Standard Group Classes"],
        bestFor: "High school & university students looking for elite equipment on a student budget.",
      };
    }
    if (memberType === "couple") {
      return {
        name: "Dual Partner / Couples All-Access",
        badge: "❤️ Best Value for Two",
        monthlyFeePkr: duration === "annual" ? 14000 : duration === "quarterly" ? 16000 : 18000,
        savingsYearlyPkr: 48000,
        features: ["2x Unlimited Multi-Branch Access", "Free Steam & Sauna for both members", "2x InBody 770 Monthly Scans", "Guest Passes every quarter"],
        bestFor: "Couples, siblings, or gym buddies who train together.",
      };
    }
    if (needsTrainer || duration === "annual") {
      return {
        name: "Platinum Annual VIP All-Access",
        badge: "⭐ Most Popular & Maximum ROI",
        monthlyFeePkr: 9500,
        savingsYearlyPkr: 36000,
        features: ["Unlimited Multi-Branch Access (All Islamabad Branches)", "Free Hydro-Massage & Sauna Privileges", "Monthly InBody 770 Body Composition Analysis", "10% Discount on Certified PFZ Supplements & Merch", "2x Complimentary Personal Training Kickstart Sessions"],
        bestFor: "Serious fitness enthusiasts seeking the ultimate luxury gym experience and highest long-term savings.",
      };
    }
    return {
      name: "Standard Fitness Zone Tier",
      badge: "⚡ Great Flexibility",
      monthlyFeePkr: duration === "quarterly" ? 10500 : 12000,
      savingsYearlyPkr: 18000,
      features: ["Single Home Branch Access", "Full Cardio & Hammer Strength Floor", "Standard Locker Room", "Access to Open Gym Floor"],
      bestFor: "Regular gym goers wanting reliable access without long-term commitments.",
    };
  };

  const plan = getRecommendation();
  const estimatedVisitsPerMonth = daysPerWeek * 4.33;
  const costPerSession = Math.round(plan.monthlyFeePkr / (estimatedVisitsPerMonth || 1));

  const handleWhatsAppBooking = () => {
    const text = `👋 Hello Power Fitness Zone Islamabad!
I completed the Membership Plan Finder and would like to register for:
🏷️ Plan: ${plan.name} (${plan.badge})
📅 Commitment: ${duration.toUpperCase()}
🏋️ Visits: ${daysPerWeek} days/week (~PKR ${costPerSession}/session)
Please guide me with the enrollment procedure.`;
    window.open(`https://wa.me/923001234567?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <section id="membership-finder" className="py-20 bg-[#0A0A0A] text-white relative overflow-hidden border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-red-950/80 text-red-400 border border-red-800/50 mb-4">
            <Calculator className="w-3.5 h-3.5" />
            Interactive Plan Finder & ROI
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            Find Your Ideal <span className="text-red-500">Membership Tier</span>
          </h2>
          <p className="mt-4 text-neutral-400 text-base sm:text-lg">
            Answer 4 quick lifestyle questions to discover your optimal package, calculated cost-per-session, and maximum annual savings.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Quiz Options */}
          <div className="lg:col-span-6 bg-neutral-900/90 border border-neutral-800 p-6 sm:p-8 rounded-3xl shadow-2xl space-y-6">
            {/* Question 1: Days per week */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  1. How many days per week will you train?
                </label>
                <span className="text-base font-bold text-red-500">{daysPerWeek} Days / Week</span>
              </div>
              <input
                type="range"
                min={2}
                max={7}
                value={daysPerWeek}
                onChange={(e) => setDaysPerWeek(Number(e.target.value))}
                className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-red-500"
              />
              <div className="flex justify-between text-[11px] text-neutral-500 mt-1">
                <span>2 Days (Casual)</span>
                <span>4 Days (Balanced)</span>
                <span>7 Days (Hardcore)</span>
              </div>
            </div>

            {/* Question 2: Member profile */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2.5">
                2. Who is joining?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: "individual", label: "Individual", icon: "👤" },
                  { id: "student", label: "Student", icon: "🎓" },
                  { id: "couple", label: "Couples", icon: "👥" },
                  { id: "corporate", label: "Corporate", icon: "💼" },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setMemberType(t.id as "individual" | "student" | "couple" | "corporate")}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      memberType === t.id
                        ? "bg-red-950/60 border-red-500 text-white shadow-lg shadow-red-950/30"
                        : "bg-neutral-800/40 border-neutral-800 text-neutral-400 hover:bg-neutral-800"
                    }`}
                  >
                    <div className="text-xl mb-1">{t.icon}</div>
                    <div className="text-xs font-bold text-white">{t.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Question 3: Commitment duration */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2.5">
                3. Preferred Commitment Duration
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "monthly", label: "Monthly", desc: "No Commitment" },
                  { id: "quarterly", label: "3 Months", desc: "15% Savings" },
                  { id: "annual", label: "12 Months VIP", desc: "Max 30% Savings" },
                ].map((d) => (
                  <button
                    key={d.id}
                    onClick={() => setDuration(d.id as "monthly" | "quarterly" | "annual")}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      duration === d.id
                        ? "bg-red-950/60 border-red-500 text-white shadow-lg shadow-red-950/30"
                        : "bg-neutral-800/40 border-neutral-800 text-neutral-400 hover:bg-neutral-800"
                    }`}
                  >
                    <div className="text-xs font-bold text-white">{d.label}</div>
                    <div className="text-[10px] text-red-400 mt-0.5">{d.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Question 4: Additional preferences */}
            <div className="pt-2 border-t border-neutral-800 grid grid-cols-2 gap-3">
              <label className="flex items-center gap-2 cursor-pointer bg-neutral-800/50 p-3 rounded-xl border border-neutral-800 hover:border-neutral-700">
                <input
                  type="checkbox"
                  checked={needsTrainer}
                  onChange={(e) => setNeedsTrainer(e.target.checked)}
                  className="w-4 h-4 rounded text-red-600 accent-red-600 cursor-pointer"
                />
                <span className="text-xs font-medium text-neutral-300">Need Personal Coach Guidance</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer bg-neutral-800/50 p-3 rounded-xl border border-neutral-800 hover:border-neutral-700">
                <input
                  type="checkbox"
                  checked={needsSauna}
                  onChange={(e) => setNeedsSauna(e.target.checked)}
                  className="w-4 h-4 rounded text-red-600 accent-red-600 cursor-pointer"
                />
                <span className="text-xs font-medium text-neutral-300">Sauna & Steam Access</span>
              </label>
            </div>
          </div>

          {/* Right: Calculated Plan Card */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-gradient-to-br from-neutral-900 via-neutral-900 to-red-950/30 border border-red-900/40 p-6 sm:p-8 rounded-3xl shadow-2xl relative overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase bg-red-950 text-red-400 border border-red-800">
                  {plan.badge}
                </span>
                <span className="text-xs font-bold text-neutral-400">Recommended Match</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white">{plan.name}</h3>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed">{plan.bestFor}</p>

              {/* Price & Cost per workout */}
              <div className="grid grid-cols-2 gap-3 my-6 p-4 rounded-2xl bg-neutral-800/60 border border-neutral-700">
                <div>
                  <span className="text-[10px] uppercase font-bold text-neutral-400">Membership Fee</span>
                  <div className="text-2xl sm:text-3xl font-black text-white mt-0.5">
                    PKR {plan.monthlyFeePkr.toLocaleString()}
                    <span className="text-xs font-normal text-neutral-400">/mo</span>
                  </div>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-emerald-400">Cost Per Session</span>
                  <div className="text-2xl sm:text-3xl font-black text-emerald-400 mt-0.5">
                    PKR {costPerSession}
                    <span className="text-xs font-normal text-neutral-400">/day</span>
                  </div>
                </div>
              </div>

              {/* Features list */}
              <div className="space-y-2 mb-6">
                <span className="text-xs font-bold uppercase text-neutral-400 block mb-2">Package Inclusions:</span>
                {plan.features.map((f, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-neutral-200">
                    <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>

              {/* Action WhatsApp Button */}
              <button
                onClick={handleWhatsAppBooking}
                className="w-full py-4 px-6 rounded-2xl font-black text-xs sm:text-sm uppercase tracking-wider bg-red-600 hover:bg-red-500 text-white flex items-center justify-center gap-2 transition-all shadow-lg shadow-red-600/30 active:scale-95"
              >
                <MessageSquareQuote className="w-5 h-5" /> Reserve This Plan on WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
