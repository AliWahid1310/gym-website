"use client";

import { useState } from "react";

type LiftType = "bench" | "squat" | "deadlift" | "overhead";

export default function OneRepMaxCalculator() {
  const [lift, setLift] = useState<LiftType>("bench");
  const [weight, setWeight] = useState<number>(80);
  const [reps, setReps] = useState<number>(5);
  const [unit, setUnit] = useState<"kg" | "lbs">("kg");

  // Epley Formula & Brzycki Formula average
  const calculate1RM = (): number => {
    if (reps === 1) return weight;
    const epley = weight * (1 + reps / 30);
    const brzycki = weight * (36 / (37 - reps));
    return Math.round((epley + brzycki) / 2);
  };

  const oneRepMax = calculate1RM();

  const percentages = [
    { percent: 100, reps: 1, label: "Max Effort (1RM)" },
    { percent: 95, reps: 2, label: "Peak Power" },
    { percent: 90, reps: 3, label: "Heavy Strength" },
    { percent: 85, reps: 5, label: "Strength / Power" },
    { percent: 80, reps: 8, label: "Hypertrophy Sweetspot" },
    { percent: 75, reps: 10, label: "Volume & Pump" },
    { percent: 70, reps: 12, label: "Muscular Endurance" },
    { percent: 65, reps: 15, label: "Conditioning" },
  ];

  const getLiftName = () => {
    switch (lift) {
      case "bench":
        return "Barbell Bench Press";
      case "squat":
        return "Barbell Back Squat";
      case "deadlift":
        return "Conventional Deadlift";
      case "overhead":
        return "Standing Overhead Press";
    }
  };

  return (
    <section id="one-rep-max" className="py-20 bg-[#0B0B0B] text-white relative overflow-hidden border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-red-950/80 text-red-400 border border-red-800/50 mb-4">
            Strength Standards & 1RM
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            1-Rep Max <span className="text-red-500">(1RM) Calculator</span>
          </h2>
          <p className="mt-4 text-neutral-400 text-base sm:text-lg">
            Predict your maximum compound lift capacity and discover your exact training percentages for progressive overload.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Box */}
          <div className="lg:col-span-5 bg-neutral-900/90 border border-neutral-800 p-6 sm:p-8 rounded-3xl shadow-2xl space-y-6">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2.5">
                Select Compound Lift
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { id: "bench", label: "🏋️ Bench Press" },
                  { id: "squat", label: "🦵 Back Squat" },
                  { id: "deadlift", label: "⚡ Deadlift" },
                  { id: "overhead", label: "💥 Overhead Press" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setLift(item.id as LiftType)}
                    className={`py-3 px-3 rounded-xl font-bold text-xs sm:text-sm text-left transition-all border ${
                      lift === item.id
                        ? "bg-red-600 border-red-500 text-white shadow-lg shadow-red-600/30"
                        : "bg-neutral-800/60 border-neutral-700 text-neutral-300 hover:bg-neutral-800"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Weight Input */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  Weight Lifted
                </label>
                <div className="flex items-center gap-1 bg-neutral-800 p-1 rounded-lg">
                  <button
                    onClick={() => setUnit("kg")}
                    className={`px-2 py-0.5 text-xs font-bold rounded ${
                      unit === "kg" ? "bg-red-600 text-white" : "text-neutral-400"
                    }`}
                  >
                    KG
                  </button>
                  <button
                    onClick={() => setUnit("lbs")}
                    className={`px-2 py-0.5 text-xs font-bold rounded ${
                      unit === "lbs" ? "bg-red-600 text-white" : "text-neutral-400"
                    }`}
                  >
                    LBS
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min={20}
                  max={250}
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  className="flex-1 accent-red-600 cursor-pointer bg-neutral-700 h-2 rounded-lg"
                />
                <span className="font-mono font-bold text-xl text-white w-20 text-right">
                  {weight} <span className="text-xs text-red-400">{unit}</span>
                </span>
              </div>
            </div>

            {/* Repetitions Input */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  Reps Completed
                </label>
                <span className="font-mono font-bold text-red-400 text-sm">{reps} reps</span>
              </div>
              <input
                type="range"
                min={1}
                max={15}
                value={reps}
                onChange={(e) => setReps(Number(e.target.value))}
                className="w-full accent-red-600 cursor-pointer bg-neutral-700 h-2 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-neutral-500 mt-1 font-mono">
                <span>1 rep (Max)</span>
                <span>5 reps (Strength)</span>
                <span>10 reps (Hypertrophy)</span>
                <span>15 reps</span>
              </div>
            </div>

            {/* Estimated 1RM Highlight Box */}
            <div className="bg-gradient-to-br from-red-950 via-neutral-950 to-neutral-950 border border-red-800/60 rounded-2xl p-5 text-center">
              <span className="text-[11px] uppercase tracking-widest text-neutral-400 block font-semibold">
                Estimated One-Rep Max
              </span>
              <div className="text-4xl sm:text-5xl font-black text-white my-1 font-mono">
                {oneRepMax} <span className="text-lg text-red-500 font-sans">{unit}</span>
              </div>
              <p className="text-xs text-neutral-400">
                Calculated for <strong className="text-neutral-200">{getLiftName()}</strong>
              </p>
            </div>
          </div>

          {/* Training Percentages Table */}
          <div className="lg:col-span-7 bg-neutral-900/90 border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800 mb-4">
              <h3 className="font-bold text-base sm:text-lg text-white">
                Progressive Overload Percentage Grid
              </h3>
              <span className="text-xs text-red-400 font-mono">1RM: {oneRepMax} {unit}</span>
            </div>

            <div className="space-y-2.5">
              {percentages.map((p, idx) => {
                const targetWeight = Math.round((oneRepMax * p.percent) / 100);
                return (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-xl bg-neutral-950/70 border border-neutral-800/60 text-xs sm:text-sm hover:border-red-600/40 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-12 font-mono font-bold text-red-400">{p.percent}%</span>
                      <div>
                        <span className="font-semibold text-white block">{p.label}</span>
                        <span className="text-[11px] text-neutral-400">~{p.reps} Reps Capacity</span>
                      </div>
                    </div>
                    <span className="font-mono font-black text-base text-white">
                      {targetWeight} <span className="text-xs text-neutral-400 font-sans">{unit}</span>
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-neutral-400">
                Need a spotter for your next PR attempt?
              </span>
              <a
                href="#contact"
                className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-red-600/30 transition-all"
              >
                Book a Strength Coach
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
