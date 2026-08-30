"use client";

import { useState } from "react";

type Gender = "male" | "female";
type Unit = "metric" | "imperial";

interface BodyFatCategory {
  label: string;
  min: number;
  max: number;
  color: string;
  textColor: string;
  bgBadge: string;
  description: string;
}

const MALE_CATEGORIES: BodyFatCategory[] = [
  { label: "Essential Fat", min: 2, max: 5, color: "#3B82F6", textColor: "text-blue-400", bgBadge: "bg-blue-500/10 border-blue-500/30", description: "Minimum body fat necessary for physiological and hormonal health." },
  { label: "Athletes", min: 6, max: 13, color: "#10B981", textColor: "text-emerald-400", bgBadge: "bg-emerald-500/10 border-emerald-500/30", description: "Excellent muscle definition with prominent vascularity and visible abs." },
  { label: "Fitness", min: 14, max: 17, color: "#F59E0B", textColor: "text-amber-400", bgBadge: "bg-amber-500/10 border-amber-500/30", description: "Great physical conditioning with athletic muscle tone and outline." },
  { label: "Average", min: 18, max: 24, color: "#EC4899", textColor: "text-pink-400", bgBadge: "bg-pink-500/10 border-pink-500/30", description: "Standard healthy body fat ratio with moderate abdominal softness." },
  { label: "Overfat / Obese", min: 25, max: 45, color: "#EF4444", textColor: "text-red-400", bgBadge: "bg-red-500/10 border-red-500/30", description: "Higher risk of metabolic disorders; fat-loss recomposition recommended." },
];

const FEMALE_CATEGORIES: BodyFatCategory[] = [
  { label: "Essential Fat", min: 10, max: 13, color: "#3B82F6", textColor: "text-blue-400", bgBadge: "bg-blue-500/10 border-blue-500/30", description: "Minimum body fat needed for endocrine health and reproductive cycles." },
  { label: "Athletes", min: 14, max: 20, color: "#10B981", textColor: "text-emerald-400", bgBadge: "bg-emerald-500/10 border-emerald-500/30", description: "High athletic performance, lean core definition and shoulder separation." },
  { label: "Fitness", min: 21, max: 24, color: "#F59E0B", textColor: "text-amber-400", bgBadge: "bg-amber-500/10 border-amber-500/30", description: "Strong physical tone with low health risks and balanced physique." },
  { label: "Average", min: 25, max: 31, color: "#EC4899", textColor: "text-pink-400", bgBadge: "bg-pink-500/10 border-pink-500/30", description: "Common healthy range for adult females with gentle curves." },
  { label: "Overfat / Obese", min: 32, max: 50, color: "#EF4444", textColor: "text-red-400", bgBadge: "bg-red-500/10 border-red-500/30", description: "Elevated body fat level; structured strength & deficit protocol advised." },
];

export default function BodyFatCalculator() {
  const [gender, setGender] = useState<Gender>("male");
  const [unit, setUnit] = useState<Unit>("metric");

  // Inputs in metric
  const [heightCm, setHeightCm] = useState(175);
  const [weightKg, setWeightKg] = useState(78);
  const [neckCm, setNeckCm] = useState(38);
  const [waistCm, setWaistCm] = useState(84);
  const [hipCm, setHipCm] = useState(96); // only for females

  // Target Body Fat for Recomposition Planner
  const [targetBf, setTargetBf] = useState(12);

  // Imperial conversions helper
  const cmToInches = (cm: number) => (cm / 2.54).toFixed(1);
  const kgToLbs = (kg: number) => (kg * 2.20462).toFixed(1);

  // US Navy Body Fat Formula
  const calculateBodyFat = (): number | null => {
    try {
      if (gender === "male") {
        if (waistCm <= neckCm || heightCm <= 0) return null;
        const logWaistNeck = Math.log10(waistCm - neckCm);
        const logHeight = Math.log10(heightCm);
        const bf = 495 / (1.0324 - 0.19077 * logWaistNeck + 0.15456 * logHeight) - 450;
        return isNaN(bf) || bf < 2 || bf > 60 ? null : parseFloat(bf.toFixed(1));
      } else {
        if (waistCm + hipCm <= neckCm || heightCm <= 0) return null;
        const logWaistHipNeck = Math.log10(waistCm + hipCm - neckCm);
        const logHeight = Math.log10(heightCm);
        const bf = 495 / (1.29579 - 0.35004 * logWaistHipNeck + 0.221 * logHeight) - 450;
        return isNaN(bf) || bf < 5 || bf > 65 ? null : parseFloat(bf.toFixed(1));
      }
    } catch {
      return null;
    }
  };

  const bodyFat = calculateBodyFat();
  const categories = gender === "male" ? MALE_CATEGORIES : FEMALE_CATEGORIES;

  const currentCategory = bodyFat
    ? categories.find((c) => bodyFat >= c.min && bodyFat <= c.max) ||
      (bodyFat > categories[categories.length - 1].max ? categories[categories.length - 1] : categories[0])
    : null;

  // Body Composition metrics
  const fatMass = bodyFat ? parseFloat(((weightKg * bodyFat) / 100).toFixed(1)) : 0;
  const leanMass = bodyFat ? parseFloat((weightKg - fatMass).toFixed(1)) : 0;

  // Target weight calculation: Target Weight = Lean Mass / (1 - (Target BF / 100))
  const targetWeight = bodyFat && targetBf < bodyFat
    ? parseFloat((leanMass / (1 - targetBf / 100)).toFixed(1))
    : null;
  const fatToLose = targetWeight ? parseFloat((weightKg - targetWeight).toFixed(1)) : 0;
  const estimatedWeeks = fatToLose > 0 ? Math.max(1, Math.ceil(fatToLose / 0.5)) : 0;

  return (
    <section id="body-fat-calculator" className="py-20 bg-[#0A0A0A] text-white relative overflow-hidden border-t border-neutral-800">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-red-600/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            US Navy Body Composition Standard
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-white">
            Body Fat & <span className="text-red-500">Recomposition</span> Analyzer
          </h2>
          <p className="mt-4 text-neutral-400 text-base sm:text-lg">
            Calculate your true body fat percentage, lean muscle mass, and fat-loss timeline using official US Navy tape-measurement algorithms.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Inputs Column */}
          <div className="lg:col-span-6 bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-neutral-800">
              <h3 className="text-xl font-bold uppercase tracking-wide text-white flex items-center gap-2">
                <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Tape Measurements
              </h3>

              {/* Unit Toggle */}
              <div className="flex bg-neutral-950 p-1 rounded-lg border border-neutral-800">
                <button
                  onClick={() => setUnit("metric")}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                    unit === "metric" ? "bg-red-600 text-white shadow" : "text-neutral-400 hover:text-white"
                  }`}
                >
                  Metric (cm / kg)
                </button>
                <button
                  onClick={() => setUnit("imperial")}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                    unit === "imperial" ? "bg-red-600 text-white shadow" : "text-neutral-400 hover:text-white"
                  }`}
                >
                  Imperial (in / lbs)
                </button>
              </div>
            </div>

            {/* Gender Selector */}
            <div className="mt-6">
              <label className="block text-xs uppercase font-semibold text-neutral-400 mb-2">Biological Sex</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    setGender("male");
                    setTargetBf(12);
                  }}
                  className={`py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 border transition-all ${
                    gender === "male"
                      ? "bg-red-600/20 border-red-500 text-white shadow-lg shadow-red-600/20"
                      : "bg-neutral-950/60 border-neutral-800 text-neutral-400 hover:border-neutral-700"
                  }`}
                >
                  <span>👨 Male</span>
                </button>
                <button
                  onClick={() => {
                    setGender("female");
                    setTargetBf(20);
                  }}
                  className={`py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 border transition-all ${
                    gender === "female"
                      ? "bg-red-600/20 border-red-500 text-white shadow-lg shadow-red-600/20"
                      : "bg-neutral-950/60 border-neutral-800 text-neutral-400 hover:border-neutral-700"
                  }`}
                >
                  <span>👩 Female</span>
                </button>
              </div>
            </div>

            {/* Range Inputs */}
            <div className="space-y-5 mt-6">
              {/* Height */}
              <div>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-neutral-300 font-medium">Height</span>
                  <span className="text-red-400 font-bold">
                    {heightCm} cm {unit === "imperial" && `(${cmToInches(heightCm)} in)`}
                  </span>
                </div>
                <input
                  type="range"
                  min="130"
                  max="220"
                  value={heightCm}
                  onChange={(e) => setHeightCm(Number(e.target.value))}
                  className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-red-600"
                />
              </div>

              {/* Weight */}
              <div>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-neutral-300 font-medium">Body Weight</span>
                  <span className="text-red-400 font-bold">
                    {weightKg} kg {unit === "imperial" && `(${kgToLbs(weightKg)} lbs)`}
                  </span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="160"
                  value={weightKg}
                  onChange={(e) => setWeightKg(Number(e.target.value))}
                  className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-red-600"
                />
              </div>

              {/* Neck */}
              <div>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-neutral-300 font-medium">Neck Circumference (at narrowest point)</span>
                  <span className="text-red-400 font-bold">
                    {neckCm} cm {unit === "imperial" && `(${cmToInches(neckCm)} in)`}
                  </span>
                </div>
                <input
                  type="range"
                  min="25"
                  max="60"
                  value={neckCm}
                  onChange={(e) => setNeckCm(Number(e.target.value))}
                  className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-red-600"
                />
              </div>

              {/* Waist */}
              <div>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-neutral-300 font-medium">Waist Circumference (at navel)</span>
                  <span className="text-red-400 font-bold">
                    {waistCm} cm {unit === "imperial" && `(${cmToInches(waistCm)} in)`}
                  </span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="150"
                  value={waistCm}
                  onChange={(e) => setWaistCm(Number(e.target.value))}
                  className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-red-600"
                />
              </div>

              {/* Hip (Females only) */}
              {gender === "female" && (
                <div>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-neutral-300 font-medium">Hip Circumference (at widest point)</span>
                    <span className="text-red-400 font-bold">
                      {hipCm} cm {unit === "imperial" && `(${cmToInches(hipCm)} in)`}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="60"
                    max="160"
                    value={hipCm}
                    onChange={(e) => setHipCm(Number(e.target.value))}
                    className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-red-600"
                  />
                </div>
              )}
            </div>

            {/* Instructions helper */}
            <div className="mt-6 p-4 rounded-xl bg-neutral-950/70 border border-neutral-800/80 text-xs text-neutral-400 flex items-start gap-3">
              <span className="text-red-500 text-lg">💡</span>
              <p>
                <strong>Measurement Tip:</strong> Keep the measuring tape snug against your skin without compressing soft tissue. Measure waist horizontally at navel level while exhaling naturally.
              </p>
            </div>
          </div>

          {/* Results & Composition Column */}
          <div className="lg:col-span-6 space-y-6">
            {/* Primary Body Fat Result Card */}
            <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between mb-4">
                <span className="text-xs uppercase font-bold text-neutral-400 tracking-wider">Estimated Body Fat</span>
                {currentCategory && (
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${currentCategory.bgBadge} ${currentCategory.textColor}`}>
                    {currentCategory.label}
                  </span>
                )}
              </div>

              <div className="flex items-baseline gap-3">
                <span className="text-5xl sm:text-6xl font-black text-white tracking-tight">
                  {bodyFat !== null ? `${bodyFat}%` : "--"}
                </span>
                <span className="text-neutral-400 text-sm">US Navy Protocol</span>
              </div>

              {/* Visual Body Fat Meter Bar */}
              <div className="mt-6 space-y-2">
                <div className="h-3 w-full bg-neutral-800 rounded-full overflow-hidden flex">
                  {categories.map((cat, idx) => (
                    <div
                      key={idx}
                      style={{
                        width: `${((cat.max - cat.min) / (gender === "male" ? 45 : 50)) * 100}%`,
                        backgroundColor: cat.color,
                        opacity: currentCategory?.label === cat.label ? 1 : 0.35,
                      }}
                      title={`${cat.label}: ${cat.min}-${cat.max}%`}
                      className="h-full transition-opacity duration-300"
                    />
                  ))}
                </div>
                <div className="flex justify-between text-[10px] uppercase font-semibold text-neutral-500">
                  <span>{gender === "male" ? "2% Essential" : "10% Essential"}</span>
                  <span>Athletic</span>
                  <span>Fitness</span>
                  <span>{gender === "male" ? "25%+ High" : "32%+ High"}</span>
                </div>
              </div>

              {currentCategory && (
                <p className="mt-4 text-xs text-neutral-300 bg-neutral-950/60 p-3 rounded-lg border border-neutral-800/80">
                  {currentCategory.description}
                </p>
              )}

              {/* Mass Breakdown (Lean vs Fat) */}
              <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-neutral-800">
                <div className="bg-neutral-950/80 p-4 rounded-xl border border-neutral-800">
                  <div className="text-xs text-neutral-400 font-medium uppercase">Lean Muscle Mass</div>
                  <div className="text-2xl font-black text-emerald-400 mt-1">
                    {leanMass} <span className="text-xs text-neutral-400 font-normal">kg ({kgToLbs(leanMass)} lbs)</span>
                  </div>
                  <div className="text-[11px] text-neutral-500 mt-1">
                    {bodyFat ? (100 - bodyFat).toFixed(1) : "--"}% of total weight
                  </div>
                </div>

                <div className="bg-neutral-950/80 p-4 rounded-xl border border-neutral-800">
                  <div className="text-xs text-neutral-400 font-medium uppercase">Total Fat Mass</div>
                  <div className="text-2xl font-black text-amber-400 mt-1">
                    {fatMass} <span className="text-xs text-neutral-400 font-normal">kg ({kgToLbs(fatMass)} lbs)</span>
                  </div>
                  <div className="text-[11px] text-neutral-500 mt-1">
                    {bodyFat ?? "--"}% of total weight
                  </div>
                </div>
              </div>
            </div>

            {/* Target Recomposition Goal Planner */}
            <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-xl">
              <h3 className="text-lg font-bold uppercase tracking-wide text-white mb-2 flex items-center gap-2">
                <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Goal Recomposition Roadmap
              </h3>
              <p className="text-xs text-neutral-400 mb-6">
                Set your desired target body fat % to calculate exact weight goal and time needed while preserving maximum muscle.
              </p>

              {/* Target Slider */}
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-neutral-300 font-medium">Target Body Fat</span>
                  <span className="text-emerald-400 font-bold">{targetBf}%</span>
                </div>
                <input
                  type="range"
                  min={gender === "male" ? "6" : "14"}
                  max={gender === "male" ? "25" : "32"}
                  value={targetBf}
                  onChange={(e) => setTargetBf(Number(e.target.value))}
                  className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>

              {bodyFat && targetWeight && fatToLose > 0 ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800 text-center">
                      <div className="text-[10px] uppercase text-neutral-400">Target Weight</div>
                      <div className="text-lg font-bold text-white mt-1">{targetWeight} kg</div>
                    </div>
                    <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800 text-center">
                      <div className="text-[10px] uppercase text-neutral-400">Pure Fat Loss</div>
                      <div className="text-lg font-bold text-red-400 mt-1">-{fatToLose} kg</div>
                    </div>
                    <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800 text-center">
                      <div className="text-[10px] uppercase text-neutral-400">Timeline (~0.5kg/wk)</div>
                      <div className="text-lg font-bold text-emerald-400 mt-1">{estimatedWeeks} Wks</div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/20 text-xs text-neutral-300 space-y-1.5">
                    <div className="font-bold text-red-400 flex items-center gap-1.5">
                      <span>🎯</span> Actionable Training & Calorie Strategy:
                    </div>
                    <p>
                      Maintain daily protein at <strong>{(weightKg * 2).toFixed(0)}g (2.0g/kg)</strong> with a conservative ~400 kcal deficit. Pair with heavy compound lifts 3-4x weekly to protect all <strong>{leanMass} kg</strong> of lean tissue.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-neutral-400 text-center">
                  {bodyFat && targetBf >= bodyFat
                    ? `You are currently at or below ${targetBf}%. Consider a Lean Bulk or Hypertrophy phase to build new muscle.`
                    : "Adjust measurements above to view your personalized recomposition plan."}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
