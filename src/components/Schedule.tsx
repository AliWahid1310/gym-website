"use client";

import { useState } from "react";
import Image from "next/image";
import {
  schedule,
  categories,
  days,
  type Day,
  type ClassCategory,
  type ClassItem,
} from "@/data/schedule";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function Schedule() {
  const [selectedDay, setSelectedDay] = useState<Day>("Monday");
  const [selectedCategory, setSelectedCategory] = useState<ClassCategory>("all");
  const [bookingClass, setBookingClass] = useState<ClassItem | null>(null);
  const [bookedSuccess, setBookedSuccess] = useState(false);
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [ref, isVisible] = useScrollReveal<HTMLElement>({ threshold: 0.05 });

  const filteredClasses = schedule[selectedDay].filter(
    (cls) => selectedCategory === "all" || cls.category === selectedCategory
  );

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName || !userPhone || !bookingClass) return;

    setBookedSuccess(true);
  };

  const handleWhatsAppBooking = () => {
    if (!bookingClass) return;
    const msg = encodeURIComponent(
      `Hello Power Fitness Zone! I want to confirm my spot for:\n\n🔥 Class: ${bookingClass.name}\n📅 Day: ${selectedDay} at ${bookingClass.time}\n🏋️ Instructor: ${bookingClass.instructor}\n👤 Name: ${userName}\n📞 Phone: ${userPhone}`
    );
    window.open(`https://wa.me/923001234567?text=${msg}`, "_blank");
  };

  const closeModal = () => {
    setBookingClass(null);
    setBookedSuccess(false);
    setUserName("");
    setUserPhone("");
  };

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
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-[2px] bg-brand-red" />
            <span className="text-brand-red text-xs font-semibold uppercase tracking-[0.25em] font-body">
              Weekly Timetable
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-black uppercase leading-[0.95]">
            Class Schedule & Booking
          </h2>
          <p className="mt-3 text-neutral-600 text-sm sm:text-base max-w-2xl font-body">
            Reserve your spot up to 7 days in advance. High-intensity group workouts coached by Islamabad&apos;s leading trainers.
          </p>
        </div>

        {/* Category Tabs */}
        <div
          className={`flex gap-1 mb-8 overflow-x-auto scrollbar-hide transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2.5 text-xs font-semibold uppercase tracking-widest font-body whitespace-nowrap transition-all duration-300 ${
                selectedCategory === cat.id
                  ? "text-white bg-brand-red shadow-md shadow-brand-red/30"
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
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
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
            <div className="bg-white py-16 text-center rounded-2xl">
              <p className="text-brand-black/40 font-body text-sm">
                No classes scheduled for this filter on {selectedDay}.
              </p>
            </div>
          ) : (
            filteredClasses.map((cls, i) => (
              <div
                key={cls.id}
                className={`bg-white flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-0 p-5 sm:p-6 transition-all duration-500 hover:bg-white hover:shadow-lg border-l-4 border-transparent hover:border-brand-red group ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{
                  transitionDelay: isVisible ? `${400 + i * 80}ms` : "0ms",
                }}
              >
                {/* Time */}
                <div className="sm:w-32 flex-shrink-0">
                  <span className="font-display text-xl sm:text-2xl font-bold text-brand-black">
                    {cls.time}
                  </span>
                  <span className="block text-[11px] text-neutral-400 font-mono">Islamabad Standard</span>
                </div>

                {/* Class Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-display text-lg font-bold text-brand-black uppercase">
                      {cls.name}
                    </h4>
                    <span className="text-[10px] uppercase font-bold bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded">
                      Studio A
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0 bg-brand-off-white">
                      <Image
                        src={cls.instructorImage}
                        alt={cls.instructor}
                        width={24}
                        height={24}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <span className="text-brand-black/70 text-sm font-body font-medium">
                      Coach {cls.instructor}
                    </span>
                  </div>
                </div>

                {/* Duration & Capacity */}
                <div className="sm:w-36 flex-shrink-0 flex sm:flex-col items-center sm:items-start gap-2 sm:gap-1">
                  <span className="inline-block bg-brand-off-white text-brand-black/70 text-xs font-semibold uppercase tracking-wider px-3 py-1 font-body rounded">
                    {cls.duration}
                  </span>
                  <span className="text-[11px] text-emerald-600 font-semibold">
                    ● 4 Spots Open
                  </span>
                </div>

                {/* Book Button */}
                <div className="sm:w-36 flex-shrink-0 sm:text-right">
                  <button
                    onClick={() => setBookingClass(cls)}
                    className="w-full sm:w-auto px-5 py-2.5 bg-brand-red hover:bg-red-700 text-white font-display font-bold text-xs uppercase tracking-wider transition-all rounded shadow-md shadow-brand-red/20"
                  >
                    Reserve Spot
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Class Booking Modal */}
      {bookingClass && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl text-white">
            <div className="bg-gradient-to-r from-red-950 to-neutral-900 px-6 py-5 border-b border-neutral-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-red-400 uppercase tracking-widest block">Class Reservation</span>
                <h3 className="text-xl font-bold uppercase">{bookingClass.name}</h3>
              </div>
              <button
                onClick={closeModal}
                className="w-8 h-8 rounded-full bg-neutral-800 text-white flex items-center justify-center text-lg font-bold hover:bg-neutral-700"
              >
                ×
              </button>
            </div>

            <div className="p-6 sm:p-8">
              {!bookedSuccess ? (
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div className="bg-neutral-950 p-4 rounded-2xl border border-neutral-800/80 space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Scheduled:</span>
                      <span className="font-bold text-white">{selectedDay} @ {bookingClass.time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Instructor:</span>
                      <span className="font-semibold text-neutral-200">Coach {bookingClass.instructor}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Duration:</span>
                      <span className="text-neutral-300">{bookingClass.duration}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="e.g. Bilal Khan"
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1">
                      WhatsApp / Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={userPhone}
                      onChange={(e) => setUserPhone(e.target.value)}
                      placeholder="e.g. 0300 1234567"
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-red-600 hover:bg-red-700 font-bold text-sm uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-red-600/30"
                  >
                    Confirm My Reservation
                  </button>
                </form>
              ) : (
                <div className="text-center space-y-5 animate-fadeIn">
                  <div className="w-14 h-14 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400 flex items-center justify-center text-2xl mx-auto">
                    ✓
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white">Spot Reserved!</h4>
                    <p className="text-xs text-neutral-400 mt-1">
                      We reserved your spot for <strong className="text-white">{bookingClass.name}</strong> on {selectedDay} at {bookingClass.time}.
                    </p>
                  </div>

                  <div className="flex flex-col gap-2.5">
                    <button
                      onClick={handleWhatsAppBooking}
                      className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-emerald-600/30"
                    >
                      💬 Send WhatsApp Confirmation
                    </button>
                    <button
                      onClick={closeModal}
                      className="w-full py-2.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-semibold text-xs rounded-xl transition-colors"
                    >
                      Done
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
