"use client";

import { useState, useEffect } from "react";
import { CheckSquare, Square, CheckCircle, RotateCcw, Sparkles, ShieldCheck, Dumbbell, Droplets, UserCheck, Smartphone, Copy, Check, Share2 } from "lucide-react";

interface ChecklistItem {
  id: string;
  name: string;
  category: "lifting" | "hydration" | "hygiene" | "tech";
  required: boolean;
  desc: string;
}

const CHECKLIST_ITEMS: ChecklistItem[] = [
  { id: "belt", name: "10mm/13mm Prong or Lever Belt", category: "lifting", required: true, desc: "Intra-abdominal bracing for heavy squats & deadlifts" },
  { id: "sleeves", name: "7mm Neoprene Knee Sleeves", category: "lifting", required: false, desc: "Joint warmth & compression" },
  { id: "straps", name: "Figure-8 or Cotton Lifting Straps", category: "lifting", required: false, desc: "Overcoming grip fatigue on heavy pulls" },
  { id: "chalk", name: "Liquid Chalk (PFZ Grip Approved)", category: "lifting", required: true, desc: "Non-dusting chalk allowed across all Islamabad branches" },
  { id: "shoes", name: "Flat-Sole Lifting Shoes / Squat Wedges", category: "lifting", required: true, desc: "Stable kinetic force transfer to platform" },

  { id: "shaker", name: "Insulated Stainless Shaker Bottle", category: "hydration", required: true, desc: "750ml+ cold water or intra-workout BCAAs" },
  { id: "preworkout", name: "Pre-Workout or Caffeine Booster", category: "hydration", required: false, desc: "Taken 30-45 mins before session" },
  { id: "electrolytes", name: "Pink Salt or Electrolyte Pack", category: "hydration", required: true, desc: "Maintains plasma volume under Islamabad humidity" },

  { id: "towel", name: "Clean Microfiber Sweat Towel", category: "hygiene", required: true, desc: "Mandatory bench wipe-down protocol at PFZ" },
  { id: "deodorant", name: "Fresh Antiperspirant / Body Spray", category: "hygiene", required: true, desc: "Courteous training environment etiquette" },
  { id: "change_clothes", name: "Fresh Change of Clothes & Socks", category: "hygiene", required: false, desc: "Post-workout commute comfort" },
  { id: "slides", name: "Shower Slippers / Slides", category: "hygiene", required: true, desc: "For post-workout hot shower and sauna entry" },

  { id: "member_pass", name: "PFZ Digital Pass / Wallet QR", category: "tech", required: true, desc: "Contactless NFC turnstile gate entry" },
  { id: "headphones", name: "Noise-Cancelling Earbuds / AirPods", category: "tech", required: true, desc: "In-the-zone training focus" },
  { id: "post_snack", name: "Post-Workout Medjool Dates or Whey", category: "tech", required: false, desc: "Fast-acting glycogen reload" },
];

export default function GymBagChecklist() {
  const [checkedIds, setCheckedIds] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<"all" | "lifting" | "hydration" | "hygiene" | "tech">("all");
  const [copied, setCopied] = useState<boolean>(false);

  const copyChecklist = () => {
    const lines = CHECKLIST_ITEMS.map((item) => {
      const isChecked = checkedIds.includes(item.id);
      return `${isChecked ? "✅" : "⬜"} ${item.name} (${item.desc})`;
    });
    const summary = `🏋️ PFZ Gym Bag Readiness: ${readyPercent}% Ready\n\n` + lines.join("\n");
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    try {
      const saved = localStorage.getItem("pfz_gym_bag_checklist");
      if (saved) {
        setCheckedIds(JSON.parse(saved));
      } else {
        // Default essentials
        setCheckedIds(["belt", "towel", "member_pass", "shaker", "shoes"]);
      }
    } catch {
      // Local storage unavailable
    }
  }, []);

  const toggleItem = (id: string) => {
    const updated = checkedIds.includes(id)
      ? checkedIds.filter((item) => item !== id)
      : [...checkedIds, id];
    setCheckedIds(updated);
    try {
      localStorage.setItem("pfz_gym_bag_checklist", JSON.stringify(updated));
    } catch {
      // Ignore
    }
  };

  const checkAll = () => {
    const all = CHECKLIST_ITEMS.map((i) => i.id);
    setCheckedIds(all);
    try {
      localStorage.setItem("pfz_gym_bag_checklist", JSON.stringify(all));
    } catch {
      // Ignore
    }
  };

  const resetAll = () => {
    setCheckedIds([]);
    try {
      localStorage.removeItem("pfz_gym_bag_checklist");
    } catch {
      // Ignore
    }
  };

  const filteredItems = activeTab === "all"
    ? CHECKLIST_ITEMS
    : CHECKLIST_ITEMS.filter((i) => i.category === activeTab);

  const totalItems = CHECKLIST_ITEMS.length;
  const readyPercent = Math.round((checkedIds.length / totalItems) * 100);

  const getReadinessStatus = () => {
    if (readyPercent >= 90) return { title: "Battle Ready", color: "text-emerald-400 bg-emerald-950/40 border-emerald-500/50", msg: "You have everything packed for a peak intensity PR session!" };
    if (readyPercent >= 60) return { title: "Mostly Ready", color: "text-amber-400 bg-amber-950/40 border-amber-500/50", msg: "Core gear packed. Check your hydration and hygiene items." };
    return { title: "Missing Essentials", color: "text-red-400 bg-red-950/40 border-red-500/50", msg: "Don't get caught without your towel, belt, or digital check-in QR." };
  };

  const readiness = getReadinessStatus();

  return (
    <section id="gym-bag-checklist" className="py-20 bg-[#0B0B0B] text-white relative border-t border-neutral-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-red-950/80 text-red-400 border border-red-800/50 mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            Session Preparation Audit
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
            Gym Bag Essentials & <span className="text-red-500">Readiness Checklist</span>
          </h2>
          <p className="mt-3 text-neutral-400 text-sm sm:text-base">
            Never show up to the platform without your mandatory lifting gear, hydration, or clean towel.
          </p>
        </div>

        {/* Readiness Progress Bar Header */}
        <div className="bg-[#141414] border border-neutral-800 rounded-2xl p-6 sm:p-8 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold uppercase tracking-wider text-neutral-300">
                  Readiness Score:
                </span>
                <span className="text-2xl font-black text-red-400">{readyPercent}%</span>
                <span className={`text-xs px-2.5 py-0.5 rounded-full border font-semibold ${readiness.color}`}>
                  {readiness.title}
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-1">{readiness.msg}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={copyChecklist}
                className="px-3.5 py-2 text-xs font-bold rounded-lg bg-neutral-900 border border-neutral-700 text-neutral-200 hover:text-white hover:border-neutral-500 transition-colors flex items-center gap-1.5"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-neutral-400" />}
                <span>{copied ? "Copied!" : "Copy Summary"}</span>
              </button>
              <button
                type="button"
                onClick={checkAll}
                className="px-3.5 py-2 text-xs font-bold rounded-lg bg-red-950/70 border border-red-700 text-red-300 hover:bg-red-900/80 transition-colors"
              >
                Select All
              </button>
              <button
                type="button"
                onClick={resetAll}
                className="px-3.5 py-2 text-xs font-bold rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white transition-colors flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
            </div>
          </div>

          <div className="w-full bg-neutral-900 rounded-full h-3 overflow-hidden border border-neutral-800">
            <div
              className="bg-gradient-to-r from-red-600 to-amber-500 h-full transition-all duration-500 ease-out"
              style={{ width: `${readyPercent}%` }}
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          {[
            { id: "all", label: "All Items", icon: Sparkles },
            { id: "lifting", label: "Lifting Gear", icon: Dumbbell },
            { id: "hydration", label: "Hydration & Fuel", icon: Droplets },
            { id: "hygiene", label: "Hygiene & Towel", icon: UserCheck },
            { id: "tech", label: "Pass & Tech", icon: Smartphone },
          ].map((tab) => {
            const Icon = tab.icon;
            const isSel = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  isSel
                    ? "bg-red-600 text-white shadow-md shadow-red-600/30"
                    : "bg-[#141414] text-neutral-400 border border-neutral-800 hover:border-neutral-700 hover:text-white"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Checklist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item) => {
            const isChecked = checkedIds.includes(item.id);
            return (
              <div
                key={item.id}
                onClick={() => toggleItem(item.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3 select-none ${
                  isChecked
                    ? "bg-red-950/20 border-red-800/70 shadow-sm"
                    : "bg-[#131313] border-neutral-800/80 hover:border-neutral-700"
                }`}
              >
                <button
                  type="button"
                  className="mt-0.5 shrink-0 text-red-500 focus:outline-none"
                  aria-label={`Toggle ${item.name}`}
                >
                  {isChecked ? (
                    <CheckCircle className="w-5 h-5 text-red-500 fill-red-500/20" />
                  ) : (
                    <Square className="w-5 h-5 text-neutral-600" />
                  )}
                </button>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`text-sm font-bold ${
                        isChecked ? "text-neutral-200 line-through opacity-80" : "text-white"
                      }`}
                    >
                      {item.name}
                    </span>
                    {item.required && (
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-red-900/40 text-red-400 font-semibold uppercase">
                        Must-Have
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-neutral-400 mt-1">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
