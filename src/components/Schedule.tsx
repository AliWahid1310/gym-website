"use client";

import { useState } from "react";
import Image from "next/image";
import {
  schedule,
  categories,
  days,
  type Day,
  type ClassCategory,
} from "@/data/schedule";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import Button from "@/components/ui/Button";

export default function Schedule() {
  const [selectedDay, setSelectedDay] = useState<Day>("Monday");
  const [selectedCategory, setSelectedCategory] =
    useState<ClassCategory>("all");
  const [ref, isVisible] = useScrollReveal<HTMLElement>({ threshold: 0.05 });

  const filteredClasses = schedule[selectedDay].filter(
    (cls) =>
      selectedCategory === "all" || cls.category === selectedCategory
  );

  return (
    <section
      id="schedule"
      ref={ref}
      className="relative bg-brand-off-white py-24 sm:py-32 lg:py-40"
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
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-[2px] bg-brand-red" />
            <span className="text-brand-red text-xs font-semibold uppercase tracking-[0.25em] font-body">
              Weekly Timetable
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-black uppercase leading-[0.95]">
            Class Schedule
          </h2>
        </div>

        {/* Category Tabs */}
        <div
          className={`flex gap-1 mb-8 overflow-x-auto scrollbar-hide transition-all duration-700 delay-200 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2.5 text-xs font-semibold uppercase tracking-widest font-body whitespace-nowrap transition-all duration-300 ${
                selectedCategory === cat.id
                  ? "text-white bg-brand-red"
                  : "text-brand-black/60 bg-transparent hover:text-brand-black hover:bg-black/5"
              }`}
              aria-pressed={selectedCategory === cat.id}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Day Selector */}
        <div
          className={`flex gap-[2px] mb-10 overflow-x-auto scrollbar-hide transition-all duration-700 delay-300 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`flex-1 min-w-[100px] py-3.5 text-center text-xs sm:text-sm font-semibold uppercase tracking-wider font-body transition-all duration-300 ${
                selectedDay === day
                  ? "bg-brand-black text-white"
                  : "bg-white text-brand-black/50 hover:bg-brand-black/5 hover:text-brand-black"
              }`}
              aria-pressed={selectedDay === day}
            >
              <span className="hidden sm:inline">{day}</span>
              <span className="sm:hidden">{day.slice(0, 3)}</span>
            </button>
          ))}
        </div>

        {/* Class List */}
        <div className="space-y-[2px]">
          {filteredClasses.length === 0 ? (
            <div className="bg-white py-16 text-center">
              <p className="text-brand-black/40 font-body text-sm">
                No classes scheduled for this selection.
              </p>
            </div>
          ) : (
            filteredClasses.map((cls, i) => (
              <div
                key={cls.id}
                className={`bg-white flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-0 p-5 sm:p-6 transition-all duration-500 hover:bg-brand-off-white group ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
                style={{
                  transitionDelay: isVisible ? `${400 + i * 80}ms` : "0ms",
                }}
              >
                {/* Red left accent */}
                <div className="hidden sm:block w-1 h-14 bg-brand-red mr-6 flex-shrink-0 transition-all duration-300 group-hover:h-16" />

                {/* Time */}
                <div className="sm:w-28 flex-shrink-0">
                  <span className="font-display text-xl sm:text-2xl font-bold text-brand-black">
                    {cls.time}
                  </span>
                </div>

                {/* Class Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-display text-lg font-bold text-brand-black uppercase">
                    {cls.name}
                  </h4>
                  <div className="flex items-center gap-3 mt-1">
                    <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0 bg-brand-off-white">
                      <Image
                        src={cls.instructorImage}
                        alt={cls.instructor}
                        width={24}
                        height={24}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <span className="text-brand-black/50 text-sm font-body">
                      {cls.instructor}
                    </span>
                  </div>
                </div>

                {/* Duration */}
                <div className="sm:w-24 flex-shrink-0">
                  <span className="inline-block bg-brand-off-white text-brand-black/60 text-xs font-semibold uppercase tracking-wider px-3 py-1.5 font-body">
                    {cls.duration}
                  </span>
                </div>

                {/* Book Button */}
                <div className="sm:w-36 flex-shrink-0 sm:text-right">
                  <Button variant="primary" size="sm">
                    Book Now
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
