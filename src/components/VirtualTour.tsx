"use client";

import { useState } from "react";
import Image from "next/image";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function VirtualTour() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [ref, isVisible] = useScrollReveal<HTMLElement>({ threshold: 0.1 });

  return (
    <section
      id="tour"
      ref={ref}
      className="relative bg-brand-black overflow-hidden"
    >
      <div
        className={`relative w-full h-[50vh] sm:h-[60vh] lg:h-[70vh] transition-all duration-1000 ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-[1.02]"
        }`}
      >
        {/* Cover Image */}
        {!isPlaying && (
          <>
            <Image
              src="/images/gym-interior-wide.jpg"
              alt="Interior view of 360 Fitness — modern equipment and spacious training floor"
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/50" />

            {/* Content overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-5">
              <span className="text-brand-red text-xs font-semibold uppercase tracking-[0.3em] font-body mb-6">
                Explore Our Facility
              </span>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold text-white uppercase leading-[0.95] mb-10">
                Take A Virtual
                <br />
                <span className="text-brand-red">Tour</span>
              </h2>

              {/* Play Button */}
              <button
                onClick={() => setIsPlaying(true)}
                className="group relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center"
                aria-label="Play virtual tour video"
              >
                {/* Outer ring pulse */}
                <span className="absolute inset-0 border-2 border-brand-red/30 animate-ping" />
                {/* Button background */}
                <span className="absolute inset-0 bg-brand-red transition-transform duration-300 group-hover:scale-110" />
                {/* Play icon */}
                <svg
                  width="28"
                  height="32"
                  viewBox="0 0 28 32"
                  fill="none"
                  className="relative z-10 ml-1"
                >
                  <path d="M0 0L28 16L0 32V0Z" fill="white" />
                </svg>
              </button>
            </div>
          </>
        )}

        {/* Video Embed Placeholder */}
        {isPlaying && (
          <div className="absolute inset-0 bg-black flex items-center justify-center">
            {/* Replace this with actual video embed */}
            <div className="text-center">
              <div className="w-16 h-16 border-2 border-brand-red/30 flex items-center justify-center mb-6 mx-auto">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-brand-red"
                >
                  <path
                    d="M4 4L20 12L4 20V4Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <p className="text-white/60 text-sm font-body mb-4">
                Video embed placeholder — replace with YouTube/Vimeo iframe
                or self-hosted video
              </p>
              <button
                onClick={() => setIsPlaying(false)}
                className="text-brand-red text-xs font-semibold uppercase tracking-widest font-body hover:text-brand-red-light transition-colors duration-300"
              >
                ← Back to cover
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
