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

        {/* Programs Grid — asymmetric layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0">
          {programs.map((program, i) => (
            <div
              key={program.id}
              className={`group relative overflow-hidden cursor-pointer transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              } ${
                /* Make first card span 2 rows on large screens for asymmetry */
                i === 0 ? "lg:row-span-2" : ""
              }`}
              style={{
                transitionDelay: isVisible ? `${i * 100}ms` : "0ms",
                height: i === 0 ? undefined : undefined,
              }}
            >
              <div
                className={`relative overflow-hidden ${
                  i === 0 ? "h-[400px] sm:h-[500px] lg:h-full" : "h-[280px] sm:h-[300px]"
                }`}
              >
                <Image
                  src={program.image}
                  alt={`${program.name} program at 360 Fitness`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes={i === 0 ? "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                {/* Red accent — bottom border on hover */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-brand-red scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                {/* Content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                  <h3
                    className={`font-display text-white uppercase font-bold leading-tight mb-2 ${
                      i === 0
                        ? "text-3xl sm:text-4xl"
                        : "text-xl sm:text-2xl"
                    }`}
                  >
                    {program.name}
                  </h3>
                  <p className="text-white/60 text-sm font-body leading-relaxed mb-4 max-w-sm">
                    {program.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-brand-red text-xs font-semibold uppercase tracking-widest font-body group-hover:gap-3 transition-all duration-300">
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
