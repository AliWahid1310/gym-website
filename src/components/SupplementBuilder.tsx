"use client";

import { useState } from "react";
import {
  ShieldCheck,
  Zap,
  Sparkles,
  Clock,
  CheckCircle,
  Copy,
  Check,
  ChevronRight,
  Pill,
  Sun,
  Flame,
  Moon,
  Info
} from "lucide-react";

interface SupplementItem {
  id: string;
  name: string;
  category: "morning" | "pre" | "intra" | "post" | "night";
  timing: string;
  dosage: string;
  purpose: string;
  scientificBenefit: string;
  caffeineMg?: number;
  proteinG?: number;
  creatineG?: number;
  goals: ("hypertrophy" | "fatloss" | "strength" | "endurance")[];
}

const SUPPLEMENT_DATABASE: SupplementItem[] = [
  {
    id: "creatine-mono",
    name: "Creapure® Creatine Monohydrate",
    category: "post",
    timing: "Post-Workout or Daily Consistent",
    dosage: "5g daily",
    purpose: "ATP cellular energy & explosive compound power",
    scientificBenefit: "Increases phosphocreatine stores in muscle tissue for enhanced force output and water volume.",
    creatineG: 5,
    goals: ["hypertrophy", "strength", "fatloss", "endurance"],
  },
  {
    id: "whey-isolate",
    name: "100% Grass-Fed Whey Isolate",
    category: "post",
    timing: "Within 45m Post-Workout",
    dosage: "25g - 30g scoop",
    purpose: "Rapid muscle protein synthesis & recovery",
    scientificBenefit: "Rich in Leucine (3g+) to trigger mTOR pathway and repair micro-tears in muscle fibers.",
    proteinG: 27,
    goals: ["hypertrophy", "strength", "fatloss"],
  },
  {
    id: "citrulline-malate",
    name: "L-Citrulline Malate 2:1",
    category: "pre",
    timing: "30-45 mins Pre-Workout",
    dosage: "6g - 8g",
    purpose: "Nitric oxide vasodilation & skin-splitting muscle pumps",
    scientificBenefit: "Converts to L-Arginine in kidneys, increasing blood flow and nutrient delivery during heavy sets.",
    goals: ["hypertrophy", "strength"],
  },
  {
    id: "beta-alanine",
    name: "CarnoSyn® Beta-Alanine",
    category: "pre",
    timing: "30 mins Pre-Workout",
    dosage: "3.2g",
    purpose: "Intramuscular carnosine buffering against lactic burn",
    scientificBenefit: "Buffers hydrogen ion buildup, delaying muscular failure during 8-15 rep hypertrophy ranges.",
    goals: ["hypertrophy", "endurance"],
  },
  {
    id: "natural-caffeine",
    name: "Caffeine Anhydrous / Green Tea Extract",
    category: "pre",
    timing: "30 mins Pre-Workout",
    dosage: "150mg - 200mg",
    purpose: "Central nervous system alertness & fat oxidation",
    scientificBenefit: "Antagonizes adenosine receptors in the brain to reduce perceived exertion during heavy training.",
    caffeineMg: 200,
    goals: ["fatloss", "strength", "endurance"],
  },
  {
    id: "essential-electrolytes",
    name: "Essential Electrolyte Hydration Matrix (Na, K, Mg)",
    category: "intra",
    timing: "Sipped During Workout",
    dosage: "1 scoop in 700ml water",
    purpose: "Cellular hydration, muscle contraction & anti-cramping",
    scientificBenefit: "Replenishes sodium and potassium lost in sweat to sustain peak neuromuscular contraction.",
    goals: ["endurance", "hypertrophy", "fatloss", "strength"],
  },
  {
    id: "l-carnitine",
    name: "L-Carnitine L-Tartrate",
    category: "morning",
    timing: "Morning on empty stomach",
    dosage: "2000mg",
    purpose: "Mitochondrial fatty acid transportation",
    scientificBenefit: "Transports long-chain fatty acids into mitochondria to be oxidized for clean aerobic energy.",
    goals: ["fatloss"],
  },
  {
    id: "ashwagandha-ksm",
    name: "KSM-66® Organic Ashwagandha",
    category: "night",
    timing: "30 mins Before Sleep",
    dosage: "600mg",
    purpose: "Cortisol reduction, deep REM sleep & testosterone balance",
    scientificBenefit: "Adaptogen that lowers serum cortisol and promotes restorative parasympathetic sleep cycles.",
    goals: ["hypertrophy", "strength", "fatloss"],
  },
  {
    id: "omega3-fishoil",
    name: "Triple Strength Omega-3 (EPA/DHA)",
    category: "morning",
    timing: "With Morning Breakfast",
    dosage: "1000mg active EPA/DHA",
    purpose: "Joint lubrication & systemic anti-inflammation",
    scientificBenefit: "Protects synovial fluid in heavy-loaded knees, elbows and spinal discs while supporting cardiovascular health.",
    goals: ["hypertrophy", "strength", "endurance", "fatloss"],
  },
];

export default function SupplementBuilder() {
  const [selectedGoal, setSelectedGoal] = useState<"hypertrophy" | "fatloss" | "strength" | "endurance">("hypertrophy");
  const [selectedIds, setSelectedIds] = useState<string[]>([
    "creatine-mono",
    "whey-isolate",
    "citrulline-malate",
    "beta-alanine",
    "ashwagandha-ksm",
    "omega3-fishoil",
  ]);
  const [copied, setCopied] = useState<boolean>(false);

  const toggleSupplement = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleGoalChange = (goal: "hypertrophy" | "fatloss" | "strength" | "endurance") => {
    setSelectedGoal(goal);
    // Auto-select recommended supplements for this goal
    const recommended = SUPPLEMENT_DATABASE.filter((item) => item.goals.includes(goal)).map((item) => item.id);
    setSelectedIds(recommended);
  };

  const activeSupplements = SUPPLEMENT_DATABASE.filter((item) => selectedIds.includes(item.id));

  // Calculate totals
  const totalCaffeine = activeSupplements.reduce((acc, curr) => acc + (curr.caffeineMg || 0), 0);
  const totalProtein = activeSupplements.reduce((acc, curr) => acc + (curr.proteinG || 0), 0);
  const totalCreatine = activeSupplements.reduce((acc, curr) => acc + (curr.creatineG || 0), 0);

  const copyStackToClipboard = () => {
    const lines = [
      `⚡ POWER FITNESS ZONE - MY CUSTOM SUPPLEMENT PROTOCOL (${selectedGoal.toUpperCase()} GOAL)`,
      `----------------------------------------------------`,
      ...activeSupplements.map(
        (s) => `• [${s.category.toUpperCase()}] ${s.name} (${s.dosage}) - ${s.timing}: ${s.purpose}`
      ),
      `----------------------------------------------------`,
      `Verified at Power Fitness Zone Islamabad Pro-Shop`,
    ];
    navigator.clipboard.writeText(lines.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const categories = [
    { id: "morning", label: "Morning & Wake Up", icon: Sun },
    { id: "pre", label: "Pre-Workout (30m Prior)", icon: Flame },
    { id: "intra", label: "Intra-Workout", icon: Zap },
    { id: "post", label: "Post-Workout Fuel", icon: Sparkles },
    { id: "night", label: "Night & Deep Recovery", icon: Moon },
  ];

  return (
    <section id="supplements" className="py-20 bg-[#0a0a0a] text-white relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Pill className="w-3.5 h-3.5 text-red-500" />
            Science-Backed Supplement Protocols
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Custom <span className="text-gradient">Supplement Stack Builder</span>
          </h2>
          <p className="mt-4 text-gray-400 text-sm sm:text-base">
            Build your optimal daily supplement schedule tailored to your exact goal. Every compound is 100% lab-tested and available at our Islamabad gym pro-shops.
          </p>
        </div>

        {/* Goal Selector Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex flex-wrap p-1.5 rounded-2xl bg-[#141414] border border-white/10 gap-1">
            {[
              { id: "hypertrophy", label: "💪 Hypertrophy (Muscle Mass)" },
              { id: "fatloss", label: "🔥 Fat Shred & Lean Definition" },
              { id: "strength", label: "🏋️ Power & 1RM Strength" },
              { id: "endurance", label: "⚡ Conditioning & Endurance" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleGoalChange(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedGoal === tab.id
                    ? "bg-red-600 text-white shadow-lg shadow-red-900/30"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Supplement Selector by Timing */}
          <div className="lg:col-span-8 space-y-6">
            {categories.map((cat) => {
              const itemsInCat = SUPPLEMENT_DATABASE.filter((s) => s.category === cat.id);
              const CatIcon = cat.icon;

              if (itemsInCat.length === 0) return null;

              return (
                <div
                  key={cat.id}
                  className="bg-[#121212] border border-white/10 rounded-2xl p-5 sm:p-6 space-y-4"
                >
                  <div className="flex items-center gap-2.5 border-b border-white/10 pb-3">
                    <CatIcon className="w-4 h-4 text-red-500" />
                    <h3 className="font-bold text-sm sm:text-base text-white">{cat.label}</h3>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    {itemsInCat.map((item) => {
                      const isSelected = selectedIds.includes(item.id);
                      return (
                        <div
                          key={item.id}
                          onClick={() => toggleSupplement(item.id)}
                          className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                            isSelected
                              ? "bg-red-950/20 border-red-500/60 shadow-md"
                              : "bg-black/30 border-white/5 opacity-70 hover:opacity-100 hover:border-white/20"
                          }`}
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span
                                className={`w-4 h-4 rounded flex items-center justify-center border text-[10px] ${
                                  isSelected
                                    ? "bg-red-600 border-red-500 text-white"
                                    : "border-gray-600 bg-black/50"
                                }`}
                              >
                                {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                              </span>
                              <h4 className="font-bold text-sm text-white">{item.name}</h4>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-gray-300">
                                {item.dosage}
                              </span>
                            </div>
                            <p className="text-xs text-gray-300 pl-6">{item.purpose}</p>
                            <p className="text-[11px] text-gray-400 pl-6 italic">{item.scientificBenefit}</p>
                          </div>

                          <div className="flex-shrink-0 text-right pl-6 sm:pl-0">
                            <span className="text-[11px] text-red-400 font-semibold">{item.timing}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Stack Summary Card & Export */}
          <div className="lg:col-span-4 bg-gradient-to-b from-[#181818] via-[#131313] to-[#0e0e0e] border border-white/15 rounded-2xl p-6 sm:p-8 space-y-6 sticky top-24 shadow-2xl">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold uppercase tracking-wider text-red-400">
                Your Active Protocol
              </span>
              <span className="text-xs bg-white/10 px-2 py-0.5 rounded-full font-mono text-gray-300">
                {activeSupplements.length} Selected
              </span>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-2 text-center bg-black/40 border border-white/5 rounded-xl p-3">
              <div>
                <p className="text-[10px] text-gray-400 uppercase">Caffeine</p>
                <p className="text-sm font-bold text-amber-400 mt-0.5">{totalCaffeine}mg</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 uppercase">Protein</p>
                <p className="text-sm font-bold text-red-400 mt-0.5">+{totalProtein}g</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 uppercase">Creatine</p>
                <p className="text-sm font-bold text-emerald-400 mt-0.5">{totalCreatine}g</p>
              </div>
            </div>

            {/* List of Active Supplements */}
            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {activeSupplements.map((s) => (
                <div key={s.id} className="flex justify-between items-center text-xs py-1 border-b border-white/5">
                  <span className="text-gray-300 truncate pr-2">{s.name}</span>
                  <span className="text-red-400 font-mono text-[11px] flex-shrink-0">{s.dosage}</span>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={copyStackToClipboard}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white text-black font-bold text-xs hover:bg-gray-200 transition-all shadow"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                {copied ? "Stack Copied to Clipboard!" : "Copy My Supplement Protocol"}
              </button>

              <a
                href="#merch"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs transition-all shadow-lg shadow-red-900/30"
              >
                Order Authentic Stacks at Pro-Shop
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="flex items-start gap-2 bg-black/40 border border-white/5 p-3 rounded-xl text-[11px] text-gray-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span>All supplements sold at Power Fitness Zone carry authentic holographic QR verification seals.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
