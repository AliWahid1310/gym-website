"use client";

import { useState, useId } from "react";
import {
  Flame,
  Clock,
  Dumbbell,
  Activity,
  Heart,
  Droplets,
  Apple,
  Sparkles,
  Zap,
  CheckCircle2,
  ChevronRight
} from "lucide-react";

interface WorkoutActivity {
  id: string;
  name: string;
  category: "strength" | "cardio" | "hiit" | "combat";
  metModerate: number;
  metHigh: number;
  metBeast: number;
  iconName: string;
  tagline: string;
  targetMuscles: string[];
}

const ACTIVITIES: WorkoutActivity[] = [
  {
    id: "heavy-compounds",
    name: "Heavy Compound Lifting",
    category: "strength",
    metModerate: 5.0,
    metHigh: 6.5,
    metBeast: 8.0,
    iconName: "Dumbbell",
    tagline: "Squats, Deadlifts, Bench Press & Overhead Presses",
    targetMuscles: ["Quads", "Hamstrings", "Glutes", "Chest", "Back"],
  },
  {
    id: "crossfit-wod",
    name: "CrossFit & Functional WOD",
    category: "hiit",
    metModerate: 7.5,
    metHigh: 9.5,
    metBeast: 12.0,
    iconName: "Zap",
    tagline: "Kettlebell swings, burpees, thrusters & box jumps",
    targetMuscles: ["Full Body", "Core", "Shoulders", "Cardio Engine"],
  },
  {
    id: "boxing-sparring",
    name: "Boxing & Kickboxing Sparring",
    category: "combat",
    metModerate: 7.0,
    metHigh: 9.0,
    metBeast: 11.5,
    iconName: "Activity",
    tagline: "Heavy bag rounds, mitt work & footwork drills",
    targetMuscles: ["Shoulders", "Rotational Core", "Calves", "Lats"],
  },
  {
    id: "hiit-circuit",
    name: "HIIT & Tabata Conditioning",
    category: "hiit",
    metModerate: 8.0,
    metHigh: 10.0,
    metBeast: 13.0,
    iconName: "Flame",
    tagline: "High-intensity intervals with minimal rest intervals",
    targetMuscles: ["Cardiovascular", "Explosive Fast-Twitch", "Core"],
  },
  {
    id: "incline-treadmill",
    name: "12-3-30 Incline Power Walk",
    category: "cardio",
    metModerate: 4.8,
    metHigh: 6.2,
    metBeast: 7.8,
    iconName: "Heart",
    tagline: "12% incline at 3 mph for joint-friendly fat oxidation",
    targetMuscles: ["Glutes", "Hamstrings", "Calves", "Aerobic Base"],
  },
  {
    id: "assault-bike",
    name: "Assault AirBike Sprints",
    category: "cardio",
    metModerate: 8.5,
    metHigh: 11.0,
    metBeast: 14.5,
    iconName: "Zap",
    tagline: "Dual-action fan bike maximum lactate threshold work",
    targetMuscles: ["Quads", "Upper Chest", "Arms", "Lungs"],
  },
];

export default function CalorieBurnCalculator() {
  const weightInputId = useId();
  const durationInputId = useId();
  const [weightKg, setWeightKg] = useState<number>(75);
  const [unit, setUnit] = useState<"kg" | "lbs">("kg");
  const [durationMins, setDurationMins] = useState<number>(45);
  const [selectedActivityId, setSelectedActivityId] = useState<string>("heavy-compounds");
  const [intensity, setIntensity] = useState<"moderate" | "high" | "beast">("high");

  // Normalized weight in kg for scientific MET equation
  const effectiveWeightKg = unit === "kg" ? weightKg : weightKg * 0.45359237;

  const currentActivity = ACTIVITIES.find((a) => a.id === selectedActivityId) || ACTIVITIES[0];

  let metValue = currentActivity.metHigh;
  if (intensity === "moderate") metValue = currentActivity.metModerate;
  if (intensity === "beast") metValue = currentActivity.metBeast;

  // Formula: Calories = MET * Weight(kg) * (Duration in hours)
  const durationHours = durationMins / 60;
  const estimatedCalories = Math.round(metValue * effectiveWeightKg * durationHours);
  const caloriesPerMinute = (estimatedCalories / durationMins).toFixed(1);

  // Recovery hydration & fuel recommendations
  const waterTargetMl = Math.round(durationMins * 12.5 + effectiveWeightKg * 4);
  const postWorkoutProteinGrams = Math.round(Math.min(45, Math.max(25, effectiveWeightKg * 0.35)));
  const postWorkoutCarbsGrams = Math.round(estimatedCalories * 0.12);

  // Equivalent food representation
  const chickenRicePortion = (estimatedCalories / 450).toFixed(1);
  const proteinShakePortion = (estimatedCalories / 160).toFixed(1);
  const bananaPortion = (estimatedCalories / 105).toFixed(1);

  return (
    <section id="calorie-burn" className="py-20 bg-[#0d0d0d] text-white relative overflow-hidden">
      {/* Background glow accents */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Flame className="w-3.5 h-3.5 text-red-500 animate-pulse" />
            Energy Expenditure & Recovery Fuel
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Workout <span className="text-gradient">Calorie Burn</span> & Fuel Estimator
          </h2>
          <p className="mt-4 text-gray-400 text-base sm:text-lg">
            Calculate accurate energy output based on metabolic MET science for heavy gym sessions, combat sports, and HIIT circuits at Power Fitness Zone Islamabad.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Inputs & Activity Selection */}
          <div className="lg:col-span-7 bg-[#141414] border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-sm space-y-6">
            {/* Weight & Unit Selector */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor={weightInputId} className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-red-500" />
                  Your Body Weight
                </label>
                <div className="flex bg-black/50 p-1 rounded-lg border border-white/10 text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      if (unit === "lbs") setWeightKg(Math.round(weightKg * 0.453592));
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
                      if (unit === "kg") setWeightKg(Math.round(weightKg * 2.20462));
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

              <div className="flex items-center gap-4">
                <input
                  id={weightInputId}
                  type="range"
                  min={unit === "kg" ? 40 : 90}
                  max={unit === "kg" ? 150 : 330}
                  value={weightKg}
                  onChange={(e) => setWeightKg(Number(e.target.value))}
                  className="w-full accent-red-600 h-2 bg-gray-800 rounded-lg cursor-pointer"
                />
                <span className="text-xl font-bold text-white min-w-[70px] text-right">
                  {weightKg} <span className="text-xs text-gray-400 font-normal">{unit}</span>
                </span>
              </div>
            </div>

            {/* Duration Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor={durationInputId} className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-red-500" />
                  Session Duration (Minutes)
                </label>
                <span className="text-xl font-bold text-white">
                  {durationMins} <span className="text-xs text-gray-400 font-normal">mins</span>
                </span>
              </div>
              <input
                id={durationInputId}
                type="range"
                min={15}
                max={120}
                step={5}
                value={durationMins}
                onChange={(e) => setDurationMins(Number(e.target.value))}
                className="w-full accent-red-600 h-2 bg-gray-800 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-gray-500 mt-1">
                <span>15m Quick Hit</span>
                <span>45m Standard</span>
                <span>60m Deep Work</span>
                <span>90m+ Marathon</span>
              </div>
            </div>

            {/* Intensity Toggle */}
            <div>
              <label className="text-sm font-semibold text-gray-300 flex items-center gap-2 mb-2.5">
                <Zap className="w-4 h-4 text-yellow-500" />
                Training Intensity Level
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                <button
                  type="button"
                  onClick={() => setIntensity("moderate")}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    intensity === "moderate"
                      ? "bg-red-950/40 border-red-500 text-white shadow-lg shadow-red-900/20"
                      : "bg-black/30 border-white/5 text-gray-400 hover:border-white/20"
                  }`}
                >
                  <p className="font-bold text-sm text-white">Moderate</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">RPE 6-7 (Steady pace)</p>
                </button>

                <button
                  type="button"
                  onClick={() => setIntensity("high")}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    intensity === "high"
                      ? "bg-red-950/40 border-red-500 text-white shadow-lg shadow-red-900/20"
                      : "bg-black/30 border-white/5 text-gray-400 hover:border-white/20"
                  }`}
                >
                  <p className="font-bold text-sm text-white flex items-center gap-1">
                    High <Sparkles className="w-3 h-3 text-red-400" />
                  </p>
                  <p className="text-[11px] text-gray-400 mt-0.5">RPE 8-9 (Heavy push)</p>
                </button>

                <button
                  type="button"
                  onClick={() => setIntensity("beast")}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    intensity === "beast"
                      ? "bg-red-950/40 border-red-500 text-white shadow-lg shadow-red-900/20"
                      : "bg-black/30 border-white/5 text-gray-400 hover:border-white/20"
                  }`}
                >
                  <p className="font-bold text-sm text-white text-red-400 flex items-center gap-1">
                    Beast Mode 🔥
                  </p>
                  <p className="text-[11px] text-gray-400 mt-0.5">RPE 9.5-10 (All out)</p>
                </button>
              </div>
            </div>

            {/* Activity Selection Grid */}
            <div>
              <label className="text-sm font-semibold text-gray-300 flex items-center gap-2 mb-3">
                <Dumbbell className="w-4 h-4 text-red-500" />
                Select Gym Modality
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ACTIVITIES.map((act) => {
                  const isSelected = act.id === selectedActivityId;
                  return (
                    <button
                      key={act.id}
                      type="button"
                      onClick={() => setSelectedActivityId(act.id)}
                      className={`p-3.5 rounded-xl border text-left transition-all relative overflow-hidden group ${
                        isSelected
                          ? "bg-gradient-to-r from-red-900/30 to-black border-red-500/80 shadow-md"
                          : "bg-black/40 border-white/5 text-gray-400 hover:border-white/20 hover:bg-black/60"
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute top-2 right-2">
                          <CheckCircle2 className="w-4 h-4 text-red-500" />
                        </div>
                      )}
                      <p className={`text-sm font-bold ${isSelected ? "text-white" : "text-gray-200"}`}>
                        {act.name}
                      </p>
                      <p className="text-[11px] text-gray-400 mt-1 line-clamp-1">{act.tagline}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {act.targetMuscles.slice(0, 3).map((m, i) => (
                          <span
                            key={i}
                            className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-gray-300 font-mono"
                          >
                            {m}
                          </span>
                        ))}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Output Card & Fuel Replenishment */}
          <div className="lg:col-span-5 space-y-6">
            {/* Primary Calorie Card */}
            <div className="bg-gradient-to-b from-[#1b090b] via-[#141414] to-[#121212] border border-red-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-bold tracking-widest text-red-400">
                  Estimated Burn
                </span>
                <span className="inline-flex items-center gap-1 text-xs bg-red-500/20 text-red-300 px-2 py-0.5 rounded-full">
                  ⚡ {caloriesPerMinute} kcal/min
                </span>
              </div>

              <div className="my-6 flex items-baseline gap-2">
                <span className="text-5xl sm:text-6xl font-extrabold text-white tracking-tight font-heading">
                  {estimatedCalories}
                </span>
                <span className="text-2xl font-bold text-red-500">KCAL</span>
              </div>

              <p className="text-xs text-gray-400 leading-relaxed border-t border-white/10 pt-4">
                Based on your weight of <strong className="text-white">{weightKg}{unit}</strong> across{" "}
                <strong className="text-white">{durationMins} minutes</strong> of{" "}
                <span className="text-red-400 font-semibold">{currentActivity.name}</span> at{" "}
                <span className="text-white font-semibold">{intensity}</span> intensity.
              </p>
            </div>

            {/* Post-Workout Replenishment Target */}
            <div className="bg-[#141414] border border-white/10 rounded-2xl p-6 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Apple className="w-4 h-4 text-emerald-400" />
                Optimal Recovery Fuel Targets
              </h3>

              <div className="grid grid-cols-3 gap-3">
                <div className="bg-black/40 border border-white/5 rounded-xl p-3 text-center">
                  <Droplets className="w-4 h-4 text-blue-400 mx-auto mb-1" />
                  <p className="text-xs text-gray-400">Hydration</p>
                  <p className="text-sm font-bold text-white mt-0.5">{waterTargetMl} ml</p>
                </div>

                <div className="bg-black/40 border border-white/5 rounded-xl p-3 text-center">
                  <Dumbbell className="w-4 h-4 text-red-400 mx-auto mb-1" />
                  <p className="text-xs text-gray-400">Protein</p>
                  <p className="text-sm font-bold text-white mt-0.5">{postWorkoutProteinGrams}g</p>
                </div>

                <div className="bg-black/40 border border-white/5 rounded-xl p-3 text-center">
                  <Zap className="w-4 h-4 text-yellow-400 mx-auto mb-1" />
                  <p className="text-xs text-gray-400">Glycogen</p>
                  <p className="text-sm font-bold text-white mt-0.5">{postWorkoutCarbsGrams}g</p>
                </div>
              </div>

              {/* Real World Equivalents */}
              <div className="bg-black/30 border border-white/5 rounded-xl p-3.5 space-y-2">
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                  Equivalent to Approximately:
                </p>
                <ul className="text-xs text-gray-300 space-y-1.5">
                  <li className="flex justify-between items-center">
                    <span>🍗 Grilled Chicken & Brown Rice Bowl</span>
                    <span className="font-bold text-white font-mono">~{chickenRicePortion} meals</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>🥤 Whey Isolate Protein Shakes</span>
                    <span className="font-bold text-white font-mono">~{proteinShakePortion} scoops</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>🍌 Natural Ripe Bananas</span>
                    <span className="font-bold text-white font-mono">~{bananaPortion} pcs</span>
                  </li>
                </ul>
              </div>

              {/* Direct Link to Schedule */}
              <a
                href="#schedule"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-bold transition-all group shadow-lg shadow-red-900/30"
              >
                Burn Calories In Our Live Classes
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
