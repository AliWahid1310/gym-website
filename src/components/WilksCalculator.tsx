"use client";

import { useState } from "react";
import { Trophy, Award, Zap, Shield, Sparkles, Scale, Info } from "lucide-react";

export default function WilksCalculator() {
  const [gender, setGender] = useState<"male" | "female">("male");
  const [bodyweight, setBodyweight] = useState<number>(83);
  const [unit, setUnit] = useState<"kg" | "lbs">("kg");
  const [inputMode, setInputMode] = useState<"total" | "sbd">("sbd");
  const [squat, setSquat] = useState<number>(180);
  const [bench, setBench] = useState<number>(125);
  const [deadlift, setDeadlift] = useState<number>(220);
  const [manualTotal, setManualTotal] = useState<number>(525);

  const bwKg = unit === "lbs" ? bodyweight * 0.453592 : bodyweight;
  const currentTotal = inputMode === "sbd" ? squat + bench + deadlift : manualTotal;
  const totalKg = unit === "lbs" ? currentTotal * 0.453592 : currentTotal;

  // DOTS Coefficient
  const calculateDots = (bw: number, total: number, isMale: boolean): number => {
    if (bw <= 30 || total <= 0) return 0;
    let a: number, b: number, c: number, d: number, e: number;
    if (isMale) {
      a = -307.2723;
      b = 24.3724;
      c = -0.191873;
      d = 0.0007391293;
      e = -0.000001093;
    } else {
      a = -57.96288;
      b = 13.6175032;
      c = -0.11266554;
      d = 0.0005158568;
      e = -0.0000010706;
    }
    const denom = a + b * bw + c * Math.pow(bw, 2) + d * Math.pow(bw, 3) + e * Math.pow(bw, 4);
    if (denom <= 0) return 0;
    return Math.round(((500 / denom) * total) * 100) / 100;
  };

  // Wilks Coefficient
  const calculateWilks = (bw: number, total: number, isMale: boolean): number => {
    if (bw <= 30 || total <= 0) return 0;
    let a: number, b: number, c: number, d: number, e: number, f: number;
    if (isMale) {
      a = -216.0475144;
      b = 16.2606339;
      c = -0.002388645;
      d = -0.00113732;
      e = 7.01863e-6;
      f = -1.291e-8;
    } else {
      a = 594.31747775582;
      b = -27.23842536447;
      c = 0.82112226871;
      d = -0.00930733913;
      e = 4.731582e-5;
      f = -9.054e-8;
    }
    const denom = a + b * bw + c * Math.pow(bw, 2) + d * Math.pow(bw, 3) + e * Math.pow(bw, 4) + f * Math.pow(bw, 5);
    if (denom <= 0) return 0;
  // IPF GL Points (Official IPF Standard since 2020)
  const calculateIpfGl = (bw: number, total: number, isMale: boolean): number => {
    if (bw <= 30 || total <= 0) return 0;
    const a = isMale ? 1199.72839 : 610.32796;
    const b = isMale ? 1025.18162 : 1045.59282;
    const c = isMale ? 0.00921 : 0.03048;
    const denom = a - b * Math.exp(-c * bw);
    if (denom <= 0) return 0;
    return Math.round(((100 * total) / denom) * 100) / 100;
  };

  const dotsScore = calculateDots(bwKg, totalKg, gender === "male");
  const wilksScore = calculateWilks(bwKg, totalKg, gender === "male");
  const ipfGlScore = calculateIpfGl(bwKg, totalKg, gender === "male");

  const getTier = (score: number) => {
    if (score >= 460) return { title: "International Elite", color: "text-amber-400 border-amber-500/50 bg-amber-950/40", desc: "World championship podium contender rank" };
    if (score >= 400) return { title: "Master Class Lifter", color: "text-purple-400 border-purple-500/50 bg-purple-950/40", desc: "National record candidate & top 5% Islamabad strength tier" };
    if (score >= 340) return { title: "Advanced Powerlifter", color: "text-red-400 border-red-500/50 bg-red-950/40", desc: "Significant strength foundation across SBD" };
    if (score >= 280) return { title: "Intermediate Lifter", color: "text-blue-400 border-blue-500/50 bg-blue-950/40", desc: "Solid gym progression with consistent compound technique" };
    return { title: "Novice Lifter", color: "text-emerald-400 border-emerald-500/50 bg-emerald-950/40", desc: "Building core barbell foundation and neuromuscular coordination" };
  };

  const activeTier = getTier(dotsScore);

  return (
    <section id="wilks-calculator" className="py-20 bg-[#0B0B0B] text-white relative overflow-hidden border-t border-neutral-800">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-900/10 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-red-950/80 text-red-400 border border-red-800/50 mb-4">
            <Trophy className="w-3.5 h-3.5" />
            Competitive Powerlifting Analytics
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            Wilks & DOTS <span className="text-red-500">Coefficient Calculator</span>
          </h2>
          <p className="mt-4 text-neutral-400 text-base sm:text-lg">
            Normalized pound-for-pound strength metric standardized by the International Powerlifting Federation (IPF) and Global Powerlifting Alliance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Panel */}
          <div className="lg:col-span-7 bg-[#141414] border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-6">
            {/* Gender and Unit Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold tracking-wider uppercase text-neutral-400 mb-2">
                  Lifter Gender
                </label>
                <div className="grid grid-cols-2 gap-2 bg-[#0B0B0B] p-1 rounded-xl border border-neutral-800">
                  <button
                    type="button"
                    onClick={() => setGender("male")}
                    className={`py-2 text-sm font-bold rounded-lg transition-all ${
                      gender === "male"
                        ? "bg-red-600 text-white shadow-md shadow-red-600/30"
                        : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    Male
                  </button>
                  <button
                    type="button"
                    onClick={() => setGender("female")}
                    className={`py-2 text-sm font-bold rounded-lg transition-all ${
                      gender === "female"
                        ? "bg-red-600 text-white shadow-md shadow-red-600/30"
                        : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    Female
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold tracking-wider uppercase text-neutral-400 mb-2">
                  Unit System
                </label>
                <div className="grid grid-cols-2 gap-2 bg-[#0B0B0B] p-1 rounded-xl border border-neutral-800">
                  <button
                    type="button"
                    onClick={() => setUnit("kg")}
                    className={`py-2 text-sm font-bold rounded-lg transition-all ${
                      unit === "kg"
                        ? "bg-neutral-800 text-white"
                        : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    Kilograms (kg)
                  </button>
                  <button
                    type="button"
                    onClick={() => setUnit("lbs")}
                    className={`py-2 text-sm font-bold rounded-lg transition-all ${
                      unit === "lbs"
                        ? "bg-neutral-800 text-white"
                        : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    Pounds (lbs)
                  </button>
                </div>
              </div>
            </div>

            {/* Bodyweight Input */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold tracking-wider uppercase text-neutral-400 flex items-center gap-1.5">
                  <Scale className="w-3.5 h-3.5 text-red-500" />
                  Weigh-In Bodyweight
                </label>
                <span className="text-red-400 font-bold text-sm">
                  {bodyweight} {unit}
                </span>
              </div>
              <input
                type="number"
                min={35}
                max={200}
                value={bodyweight}
                onChange={(e) => setBodyweight(Number(e.target.value) || 0)}
                className="w-full bg-[#0B0B0B] border border-neutral-800 rounded-xl px-4 py-3 text-white text-lg font-bold focus:outline-none focus:border-red-500 transition-colors"
              />
            </div>

            {/* Input Mode Toggle */}
            <div className="flex items-center justify-between pt-2 border-t border-neutral-800/80">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                Lift Entry Method
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setInputMode("sbd")}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg border transition-all ${
                    inputMode === "sbd"
                      ? "bg-red-950/70 border-red-700 text-red-300"
                      : "border-neutral-800 text-neutral-400 hover:text-white"
                  }`}
                >
                  SBD Individual Lifts
                </button>
                <button
                  type="button"
                  onClick={() => setInputMode("total")}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg border transition-all ${
                    inputMode === "total"
                      ? "bg-red-950/70 border-red-700 text-red-300"
                      : "border-neutral-800 text-neutral-400 hover:text-white"
                  }`}
                >
                  Direct Competition Total
                </button>
              </div>
            </div>

            {/* SBD Lift Inputs */}
            {inputMode === "sbd" ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-400 mb-1.5">
                    Squat ({unit})
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={squat}
                    onChange={(e) => setSquat(Number(e.target.value) || 0)}
                    className="w-full bg-[#0B0B0B] border border-neutral-800 rounded-xl px-3 py-2.5 text-white font-bold text-center focus:outline-none focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-400 mb-1.5">
                    Bench Press ({unit})
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={bench}
                    onChange={(e) => setBench(Number(e.target.value) || 0)}
                    className="w-full bg-[#0B0B0B] border border-neutral-800 rounded-xl px-3 py-2.5 text-white font-bold text-center focus:outline-none focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-400 mb-1.5">
                    Deadlift ({unit})
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={deadlift}
                    onChange={(e) => setDeadlift(Number(e.target.value) || 0)}
                    className="w-full bg-[#0B0B0B] border border-neutral-800 rounded-xl px-3 py-2.5 text-white font-bold text-center focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-xs font-semibold text-neutral-400 mb-1.5">
                  Combined 3-Lift Total ({unit})
                </label>
                <input
                  type="number"
                  min={0}
                  value={manualTotal}
                  onChange={(e) => setManualTotal(Number(e.target.value) || 0)}
                  className="w-full bg-[#0B0B0B] border border-neutral-800 rounded-xl px-4 py-3 text-white font-bold text-lg focus:outline-none focus:border-red-500"
                />
              </div>
            )}
          </div>

          {/* Results Display */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-gradient-to-br from-neutral-900 to-[#121212] border border-neutral-800 rounded-2xl p-6 sm:p-8 relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                  Competition Summary
                </span>
                <span className="text-xs px-2.5 py-1 rounded bg-neutral-800 text-neutral-300 font-mono">
                  BW: {bwKg.toFixed(1)} kg | Total: {totalKg.toFixed(1)} kg
                </span>
              </div>

              {/* Main DOTS score */}
              <div className="p-5 rounded-xl bg-[#090909] border border-neutral-800 mb-4 text-center">
                <span className="text-xs font-semibold uppercase tracking-widest text-neutral-400 flex items-center justify-center gap-1.5 mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-red-500" />
                  DOTS Coefficient
                </span>
                <div className="text-5xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-white to-red-500">
                  {dotsScore}
                </div>
                <div className="text-xs text-neutral-500 mt-1">Official IPF & USAPL Normalized Score</div>
              </div>

              {/* Wilks & IPF GL score comparison */}
              <div className="grid grid-cols-3 gap-2.5 mb-6">
                <div className="p-3 bg-[#090909]/80 rounded-xl border border-neutral-800/80 text-center">
                  <div className="text-[11px] text-neutral-400 font-semibold mb-0.5">Wilks</div>
                  <div className="text-xl font-black text-white">{wilksScore}</div>
                  <div className="text-[9px] text-neutral-500">Classic</div>
                </div>
                <div className="p-3 bg-[#090909]/80 rounded-xl border border-neutral-800/80 text-center">
                  <div className="text-[11px] text-neutral-400 font-semibold mb-0.5">IPF GL</div>
                  <div className="text-xl font-black text-amber-400">{ipfGlScore}</div>
                  <div className="text-[9px] text-neutral-500">Modern IPF</div>
                </div>
                <div className="p-3 bg-[#090909]/80 rounded-xl border border-neutral-800/80 text-center">
                  <div className="text-[11px] text-neutral-400 font-semibold mb-0.5">Multiple</div>
                  <div className="text-xl font-black text-red-400">
                    {bwKg > 0 ? (totalKg / bwKg).toFixed(2) : "0.00"}x
                  </div>
                  <div className="text-[9px] text-neutral-500">BW Ratio</div>
                </div>
              </div>

              {/* Tier Classification Badge */}
              <div className={`p-4 rounded-xl border ${activeTier.color} space-y-1`}>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  <span className="font-bold text-sm uppercase tracking-wide">{activeTier.title}</span>
                </div>
                <p className="text-xs opacity-90 leading-relaxed">{activeTier.desc}</p>
              </div>

              <div className="mt-5 pt-4 border-t border-neutral-800/80 flex items-start gap-2 text-xs text-neutral-400">
                <Info className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>
                  Power Fitness Zone hosts quarterly sanctioned push-pull meets in F-7 & Bahria Town branches following IPF rules.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
