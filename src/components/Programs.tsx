"use client";

import { useState } from "react";
import Image from "next/image";
import { programs, Program } from "@/data/programs";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function Programs() {
  const [ref, isVisible] = useScrollReveal<HTMLElement>({ threshold: 0.05 });
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [activeModalProgram, setActiveModalProgram] = useState<Program | null>(null);

  const categories = ["ALL", "STRENGTH", "CARDIO", "COMBAT", "RECOVERY", "ATHLETIC", "BODYWEIGHT", "ENDURANCE"];

  const filteredPrograms = selectedCategory === "ALL"
    ? programs
    : programs.filter((p) => p.category === selectedCategory);

  return (
    <section
      id="programs"
      ref={ref}
      className="relative bg-brand-white py-24 sm:py-32 lg:py-40"
    >
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
        {/* Header */}
        <div
          className={`mb-12 transition-all duration-1000 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-[2px] bg-brand-red" />
                <span className="text-brand-red text-xs font-semibold uppercase tracking-[0.25em] font-body">
                  What We Offer
                </span>
              </div>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-black uppercase leading-[0.95]">
                Our Programs
              </h2>
            </div>
            <p className="text-neutral-600 max-w-md text-sm sm:text-base font-body">
              Scientifically engineered training regimens designed to sculpt muscle, torch body fat, and elevate peak athletic performance.
            </p>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider font-body transition-all duration-200 border ${
                selectedCategory === cat
                  ? "bg-brand-red border-brand-red text-white shadow-md shadow-brand-red/25"
                  : "bg-neutral-100 border-neutral-200 text-neutral-600 hover:border-brand-red/40 hover:text-brand-black"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Programs Grid — asymmetric layout with gap */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredPrograms.map((program, i) => (
            <div
              key={program.id}
              onClick={() => setActiveModalProgram(program)}
              className={`group relative overflow-hidden cursor-pointer bg-brand-dark transition-all duration-700 shadow-md hover:shadow-2xl hover:shadow-brand-red/10 premium-card-glow ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              } ${
                /* Make first card span 2 rows on large screens when displaying all */
                selectedCategory === "ALL" && i === 0 ? "lg:row-span-2 lg:h-full" : ""
              }`}
              style={{
                transitionDelay: isVisible ? `${(i % 6) * 100}ms` : "0ms",
              }}
            >
              <div
                className={`relative overflow-hidden w-full ${
                  selectedCategory === "ALL" && i === 0 ? "h-[450px] sm:h-[550px] lg:h-full min-h-[450px] lg:min-h-0" : "h-[340px] sm:h-[370px]"
                }`}
              >
                <Image
                  src={program.image}
                  alt={`${program.name} program at Power Fitness Zone`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes={selectedCategory === "ALL" && i === 0 ? "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
                />

                {/* Glassmorphic Category Tag & Burn Badge */}
                <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between pointer-events-none">
                  <span className="px-3.5 py-1 text-[10px] font-bold tracking-[0.15em] text-white bg-brand-black/75 backdrop-blur-md border border-white/10 group-hover:border-brand-red/50 group-hover:bg-brand-red transition-all duration-300 uppercase font-body">
                    {program.category}
                  </span>
                  <span className="px-2.5 py-1 text-[10px] font-bold text-amber-300 bg-black/80 backdrop-blur-md border border-amber-500/30 rounded-full font-mono">
                    🔥 {program.caloriesBurn}
                  </span>
                </div>

                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/50 to-transparent transition-opacity duration-300 group-hover:opacity-90" />

                {/* Top border highlight on hover */}
                <div className="absolute top-0 left-0 w-full h-[3px] bg-brand-red scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                {/* Content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 flex flex-col justify-end h-full z-10">
                  <h3
                    className={`font-display text-white uppercase font-bold leading-tight mb-2 transition-colors duration-300 group-hover:text-brand-red ${
                      selectedCategory === "ALL" && i === 0
                        ? "text-3xl sm:text-4xl"
                        : "text-xl sm:text-2xl"
                    }`}
                  >
                    {program.name}
                  </h3>
                  <p className="text-white/70 text-sm font-body leading-relaxed mb-4 max-w-sm transition-colors duration-300 group-hover:text-white/95 line-clamp-2">
                    {program.description}
                  </p>

                  {/* Metadata: Duration, Frequency and Intensity */}
                  <div className="flex flex-wrap items-center gap-3 text-white/60 text-[11px] font-semibold uppercase tracking-wider font-body mb-5 transition-colors duration-300 group-hover:text-white/90">
                    <div className="flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-brand-red">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      <span>{program.duration}</span>
                    </div>
                    <div className="w-1 h-1 bg-brand-red rounded-full" />
                    <div className="flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-brand-red">
                        <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
                      </svg>
                      <span>{program.intensity}</span>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-2 text-brand-red text-xs font-bold uppercase tracking-[0.2em] font-body group-hover:gap-3 transition-all duration-300">
                    View Syllabus & Details
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      <path
                        d="M6 12L10 8L6 4"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="square"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Program Details Modal */}
        {activeModalProgram && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
            <div className="relative w-full max-w-2xl bg-neutral-950 border border-neutral-800 rounded-3xl p-6 sm:p-8 text-white shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setActiveModalProgram(null)}
                className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center rounded-full bg-neutral-900 border border-neutral-700 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                aria-label="Close modal"
              >
                ✕
              </button>

              <div className="flex items-center gap-2.5 mb-3">
                <span className="px-3 py-1 bg-red-600/20 text-red-400 border border-red-500/30 rounded-full text-xs font-bold uppercase tracking-wider">
                  {activeModalProgram.category}
                </span>
                <span className="text-xs text-neutral-400">
                  {activeModalProgram.frequency}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold uppercase font-display tracking-tight text-white mb-2">
                {activeModalProgram.name}
              </h3>
              <p className="text-neutral-300 text-sm leading-relaxed mb-6 font-body">
                {activeModalProgram.description}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-3.5">
                  <span className="text-[11px] text-neutral-400 uppercase tracking-wider block mb-1">Session Duration</span>
                  <span className="text-sm font-bold text-white font-mono">{activeModalProgram.duration}</span>
                </div>
                <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-3.5">
                  <span className="text-[11px] text-neutral-400 uppercase tracking-wider block mb-1">Target Burn</span>
                  <span className="text-sm font-bold text-amber-400 font-mono">{activeModalProgram.caloriesBurn}</span>
                </div>
                <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-3.5 col-span-2 sm:col-span-1">
                  <span className="text-[11px] text-neutral-400 uppercase tracking-wider block mb-1">Intensity</span>
                  <span className="text-sm font-bold text-red-400">{activeModalProgram.intensity}</span>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-xs uppercase font-bold tracking-wider text-neutral-400 mb-3">
                  Program Highlights & Inclusions
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeModalProgram.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 bg-neutral-900/50 border border-neutral-800/80 rounded-xl p-3 text-xs text-neutral-200">
                      <span className="text-red-500 font-bold">✓</span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-neutral-800">
                <a
                  href="#contact"
                  onClick={() => setActiveModalProgram(null)}
                  className="w-full sm:w-auto flex-1 py-3 px-6 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-center text-sm uppercase tracking-wider transition-colors shadow-lg shadow-red-600/30"
                >
                  Book Free Trial Pass
                </a>
                <button
                  onClick={() => setActiveModalProgram(null)}
                  className="w-full sm:w-auto py-3 px-6 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 font-semibold rounded-xl text-sm transition-colors border border-neutral-800"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

