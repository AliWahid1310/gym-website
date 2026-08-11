"use client";

import Image from "next/image";
import { programs } from "@/data/programs";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function Programs() {
  const [ref, isVisible] = useScrollReveal<HTMLElement>({ threshold: 0.05 });

  return (
    <section
      id="programs"
      ref={ref}
      className="relative bg-brand-white py-24 sm:py-32 lg:py-40"
    >
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
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
              What We Offer
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-black uppercase leading-[0.95]">
            Our Programs
          </h2>
        </div>

        {/* Programs Grid — asymmetric layout with gap */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {programs.map((program, i) => (
            <div
              key={program.id}
              className={`group relative overflow-hidden cursor-pointer bg-brand-dark transition-all duration-700 shadow-md hover:shadow-2xl hover:shadow-brand-red/10 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              } ${
                /* Make first card span 2 rows on large screens for asymmetry */
                i === 0 ? "lg:row-span-2 lg:h-full" : ""
              }`}
              style={{
                transitionDelay: isVisible ? `${i * 100}ms` : "0ms",
              }}
            >
              <div
                className={`relative overflow-hidden w-full ${
                  i === 0 ? "h-[450px] sm:h-[550px] lg:h-full min-h-[450px] lg:min-h-0" : "h-[320px] sm:h-[350px]"
                }`}
              >
                <Image
                  src={program.image}
                  alt={`${program.name} program at Power Fitness Zone`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes={i === 0 ? "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
                />

                {/* Glassmorphic Category Tag */}
                <div className="absolute top-4 left-4 z-10 transition-transform duration-300 group-hover:-translate-y-0.5">
                  <span className="px-3.5 py-1 text-[10px] font-bold tracking-[0.15em] text-white bg-brand-black/75 backdrop-blur-md border border-white/10 group-hover:border-brand-red/50 group-hover:bg-brand-red transition-all duration-300 uppercase font-body">
                    {program.category}
                  </span>
                </div>

                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/40 to-transparent transition-opacity duration-300 group-hover:opacity-90" />

                {/* Top border highlight on hover */}
                <div className="absolute top-0 left-0 w-full h-[3px] bg-brand-red scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                {/* Content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 flex flex-col justify-end h-full z-10">
                  <h3
                    className={`font-display text-white uppercase font-bold leading-tight mb-2 transition-colors duration-300 group-hover:text-brand-red ${
                      i === 0
                        ? "text-3xl sm:text-4xl"
                        : "text-xl sm:text-2xl"
                    }`}
                  >
                    {program.name}
                  </h3>
                  <p className="text-white/70 text-sm font-body leading-relaxed mb-4 max-w-sm transition-colors duration-300 group-hover:text-white/95">
                    {program.description}
                  </p>

                  {/* Metadata: Duration and Intensity */}
                  <div className="flex items-center gap-3 text-white/50 text-[11px] font-semibold uppercase tracking-wider font-body mb-5 transition-colors duration-300 group-hover:text-white/80">
                    <div className="flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-brand-red">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      <span>{program.duration}</span>
                    </div>
                    <div className="w-1.5 h-1.5 bg-brand-red/50 rounded-full" />
                    <div className="flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-brand-red">
                        <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
                      </svg>
                      <span>{program.intensity} Intensity</span>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-2 text-brand-red text-xs font-bold uppercase tracking-[0.2em] font-body group-hover:gap-3 transition-all duration-300">
                    Learn More
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
      </div>
    </section>
  );
}
