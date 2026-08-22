"use client";

import { useState } from "react";

export default function BmiCalculator() {
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [heightCm, setHeightCm] = useState<string>("175");
  const [weightKg, setWeightKg] = useState<string>("70");
  const [heightFeet, setHeightFeet] = useState<string>("5");
  const [heightInches, setHeightInches] = useState<string>("9");
  const [weightLbs, setWeightLbs] = useState<string>("154");
  const [gender, setGender] = useState<"male" | "female">("male");

  // Calculate BMI
  let bmi: number | null = null;
  if (unit === "metric") {
    const h = parseFloat(heightCm) / 100;
    const w = parseFloat(weightKg);
    if (h > 0 && w > 0) {
      bmi = parseFloat((w / (h * h)).toFixed(1));
    }
  } else {
    const totalInches = (parseFloat(heightFeet) || 0) * 12 + (parseFloat(heightInches) || 0);
    const w = parseFloat(weightLbs);
    if (totalInches > 0 && w > 0) {
      bmi = parseFloat(((w / (totalInches * totalInches)) * 703).toFixed(1));
    }
  }

  const getBmiDetails = (val: number | null) => {
    if (!val || isNaN(val)) return { category: "Enter details", color: "text-neutral-400", bg: "bg-neutral-800", rec: "Enter your height and weight to get customized workout advice." };
    if (val < 18.5) {
      return {
        category: "Underweight",
        color: "text-amber-400",
        bg: "bg-amber-500/10 border-amber-500/30",
        rec: "Focus on Hypertrophy & Muscle Building paired with a calorie surplus nutrition plan.",
        program: "Strength & Conditioning",
      };
    }
    if (val >= 18.5 && val < 25) {
      return {
        category: "Normal Weight",
        color: "text-emerald-400",
        bg: "bg-emerald-500/10 border-emerald-500/30",
        rec: "Maintain peak fitness and body composition with our Hybrid Functional & CrossFit training.",
        program: "CrossFit & Functional Training",
      };
    }
    if (val >= 25 && val < 30) {
      return {
        category: "Overweight",
        color: "text-orange-400",
        bg: "bg-orange-500/10 border-orange-500/30",
        rec: "Accelerate fat burn and metabolic rate with high-octane HIIT & Cardio kickboxing classes.",
        program: "Fat Loss & HIIT Burn",
      };
    }
    return {
      category: "Obese",
      color: "text-red-400",
      bg: "bg-red-500/10 border-red-500/30",
      rec: "Kickstart a guided 1-on-1 Transformation Program with our certified clinical sports nutritionists.",
      program: "Personal Training Transformation",
    };
  };

  const details = getBmiDetails(bmi);

  return (
    <section id="bmi-calculator" className="py-20 bg-[#0F0F0F] text-white relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-[#D91E2A] text-xs uppercase tracking-widest font-bold">
            Fitness Assessment Tool
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-white mt-2 uppercase tracking-wide">
            Calculate Your BMI & Target Plan
          </h2>
          <p className="text-neutral-400 mt-2 text-sm sm:text-base max-w-lg mx-auto">
            Discover your Body Mass Index score and find the exact training roadmap tailored to your body type.
          </p>
        </div>

        <div className="bg-[#141414] border border-neutral-800 rounded-2xl p-6 sm:p-10 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Controls Form */}
          <div className="lg:col-span-7 space-y-6">
            {/* Unit Toggle & Gender */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-neutral-800">
              <div className="inline-flex rounded-lg bg-neutral-900 p-1 border border-neutral-800">
                <button
                  type="button"
                  onClick={() => setUnit("metric")}
                  className={`px-4 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-all ${
                    unit === "metric" ? "bg-[#D91E2A] text-white" : "text-neutral-400 hover:text-white"
                  }`}
                >
                  Metric (kg / cm)
                </button>
                <button
                  type="button"
                  onClick={() => setUnit("imperial")}
                  className={`px-4 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-all ${
                    unit === "imperial" ? "bg-[#D91E2A] text-white" : "text-neutral-400 hover:text-white"
                  }`}
                >
                  Imperial (lbs / ft)
                </button>
              </div>

              <div className="inline-flex rounded-lg bg-neutral-900 p-1 border border-neutral-800">
                <button
                  type="button"
                  onClick={() => setGender("male")}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                    gender === "male" ? "bg-neutral-700 text-white" : "text-neutral-400 hover:text-white"
                  }`}
                >
                  Male
                </button>
                <button
                  type="button"
                  onClick={() => setGender("female")}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                    gender === "female" ? "bg-neutral-700 text-white" : "text-neutral-400 hover:text-white"
                  }`}
                >
                  Female
                </button>
              </div>
            </div>

            {/* Inputs */}
            {unit === "metric" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                    Height (cm)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="100"
                      max="250"
                      value={heightCm}
                      onChange={(e) => setHeightCm(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-3 text-white text-base focus:outline-none focus:border-[#D91E2A]"
                      placeholder="e.g. 175"
                    />
                    <span className="absolute right-4 top-3 text-neutral-500 text-sm">cm</span>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                    Weight (kg)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="30"
                      max="250"
                      value={weightKg}
                      onChange={(e) => setWeightKg(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-3 text-white text-base focus:outline-none focus:border-[#D91E2A]"
                      placeholder="e.g. 70"
                    />
                    <span className="absolute right-4 top-3 text-neutral-500 text-sm">kg</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                    Feet (ft)
                  </label>
                  <input
                    type="number"
                    min="3"
                    max="8"
                    value={heightFeet}
                    onChange={(e) => setHeightFeet(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-3 text-white text-base focus:outline-none focus:border-[#D91E2A]"
                    placeholder="5"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                    Inches (in)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="11"
                    value={heightInches}
                    onChange={(e) => setHeightInches(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-3 text-white text-base focus:outline-none focus:border-[#D91E2A]"
                    placeholder="9"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                    Weight (lbs)
                  </label>
                  <input
                    type="number"
                    min="60"
                    max="500"
                    value={weightLbs}
                    onChange={(e) => setWeightLbs(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-3 text-white text-base focus:outline-none focus:border-[#D91E2A]"
                    placeholder="154"
                  />
                </div>
              </div>
            )}

            {/* Range quick reference */}
            <div className="grid grid-cols-4 gap-2 pt-2 text-center text-xs">
              <div className="p-2 rounded bg-neutral-900 border border-neutral-800">
                <span className="block text-neutral-500 font-mono">&lt; 18.5</span>
                <span className="text-amber-400 font-semibold mt-0.5 block">Under</span>
              </div>
              <div className="p-2 rounded bg-neutral-900 border border-neutral-800">
                <span className="block text-neutral-500 font-mono">18.5 - 24.9</span>
                <span className="text-emerald-400 font-semibold mt-0.5 block">Normal</span>
              </div>
              <div className="p-2 rounded bg-neutral-900 border border-neutral-800">
                <span className="block text-neutral-500 font-mono">25.0 - 29.9</span>
                <span className="text-orange-400 font-semibold mt-0.5 block">Over</span>
              </div>
              <div className="p-2 rounded bg-neutral-900 border border-neutral-800">
                <span className="block text-neutral-500 font-mono">30.0+</span>
                <span className="text-red-400 font-semibold mt-0.5 block">Obese</span>
              </div>
            </div>
          </div>

          {/* Result Card */}
          <div className="lg:col-span-5 bg-[#1B1B1B] border border-neutral-700/60 rounded-xl p-6 sm:p-8 flex flex-col justify-between text-center relative overflow-hidden">
            <div className="relative z-10">
              <span className="text-xs uppercase tracking-widest text-neutral-400 font-bold block mb-1">
                Your Calculated BMI
              </span>
              <div className="font-heading font-black text-5xl sm:text-6xl text-white my-3 tracking-tight">
                {bmi !== null ? bmi : "--"}
              </div>

              <div className={`inline-block px-4 py-1 rounded-full text-xs uppercase font-bold tracking-wider mb-4 border ${details.bg} ${details.color}`}>
                {details.category}
              </div>

              <p className="text-xs sm:text-sm text-neutral-300 mb-6 leading-relaxed">
                {details.rec}
              </p>
            </div>

            <a
              href="#contact"
              className="relative z-10 inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-lg bg-[#D91E2A] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#b51822] transition-colors shadow-lg shadow-[#D91E2A]/20"
            >
              Get Custom Meal & Workout Plan
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
