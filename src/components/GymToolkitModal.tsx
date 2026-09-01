"use client";

import { useState } from "react";

interface QuickToolItem {
  id: string;
  name: string;
  category: "Calculators" | "Workouts" | "Nutrition" | "Community";
  icon: string;
  description: string;
  targetId: string;
  badge?: string;
}

const TOOLKIT_ITEMS: QuickToolItem[] = [
  {
    id: "timer",
    name: "HIIT & Tabata Gym Timer",
    category: "Workouts",
    icon: "⏱️",
    description: "Configurable interval timer with high-contrast countdown and sound alerts.",
    targetId: "interval-timer",
    badge: "Interactive",
  },
  {
    id: "body-fat",
    name: "US Navy Body Fat Analyzer",
    category: "Calculators",
    icon: "📐",
    description: "Calculate body fat %, lean mass, and recomposition timeline.",
    targetId: "body-fat-calculator",
    badge: "Navy Standard",
  },
  {
    id: "overload",
    name: "Progressive Overload Tracker",
    category: "Workouts",
    icon: "📈",
    description: "Track tonnage volume load (sets × reps × kg) and weight bump rules.",
    targetId: "progressive-overload",
    badge: "Strength",
  },
  {
    id: "protein-cost",
    name: "PKR Protein Cost Optimizer",
    category: "Nutrition",
    icon: "🥩",
    description: "Pakistani local food protein economy and grocery budget simulator.",
    targetId: "protein-cost-calculator",
    badge: "PKR Value",
  },
  {
    id: "onerepmax",
    name: "1-Rep Max Calculator",
    category: "Calculators",
    icon: "🏋️‍♂️",
    description: "Epley & Brzycki 1RM estimates with percentage training zones.",
    targetId: "onerepmax-calculator",
  },
  {
    id: "macros",
    name: "Macro & TDEE Calculator",
    category: "Nutrition",
    icon: "🥗",
    description: "Calculate daily protein, carbs, fats, and BMR based on body goals.",
    targetId: "macro-calculator",
  },
  {
    id: "generator",
    name: "AI Workout Split Generator",
    category: "Workouts",
    icon: "⚡",
    description: "Personalized 3 to 6-day hypertrophy training splits tailored to your schedule.",
    targetId: "workout-generator",
  },
  {
    id: "soundboard",
    name: "Gym Hype Soundboard",
    category: "Workouts",
    icon: "🔊",
    description: "Synthesized barbell drops, fight gongs, and championship motivation.",
    targetId: "gym-soundboard",
    badge: "Web Audio",
  },
  {
    id: "warmup",
    name: "Dynamic Warm-Up & Mobility",
    category: "Workouts",
    icon: "🔥",
    description: "Targeted joint mobility, dynamic warm-up drills with interval timer.",
    targetId: "warmup-generator",
    badge: "Mobility",
  },
  {
    id: "caffeine",
    name: "Pre-Workout Caffeine Optimizer",
    category: "Nutrition",
    icon: "☕",
    description: "Calculate optimal pre-workout caffeine timing and protect deep sleep recovery.",
    targetId: "caffeine-timing",
    badge: "Biohack",
  },
  {
    id: "strength-standards",
    name: "Strength Level & SBD Standard",
    category: "Calculators",
    icon: "🏆",
    description: "Compare your 1RM compound lifts against worldwide standards and gym rank tiers.",
    targetId: "strength-standards",
    badge: "Powerlifting",
  },
  {
    id: "desi-recipes",
    name: "Desi High-Protein Kitchen",
    category: "Nutrition",
    icon: "🍗",
    description: "Pakistani high-protein fitness meal recipes with ingredient portions and PKR costs.",
    targetId: "desi-recipes",
    badge: "Desi Fuel",
  },
  {
    id: "equipment-status",
    name: "Live Floor & Rack Availability",
    category: "Community",
    icon: "📡",
    description: "Real-time squat rack occupancy and sauna status across Islamabad branches.",
    targetId: "equipment-status",
    badge: "Live Radar",
  },
  {
    id: "challenges",
    name: "Monthly Member Challenges",
    category: "Community",
    icon: "🏆",
    description: "Join Islamabad gym leaderboards and unlock member achievement badges.",
    targetId: "challenges",
  },
  {
    id: "etiquette",
    name: "Gym Etiquette & Lifter IQ",
    category: "Community",
    icon: "🎓",
    description: "Respectful lifter guidelines and interactive 5-question etiquette quiz.",
    targetId: "gym-etiquette",
  },
];

export default function GymToolkitModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Calculators", "Workouts", "Nutrition", "Community"];

  const filteredTools = TOOLKIT_ITEMS.filter((tool) => {
    const matchesSearch =
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleJumpTo = (targetId: string) => {
    setIsOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      {/* Floating Speed Dial Trigger Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-red-600 to-red-700 text-white font-bold text-xs uppercase tracking-wider shadow-2xl shadow-red-600/50 hover:scale-105 active:scale-95 transition-all border border-red-400/40"
          aria-label="Open Gym Fitness Toolkit"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
          <span className="hidden sm:inline">Fitness Toolkit</span>
          <span className="bg-black/30 px-1.5 py-0.5 rounded text-[10px] font-mono">
            {TOOLKIT_ITEMS.length} Tools
          </span>
        </button>
      </div>

      {/* Toolkit Modal Overlay */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Fitness Toolkit Hub"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn"
        >
          <div
            className="relative w-full max-w-4xl max-h-[85vh] bg-neutral-900 border border-neutral-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 pb-4 border-b border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-600/20 border border-red-500/30 flex items-center justify-center text-xl">
                  ⚡
                </div>
                <div>
                  <h3 className="text-xl font-black uppercase tracking-tight text-white">
                    Power Fitness <span className="text-red-500">Toolkit Hub</span>
                  </h3>
                  <p className="text-xs text-neutral-400">
                    Instant access to performance calculators, timers, and nutrition tools
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="w-9 h-9 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            {/* Search & Categories Bar */}
            <div className="p-6 py-4 bg-neutral-950/60 border-b border-neutral-800/80 space-y-3">
              {/* Search Bar */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search tools (e.g. Timer, 1RM, Body Fat, Protein, Overload)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-red-500 transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-2.5 text-xs text-neutral-500 hover:text-neutral-300"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Categories */}
              <div className="flex flex-wrap gap-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                      selectedCategory === cat
                        ? "bg-red-600 text-white shadow-md shadow-red-600/20"
                        : "bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Tool Grid Scrollable List */}
            <div className="p-6 overflow-y-auto max-h-[50vh] grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredTools.map((tool) => (
                <div
                  key={tool.id}
                  onClick={() => handleJumpTo(tool.targetId)}
                  className="p-4 rounded-2xl bg-neutral-950/70 border border-neutral-800/80 hover:border-red-500/50 hover:bg-neutral-950 transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl p-2 rounded-xl bg-neutral-900 border border-neutral-800 group-hover:scale-110 transition-transform">
                        {tool.icon}
                      </span>
                      <div>
                        <h4 className="font-bold text-sm text-white group-hover:text-red-400 transition-colors">
                          {tool.name}
                        </h4>
                        <span className="text-[10px] text-neutral-500 uppercase font-mono">
                          {tool.category}
                        </span>
                      </div>
                    </div>

                    {tool.badge && (
                      <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/20 shrink-0">
                        {tool.badge}
                      </span>
                    )}
                  </div>

                  <p className="mt-2.5 text-xs text-neutral-400 leading-relaxed">
                    {tool.description}
                  </p>

                  <div className="mt-3 pt-2 border-t border-neutral-800/60 flex items-center justify-between text-[11px] text-red-400 font-semibold">
                    <span>Jump to Interactive Tool</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-neutral-950 border-t border-neutral-800 text-center text-xs text-neutral-500">
              Power Fitness Zone Suite • Islamabad, Pakistan
            </div>
          </div>
        </div>
      )}
    </>
  );
}
