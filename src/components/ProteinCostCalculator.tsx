"use client";

import { useState } from "react";
import { PAKISTANI_PROTEIN_SOURCES } from "@/data/pakistaniProteins";

type SortOption = "cheapest" | "proteinDensity" | "price";

export default function ProteinCostCalculator() {
  const [targetDailyProtein, setTargetDailyProtein] = useState<number>(140);
  const [dailyBudgetPkr, setDailyBudgetPkr] = useState<number>(650);
  const [sortBy, setSortBy] = useState<SortOption>("cheapest");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Poultry", "Dairy", "Meat", "Legumes", "Seafood", "Supplements"];

  // Filter and sort items
  const filteredItems = PAKISTANI_PROTEIN_SOURCES.filter(
    (item) => selectedCategory === "All" || item.category === selectedCategory
  ).sort((a, b) => {
    if (sortBy === "cheapest") return a.costPerGramProteinPkr - b.costPerGramProteinPkr;
    if (sortBy === "proteinDensity") return b.proteinPerServing - a.proteinPerServing;
    return a.typicalPricePkr - b.typicalPricePkr;
  });

  // Calculate student / pro combo recommendations
  const studentComboCost = Math.round(300 * 0.4 + 950 * 0.3 + 330 * 0.5); // ~650 PKR = 4 eggs + 300g chicken + 1 glass milk
  const chickenNeededGrams = Math.round((targetDailyProtein / 31) * 100);
  const chickenDailyCost = Math.round((chickenNeededGrams / 1000) * 950);

  const eggsNeeded = Math.round(targetDailyProtein / 6);
  const eggsDailyCost = Math.round((eggsNeeded / 12) * 330);

  return (
    <section
      id="protein-cost-calculator"
      className="py-20 bg-[#0A0A0A] text-white relative overflow-hidden border-t border-neutral-800"
    >
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[300px] bg-red-600/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            Pakistani Gym Diet & Cost Optimizer
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-white">
            Protein-To-Price <span className="text-red-500">PKR Economy</span> Calculator
          </h2>
          <p className="mt-4 text-neutral-400 text-base sm:text-lg">
            Maximize your hypertrophy per Rupee. Compare local Pakistani protein sources in PKR/gram and optimize your monthly grocery budget.
          </p>
        </div>

        {/* Daily Target & Budget Simulators */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Target Protein */}
          <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6 backdrop-blur-sm shadow-xl">
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs uppercase font-bold text-neutral-400">Target Daily Protein Goal</label>
              <span className="text-2xl font-black text-white font-mono">{targetDailyProtein}g</span>
            </div>
            <input
              type="range"
              min="60"
              max="250"
              step="5"
              value={targetDailyProtein}
              onChange={(e) => setTargetDailyProtein(Number(e.target.value))}
              className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-red-600 mb-4"
            />
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-neutral-800 text-xs">
              <div className="bg-neutral-950 p-2.5 rounded-xl border border-neutral-800">
                <span className="text-neutral-500 block">From Chicken Breast:</span>
                <span className="font-bold text-emerald-400">{chickenNeededGrams}g / day (Rs. {chickenDailyCost})</span>
              </div>
              <div className="bg-neutral-950 p-2.5 rounded-xl border border-neutral-800">
                <span className="text-neutral-500 block">From Farm Eggs:</span>
                <span className="font-bold text-amber-400">{eggsNeeded} Eggs / day (Rs. {eggsDailyCost})</span>
              </div>
            </div>
          </div>

          {/* Daily Budget */}
          <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6 backdrop-blur-sm shadow-xl">
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs uppercase font-bold text-neutral-400">Your Daily Diet Budget</label>
              <span className="text-2xl font-black text-emerald-400 font-mono">Rs. {dailyBudgetPkr} / day</span>
            </div>
            <input
              type="range"
              min="200"
              max="2500"
              step="50"
              value={dailyBudgetPkr}
              onChange={(e) => setDailyBudgetPkr(Number(e.target.value))}
              className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-emerald-500 mb-4"
            />
            <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800 text-xs text-neutral-300 flex items-center justify-between">
              <span>Monthly Fitness Grocery:</span>
              <span className="font-bold text-white font-mono">Rs. {(dailyBudgetPkr * 30).toLocaleString()} / month</span>
            </div>
          </div>
        </div>

        {/* Filters & Sorting */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 bg-neutral-900/60 p-4 rounded-2xl border border-neutral-800">
          {/* Categories */}
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  selectedCategory === cat
                    ? "bg-red-600 text-white shadow-md shadow-red-600/20"
                    : "bg-neutral-950/80 text-neutral-400 hover:text-white border border-neutral-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-neutral-400">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              aria-label="Sort Pakistani protein sources"
              className="bg-neutral-950 text-white text-xs font-semibold px-3 py-1.5 rounded-lg border border-neutral-800 focus:outline-none focus:border-red-500"
            >
              <option value="cheapest">Most Economical (Lowest PKR / g)</option>
              <option value="proteinDensity">Highest Protein Content</option>
              <option value="price">Lowest Market Price</option>
            </select>
          </div>
        </div>

        {/* Protein Source Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item, idx) => {
            const isBestValue = item.costPerGramProteinPkr < 3.5;
            return (
              <div
                key={item.id}
                className={`bg-neutral-900/80 rounded-2xl p-5 border transition-all hover:border-red-500/50 hover:shadow-xl flex flex-col justify-between relative group ${
                  isBestValue ? "border-emerald-500/40 bg-neutral-900/90" : "border-neutral-800"
                }`}
              >
                {isBestValue && (
                  <span className="absolute -top-2.5 right-4 bg-emerald-500 text-neutral-950 text-[10px] font-black uppercase px-2 py-0.5 rounded-full shadow-md">
                    Top PKR Value
                  </span>
                )}

                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-xs font-semibold text-neutral-400">{item.category}</span>
                    <span className="text-sm font-semibold text-neutral-400 font-urdu">{item.urduName}</span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-red-400 transition-colors">
                    {item.name}
                  </h3>

                  <div className="mt-3 bg-neutral-950/80 p-3 rounded-xl border border-neutral-800/80 space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-neutral-400">Serving / Size:</span>
                      <span className="font-semibold text-white">{item.servingSize}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-neutral-400">Total Protein:</span>
                      <span className="font-bold text-red-400">{item.proteinPerServing}g</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-neutral-400">Est. Price:</span>
                      <span className="font-bold text-white">Rs. {item.typicalPricePkr}</span>
                    </div>
                  </div>

                  {/* PKR Cost Metric Banner */}
                  <div className="mt-3 p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-between">
                    <span className="text-[11px] text-neutral-400">Cost per 1g Protein:</span>
                    <span
                      className={`text-sm font-black font-mono ${
                        item.costPerGramProteinPkr <= 3.5 ? "text-emerald-400" : item.costPerGramProteinPkr <= 6 ? "text-amber-400" : "text-red-400"
                      }`}
                    >
                      Rs. {item.costPerGramProteinPkr.toFixed(2)}
                    </span>
                  </div>

                  <p className="mt-3 text-[11px] text-neutral-400 leading-relaxed">
                    {item.dietaryNote}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-800 text-[10px] text-neutral-500 flex justify-between items-center">
                  <span>Score: {item.bioavailabilityScore}</span>
                  <span className="text-emerald-400 font-semibold">{item.proteinPerPkr.toFixed(1)}g / 100 PKR</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
