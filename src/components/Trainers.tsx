"use client";

import Image from "next/image";
import { trainers } from "@/data/trainers";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function Trainers() {
  const [ref, isVisible] = useScrollReveal<HTMLElement>({ threshold: 0.05 });

  return (
    <section
      id="trainers"
      ref={ref}
      className="relative bg-brand-black py-24 sm:py-32 lg:py-40 overflow-hidden"
    >
      {/* Subtle texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-[1400px] mx-auto px-5 sm:px-8">
        {/* Header */}
        <div
          className={`mb-16 transition-all duration-1000 ${
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
                  Meet The Team
                </span>
              </div>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white uppercase leading-[0.95]">
                Our Trainers
              </h2>
            </div>
            <p className="text-neutral-400 max-w-md text-sm sm:text-base font-body">
              Internationally accredited fitness masters and sports nutritionists dedicated to guiding your daily progression.
            </p>
          </div>
        </div>

        {/* Trainer Grid — offset for asymmetry */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
          {trainers.map((trainer, i) => (
            <div
              key={trainer.id}
              className={`group relative transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              } ${
                /* Offset every other card on large screens */
                i % 2 === 1 ? "lg:mt-12" : ""
              }`}
              style={{
                transitionDelay: isVisible ? `${i * 120}ms` : "0ms",
              }}
            >
              {/* Portrait Photo */}
              <div className="relative overflow-hidden aspect-[3/4] mb-5 bg-brand-gray rounded-2xl shadow-xl">
                <Image
                  src={trainer.image}
                  alt={`${trainer.name} — ${trainer.specialty} trainer at Power Fitness Zone`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />

                {/* Top Badge: Experience & Rating */}
                <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
                  <span className="px-2.5 py-1 text-[10px] font-bold tracking-wider text-white bg-black/80 backdrop-blur-md rounded-full border border-white/10 font-mono">
                    ⭐ {trainer.rating.toFixed(1)}
                  </span>
                  <span className="px-2.5 py-1 text-[10px] font-bold tracking-wider text-amber-300 bg-black/80 backdrop-blur-md rounded-full border border-amber-500/20 font-mono">
                    {trainer.experienceYears}y Exp
                  </span>
                </div>

                {/* Hover overlay with bio */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/85 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end">
                  <div className="p-6">
                    <p className="text-white text-xs sm:text-sm font-body leading-relaxed mb-4">
                      {trainer.bio}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {trainer.certifications.map((cert) => (
                        <span
                          key={cert}
                          className="text-[10px] font-semibold uppercase tracking-wider text-white/90 bg-white/15 px-2.5 py-0.5 rounded font-body"
                        >
                          {cert}
                        </span>
                      ))}
                    </div>
                    <a
                      href={`https://wa.me/923000000000?text=${encodeURIComponent(`Hi Power Fitness Zone, I would like to book a 1-on-1 PT consultation with coach ${trainer.name}!`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors shadow-lg shadow-red-600/30"
                    >
                      Book 1-on-1 Trial →
                    </a>
                  </div>
                </div>

                {/* Red corner accent */}
                <div
                  className="absolute top-0 right-0 w-16 h-16 bg-brand-red transition-all duration-500 group-hover:w-20 group-hover:h-20"
                  style={{
                    clipPath: "polygon(100% 0, 0 0, 100% 100%)",
                  }}
                  aria-hidden="true"
                />
              </div>

              {/* Name & Specialty */}
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-white uppercase mb-1">
                    {trainer.name}
                  </h3>
                  <span className="text-xs font-mono text-neutral-400 font-bold">{trainer.clientsTrained} Transformed</span>
                </div>
                <div className="w-8 h-[2px] bg-brand-red mb-2" />
                <span className="text-white/50 text-xs sm:text-sm font-body uppercase tracking-wider block">
                  {trainer.specialty}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

