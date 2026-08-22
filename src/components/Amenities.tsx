"use client";

import { amenities } from "@/data/amenities";

export default function Amenities() {
  return (
    <section id="amenities" className="py-24 bg-[#0A0A0A] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <span className="text-[#D91E2A] text-xs uppercase tracking-widest font-bold">
            World-Class Standards
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-5xl text-white mt-2 uppercase tracking-wide">
            Premium Amenities & Facilities
          </h2>
          <p className="text-neutral-400 mt-3 text-sm sm:text-base max-w-2xl mx-auto">
            Experience fitness in an elite environment equipped with recovery suites, top-tier lifting zones, and modern member comforts.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {amenities.map((item) => (
            <div
              key={item.id}
              className="group relative bg-[#121212] border border-neutral-800/80 rounded-2xl p-7 hover:border-[#D91E2A]/50 transition-all duration-300 hover:shadow-xl hover:shadow-black/60 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 rounded-xl bg-neutral-900 border border-neutral-700/60 flex items-center justify-center text-2xl group-hover:scale-110 group-hover:border-[#D91E2A]/40 transition-all duration-300">
                  {item.icon}
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-neutral-800/80 text-neutral-300 border border-neutral-700/50">
                  {item.tag}
                </span>
              </div>

              <h3 className="font-heading font-bold text-xl text-white mb-2 group-hover:text-[#D91E2A] transition-colors">
                {item.title}
              </h3>

              <p className="text-neutral-400 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
