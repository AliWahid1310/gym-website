"use client";

import { useState, useId } from "react";
import {
  Calendar,
  TrendingUp,
  Target,
  Clock,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Zap,
  Flame,
  Award
} from "lucide-react";

export default function FitnessGoalTimeline() {
  const currentWeightInputId = useId();
  const targetWeightInputId = useId();
  const [currentWeight, setCurrentWeight] = useState<number>(85);
  const [targetWeight, setTargetWeight] = useState<number>(75);
  const [unit, setUnit] = useState<"kg" | "lbs">("kg");
  const [pace, setPace] = useState<"conservative" | "optimal" | "aggressive">("optimal");

  const weightDiff = Math.abs(currentWeight - targetWeight);
  const isLosing = currentWeight >= targetWeight;

  // Rate per week in kg
  let weeklyRateKg = 0.5; // Optimal
  if (pace === "conservative") weeklyRateKg = 0.3;
  if (pace === "aggressive") weeklyRateKg = 0.8;

  const effectiveDiffKg = unit === "kg" ? weightDiff : weightDiff * 0.453592;
  const estimatedWeeks = Math.max(2, Math.ceil(effectiveDiffKg / weeklyRateKg));

  // Calculate target date from current date (2026 local time)
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + estimatedWeeks * 7);
  const formattedTargetDate = targetDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  // Daily calorie adjustment
  // 1kg fat ~= 7700 kcal
  const dailyCalorieDelta = Math.round((weeklyRateKg * 7700) / 7);

  return (
    <section id="goal-timeline" className="py-20 bg-[#0d0d0d] text-white relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Calendar className="w-3.5 h-3.5 text-red-500" />
            Transformation Milestone Projector
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Realistic <span className="text-gradient">Fitness Goal Timeline</span>
          </h2>
          <p className="mt-4 text-gray-400 text-sm sm:text-base">
            No crash diets or false promises. Calculate the scientifically proven timeline to achieve your target physique safely while preserving lean muscle mass.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Inputs */}
          <div className="lg:col-span-6 bg-[#141414] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                <Target className="w-4 h-4 text-red-500" />
                Your Physical Parameters
              </h3>

              {/* Unit Toggle */}
              <div className="flex bg-black/50 p-1 rounded-lg border border-white/10 text-xs">
                <button
                  type="button"
                  onClick={() => {
                    if (unit === "lbs") {
                      setCurrentWeight(Math.round(currentWeight * 0.453592));
                      setTargetWeight(Math.round(targetWeight * 0.453592));
                    }
                    setUnit("kg");
                  }}
                  className={`px-3 py-1 rounded transition-all font-bold ${
                    unit === "kg" ? "bg-red-600 text-white" : "text-gray-400 hover:text-white"
                  }`}
                >
                  KG
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (unit === "kg") {
                      setCurrentWeight(Math.round(currentWeight * 2.20462));
                      setTargetWeight(Math.round(targetWeight * 2.20462));
                    }
                    setUnit("lbs");
                  }}
                  className={`px-3 py-1 rounded transition-all font-bold ${
                    unit === "lbs" ? "bg-red-600 text-white" : "text-gray-400 hover:text-white"
                  }`}
                >
                  LBS
                </button>
              </div>
            </div>

            {/* Current Weight Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor={currentWeightInputId} className="text-sm font-semibold text-gray-300">Starting Body Weight</label>
                <span className="text-xl font-bold text-white">
                  {currentWeight} <span className="text-xs text-gray-400 font-normal">{unit}</span>
                </span>
              </div>
              <input
                id={currentWeightInputId}
                type="range"
                min={unit === "kg" ? 45 : 100}
                max={unit === "kg" ? 150 : 330}
                value={currentWeight}
                onChange={(e) => setCurrentWeight(Number(e.target.value))}
                className="w-full accent-red-600 h-2 bg-gray-800 rounded-lg cursor-pointer"
              />
            </div>

            {/* Target Weight Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor={targetWeightInputId} className="text-sm font-semibold text-gray-300">Goal Target Body Weight</label>
                <span className="text-xl font-bold text-red-500">
                  {targetWeight} <span className="text-xs text-gray-400 font-normal">{unit}</span>
                </span>
              </div>
              <input
                id={targetWeightInputId}
                type="range"
                min={unit === "kg" ? 45 : 100}
                max={unit === "kg" ? 150 : 330}
                value={targetWeight}
                onChange={(e) => setTargetWeight(Number(e.target.value))}
                className="w-full accent-red-600 h-2 bg-gray-800 rounded-lg cursor-pointer"
              />
            </div>

            {/* Progression Pace */}
            <div>
              <label className="text-sm font-semibold text-gray-300 flex items-center gap-2 mb-2.5">
                <Zap className="w-4 h-4 text-yellow-500" />
                Progression Pace & Strategy
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                <button
                  type="button"
                  onClick={() => setPace("conservative")}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    pace === "conservative"
                      ? "bg-red-950/40 border-red-500 text-white shadow"
                      : "bg-black/30 border-white/5 text-gray-400 hover:border-white/20"
                  }`}
                >
                  <p className="font-bold text-xs sm:text-sm text-white">Sustainable</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">~0.3kg / wk (Easy)</p>
                </button>

                <button
                  type="button"
                  onClick={() => setPace("optimal")}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    pace === "optimal"
                      ? "bg-red-950/40 border-red-500 text-white shadow"
                      : "bg-black/30 border-white/5 text-gray-400 hover:border-white/20"
                  }`}
                >
                  <p className="font-bold text-xs sm:text-sm text-white flex items-center gap-1">
                    Optimal <Sparkles className="w-3 h-3 text-red-400" />
                  </p>
                  <p className="text-[10px] text-gray-400 mt-0.5">~0.5kg / wk (Gold std)</p>
                </button>

                <button
                  type="button"
                  onClick={() => setPace("aggressive")}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    pace === "aggressive"
                      ? "bg-red-950/40 border-red-500 text-white shadow"
                      : "bg-black/30 border-white/5 text-gray-400 hover:border-white/20"
                  }`}
                >
                  <p className="font-bold text-xs sm:text-sm text-red-400">Aggressive 🔥</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">~0.8kg / wk (Strict)</p>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Timeline Roadmap Output */}
          <div className="lg:col-span-6 space-y-6">
            {/* Big Output Banner */}
            <div className="bg-gradient-to-br from-[#1c090c] via-[#141414] to-[#0f0f0f] border border-red-500/40 rounded-2xl p-6 sm:p-8 shadow-2xl">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-red-400">
                  Target Projection
                </span>
                <span className="inline-flex items-center gap-1 text-xs bg-emerald-500/20 text-emerald-400 px-2.5 py-0.5 rounded-full font-bold">
                  {isLosing ? `-${weightDiff} ${unit} Fat Loss` : `+${weightDiff} ${unit} Muscle Gain`}
                </span>
              </div>

              <div className="my-6 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-400">Estimated Timeline</p>
                  <p className="text-4xl sm:text-5xl font-extrabold text-white mt-1 font-heading">
                    {estimatedWeeks} <span className="text-xl text-red-500 font-sans">Weeks</span>
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-400">Projected Achievement Date</p>
                  <p className="text-2xl sm:text-3xl font-extrabold text-white mt-1 font-heading">
                    {formattedTargetDate}
                  </p>
                </div>
              </div>

              <div className="bg-black/50 border border-white/5 rounded-xl p-3.5 text-xs text-gray-300 flex items-center justify-between">
                <span>Daily Caloric {isLosing ? "Deficit" : "Surplus"} Target:</span>
                <strong className="text-red-400 font-mono text-sm">
                  {isLosing ? `-${dailyCalorieDelta}` : `+${dailyCalorieDelta}`} kcal/day
                </strong>
              </div>
            </div>

            {/* 4-Phase Transformation Roadmap */}
            <div className="bg-[#121212] border border-white/10 rounded-2xl p-6 space-y-4">
              <h4 className="font-bold text-sm text-white uppercase tracking-wider flex items-center gap-2">
                <Award className="w-4 h-4 text-yellow-500" />
                Phased Milestone Roadmap
              </h4>

              <div className="space-y-3 relative border-l-2 border-red-500/40 ml-3 pl-5 text-xs">
                {/* Phase 1 */}
                <div className="relative">
                  <span className="absolute -left-[27px] top-0 w-3.5 h-3.5 rounded-full bg-red-600 border-2 border-black" />
                  <p className="font-bold text-white">Phase 1 (Weeks 1-4): Neuromuscular Priming</p>
                  <p className="text-gray-400 mt-0.5">
                    Glycogen depletion, early water-weight normalization, and movement motor-pattern mastery.
                  </p>
                </div>

                {/* Phase 2 */}
                <div className="relative">
                  <span className="absolute -left-[27px] top-0 w-3.5 h-3.5 rounded-full bg-red-600 border-2 border-black" />
                  <p className="font-bold text-white">Phase 2 (Weeks 5-8): Core Visual Recomposition</p>
                  <p className="text-gray-400 mt-0.5">
                    Subcutaneous fat mobilization, visible vascularity improvements, and metabolic rate elevation.
                  </p>
                </div>

                {/* Phase 3 */}
                <div className="relative">
                  <span className="absolute -left-[27px] top-0 w-3.5 h-3.5 rounded-full bg-red-600 border-2 border-black" />
                  <p className="font-bold text-white">Phase 3 (Weeks 9-12): Peak Density & Strength Benchmark</p>
                  <p className="text-gray-400 mt-0.5">
                    Compound 1RM strength preservation, muscle separation, and waistline tapering.
                  </p>
                </div>

                {/* Phase 4 */}
                <div className="relative">
                  <span className="absolute -left-[27px] top-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-black" />
                  <p className="font-bold text-emerald-400">Phase 4 (Final Stretch): Goal Lock-in & Maintenance</p>
                  <p className="text-gray-400 mt-0.5">
                    Sustainable reverse dieting to lifestyle maintenance calories without rebound fat storage.
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <a
                href="#lead-form"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all shadow-lg shadow-red-900/30 mt-2"
              >
                Execute This Plan with a Power Fitness Coach
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
