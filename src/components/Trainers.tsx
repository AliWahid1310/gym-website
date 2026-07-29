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
              <div className="relative overflow-hidden aspect-[3/4] mb-5 bg-brand-gray">
                <Image
                  src={trainer.image}
                  alt={`${trainer.name} — ${trainer.specialty} trainer at 360 Fitness`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />

                {/* Hover overlay with bio */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-red/95 via-brand-red/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end">
                  <div className="p-6 sm:p-8">
                    <p className="text-white text-sm font-body leading-relaxed mb-4">
                      {trainer.bio}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {trainer.certifications.map((cert) => (
                        <span
                          key={cert}
                          className="text-[10px] font-semibold uppercase tracking-wider text-white/80 bg-white/15 px-2.5 py-1 font-body"
                        >
                          {cert}
                        </span>
                      ))}
                    </div>
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
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white uppercase mb-1">
                  {trainer.name}
                </h3>
                <div className="w-8 h-[2px] bg-brand-red mb-2" />
                <span className="text-white/50 text-sm font-body uppercase tracking-wider">
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
