"use client";

import { useState } from "react";
import {
  Moon,
  Sun,
  Droplets,
  Dumbbell,
  Clock,
  Sparkles,
  Utensils,
  ShieldAlert,
  CheckCircle2,
  Coffee,
  HeartPulse
} from "lucide-react";

type TimingWindow = "post-taraweeh" | "pre-iftar" | "post-iftar" | "pre-suhoor";

interface WindowInfo {
  title: string;
  badge: string;
  recommendedFor: string;
  hydrationState: string;
  energyLevel: string;
  bestLifts: string;
  nutritionTip: string;
  warning: string;
}

const TIMING_DATA: Record<TimingWindow, WindowInfo> = {
  "post-taraweeh": {
    title: "Post-Taraweeh Peak (10:30 PM – 12:30 AM)",
    badge: "⭐ Gold Standard For Hypertrophy",
    recommendedFor: "Heavy compound lifting, PR attempts, and high-volume bodybuilding workouts.",
    hydrationState: "Optimum — 1.5L to 2L of water + electrolytes already consumed after Iftar.",
    energyLevel: "100% Glycogen Full (fueled by Iftar meal).",
    bestLifts: "Heavy Squats, Bench Press, Deadlifts, Overload training.",
    nutritionTip: "Have an intra-workout electrolyte drink + post-workout casein/whey shake before Suhoor.",
    warning: "Ensure you sleep by 1:30 AM or nap post-Asr to maintain hormonal balance.",
  },
  "pre-iftar": {
    title: "Pre-Iftar Fasted Window (5:30 PM – 6:45 PM)",
    badge: "Fat Loss & Light Pump",
    recommendedFor: "Cardio, deload sessions, high-rep pump exercises, joint mobility.",
    hydrationState: "Low — Strict caution against overheating and excessive sweating in Islamabad summer/spring.",
    energyLevel: "Fasted state (Depleted glycogen).",
    bestLifts: "Isolation dumbbell exercises, machines, zone 2 brisk walking, mobility drills.",
    nutritionTip: "Time your workout so you finish 15-20 minutes before Maghrib Azaan for immediate rehydration.",
    warning: "Never attempt 1RM max effort lifts; avoid heavy deadlifts while completely dehydrated.",
  },
  "post-iftar": {
    title: "Post-Iftar Intermediate (8:30 PM – 10:00 PM)",
    badge: "Quick Evening Lift",
    recommendedFor: "Athletes who pray Taraweeh at home or want a focused 45-minute training block.",
    hydrationState: "Good — Hydrated after dates, water, and light protein snack.",
    energyLevel: "Moderate to High (avoid heavy greasy deep-fried pakoras before this!).",
    bestLifts: "Upper body push/pull, moderate compound sets, dumbbell complexes.",
    nutritionTip: "Break fast with 3 dates, 500ml water with Himalayan salt, and 1 scoop Whey. Lift 45 mins later.",
    warning: "Avoid eating heavy biryani or oily curries at Iftar; keep it light to prevent stomach cramps.",
  },
  "pre-suhoor": {
    title: "Pre-Suhoor Night Owl (2:30 AM – 4:00 AM)",
    badge: "Night Shift & Late Risers",
    recommendedFor: "Students and night-shift lifters who stay awake all night till Fajr.",
    hydrationState: "Hydrated throughout the night window.",
    energyLevel: "Steady energy.",
    bestLifts: "Full body split, supersets, moderate powerlifting.",
    nutritionTip: "Finish workout directly into a massive high-protein Suhoor meal (Oats, Eggs, Daal, Beef Shami).",
    warning: "Requires disciplined daytime sleeping schedule to avoid severe sleep deprivation.",
  },
};

const HYDRATION_TIMETABLE = [
  { time: "7:00 PM (Iftar)", amount: "500 ml", item: "Water + Pinch of Pink Himalayan Salt & Lemon" },
  { time: "8:30 PM", amount: "500 ml", item: "Electrolyte water or Coconut water (Zero sugar)" },
  { time: "10:30 PM (Gym)", amount: "750 ml - 1,000 ml", item: "Sip continuously during workout" },
  { time: "1:00 AM", amount: "500 ml", item: "Herbal Green tea or plain filtered water" },
  { time: "3:45 AM (Suhoor)", amount: "750 ml", item: "Water + Chia seeds (Tukh malanga) for sustained water retention" },
];

const PAKISTANI_RAMADAN_MEALS = [
  {
    type: "Power Suhoor (Sehri)",
    calories: "680 kcal",
    protein: "48g Protein",
    items: [
      "4 Whole Boiled / Fried Eggs (in 1 tsp Desi Ghee / Olive oil)",
      "1 Whole Wheat Roti or 80g Rolled Oats with Milk",
      "1 cup Greek Yogurt / Dahi with 1 tbsp Chia Seeds (Tukhmalanga)",
      "1 Banana or handful of Almonds",
    ],
  },
  {
    type: "Clean Iftar & Pre-Lift Fuel",
    calories: "380 kcal",
    protein: "35g Protein",
    items: [
      "3 Medjool / Pakistani Dates (Fast Glycogen replenishment)",
      "1 Scoop Whey Isolate in Water or Low-Fat Milk",
      "1 Cup Chana Chaat (Boiled chickpeas with cucumber & tomato, no heavy fried papri)",
      "500ml Water with electrolytes",
    ],
  },
  {
    type: "Post-Workout Dinner (Post-Taraweeh)",
    calories: "720 kcal",
    protein: "55g Protein",
    items: [
      "250g Grilled Chicken Breast / Beef Shami Kebabs",
      "1.5 cups Boiled Basmati Rice or 2 Small Rotis",
      "Fresh Kacha Salad (Cucumber, Beetroot, Onion) + Mint Raita",
      "1 bowl Daal / Lentil soup",
    ],
  },
];

export default function RamadanFitnessGuide() {
  const [selectedWindow, setSelectedWindow] = useState<TimingWindow>("post-taraweeh");

  const currentWindow = TIMING_DATA[selectedWindow];

  return (
    <section id="ramadan-guide" className="py-20 bg-[#080808] text-white relative overflow-hidden border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-red-950/80 text-red-400 border border-red-800/50 mb-4">
            <Moon className="w-3.5 h-3.5 text-red-500" />
            <span>Pakistani Athlete Protocol</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight uppercase">
            Ramadan Fasting & <span className="text-red-500">Gym Performance</span>
          </h2>
          <p className="mt-3 text-neutral-400 text-sm sm:text-base">
            Maintain maximum muscle mass, optimize hydration schedules, and program your compound lifts across Islamabad gym hours throughout the Holy Month.
          </p>
        </div>

        {/* Window Selector Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {[
            { id: "post-taraweeh", title: "Post-Taraweeh", subtitle: "10:30 PM - 12:30 AM", icon: Moon },
            { id: "pre-iftar", title: "Pre-Iftar Fasted", subtitle: "5:30 PM - 6:45 PM", icon: Sun },
            { id: "post-iftar", title: "Post-Iftar Quick", subtitle: "8:30 PM - 10:00 PM", icon: Utensils },
            { id: "pre-suhoor", title: "Pre-Suhoor Owl", subtitle: "2:30 AM - 4:00 AM", icon: Coffee },
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = selectedWindow === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedWindow(tab.id as TimingWindow)}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? "bg-red-600/20 border-red-500 text-white shadow-xl shadow-red-600/20"
                    : "bg-neutral-900/80 border-neutral-800 text-neutral-400 hover:bg-neutral-850 hover:text-white"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <Icon className={`w-5 h-5 ${isSelected ? "text-red-500" : "text-neutral-500"}`} />
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                  )}
                </div>
                <div className="font-bold text-xs sm:text-sm text-white">{tab.title}</div>
                <div className="text-[11px] text-neutral-400 font-mono mt-0.5">{tab.subtitle}</div>
              </button>
            );
          })}
        </div>

        {/* Selected Window Analysis Board */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          {/* Main Card */}
          <div className="lg:col-span-7 bg-neutral-900/90 border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-neutral-800">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-red-400 font-bold">
                  {currentWindow.badge}
                </span>
                <h3 className="font-black text-xl text-white mt-1">
                  {currentWindow.title}
                </h3>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="p-4 rounded-2xl bg-neutral-950/70 border border-neutral-800">
                <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">
                  🎯 Best Recommended For:
                </span>
                <p className="text-white font-medium">{currentWindow.recommendedFor}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-neutral-950/50 border border-neutral-800">
                  <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider block mb-1">
                    💧 Hydration Level
                  </span>
                  <p className="text-xs text-neutral-200">{currentWindow.hydrationState}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-neutral-950/50 border border-neutral-800">
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block mb-1">
                    ⚡ Energy & Glycogen
                  </span>
                  <p className="text-xs text-neutral-200">{currentWindow.energyLevel}</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-950/70 border border-neutral-800">
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                  🏋️ Suggested Lift Selection:
                </span>
                <p className="text-white font-medium">{currentWindow.bestLifts}</p>
              </div>

              <div className="p-4 rounded-2xl bg-gradient-to-r from-red-950/40 via-neutral-950 to-neutral-950 border border-red-900/40">
                <span className="text-[11px] font-bold text-red-400 uppercase tracking-wider block mb-1">
                  🥗 Fueling Strategy:
                </span>
                <p className="text-neutral-200 text-xs sm:text-sm">{currentWindow.nutritionTip}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-yellow-950/30 border border-yellow-800/40 flex items-start gap-2.5">
                <ShieldAlert className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                <p className="text-[11px] text-yellow-300/90 leading-relaxed">
                  <strong>Caution:</strong> {currentWindow.warning}
                </p>
              </div>
            </div>
          </div>

          {/* Hydration Timetable Column */}
          <div className="lg:col-span-5 bg-neutral-900/90 border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <Droplets className="w-4 h-4 text-blue-400 animate-bounce" />
                <h4 className="font-bold text-sm uppercase tracking-wider text-white">
                  3.5L Ramadan Hydration Plan
                </h4>
              </div>
              <span className="text-xs font-mono text-blue-400 font-bold">Maghrib → Fajr</span>
            </div>

            <p className="text-xs text-neutral-400">
              Gulping 2 liters at Suhoor causes frequent urination. Distribute fluids steadily through this timeline:
            </p>

            <div className="space-y-2.5 pt-1">
              {HYDRATION_TIMETABLE.map((step, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800 flex items-start justify-between gap-3 text-xs"
                >
                  <div>
                    <span className="font-bold text-white block">{step.time}</span>
                    <span className="text-[11px] text-neutral-400">{step.item}</span>
                  </div>
                  <span className="font-mono font-bold text-blue-400 bg-blue-950/60 px-2 py-0.5 rounded border border-blue-800/40 flex-shrink-0">
                    {step.amount}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pakistani Ramadan High-Protein Meals */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="text-2xl font-black uppercase text-white tracking-tight">
              High-Protein <span className="text-red-500">Pakistani Ramadan Meals</span>
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              Scientifically engineered recipes tailored to Pakistani kitchens for zero muscle catabolism during fasting.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PAKISTANI_RAMADAN_MEALS.map((meal) => (
              <div
                key={meal.type}
                className="bg-neutral-900/90 border border-neutral-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-neutral-800 mb-4">
                    <h4 className="font-bold text-sm uppercase text-white">{meal.type}</h4>
                    <div className="text-right">
                      <span className="text-xs font-mono font-bold text-red-400 block">{meal.protein}</span>
                      <span className="text-[10px] text-neutral-500 font-mono">{meal.calories}</span>
                    </div>
                  </div>

                  <ul className="space-y-2.5 text-xs text-neutral-300">
                    {meal.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-red-500 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-3 border-t border-neutral-800 flex justify-between items-center text-[10px] text-neutral-400 font-mono">
                  <span>Muscle Preservation ✓</span>
                  <span>100% Halal Islamabad Prep</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
