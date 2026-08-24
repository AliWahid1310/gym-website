"use client";

import { useState } from "react";

type Gender = "male" | "female";
type Goal = "fat-loss" | "maintenance" | "muscle-gain" | "aggressive-bulk";
type ActivityLevel = "sedentary" | "light" | "moderate" | "heavy" | "athlete";

interface MacroSplit {
  proteinGrams: number;
  proteinCals: number;
  carbGrams: number;
  carbCals: number;
  fatGrams: number;
  fatCals: number;
  totalCalories: number;
  proteinPercent: number;
  carbPercent: number;
  fatPercent: number;
}

export default function MacroCalculator() {
  const [gender, setGender] = useState<Gender>("male");
  const [age, setAge] = useState<number>(25);
  const [weightKg, setWeightKg] = useState<number>(75);
  const [heightCm, setHeightCm] = useState<number>(175);
  const [activity, setActivity] = useState<ActivityLevel>("moderate");
  const [goal, setGoal] = useState<Goal>("fat-loss");
  const [copied, setCopied] = useState(false);

  // Mifflin-St Jeor Equation
  const calculateBMR = (): number => {
    if (gender === "male") {
      return 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
    } else {
      return 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
    }
  };

  const activityMultipliers: Record<ActivityLevel, number> = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    heavy: 1.725,
    athlete: 1.9,
  };

  const calculateTDEE = (): number => {
    const bmr = calculateBMR();
    return Math.round(bmr * activityMultipliers[activity]);
  };

  const calculateTargetCalories = (): number => {
    const tdee = calculateTDEE();
    switch (goal) {
      case "fat-loss":
        return Math.max(1200, Math.round(tdee - 500));
      case "maintenance":
        return tdee;
      case "muscle-gain":
        return Math.round(tdee + 300);
      case "aggressive-bulk":
        return Math.round(tdee + 500);
    }
  };

  const calculateMacros = (): MacroSplit => {
    const totalCalories = calculateTargetCalories();
    let proteinPercent = 0.3;
    let fatPercent = 0.25;
    let carbPercent = 0.45;

    if (goal === "fat-loss") {
      proteinPercent = 0.35;
      fatPercent = 0.25;
      carbPercent = 0.4;
    } else if (goal === "muscle-gain" || goal === "aggressive-bulk") {
      proteinPercent = 0.3;
      fatPercent = 0.2;
      carbPercent = 0.5;
    }

    const proteinCals = totalCalories * proteinPercent;
    const fatCals = totalCalories * fatPercent;
    const carbCals = totalCalories * carbPercent;

    const proteinGrams = Math.round(proteinCals / 4);
    const fatGrams = Math.round(fatCals / 9);
    const carbGrams = Math.round(carbCals / 4);

    return {
      proteinGrams,
      proteinCals: Math.round(proteinCals),
      carbGrams,
      carbCals: Math.round(carbCals),
      fatGrams,
      fatCals: Math.round(fatCals),
      totalCalories,
      proteinPercent: Math.round(proteinPercent * 100),
      carbPercent: Math.round(carbPercent * 100),
      fatPercent: Math.round(fatPercent * 100),
    };
  };

  const bmr = Math.round(calculateBMR());
  const tdee = calculateTDEE();
  const macros = calculateMacros();

  const handleCopySummary = () => {
    const text = `Power Fitness Zone — My Nutrition Targets:\n🎯 Goal: ${goal.replace("-", " ").toUpperCase()}\n🔥 TDEE: ${tdee} kcal\n⚡ Target: ${macros.totalCalories} kcal/day\n🥩 Protein: ${macros.proteinGrams}g (${macros.proteinPercent}%)\n🍚 Carbs: ${macros.carbGrams}g (${macros.carbPercent}%)\n🥑 Fats: ${macros.fatGrams}g (${macros.fatPercent}%)`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const whatsappMessage = encodeURIComponent(
    `Hi Power Fitness Zone! I calculated my daily targets: ${macros.totalCalories} kcal (${macros.proteinGrams}g Protein, ${macros.carbGrams}g Carbs, ${macros.fatGrams}g Fat) for ${goal.replace("-", " ")}. I want to speak with a nutrition coach to start my customized diet plan!`
  );

  return (
    <section id="nutrition-calculator" className="py-20 bg-[#0E0E0E] text-white relative overflow-hidden border-t border-neutral-800">
      {/* Background glow effects */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-red-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-red-950/80 text-red-400 border border-red-800/50 mb-4">
            Custom Nutrition Science
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Target Calorie & <span className="text-red-500">Macro Calculator</span>
          </h2>
          <p className="mt-4 text-neutral-400 text-base sm:text-lg">
            Calculate your exact Total Daily Energy Expenditure (TDEE) and optimal grams of protein, carbs, and healthy fats tuned to your fitness ambition.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Form */}
          <div className="lg:col-span-6 bg-neutral-900/80 border border-neutral-800 p-6 sm:p-8 rounded-2xl shadow-2xl backdrop-blur-sm">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-white">
              <span className="w-2.5 h-6 bg-red-600 rounded-full inline-block" />
              Your Body Metrics & Routine
            </h3>

            <div className="space-y-5">
              {/* Gender Toggle */}
              <div>
                <label className="block text-xs font-semibold uppercase text-neutral-400 mb-2 tracking-wider">
                  Gender
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setGender("male")}
                    className={`py-2.5 rounded-xl font-semibold text-sm transition-all border ${
                      gender === "male"
                        ? "bg-red-600 border-red-500 text-white shadow-lg shadow-red-600/30"
                        : "bg-neutral-800/60 border-neutral-700/60 text-neutral-300 hover:bg-neutral-800"
                    }`}
                  >
                    👨 Male
                  </button>
                  <button
                    type="button"
                    onClick={() => setGender("female")}
                    className={`py-2.5 rounded-xl font-semibold text-sm transition-all border ${
                      gender === "female"
                        ? "bg-red-600 border-red-500 text-white shadow-lg shadow-red-600/30"
                        : "bg-neutral-800/60 border-neutral-700/60 text-neutral-300 hover:bg-neutral-800"
                    }`}
                  >
                    👩 Female
                  </button>
                </div>
              </div>

              {/* Age, Weight, Height */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-semibold uppercase text-neutral-400 tracking-wider">Age</label>
                    <span className="text-sm font-bold text-red-400">{age} yrs</span>
                  </div>
                  <input
                    type="range"
                    min={15}
                    max={80}
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="w-full accent-red-600 cursor-pointer bg-neutral-700 h-2 rounded-lg"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-semibold uppercase text-neutral-400 tracking-wider">Weight</label>
                    <span className="text-sm font-bold text-red-400">{weightKg} kg</span>
                  </div>
                  <input
                    type="range"
                    min={40}
                    max={160}
                    value={weightKg}
                    onChange={(e) => setWeightKg(Number(e.target.value))}
                    className="w-full accent-red-600 cursor-pointer bg-neutral-700 h-2 rounded-lg"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-semibold uppercase text-neutral-400 tracking-wider">Height</label>
                    <span className="text-sm font-bold text-red-400">{heightCm} cm</span>
                  </div>
                  <input
                    type="range"
                    min={130}
                    max={220}
                    value={heightCm}
                    onChange={(e) => setHeightCm(Number(e.target.value))}
                    className="w-full accent-red-600 cursor-pointer bg-neutral-700 h-2 rounded-lg"
                  />
                </div>
              </div>

              {/* Activity Level */}
              <div>
                <label className="block text-xs font-semibold uppercase text-neutral-400 mb-2 tracking-wider">
                  Activity Level
                </label>
                <select
                  value={activity}
                  onChange={(e) => setActivity(e.target.value as ActivityLevel)}
                  className="w-full bg-neutral-800/80 border border-neutral-700 rounded-xl px-4 py-3 text-sm text-neutral-200 focus:outline-none focus:border-red-500 transition-colors"
                >
                  <option value="sedentary">Sedentary (Desk job, minimal workout)</option>
                  <option value="light">Light Activity (Gym 1-3 days/week)</option>
                  <option value="moderate">Moderate Activity (Gym 3-5 days/week)</option>
                  <option value="heavy">Very Active (Gym 6-7 days/week)</option>
                  <option value="athlete">Athlete / Extreme Training (2x daily)</option>
                </select>
              </div>

              {/* Fitness Goal */}
              <div>
                <label className="block text-xs font-semibold uppercase text-neutral-400 mb-2 tracking-wider">
                  Target Fitness Goal
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { id: "fat-loss", label: "🔥 Fat Loss", sub: "-500 kcal" },
                    { id: "maintenance", label: "⚖️ Maintenance", sub: "Maintain weight" },
                    { id: "muscle-gain", label: "💪 Lean Muscle", sub: "+300 kcal" },
                    { id: "aggressive-bulk", label: "⚡ Bulk Up", sub: "+500 kcal" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setGoal(item.id as Goal)}
                      className={`p-3 rounded-xl text-left transition-all border ${
                        goal === item.id
                          ? "bg-red-600/20 border-red-500 text-white shadow-md shadow-red-600/20"
                          : "bg-neutral-800/40 border-neutral-700/60 text-neutral-400 hover:border-neutral-600"
                      }`}
                    >
                      <div className="text-xs sm:text-sm font-bold text-neutral-100">{item.label}</div>
                      <div className="text-[11px] text-neutral-400 mt-0.5">{item.sub}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Results Display */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-gradient-to-br from-neutral-900 via-neutral-900 to-neutral-950 border border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-neutral-800">
                <div>
                  <span className="text-xs uppercase font-semibold text-neutral-400 tracking-wider">Daily Target</span>
                  <div className="text-4xl sm:text-5xl font-black text-white mt-1">
                    {macros.totalCalories.toLocaleString()} <span className="text-lg font-medium text-red-400">kcal/day</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs text-neutral-400">BMR: <span className="font-semibold text-neutral-200">{bmr} kcal</span></div>
                  <div className="text-xs text-neutral-400 mt-1">Maintenance (TDEE): <span className="font-semibold text-neutral-200">{tdee} kcal</span></div>
                </div>
              </div>

              {/* Macro Bars */}
              <div className="mt-6 space-y-5">
                {/* Protein */}
                <div>
                  <div className="flex justify-between items-center text-sm font-semibold mb-1.5">
                    <span className="flex items-center gap-2 text-red-400">
                      <span className="w-3 h-3 rounded-full bg-red-500 inline-block" />
                      Protein ({macros.proteinPercent}%)
                    </span>
                    <span className="font-mono text-white text-base">
                      {macros.proteinGrams}g <span className="text-xs text-neutral-400">({macros.proteinCals} kcal)</span>
                    </span>
                  </div>
                  <div className="w-full bg-neutral-800 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-red-600 to-red-400 h-full rounded-full transition-all duration-500"
                      style={{ width: `${macros.proteinPercent}%` }}
                    />
                  </div>
                </div>

                {/* Carbohydrates */}
                <div>
                  <div className="flex justify-between items-center text-sm font-semibold mb-1.5">
                    <span className="flex items-center gap-2 text-amber-400">
                      <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
                      Carbohydrates ({macros.carbPercent}%)
                    </span>
                    <span className="font-mono text-white text-base">
                      {macros.carbGrams}g <span className="text-xs text-neutral-400">({macros.carbCals} kcal)</span>
                    </span>
                  </div>
                  <div className="w-full bg-neutral-800 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-amber-500 to-amber-400 h-full rounded-full transition-all duration-500"
                      style={{ width: `${macros.carbPercent}%` }}
                    />
                  </div>
                </div>

                {/* Healthy Fats */}
                <div>
                  <div className="flex justify-between items-center text-sm font-semibold mb-1.5">
                    <span className="flex items-center gap-2 text-emerald-400">
                      <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                      Healthy Fats ({macros.fatPercent}%)
                    </span>
                    <span className="font-mono text-white text-base">
                      {macros.fatGrams}g <span className="text-xs text-neutral-400">({macros.fatCals} kcal)</span>
                    </span>
                  </div>
                  <div className="w-full bg-neutral-800 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-full rounded-full transition-all duration-500"
                      style={{ width: `${macros.fatPercent}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-6 border-t border-neutral-800 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={handleCopySummary}
                  className="flex-1 px-4 py-3 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-sm font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 border border-neutral-700"
                >
                  {copied ? "✓ Copied to Clipboard!" : "📋 Copy Macro Targets"}
                </button>
                <a
                  href={`https://wa.me/923001234567?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-600/30"
                >
                  💬 Get Custom Meal Plan
                </a>
              </div>
            </div>

            {/* Coach Tip Card */}
            <div className="bg-neutral-900/60 border border-neutral-800/80 p-5 rounded-2xl flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-red-950/80 border border-red-800/60 flex items-center justify-center text-red-400 shrink-0 text-xl font-bold">
                💡
              </div>
              <div className="text-xs sm:text-sm text-neutral-300">
                <strong className="text-white block font-semibold mb-1">Power Fitness Zone Coach Tip:</strong>
                Combine these macronutrient targets with progressive overload training in our gym for optimum lean muscle retention and metabolic acceleration.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
