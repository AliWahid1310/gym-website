"use client";

import { useState } from "react";
import { transformationsData } from "@/data/transformations";

type FilterCategory = "all" | "fat-loss" | "muscle-gain" | "recomp";

export default function Transformations() {
  const [selectedFilter, setSelectedFilter] = useState<FilterCategory>("all");

  const filteredItems = transformationsData.filter((item) =>
    selectedFilter === "all" ? true : item.category === selectedFilter
  );

  return (
    <section id="transformations" className="py-24 bg-[#0A0A0A] text-white relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 -left-32 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-red-800/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-red-950/80 text-red-400 border border-red-800/50 mb-4">
            Real Proof • Real People
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            Member <span className="text-red-500">Transformations</span>
          </h2>
          <p className="mt-4 text-neutral-400 text-base sm:text-lg">
            Witness the discipline, consistency, and life-changing health outcomes forged inside Power Fitness Zone.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2.5 mt-8">
            {[
              { id: "all", label: "All Stories" },
              { id: "fat-loss", label: "🔥 Fat Loss" },
              { id: "muscle-gain", label: "💪 Hypertrophy" },
              { id: "recomp", label: "⚡ Recomposition" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id as FilterCategory)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 border ${
                  selectedFilter === tab.id
                    ? "bg-red-600 border-red-500 text-white shadow-lg shadow-red-600/30 scale-105"
                    : "bg-neutral-900/80 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-gradient-to-b from-neutral-900 to-[#121212] border border-neutral-800/90 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:border-red-600/50 transition-all duration-300 shadow-xl group"
            >
              <div>
                {/* Header & Badges */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-5 border-b border-neutral-800/70">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-bold text-white group-hover:text-red-400 transition-colors">
                        {item.name}
                      </h3>
                      <span className="text-xs text-neutral-500 font-medium">({item.age} yrs)</span>
                    </div>
                    <p className="text-xs text-neutral-400 mt-0.5">{item.profession} • Coach {item.trainer}</p>
                  </div>
                  <span className="px-3 py-1 bg-red-950/60 border border-red-800/50 text-red-400 text-xs font-bold rounded-full">
                    {item.duration}
                  </span>
                </div>

                {/* Metric Summary Box */}
                <div className="grid grid-cols-3 gap-3 bg-neutral-950/80 border border-neutral-800/80 rounded-2xl p-4 mb-6 text-center">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-neutral-500 block">Start</span>
                    <span className="text-sm sm:text-base font-bold text-neutral-300">{item.startingWeight}</span>
                  </div>
                  <div className="border-x border-neutral-800">
                    <span className="text-[11px] uppercase tracking-wider text-neutral-500 block">Current</span>
                    <span className="text-sm sm:text-base font-bold text-white">{item.currentWeight}</span>
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-red-500 block font-semibold">Result</span>
                    <span className="text-xs sm:text-sm font-black text-red-400">{item.achievement}</span>
                  </div>
                </div>

                {/* Quote */}
                <blockquote className="text-neutral-300 text-sm leading-relaxed italic mb-6 relative pl-4 border-l-2 border-red-600">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>

                {/* Highlights */}
                <div className="space-y-2 mb-6">
                  <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Key Milestones:</span>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {item.highlights.map((h, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center text-xs px-2.5 py-1 rounded-lg bg-neutral-800/70 text-neutral-300 border border-neutral-700/50"
                      >
                        ✓ {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-4 border-t border-neutral-800/70 flex items-center justify-between">
                <span className="text-xs text-neutral-500">
                  Program: <strong className="text-neutral-300 font-semibold">{item.program}</strong>
                </span>
                <a
                  href="#contact"
                  className="text-xs font-bold text-red-400 hover:text-red-300 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                >
                  Start Your Journey →
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner CTA */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-red-950/60 via-neutral-900 to-neutral-900 border border-red-800/40 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h4 className="text-lg sm:text-xl font-bold text-white">Ready to be our next featured success story?</h4>
            <p className="text-sm text-neutral-400 mt-1">Book your free body composition assessment & consult a senior coach today.</p>
          </div>
          <a
            href="#contact"
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-red-600/30 transition-all shrink-0"
          >
            Claim Free Assessment
          </a>
        </div>
      </div>
    </section>
  );
}
