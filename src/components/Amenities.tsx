"use client";

import { useState } from "react";
import { amenities } from "@/data/amenities";

const FACILITY_SPECS = [
  { icon: "⚡", title: "100% Generator Backup", desc: "Zero load-shedding downtime across all zones" },
  { icon: "❄️", title: "Medical Grade HEPA", desc: "Clean hospital-spec conditioned airflow" },
  { icon: "🚗", title: "Valet & Dedicated Parking", desc: "Complimentary secure parking at all branches" },
  { icon: "🛡️", title: "24/7 CCTV & RFID Access", desc: "Strict member-only monitored security" },
];

export default function Amenities() {
  const [selectedTag, setSelectedTag] = useState<string>("All");

  const tags = ["All", ...Array.from(new Set(amenities.map((a) => a.tag)))];

  const filteredAmenities =
    selectedTag === "All"
      ? amenities
      : amenities.filter((a) => a.tag.toLowerCase() === selectedTag.toLowerCase());

  return (
    <section id="amenities" className="py-24 bg-[#0A0A0A] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <span className="text-[#D91E2A] text-xs uppercase tracking-widest font-bold">
            World-Class Standards
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-5xl text-white mt-2 uppercase tracking-wide">
            Premium Amenities & Facilities
          </h2>
          <p className="text-neutral-400 mt-3 text-sm sm:text-base max-w-2xl mx-auto">
            Experience fitness in an elite environment equipped with recovery suites, top-tier lifting zones, and modern member comforts.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                  selectedTag === tag
                    ? "bg-[#D91E2A] text-white shadow-lg shadow-[#D91E2A]/30 scale-105"
                    : "bg-neutral-900 text-neutral-400 border border-neutral-800 hover:text-white hover:border-neutral-700"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAmenities.map((item) => (
            <div
              key={item.id}
              className="group relative bg-[#121212] border border-neutral-800/80 rounded-2xl p-7 hover:border-[#D91E2A]/50 transition-all duration-300 hover:shadow-xl hover:shadow-black/60 hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
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

              <div className="mt-5 pt-4 border-t border-neutral-800/60 flex items-center justify-between text-xs text-neutral-400">
                <span className="inline-flex items-center gap-1.5 text-emerald-400 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Available All Branches
                </span>
                <a
                  href={`https://wa.me/923001234567?text=Hi%2C%20I%20have%20a%20question%20regarding%20the%20${encodeURIComponent(item.title)}%20facility.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors underline decoration-neutral-600 underline-offset-4"
                >
                  Inquire
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Facility Highlights Banner */}
        <div className="mt-14 p-6 rounded-2xl bg-neutral-950/80 border border-neutral-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FACILITY_SPECS.map((spec, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="text-2xl">{spec.icon}</span>
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wide">{spec.title}</h4>
                <p className="text-xs text-neutral-400 mt-0.5">{spec.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
