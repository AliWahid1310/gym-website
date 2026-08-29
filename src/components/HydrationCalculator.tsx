"use client";

import { useState } from "react";
import { Droplets, CheckCircle2, AlertCircle, Sparkles, Clock, RotateCcw, Share2, Check } from "lucide-react";

type SweatRate = "light" | "moderate" | "heavy";
type Environment = "ac_gym" | "outdoor_summer" | "indoor_standard";

export default function HydrationCalculator() {
  const [weightKg, setWeightKg] = useState<number>(75);
  const [workoutMins, setWorkoutMins] = useState<number>(60);
  const [sweatRate, setSweatRate] = useState<SweatRate>("moderate");
  const [environment, setEnvironment] = useState<Environment>("ac_gym");
  const [glassesConsumed, setGlassesConsumed] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);

  // Baseline: 35ml per kg of bodyweight
  const baseWaterLiters = (weightKg * 35) / 1000;

  // Workout multiplier:
  const sweatMultiplier = {
    light: 0.5,
    moderate: 0.8,
    heavy: 1.2,
  }[sweatRate];

  // Environment multiplier:
  const envMultiplier = {
    ac_gym: 1.0,
    indoor_standard: 1.1,
    outdoor_summer: 1.35,
  }[environment];

  const exerciseWaterLiters = (workoutMins / 60) * sweatMultiplier * envMultiplier;
  const totalLiters = parseFloat((baseWaterLiters + exerciseWaterLiters).toFixed(2));
  const glassSizeMl = 250;
  const totalGlasses = Math.ceil((totalLiters * 1000) / glassSizeMl);

  // Electrolyte calculations
  const sodiumMg = Math.round(500 + (workoutMins / 60) * (sweatRate === "heavy" ? 800 : sweatRate === "moderate" ? 500 : 300));
  const potassiumMg = Math.round(300 + (workoutMins / 60) * 200);
  const magnesiumMg = Math.round(150 + (workoutMins / 60) * 80);

  const hydrationProgressPercent = Math.min(100, Math.round((glassesConsumed / totalGlasses) * 100));

  const toggleGlass = (index: number) => {
    if (glassesConsumed === index + 1) {
      setGlassesConsumed(index);
    } else {
      setGlassesConsumed(index + 1);
    }
  };

  const handleCopy = () => {
    const summary = `💧 Power Fitness Zone Hydration Target:
• Daily Target: ${totalLiters} L (${totalGlasses} glasses)
• Baseline: ${baseWaterLiters.toFixed(1)} L | Workout Boost: ${exerciseWaterLiters.toFixed(1)} L
• Electrolytes: ${sodiumMg}mg Sodium, ${potassiumMg}mg Potassium, ${magnesiumMg}mg Magnesium
• Gym: Power Fitness Zone Islamabad`;
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="hydration-calculator" className="py-20 bg-[#0c0c0c] text-white relative overflow-hidden border-t border-neutral-800">
      {/* Subtle background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-cyan-950/80 text-cyan-400 border border-cyan-800/50 mb-4">
            <Droplets className="w-3.5 h-3.5" />
            Performance & Recovery
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            Athlete <span className="text-cyan-400">Hydration & Electrolyte</span> Target
          </h2>
          <p className="mt-4 text-neutral-400 text-base sm:text-lg">
            Even a 2% drop in hydration reduces muscular power and workout stamina by 15%. Calculate your exact fluid and mineral needs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Form */}
          <div className="lg:col-span-6 bg-neutral-900/90 border border-neutral-800 p-6 sm:p-8 rounded-3xl shadow-2xl space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  Body Weight (kg)
                </label>
                <span className="text-lg font-bold text-cyan-400">{weightKg} kg</span>
              </div>
              <input
                type="range"
                min={40}
                max={140}
                value={weightKg}
                onChange={(e) => setWeightKg(Number(e.target.value))}
                className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <div className="flex justify-between text-[11px] text-neutral-500 mt-1">
                <span>40 kg</span>
                <span>90 kg</span>
                <span>140 kg</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  Workout Duration (Minutes)
                </label>
                <span className="text-lg font-bold text-cyan-400">{workoutMins} mins</span>
              </div>
              <input
                type="range"
                min={0}
                max={180}
                step={15}
                value={workoutMins}
                onChange={(e) => setWorkoutMins(Number(e.target.value))}
                className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <div className="flex justify-between text-[11px] text-neutral-500 mt-1">
                <span>Rest Day (0m)</span>
                <span>60 mins</span>
                <span>3 Hours (180m)</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2.5">
                Sweat Rate & Intensity
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "light", label: "Light", desc: "Low sweat / Yoga" },
                  { id: "moderate", label: "Moderate", desc: "Standard lifting" },
                  { id: "heavy", label: "Heavy", desc: "Intense HIIT / Cardio" },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSweatRate(s.id as SweatRate)}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      sweatRate === s.id
                        ? "bg-cyan-950/60 border-cyan-500 text-white shadow-lg shadow-cyan-950/30"
                        : "bg-neutral-800/40 border-neutral-800 text-neutral-400 hover:bg-neutral-800"
                    }`}
                  >
                    <div className="text-xs font-bold text-white">{s.label}</div>
                    <div className="text-[10px] text-neutral-400 mt-0.5">{s.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2.5">
                Training Environment
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "ac_gym", label: "AC Gym", desc: "Climate Controlled" },
                  { id: "indoor_standard", label: "Standard", desc: "Normal Ambient" },
                  { id: "outdoor_summer", label: "Hot Weather", desc: "Islamabad Summer" },
                ].map((e) => (
                  <button
                    key={e.id}
                    onClick={() => setEnvironment(e.id as Environment)}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      environment === e.id
                        ? "bg-cyan-950/60 border-cyan-500 text-white shadow-lg shadow-cyan-950/30"
                        : "bg-neutral-800/40 border-neutral-800 text-neutral-400 hover:bg-neutral-800"
                    }`}
                  >
                    <div className="text-xs font-bold text-white">{e.label}</div>
                    <div className="text-[10px] text-neutral-400 mt-0.5">{e.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results & Tracker Box */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-gradient-to-br from-neutral-900 via-neutral-900 to-cyan-950/30 border border-cyan-900/40 p-6 sm:p-8 rounded-3xl shadow-2xl relative overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Total Daily Target</span>
                  <div className="text-4xl sm:text-5xl font-black text-white mt-1">
                    {totalLiters} <span className="text-xl font-medium text-neutral-400">Liters / Day</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">Glass Count</span>
                  <div className="text-2xl font-bold text-cyan-300">
                    {totalGlasses} <span className="text-sm font-normal text-neutral-400">(250ml each)</span>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between text-xs font-semibold text-neutral-300 mb-2">
                  <span>Logged Today: {glassesConsumed} of {totalGlasses} glasses ({glassesConsumed * 250} ml)</span>
                  <span className="text-cyan-400 font-bold">{hydrationProgressPercent}%</span>
                </div>
                <div className="w-full h-3 bg-neutral-800 rounded-full overflow-hidden p-0.5 border border-neutral-700">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-300"
                    style={{ width: `${hydrationProgressPercent}%` }}
                  />
                </div>
              </div>

              {/* Interactive Glasses Logger */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                    Click Glasses to Log Water:
                  </span>
                  {glassesConsumed > 0 && (
                    <button
                      onClick={() => setGlassesConsumed(0)}
                      className="text-xs text-neutral-400 hover:text-red-400 flex items-center gap-1 transition-colors"
                    >
                      <RotateCcw className="w-3 h-3" /> Reset
                    </button>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 max-h-36 overflow-y-auto pr-1">
                  {Array.from({ length: totalGlasses }).map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => toggleGlass(idx)}
                      title={`Glass #${idx + 1} (250ml)`}
                      className={`w-9 h-11 rounded-xl border flex flex-col items-center justify-center transition-all ${
                        idx < glassesConsumed
                          ? "bg-cyan-500 border-cyan-400 text-neutral-950 font-bold shadow-md shadow-cyan-500/20 scale-105"
                          : "bg-neutral-800/80 border-neutral-700 text-neutral-500 hover:border-cyan-500/60"
                      }`}
                    >
                      <Droplets className={`w-3.5 h-3.5 ${idx < glassesConsumed ? "fill-neutral-950" : ""}`} />
                      <span className="text-[10px] font-bold mt-0.5">{idx + 1}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Electrolyte Recommendation Cards */}
              <div className="grid grid-cols-3 gap-2.5 mt-6 pt-6 border-t border-neutral-800">
                <div className="bg-neutral-800/60 p-3 rounded-2xl border border-neutral-700/60 text-center">
                  <span className="text-[10px] font-bold uppercase text-neutral-400">Sodium (Na+)</span>
                  <div className="text-base sm:text-lg font-black text-amber-400 mt-0.5">{sodiumMg} mg</div>
                  <span className="text-[9px] text-neutral-500 block mt-0.5">Electrolyte Salt</span>
                </div>
                <div className="bg-neutral-800/60 p-3 rounded-2xl border border-neutral-700/60 text-center">
                  <span className="text-[10px] font-bold uppercase text-neutral-400">Potassium (K+)</span>
                  <div className="text-base sm:text-lg font-black text-emerald-400 mt-0.5">{potassiumMg} mg</div>
                  <span className="text-[9px] text-neutral-500 block mt-0.5">Banana / Coconut</span>
                </div>
                <div className="bg-neutral-800/60 p-3 rounded-2xl border border-neutral-700/60 text-center">
                  <span className="text-[10px] font-bold uppercase text-neutral-400">Magnesium (Mg)</span>
                  <div className="text-base sm:text-lg font-black text-purple-400 mt-0.5">{magnesiumMg} mg</div>
                  <span className="text-[9px] text-neutral-500 block mt-0.5">Anti-Cramp Support</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6 flex gap-3">
                <button
                  onClick={handleCopy}
                  className="w-full py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider bg-cyan-500 hover:bg-cyan-400 text-neutral-950 flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-500/20"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
                  {copied ? "Target Copied to Clipboard!" : "Share / Save Target"}
                </button>
              </div>
            </div>

            {/* Pro Hydration Timing Protocol */}
            <div className="bg-neutral-900/60 border border-neutral-800 p-5 rounded-2xl">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-wider mb-3">
                <Clock className="w-4 h-4" />
                PFZ Athlete Hydration Protocol
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-neutral-300">
                <div className="bg-neutral-800/40 p-3 rounded-xl border border-neutral-800">
                  <span className="font-bold text-white block mb-1">⏱️ 2 Hours Pre-Workout</span>
                  Drink 500ml water with a pinch of Himalayan pink salt.
                </div>
                <div className="bg-neutral-800/40 p-3 rounded-xl border border-neutral-800">
                  <span className="font-bold text-white block mb-1">⚡ Intra-Workout</span>
                  Sip 150-200ml every 15-20 minutes between heavy sets.
                </div>
                <div className="bg-neutral-800/40 p-3 rounded-xl border border-neutral-800">
                  <span className="font-bold text-white block mb-1">🛡️ Post-Workout Recovery</span>
                  Rehydrate with 500ml water + electrolytes within 45 mins.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
