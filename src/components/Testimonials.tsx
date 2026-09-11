"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { testimonials, aggregateRating } from "@/data/testimonials";
import { useScrollReveal } from "@/hooks/useScrollReveal";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill={i < rating ? "#D91E2A" : "#E5E5E5"}
        >
          <path d="M8 0L10.2 5.1L16 5.8L11.8 9.7L12.9 16L8 13L3.1 16L4.2 9.7L0 5.8L5.8 5.1L8 0Z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [selectedGoal, setSelectedGoal] = useState<string>("All");
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [ref, isVisible] = useScrollReveal<HTMLElement>({ threshold: 0.1 });

  const filteredTestimonials = testimonials.filter(
    (t) => selectedGoal === "All" || t.goal === selectedGoal
  );

  const activeIndex = current % filteredTestimonials.length;
  const currentItem = filteredTestimonials[activeIndex] || testimonials[0];

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % filteredTestimonials.length);
  }, [filteredTestimonials.length]);

  const prev = useCallback(() => {
    setCurrent(
      (prev) => (prev - 1 + filteredTestimonials.length) % filteredTestimonials.length
    );
  }, [filteredTestimonials.length]);

  // Auto-rotate unless paused
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 5500);
    return () => clearInterval(timer);
  }, [next, isPaused]);

  return (
    <section
      id="testimonials"
      ref={ref}
      className="relative bg-brand-off-white py-24 sm:py-32 lg:py-40 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
        {/* Aggregate Rating Badge */}
        <div
          className={`text-center mb-12 transition-all duration-1000 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center gap-4 bg-white px-8 py-4 shadow-sm border border-black/5 mb-8 rounded-2xl">
            <span className="font-display text-3xl font-bold text-brand-black">
              {aggregateRating.score}
            </span>
            <div>
              <div className="flex gap-0.5 mb-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <svg
                    key={i}
                    width="18"
                    height="18"
                    viewBox="0 0 16 16"
                    fill="#D91E2A"
                  >
                    <path d="M8 0L10.2 5.1L16 5.8L11.8 9.7L12.9 16L8 13L3.1 16L4.2 9.7L0 5.8L5.8 5.1L8 0Z" />
                  </svg>
                ))}
              </div>
              <span className="text-brand-black/50 text-xs font-body">
                Based on {aggregateRating.totalReviews}+ {aggregateRating.platform}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-[2px] bg-brand-red" />
            <span className="text-brand-red text-xs font-semibold uppercase tracking-[0.25em] font-body">
              What Our Members Say
            </span>
            <div className="w-12 h-[2px] bg-brand-red" />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-black uppercase leading-[0.95]">
            Real Results.
            <br />
            Real People.
          </h2>

          {/* Goal Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {["All", "Strength", "Fat Loss", "Group Classes", "Community"].map((goal) => (
              <button
                key={goal}
                onClick={() => {
                  setSelectedGoal(goal);
                  setCurrent(0);
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 border ${
                  selectedGoal === goal
                    ? "bg-brand-black border-brand-black text-white shadow-sm"
                    : "bg-white border-black/10 text-neutral-600 hover:border-black/30"
                }`}
              >
                {goal}
              </button>
            ))}
          </div>
        </div>

        {/* Testimonial Carousel */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className={`relative max-w-3xl mx-auto transition-all duration-1000 delay-300 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          {/* Quote Card */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-black/5 text-center mb-10 min-h-[220px] flex flex-col items-center justify-center">
            {/* Large quote mark */}
            <svg
              width="40"
              height="30"
              viewBox="0 0 48 36"
              fill="none"
              className="text-brand-red/30 mb-5"
            >
              <path
                d="M0 36V20.4C0 13.6 1.4 8.4 4.2 4.8C7 1.6 11.4 0 17.4 0V7.2C14.2 7.6 11.8 8.8 10.2 10.8C8.6 12.8 7.8 15.4 7.8 18.6H16.8V36H0ZM30 36V20.4C30 13.6 31.4 8.4 34.2 4.8C37 1.6 41.4 0 47.4 0V7.2C44.2 7.6 41.8 8.8 40.2 10.8C38.6 12.8 37.8 15.4 37.8 18.6H46.8V36H30Z"
                fill="currentColor"
              />
            </svg>

            <p
              className="text-base sm:text-lg lg:text-xl font-body text-brand-black/80 leading-relaxed italic mb-8 transition-opacity duration-300 max-w-2xl"
              key={`${selectedGoal}-${activeIndex}`}
            >
              &ldquo;{currentItem.quote}&rdquo;
            </p>

            {/* Member Info */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="w-14 h-14 overflow-hidden rounded-full bg-brand-off-white flex-shrink-0 border-2 border-brand-red">
                <Image
                  src={currentItem.image}
                  alt={currentItem.name}
                  width={56}
                  height={56}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <span className="font-display text-lg font-bold text-brand-black uppercase">
                    {currentItem.name}
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    ✓ Verified
                  </span>
                </div>
                <div className="flex items-center justify-center sm:justify-start gap-2 text-brand-black/50 text-xs font-body mt-0.5">
                  <span>{currentItem.branch}</span>
                  <span>•</span>
                  <span>{currentItem.memberSince}</span>
                </div>
              </div>
              <div className="sm:ml-4">
                <StarRating rating={currentItem.rating} />
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6">
            <button
              onClick={prev}
              className="w-11 h-11 rounded-full border border-brand-black/20 flex items-center justify-center hover:bg-brand-black hover:text-white hover:border-brand-black transition-all duration-300 shadow-sm"
              aria-label="Previous testimonial"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M10 4L6 8L10 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="square"
                />
              </svg>
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {filteredTestimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === activeIndex
                      ? "w-8 bg-brand-red"
                      : "w-2 bg-brand-black/20 hover:bg-brand-black/40"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                  aria-current={i === activeIndex ? "true" : undefined}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-11 h-11 rounded-full border border-brand-black/20 flex items-center justify-center hover:bg-brand-black hover:text-white hover:border-brand-black transition-all duration-300 shadow-sm"
              aria-label="Next testimonial"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M6 4L10 8L6 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="square"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
