"use client";

import { useState, useMemo } from "react";
import { branchesData, Branch } from "@/data/branches";

export default function BranchExplorer() {
  const [activeBranchId, setActiveBranchId] = useState<string>("f8");
  const [selectedAmenityFilter, setSelectedAmenityFilter] = useState<string>("ALL");
  const [copiedMap, setCopiedMap] = useState(false);

  const amenityFilters = [
    { id: "ALL", label: "All Amenities" },
    { id: "Ladies", label: "Ladies Only Floor" },
    { id: "Sauna", label: "Sauna & Steam" },
    { id: "CrossFit", label: "CrossFit & Turf" },
    { id: "Smoothie", label: "Smoothie Bar" },
    { id: "Valet", label: "Valet Parking" },
  ];

  const filteredBranches = useMemo(() => {
    if (selectedAmenityFilter === "ALL") return branchesData;
    return branchesData.filter((b) =>
      b.keyFeatures.some((feat) =>
        feat.toLowerCase().includes(selectedAmenityFilter.toLowerCase())
      )
    );
  }, [selectedAmenityFilter]);

  const activeBranch =
    filteredBranches.find((b) => b.id === activeBranchId) ||
    filteredBranches[0] ||
    branchesData[0];

  return (
    <section id="branches" className="py-24 bg-[#080808] text-white relative overflow-hidden border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-red-950/80 text-red-400 border border-red-800/50 mb-4">
            3 Flagship Locations Across Islamabad
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight font-display">
            Explore Our <span className="text-red-500">Premium Branches</span>
          </h2>
          <p className="mt-4 text-neutral-400 text-base sm:text-lg font-body">
            Find your nearest club, check live crowd density, and book an instant branch tour.
          </p>
        </div>

        {/* Amenity Filter Tags */}
        <div className="flex flex-wrap justify-center items-center gap-2 mb-8">
          <span className="text-xs text-neutral-400 font-semibold uppercase tracking-wider mr-2">Filter By:</span>
          {amenityFilters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => {
                setSelectedAmenityFilter(filter.id);
                const matching = branchesData.find((b) =>
                  filter.id === "ALL" ? true : b.keyFeatures.some((f) => f.toLowerCase().includes(filter.id.toLowerCase()))
                );
                if (matching) setActiveBranchId(matching.id);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border ${
                selectedAmenityFilter === filter.id
                  ? "bg-red-600/30 border-red-500 text-red-300 shadow-sm shadow-red-500/20"
                  : "bg-neutral-900/80 border-neutral-800 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Branch Selector Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {branchesData.map((branch) => {
            const isSelected = branch.id === activeBranch.id;
            const isMatch = filteredBranches.some((fb) => fb.id === branch.id);
            return (
              <button
                key={branch.id}
                onClick={() => setActiveBranchId(branch.id)}
                className={`px-6 py-3.5 rounded-2xl font-bold text-sm transition-all duration-300 flex items-center gap-3 border ${
                  isSelected
                    ? "bg-red-600 border-red-500 text-white shadow-xl shadow-red-600/30 scale-105"
                    : isMatch
                    ? "bg-neutral-900/90 border-neutral-800 text-neutral-300 hover:border-neutral-700 hover:text-white"
                    : "bg-neutral-950/60 border-neutral-900 text-neutral-500 opacity-60"
                }`}
              >
                <span>📍 {branch.name}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                  isSelected ? "bg-white/20 text-white" : "bg-neutral-800 text-neutral-400"
                }`}>
                  {branch.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Branch Showcase Card */}
        <div className="bg-gradient-to-br from-neutral-900 to-[#111111] border border-neutral-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Info & Hours */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                  Open Today • Full Facilities Active
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">{activeBranch.name}</h3>
                <p className="text-sm text-neutral-400 mt-2 flex items-start gap-2">
                  <span className="text-red-500 text-base">📌</span>
                  {activeBranch.address}
                </p>
              </div>

              {/* Operating Hours Box */}
              <div className="bg-neutral-950/80 border border-neutral-800/80 rounded-2xl p-5 space-y-3">
                <span className="text-xs uppercase font-semibold tracking-wider text-neutral-400">
                  Operating Schedule
                </span>
                <div className="flex justify-between items-center text-sm border-b border-neutral-800/60 pb-2">
                  <span className="text-neutral-300">Monday – Saturday</span>
                  <span className="font-mono font-bold text-white">{activeBranch.hours.weekdays}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-neutral-300">Sunday</span>
                  <span className="font-mono font-bold text-amber-400">{activeBranch.hours.sunday}</span>
                </div>
              </div>

              {/* Key Features */}
              <div>
                <span className="text-xs uppercase font-semibold tracking-wider text-neutral-400 block mb-3">
                  Branch Amenities & Features
                </span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeBranch.keyFeatures.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-neutral-300">
                      <span className="text-red-500 font-bold">✓</span>
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-4">
                <a
                  href={activeBranch.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-sm font-semibold rounded-xl transition-colors flex items-center gap-2 border border-neutral-700"
                >
                  🗺️ Google Maps
                </a>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(activeBranch.mapUrl);
                    setCopiedMap(true);
                    setTimeout(() => setCopiedMap(false), 2000);
                  }}
                  className="px-4 py-3 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white text-sm font-medium rounded-xl transition-all flex items-center gap-2 border border-neutral-800"
                  title="Copy location link to clipboard"
                >
                  {copiedMap ? "✅ Link Copied" : "📋 Copy Link"}
                </button>
                <a
                  href={`https://wa.me/923000000000?text=${encodeURIComponent(`Hi Power Fitness Zone, I would like to inquire about training at ${activeBranch.name}!`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 bg-emerald-700 hover:bg-emerald-600 text-white text-sm font-semibold rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-emerald-700/25"
                >
                  💬 WhatsApp Branch
                </a>
                <a
                  href={`tel:${activeBranch.phone.replace(/[^0-9+]/g, "")}`}
                  className="px-5 py-3 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-red-600/30"
                >
                  📞 Call Desk
                </a>
              </div>
            </div>

            {/* Right: Crowd & Peak Hours Visualizer */}
            <div className="lg:col-span-6 bg-neutral-950/90 border border-neutral-800/90 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
                  <h4 className="font-bold text-white text-base flex items-center gap-2">
                    <span className="w-2.5 h-5 bg-red-500 rounded-full inline-block" />
                    Live Floor Traffic & Peak Times
                  </h4>
                  <span className="text-xs text-neutral-400">Typical Pattern</span>
                </div>

                <div className="mt-4 mb-5 p-3 rounded-xl bg-neutral-900/60 border border-neutral-800 flex items-center gap-3">
                  <span className="text-xl">⚡</span>
                  <div className="text-xs">
                    <span className="text-emerald-400 font-bold block">Smart Training Insight</span>
                    <span className="text-neutral-400">Train before 5:00 PM for maximum rack and trainer availability.</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {activeBranch.crowdLevels.map((slot, i) => (
                    <div key={i} className="space-y-1.5">
                      <div className="flex justify-between items-center text-xs font-semibold">
                        <span className="text-neutral-300 font-mono">{slot.timeSlot}</span>
                        <span className={`px-2 py-0.5 rounded text-[11px] ${
                          slot.level === "Peak"
                            ? "bg-red-950 text-red-400 border border-red-800/60"
                            : slot.level === "Moderate"
                            ? "bg-amber-950 text-amber-400 border border-amber-800/60"
                            : "bg-emerald-950 text-emerald-400 border border-emerald-800/60"
                        }`}>
                          {slot.level} Traffic ({slot.percent}%)
                        </span>
                      </div>
                      <div className="w-full bg-neutral-800 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            slot.level === "Peak"
                              ? "bg-gradient-to-r from-red-600 to-red-500"
                              : slot.level === "Moderate"
                              ? "bg-gradient-to-r from-amber-500 to-amber-400"
                              : "bg-gradient-to-r from-emerald-600 to-emerald-400"
                          }`}
                          style={{ width: `${slot.percent}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-400">
                <span>Multi-branch pass holders can access all 3 locations anytime.</span>
                <a href="#contact" className="text-red-400 hover:text-red-300 font-semibold underline">
                  Request Branch Tour →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

