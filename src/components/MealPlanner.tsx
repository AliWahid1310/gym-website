"use client";

import { useState } from "react";
import { Utensils, Flame, Clock, Sparkles, Check, Share2, Filter, ChevronRight, Apple } from "lucide-react";
import { MEALS_DATA, MealItem } from "@/data/meals";

export default function MealPlanner() {
  const [selectedGoal, setSelectedGoal] = useState<"all" | "bulk" | "cut" | "maintain">("all");
  const [selectedCategory, setSelectedCategory] = useState<"all" | "pre_workout" | "post_workout" | "ramadan_iftar" | "ramadan_sehri">("all");
  const [activeMeal, setActiveMeal] = useState<MealItem>(MEALS_DATA[0]);
  const [copied, setCopied] = useState<boolean>(false);

  const filteredMeals = MEALS_DATA.filter((meal) => {
    const goalMatch = selectedGoal === "all" || meal.goal === selectedGoal;
    const catMatch = selectedCategory === "all" || meal.category === selectedCategory;
    return goalMatch && catMatch;
  });

  const handleShareMeal = (meal: MealItem) => {
    const text = `🥗 Power Fitness Zone Meal Recipe:
• ${meal.name}
• Calories: ${meal.calories} kcal | Protein: ${meal.proteinG}g | Carbs: ${meal.carbsG}g | Fats: ${meal.fatsG}g
• Ingredients: ${meal.ingredients.join(", ")}
• Guide: ${meal.instructions}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="meal-planner" className="py-20 bg-[#0A0A0A] text-white relative overflow-hidden border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-red-950/80 text-red-400 border border-red-800/50 mb-4">
            <Utensils className="w-3.5 h-3.5" />
            Performance Nutrition & Dietetics
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            Pakistani Gym <span className="text-red-500">Meal & Fuel Planner</span>
          </h2>
          <p className="mt-4 text-neutral-400 text-base sm:text-lg">
            High-protein, locally accessible meal recipes crafted specifically for Islamabad lifters, muscle bulking, shredding, and Ramadan fasting workouts.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 bg-neutral-900/80 border border-neutral-800 p-4 rounded-2xl">
          {/* Goal Filter */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase text-neutral-400 mr-2 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-red-500" /> Goal:
            </span>
            {[
              { id: "all", label: "All Goals" },
              { id: "bulk", label: "Muscle Bulk" },
              { id: "cut", label: "Fat Loss / Cut" },
              { id: "maintain", label: "Maintain" },
            ].map((g) => (
              <button
                key={g.id}
                onClick={() => setSelectedGoal(g.id as "all" | "bulk" | "cut" | "maintain")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedGoal === g.id
                    ? "bg-red-600 text-white shadow-md shadow-red-600/30"
                    : "bg-neutral-800 text-neutral-400 hover:bg-neutral-700 hover:text-white"
                }`}
              >
                {g.label}
              </button>
            ))}
          </div>

          {/* Timing Filter */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: "all", label: "All Timings" },
              { id: "pre_workout", label: "Pre-Workout" },
              { id: "post_workout", label: "Post-Workout" },
              { id: "ramadan_iftar", label: "🌙 Iftar" },
              { id: "ramadan_sehri", label: "🌙 Sehri" },
            ].map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id as "all" | "pre_workout" | "post_workout" | "ramadan_iftar" | "ramadan_sehri")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === c.id
                    ? "bg-neutral-200 text-neutral-900"
                    : "bg-neutral-800 text-neutral-400 hover:bg-neutral-700 hover:text-white"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content: Left List & Right Detail */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Meals list */}
          <div className="lg:col-span-6 space-y-3">
            {filteredMeals.map((meal) => {
              const isSelected = activeMeal.id === meal.id;
              return (
                <div
                  key={meal.id}
                  onClick={() => setActiveMeal(meal)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? "bg-neutral-900 border-red-500 shadow-xl shadow-red-950/30"
                      : "bg-neutral-900/60 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        {meal.isDesiSpecial && (
                          <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-amber-950 text-amber-400 border border-amber-800">
                            🇵🇰 Local Pakistani
                          </span>
                        )}
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md bg-neutral-800 text-neutral-300">
                          {meal.category.replace("_", " ")}
                        </span>
                      </div>
                      <h3 className="font-bold text-white text-base sm:text-lg">{meal.name}</h3>
                    </div>
                    <ChevronRight className={`w-5 h-5 transition-transform ${isSelected ? "text-red-500 translate-x-1" : "text-neutral-600"}`} />
                  </div>

                  {/* Micro Macros */}
                  <div className="grid grid-cols-4 gap-2 mt-4 pt-3 border-t border-neutral-800/80 text-center">
                    <div>
                      <span className="text-[10px] text-neutral-500 uppercase font-semibold">Calories</span>
                      <div className="text-xs font-black text-white">{meal.calories} kcal</div>
                    </div>
                    <div>
                      <span className="text-[10px] text-neutral-500 uppercase font-semibold">Protein</span>
                      <div className="text-xs font-black text-red-400">{meal.proteinG}g</div>
                    </div>
                    <div>
                      <span className="text-[10px] text-neutral-500 uppercase font-semibold">Carbs</span>
                      <div className="text-xs font-black text-amber-400">{meal.carbsG}g</div>
                    </div>
                    <div>
                      <span className="text-[10px] text-neutral-500 uppercase font-semibold">Fats</span>
                      <div className="text-xs font-black text-blue-400">{meal.fatsG}g</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Detailed Recipe Card */}
          <div className="lg:col-span-6 sticky top-24">
            <div className="bg-gradient-to-br from-neutral-900 via-neutral-900 to-neutral-950 border border-neutral-800 p-6 sm:p-8 rounded-3xl shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-red-500">Selected Nutrition Blueprint</span>
                  <h3 className="text-xl sm:text-2xl font-black text-white mt-1">{activeMeal.name}</h3>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 bg-neutral-800 rounded-xl text-neutral-300 text-xs font-bold">
                  <Clock className="w-3.5 h-3.5 text-red-400" />
                  {activeMeal.prepTimeMins} mins
                </div>
              </div>

              {/* Macro highlight blocks */}
              <div className="grid grid-cols-4 gap-2">
                <div className="bg-neutral-800/80 p-3 rounded-2xl border border-neutral-700/60 text-center">
                  <span className="text-[10px] font-bold uppercase text-neutral-400">Total Kcal</span>
                  <div className="text-lg font-black text-white mt-0.5">{activeMeal.calories}</div>
                </div>
                <div className="bg-neutral-800/80 p-3 rounded-2xl border border-red-900/50 text-center">
                  <span className="text-[10px] font-bold uppercase text-red-400">Protein</span>
                  <div className="text-lg font-black text-red-400 mt-0.5">{activeMeal.proteinG}g</div>
                </div>
                <div className="bg-neutral-800/80 p-3 rounded-2xl border border-amber-900/50 text-center">
                  <span className="text-[10px] font-bold uppercase text-amber-400">Carbs</span>
                  <div className="text-lg font-black text-amber-400 mt-0.5">{activeMeal.carbsG}g</div>
                </div>
                <div className="bg-neutral-800/80 p-3 rounded-2xl border border-blue-900/50 text-center">
                  <span className="text-[10px] font-bold uppercase text-blue-400">Fats</span>
                  <div className="text-lg font-black text-blue-400 mt-0.5">{activeMeal.fatsG}g</div>
                </div>
              </div>

              {/* Ingredients */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3 flex items-center gap-1.5">
                  <Apple className="w-4 h-4 text-emerald-400" /> Required Ingredients:
                </h4>
                <div className="space-y-2">
                  {activeMeal.ingredients.map((ing, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-neutral-200 bg-neutral-800/40 p-2 rounded-xl border border-neutral-800">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                      {ing}
                    </div>
                  ))}
                </div>
              </div>

              {/* Preparation & Timing Guidelines */}
              <div className="bg-neutral-800/50 border border-neutral-700/60 p-4 rounded-2xl">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                  Preparation & Ingestion Protocol:
                </h4>
                <p className="text-xs text-neutral-300 leading-relaxed">{activeMeal.instructions}</p>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleShareMeal(activeMeal)}
                className="w-full py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider bg-red-600 hover:bg-red-500 text-white flex items-center justify-center gap-2 transition-all shadow-lg shadow-red-600/20"
              >
                {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
                {copied ? "Meal Plan Copied to Clipboard!" : "Copy Recipe & Macros"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
