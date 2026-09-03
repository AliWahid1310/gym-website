"use client";

import { useState } from "react";
import {
  Dumbbell,
  Search,
  CheckCircle,
  AlertTriangle,
  Info,
  X,
  Layers,
  ChevronRight,
  ShieldCheck,
  Copy,
  Check
} from "lucide-react";
import { EQUIPMENT_CATALOG, EquipmentItem } from "@/data/equipment";

type CategoryFilter = "all" | "chest-shoulders" | "back" | "legs" | "cardio" | "free-weights";

export default function EquipmentGuide() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeItem, setActiveItem] = useState<EquipmentItem | null>(null);
  const [copiedCue, setCopiedCue] = useState(false);

  const filteredEquipment = EQUIPMENT_CATALOG.filter((item) => {
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.primaryMuscle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCopyCue = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCue(true);
    setTimeout(() => setCopiedCue(false), 2000);
  };

  const getAlternativeExercise = (item: EquipmentItem) => {
    switch (item.category) {
      case "legs":
        return "Heel-Elevated Goblet Squats or DB Bulgarian Split Squats";
      case "chest-shoulders":
        return "Slight Incline Dumbbell Press or Ring / Parallel Dips";
      case "back":
        return "Single-Arm Chest Supported DB Row or Neutral Pull-ups";
      case "free-weights":
        return "Barbell Landmine Press or Dual Kettlebell Deadlifts";
      case "cardio":
        return "Incline Walking Treadmill (12% Incline, 4.5 km/h) or Concept2 Rower";
      default:
        return "Bodyweight suspension / dumbbell compound variation";
    }
  };

  return (
    <section id="equipment" className="py-20 bg-[#0a0a0a] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <ShieldCheck className="w-3.5 h-3.5 text-red-500" />
            World-Class Commercial Gym Arsenal
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Commercial <span className="text-gradient">Equipment & Form Guide</span>
          </h2>
          <p className="mt-4 text-gray-400 text-sm sm:text-base">
            Explore our elite collection of Eleiko, Hammer Strength, Watson, and Arsenal machinery across Islamabad branches with biomechanical coaching cues.
          </p>
        </div>

        {/* Filters & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {[
              { id: "all", label: "All Arsenal" },
              { id: "chest-shoulders", label: "Chest & Shoulders" },
              { id: "back", label: "Back & Lats" },
              { id: "legs", label: "Legs & Glutes" },
              { id: "free-weights", label: "Free Weights & Racks" },
              { id: "cardio", label: "HIIT & Cardio" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedCategory(tab.id as CategoryFilter)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === tab.id
                    ? "bg-red-600 text-white shadow-lg shadow-red-900/30"
                    : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search machine or muscle..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#141414] border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition-colors"
            />
          </div>
        </div>

        {/* Equipment Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredEquipment.map((item) => (
            <div
              key={item.id}
              className="bg-[#121212] border border-white/10 rounded-2xl overflow-hidden hover:border-red-500/50 transition-all flex flex-col group"
            >
              {/* Image & Badges */}
              <div className="relative aspect-[4/3] overflow-hidden bg-black/40">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                {item.highlightBadge && (
                  <span className="absolute top-3 right-3 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md uppercase tracking-wider">
                    {item.highlightBadge}
                  </span>
                )}

                <span className="absolute bottom-3 left-3 text-[11px] font-semibold text-gray-300 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
                  {item.brand}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-bold text-base text-white group-hover:text-red-400 transition-colors line-clamp-1">
                    {item.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-1">
                    <Layers className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
                    <span className="text-gray-300 font-medium">{item.primaryMuscle}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/5 space-y-2">
                  <p className="text-xs text-gray-400 line-clamp-2">
                    <strong className="text-white">Form Cue:</strong> {item.proFormCue}
                  </p>

                  <button
                    type="button"
                    onClick={() => setActiveItem(item)}
                    className="w-full mt-2 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-white/5 hover:bg-red-600/20 text-gray-300 hover:text-red-400 text-xs font-semibold transition-all border border-white/5 hover:border-red-500/30"
                  >
                    <Info className="w-3.5 h-3.5" />
                    Biomechanics & Tips
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredEquipment.length === 0 && (
          <div className="text-center py-16 bg-[#121212] rounded-2xl border border-white/5">
            <Dumbbell className="w-10 h-10 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400 text-sm">No gym equipment found matching &quot;{searchQuery}&quot;.</p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Modal / Detail Drawer */}
        {activeItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-[#141414] border border-white/15 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
              <button
                type="button"
                onClick={() => setActiveItem(null)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold text-red-400 uppercase tracking-wider">
                  {activeItem.brand}
                </span>
                <span className="text-gray-600">•</span>
                <span className="text-xs text-gray-400 capitalize">{activeItem.category.replace("-", " ")}</span>
              </div>

              <h3 className="text-2xl font-extrabold text-white mb-4">{activeItem.name}</h3>

              <div className="aspect-video rounded-xl overflow-hidden mb-6 border border-white/10">
                <img src={activeItem.image} alt={activeItem.name} className="w-full h-full object-cover" />
              </div>

              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-1">
                    Primary Muscle Target
                  </h4>
                  <p className="text-red-400 font-semibold">{activeItem.primaryMuscle}</p>
                </div>

                <div>
                  <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-1">
                    Secondary Supporting Muscles
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {activeItem.secondaryMuscles.map((m, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2.5 py-1 rounded bg-white/5 border border-white/10 text-gray-300"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-black/50 border border-white/5 rounded-2xl p-4 space-y-3">
                  <div className="flex items-start justify-between gap-2.5">
                    <div className="flex items-start gap-2.5">
                      <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white block text-xs">Biomechanical Form Cue:</strong>
                        <p className="text-gray-300 text-xs mt-0.5">{activeItem.proFormCue}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopyCue(activeItem.proFormCue)}
                      title="Copy Form Cue"
                      className="p-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-gray-300 transition shrink-0"
                    >
                      {copiedCue ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block text-xs">Common Mistake to Avoid:</strong>
                      <p className="text-gray-300 text-xs mt-0.5">{activeItem.commonMistake}</p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-white/5 flex items-start gap-2.5">
                    <span className="text-xs text-blue-400 font-bold">⚡ Busy Gym Alternative:</span>
                    <p className="text-gray-300 text-xs">{getAlternativeExercise(activeItem)}</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-3">
                  <p className="text-xs text-gray-400">Available at F-7, Blue Area, Bahria & DHA II Islamabad</p>
                  <a
                    href="#free-pass"
                    onClick={() => setActiveItem(null)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all shadow-md shadow-red-600/30"
                  >
                    Test On Free 1-Day Pass
                    <ChevronRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

