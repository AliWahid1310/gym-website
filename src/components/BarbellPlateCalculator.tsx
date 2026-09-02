"use client";

import { useState } from "react";
import { Disc3, RotateCcw, Dumbbell, Sparkles, CheckCircle2, ChevronRight, Info } from "lucide-react";

interface Plate {
  weight: number;
  color: string;
  borderColor: string;
  textColor: string;
  height: string; // visual relative height in px
  name: string;
}

const KG_PLATES: Plate[] = [
  { weight: 25, color: "bg-red-600", borderColor: "border-red-400", textColor: "text-white", height: "h-36", name: "25 kg (Red)" },
  { weight: 20, color: "bg-blue-600", borderColor: "border-blue-400", textColor: "text-white", height: "h-32", name: "20 kg (Blue)" },
  { weight: 15, color: "bg-yellow-500", borderColor: "border-yellow-300", textColor: "text-black", height: "h-28", name: "15 kg (Yellow)" },
  { weight: 10, color: "bg-emerald-600", borderColor: "border-emerald-400", textColor: "text-white", height: "h-24", name: "10 kg (Green)" },
  { weight: 5, color: "bg-neutral-100", borderColor: "border-neutral-300", textColor: "text-neutral-900", height: "h-20", name: "5 kg (White)" },
  { weight: 2.5, color: "bg-neutral-800", borderColor: "border-neutral-500", textColor: "text-white", height: "h-16", name: "2.5 kg (Black)" },
  { weight: 1.25, color: "bg-neutral-400", borderColor: "border-neutral-200", textColor: "text-black", height: "h-12", name: "1.25 kg (Silver)" },
  { weight: 0.5, color: "bg-amber-700", borderColor: "border-amber-500", textColor: "text-white", height: "h-10", name: "0.5 kg (Micro)" },
];

const LBS_PLATES: Plate[] = [
  { weight: 45, color: "bg-blue-600", borderColor: "border-blue-400", textColor: "text-white", height: "h-36", name: "45 lbs (Blue)" },
  { weight: 35, color: "bg-yellow-500", borderColor: "border-yellow-300", textColor: "text-black", height: "h-32", name: "35 lbs (Yellow)" },
  { weight: 25, color: "bg-emerald-600", borderColor: "border-emerald-400", textColor: "text-white", height: "h-28", name: "25 lbs (Green)" },
  { weight: 10, color: "bg-neutral-100", borderColor: "border-neutral-300", textColor: "text-neutral-900", height: "h-22", name: "10 lbs (White)" },
  { weight: 5, color: "bg-neutral-800", borderColor: "border-neutral-500", textColor: "text-white", height: "h-16", name: "5 lbs (Black)" },
  { weight: 2.5, color: "bg-neutral-400", borderColor: "border-neutral-200", textColor: "text-black", height: "h-12", name: "2.5 lbs (Silver)" },
];

export default function BarbellPlateCalculator() {
  const [unit, setUnit] = useState<"kg" | "lbs">("kg");
  const [targetWeight, setTargetWeight] = useState<number>(100);
  const [barWeight, setBarWeight] = useState<number>(20);
  const [collarWeight, setCollarWeight] = useState<number>(0); // e.g., 2 x 2.5kg competition collars if any
  const [useCollars, setUseCollars] = useState<boolean>(false);

  const availablePlates = unit === "kg" ? KG_PLATES : LBS_PLATES;

  // Calculate plates per side
  const calculatePlatesPerSide = () => {
    const collars = useCollars ? (unit === "kg" ? 5 : 10) : 0;
    const weightToDistribute = Math.max(0, targetWeight - barWeight - collars);
    const weightPerSide = weightToDistribute / 2;

    let remainder = weightPerSide;
    const loadedPlates: { plate: Plate; count: number }[] = [];

    availablePlates.forEach((plate) => {
      if (remainder >= plate.weight) {
        const count = Math.floor(remainder / plate.weight);
        if (count > 0) {
          loadedPlates.push({ plate, count });
          remainder = Number((remainder - count * plate.weight).toFixed(2));
        }
      }
    });

    const actualPerSide = loadedPlates.reduce((acc, curr) => acc + curr.plate.weight * curr.count, 0);
    const actualTotal = barWeight + collars + actualPerSide * 2;
    const difference = Number((targetWeight - actualTotal).toFixed(2));

    return {
      loadedPlates,
      weightPerSide,
      actualTotal,
      difference,
      collars,
    };
  };

  const { loadedPlates, weightPerSide, actualTotal, difference, collars } = calculatePlatesPerSide();

  // Warmup Progression Ramping sets
  const warmupSteps = [
    { label: "Empty Bar Warm-up", percent: 0, weight: barWeight, reps: "10-15 reps (Form & Velocity)" },
    { label: "Light Activation", percent: 50, weight: Math.round((targetWeight * 0.5) / 2.5) * 2.5, reps: "6-8 reps (Moderate)" },
    { label: "Potentiation Primer", percent: 70, weight: Math.round((targetWeight * 0.7) / 2.5) * 2.5, reps: "3-4 reps (Fast Intent)" },
    { label: "Heavy Acclimation", percent: 85, weight: Math.round((targetWeight * 0.85) / 2.5) * 2.5, reps: "1-2 reps (Pre-Target)" },
    { label: "Working Target Set", percent: 100, weight: targetWeight, reps: "Working Sets" },
  ];

  const handleQuickWeightAdd = (delta: number) => {
    setTargetWeight((prev) => Math.max(barWeight, prev + delta));
  };

  return (
    <section id="plate-calculator" className="py-20 bg-[#070707] text-white relative overflow-hidden border-t border-neutral-800">
      {/* Background glow accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-red-950/80 text-red-400 border border-red-800/50 mb-4">
            <Disc3 className="w-3.5 h-3.5 animate-spin text-red-500" />
            <span>Power Barbell Precision</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight uppercase">
            Olympic Barbell <span className="text-red-500">Plate Calculator</span>
          </h2>
          <p className="mt-3 text-neutral-400 text-sm sm:text-base">
            Never second-guess your barbell math again. Visualize exact Olympic bumper plate loading per side for your heavy squat, bench, and deadlift sets across Islamabad branches.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-5 bg-neutral-900/90 border border-neutral-800 p-6 sm:p-8 rounded-3xl shadow-2xl space-y-6">
            {/* Unit & Barbell Type Selector */}
            <div>
              <div className="flex justify-between items-center mb-2.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                  <Dumbbell className="w-3.5 h-3.5 text-red-500" /> Barbell Type
                </label>
                <div className="flex items-center gap-1 bg-neutral-800 p-1 rounded-lg">
                  <button
                    onClick={() => {
                      setUnit("kg");
                      if (unit === "lbs") {
                        setTargetWeight(100);
                        setBarWeight(20);
                      }
                    }}
                    className={`px-2.5 py-1 text-xs font-bold rounded transition-all ${
                      unit === "kg" ? "bg-red-600 text-white shadow" : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    KG
                  </button>
                  <button
                    onClick={() => {
                      setUnit("lbs");
                      if (unit === "kg") {
                        setTargetWeight(225);
                        setBarWeight(45);
                      }
                    }}
                    className={`px-2.5 py-1 text-xs font-bold rounded transition-all ${
                      unit === "lbs" ? "bg-red-600 text-white shadow" : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    LBS
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {[
                  { name: "Olympic 20kg", weight: unit === "kg" ? 20 : 45, desc: "Standard Men's Bar" },
                  { name: "Training 15kg", weight: unit === "kg" ? 15 : 35, desc: "Women's / Tech Bar" },
                  { name: "EZ Bar 10kg", weight: unit === "kg" ? 10 : 25, desc: "Arm & Curl Bar" },
                ].map((bar) => (
                  <button
                    key={bar.name}
                    onClick={() => setBarWeight(bar.weight)}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      barWeight === bar.weight
                        ? "bg-red-600/20 border-red-500 text-white shadow-lg shadow-red-600/20"
                        : "bg-neutral-800/40 border-neutral-700/60 text-neutral-300 hover:bg-neutral-800"
                    }`}
                  >
                    <div className="font-bold text-xs">{bar.name}</div>
                    <div className="text-[10px] text-neutral-400 mt-0.5">{bar.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Target Weight Slider & Quick Adjusters */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  Target Weight
                </label>
                <span className="font-mono font-black text-2xl text-red-500">
                  {targetWeight} <span className="text-xs text-neutral-400 font-sans">{unit}</span>
                </span>
              </div>

              <input
                type="range"
                min={barWeight}
                max={unit === "kg" ? 320 : 700}
                step={unit === "kg" ? 2.5 : 5}
                value={targetWeight}
                onChange={(e) => setTargetWeight(Number(e.target.value))}
                className="w-full accent-red-600 cursor-pointer bg-neutral-700 h-2.5 rounded-lg mb-3"
              />

              {/* Quick Stepper Buttons */}
              <div className="flex flex-wrap gap-2">
                {[-20, -10, -2.5, +2.5, +10, +20].map((step) => (
                  <button
                    key={step}
                    onClick={() => handleQuickWeightAdd(step)}
                    className="flex-1 py-1.5 px-2 bg-neutral-800/80 hover:bg-neutral-700 border border-neutral-700 text-xs font-mono font-bold rounded-lg transition-colors text-neutral-200"
                  >
                    {step > 0 ? `+${step}` : step} {unit}
                  </button>
                ))}
              </div>
            </div>

            {/* Competition Collars Toggle */}
            <div className="flex items-center justify-between p-3.5 bg-neutral-950/60 border border-neutral-800 rounded-2xl">
              <div>
                <span className="text-xs font-bold text-neutral-200 block">Competition Collar Clips</span>
                <span className="text-[11px] text-neutral-400">Include 2 × {unit === "kg" ? "2.5kg" : "5lbs"} calibrated steel collars</span>
              </div>
              <button
                onClick={() => setUseCollars(!useCollars)}
                className={`w-12 h-6 rounded-full transition-colors relative ${useCollars ? "bg-red-600" : "bg-neutral-700"}`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${
                    useCollars ? "right-1" : "left-1"
                  }`}
                />
              </button>
            </div>

            {/* Quick Summary Pill */}
            <div className="p-4 bg-gradient-to-r from-red-950/40 via-neutral-950 to-neutral-950 border border-red-900/40 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-neutral-400 block font-semibold">
                  Each Sleeve Load
                </span>
                <span className="text-2xl font-black font-mono text-white">
                  {weightPerSide.toFixed(1)} <span className="text-xs font-sans text-red-400">{unit} / side</span>
                </span>
              </div>
              {difference !== 0 && (
                <div className="text-right">
                  <span className="text-[10px] uppercase text-yellow-400 font-semibold block">Remainder</span>
                  <span className="text-xs font-mono text-yellow-400 font-bold">{difference} {unit} off</span>
                </div>
              )}
            </div>
          </div>

          {/* Visual Barbell & Breakdown Column */}
          <div className="lg:col-span-7 space-y-6">
            {/* Visual Barbell Loading Rack */}
            <div className="bg-neutral-900/90 border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
              <div className="flex items-center justify-between mb-6 pb-3 border-b border-neutral-800">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-red-500" />
                  <h3 className="font-bold text-sm sm:text-base uppercase tracking-wide text-white">
                    Visual Barbell Sleeve (One Side)
                  </h3>
                </div>
                <span className="text-xs font-mono text-neutral-400">Total Bar: {actualTotal} {unit}</span>
              </div>

              {/* Barbell Sleeve Graphic */}
              <div className="relative py-12 flex items-center justify-start bg-neutral-950/90 rounded-2xl border border-neutral-800/80 px-4 overflow-x-auto min-h-[220px]">
                {/* Barbell Center Collar Stop */}
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="w-5 h-28 bg-gradient-to-r from-neutral-600 via-neutral-400 to-neutral-600 rounded-sm border border-neutral-300 shadow-md" />
                  <span className="text-[9px] text-neutral-500 uppercase tracking-tighter mt-1">Collar</span>
                </div>

                {/* Bar Sleeve Shaft */}
                <div className="h-6 w-full absolute left-9 right-6 bg-gradient-to-b from-neutral-300 via-neutral-500 to-neutral-700 rounded z-0 opacity-80" />

                {/* Stack of Loaded Plates */}
                <div className="flex items-center gap-1.5 ml-3 z-10">
                  {loadedPlates.flatMap(({ plate, count }, groupIdx) =>
                    Array.from({ length: count }).map((_, plateIdx) => (
                      <div
                        key={`${groupIdx}-${plateIdx}`}
                        className={`flex flex-col items-center justify-center ${plate.color} ${plate.height} w-7 sm:w-8 rounded-md border-2 ${plate.borderColor} shadow-lg shadow-black/60 transition-all hover:scale-105 group relative cursor-pointer`}
                      >
                        <span className={`text-[10px] font-black font-mono transform -rotate-90 ${plate.textColor} select-none`}>
                          {plate.weight}
                        </span>
                        {/* Tooltip */}
                        <div className="absolute -top-8 bg-neutral-900 border border-neutral-700 px-2 py-0.5 rounded text-[10px] font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-20">
                          {plate.weight} {unit}
                        </div>
                      </div>
                    ))
                  )}

                  {/* If Collars enabled */}
                  {useCollars && (
                    <div className="h-10 w-5 bg-gradient-to-r from-red-600 to-red-800 border border-red-400 rounded flex items-center justify-center shadow-lg">
                      <span className="text-[8px] font-mono font-bold text-white transform -rotate-90">LOCK</span>
                    </div>
                  )}

                  {loadedPlates.length === 0 && (
                    <div className="text-neutral-500 text-xs font-mono pl-4 italic">
                      Empty Barbell ({barWeight} {unit})
                    </div>
                  )}
                </div>
              </div>

              {/* Exact Plate Inventory Breakdown List */}
              <div className="mt-6 pt-4 border-t border-neutral-800">
                <div className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3">
                  Required Plates Per Side:
                </div>
                {loadedPlates.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {loadedPlates.map(({ plate, count }) => (
                      <div
                        key={plate.name}
                        className="p-3 rounded-xl bg-neutral-950/70 border border-neutral-800 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <div className={`w-3.5 h-3.5 rounded-full ${plate.color} border ${plate.borderColor}`} />
                          <span className="text-xs font-bold text-white">{plate.weight} {unit}</span>
                        </div>
                        <span className="font-mono font-black text-sm text-red-400">× {count}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-neutral-400">No plates required. Lift the bare Olympic barbell.</p>
                )}
              </div>
            </div>

            {/* Warm-up Ramping Protocol */}
            <div className="bg-neutral-900/90 border border-neutral-800 rounded-3xl p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-sm uppercase tracking-wider text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  Recommended Warm-Up Ramping Progression
                </h4>
                <span className="text-xs text-neutral-400">CNS Primer</span>
              </div>

              <div className="space-y-2">
                {warmupSteps.map((step, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center justify-between p-2.5 rounded-xl border text-xs ${
                      step.percent === 100
                        ? "bg-red-950/40 border-red-600/50 font-bold text-white"
                        : "bg-neutral-950/50 border-neutral-800/80 text-neutral-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-8 font-mono text-[11px] ${step.percent === 100 ? "text-red-400 font-bold" : "text-neutral-500"}`}>
                        {step.percent}%
                      </span>
                      <span className="text-neutral-200">{step.label}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-neutral-400 text-[11px] hidden sm:inline">{step.reps}</span>
                      <span className="font-mono font-bold text-white">{step.weight} {unit}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
