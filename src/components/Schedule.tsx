"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  schedule,
  categories,
  days,
  type Day,
  type ClassCategory,
  type ClassSession,
} from "@/data/schedule";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface BookingRecord {
  id: string;
  className: string;
  day: Day;
  time: string;
  instructor: string;
  duration: string;
  bookedAt: string;
}

export default function Schedule() {
  const [selectedDay, setSelectedDay] = useState<Day>("Monday");
  const [selectedCategory, setSelectedCategory] = useState<ClassCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [bookingClass, setBookingClass] = useState<ClassSession | null>(null);
  const [bookedSuccess, setBookedSuccess] = useState(false);
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userBranch, setUserBranch] = useState("F-7 Markaz");
  const [myBookings, setMyBookings] = useState<BookingRecord[]>([]);
  const [showBookingsModal, setShowBookingsModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [ref, isVisible] = useScrollReveal<HTMLElement>({ threshold: 0.05 });

  // Load bookings from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("pfz_booked_classes");
      if (saved) {
        setMyBookings(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  const saveBookings = (updated: BookingRecord[]) => {
    setMyBookings(updated);
    try {
      localStorage.setItem("pfz_booked_classes", JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const filteredClasses = schedule[selectedDay].filter((cls) => {
    const matchesCategory = selectedCategory === "all" || cls.category === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      cls.name.toLowerCase().includes(query) ||
      cls.instructor.toLowerCase().includes(query) ||
      cls.time.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  const isAlreadyBooked = (classId: string) => {
    return myBookings.some((b) => b.id === `${selectedDay}-${classId}`);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName || !userPhone || !bookingClass) return;

    const newRecord: BookingRecord = {
      id: `${selectedDay}-${bookingClass.id}`,
      className: bookingClass.name,
      day: selectedDay,
      time: bookingClass.time,
      instructor: bookingClass.instructor,
      duration: bookingClass.duration,
      bookedAt: new Date().toLocaleDateString("en-PK", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    const updated = [newRecord, ...myBookings.filter((b) => b.id !== newRecord.id)];
    saveBookings(updated);
    setBookedSuccess(true);
    showToast(`Spot reserved for ${bookingClass.name}!`);
  };

  const cancelBooking = (bookingId: string) => {
    const updated = myBookings.filter((b) => b.id !== bookingId);
    saveBookings(updated);
    showToast("Class reservation cancelled.");
  };

  const downloadIcsCalendar = (cls: { name: string; day: string; time: string; instructor: string; duration: string }) => {
    const icsData = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Power Fitness Zone Islamabad//Class Schedule//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      `SUMMARY:🏋️ ${cls.name} at Power Fitness Zone`,
      `DESCRIPTION:Workout session with Coach ${cls.instructor}. Duration: ${cls.duration}. Bring your gym towel & water bottle!`,
      "LOCATION:Power Fitness Zone, Islamabad, Pakistan",
      "STATUS:CONFIRMED",
      `CREATED:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsData], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `pfz-${cls.name.toLowerCase().replace(/\s+/g, "-")}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast("Calendar event file (.ics) downloaded!");
  };

  const handleWhatsAppBooking = () => {
    if (!bookingClass) return;
    const msg = encodeURIComponent(
      `Hello Power Fitness Zone! I want to confirm my spot for:\n\n🔥 Class: ${bookingClass.name}\n📅 Day: ${selectedDay} at ${bookingClass.time}\n🏋️ Instructor: Coach ${bookingClass.instructor}\n🏢 Branch: ${userBranch}\n👤 Name: ${userName}\n📞 Phone: ${userPhone}`
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
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-neutral-900 text-white border border-brand-red/40 px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 animate-fadeIn">
          <span className="w-2.5 h-2.5 rounded-full bg-brand-red animate-pulse" />
          <p className="text-xs sm:text-sm font-semibold">{toastMessage}</p>
        </div>
      )}

      <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
        {/* Header with Reservations Button */}
        <div
          className={`mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-[2px] bg-brand-red" />
              <span className="text-brand-red text-xs font-semibold uppercase tracking-[0.25em] font-body">
                Weekly Master Timetable
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-black uppercase leading-[0.95]">
              Class Schedule & Booking
            </h2>
            <p className="mt-3 text-neutral-600 text-sm sm:text-base max-w-2xl font-body">
              Reserve your spot up to 7 days in advance. High-intensity group workouts coached by Islamabad&apos;s leading IFBB & ACE certified trainers.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowBookingsModal(true)}
              className="relative px-5 py-3 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs uppercase font-bold tracking-wider transition-all flex items-center gap-2.5 shadow-md"
            >
              <svg className="w-4 h-4 text-brand-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              My Booked Spots
              {myBookings.length > 0 && (
                <span className="bg-brand-red text-white text-[11px] font-mono px-2 py-0.5 rounded-full font-bold">
                  {myBookings.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Search & Category Filter Bar */}
        <div
          className={`flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {/* Category Tabs */}
          <div className="flex gap-1.5 overflow-x-auto scrollbar-hide py-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 sm:px-5 py-2.5 text-xs font-semibold uppercase tracking-wider font-body whitespace-nowrap rounded-lg transition-all duration-300 ${
                  selectedCategory === cat.id
                    ? "text-white bg-brand-red shadow-md shadow-brand-red/30"
                    : "text-brand-black/70 bg-white hover:text-brand-black hover:bg-neutral-200/70 border border-neutral-200"
                }`}
                aria-pressed={selectedCategory === cat.id}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Quick Search */}
          <div className="relative min-w-[260px]">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search class or coach..."
              className="w-full bg-white border border-neutral-300 focus:border-brand-red rounded-xl px-4 py-2.5 pl-10 text-xs sm:text-sm text-brand-black focus:outline-none placeholder:text-neutral-400 shadow-sm"
            />
            <svg
              className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 text-xs font-bold"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Day Selector */}
        <div
          className={`grid grid-cols-4 sm:grid-cols-7 gap-1.5 sm:gap-2 mb-8 transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {days.map((day) => {
            const dayClassCount = schedule[day].length;
            const isToday = selectedDay === day;
            return (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`py-3 px-2 text-center rounded-xl transition-all duration-300 border ${
                  isToday
                    ? "bg-brand-black text-white border-brand-black shadow-lg"
                    : "bg-white text-brand-black/70 border-neutral-200/80 hover:bg-neutral-100 hover:text-brand-black"
                }`}
                aria-pressed={isToday}
              >
                <span className="block text-xs sm:text-sm font-bold uppercase tracking-wider font-body">
                  <span className="hidden sm:inline">{day}</span>
                  <span className="sm:hidden">{day.slice(0, 3)}</span>
                </span>
                <span className={`text-[10px] font-mono mt-0.5 block ${isToday ? "text-red-400" : "text-neutral-400"}`}>
                  {dayClassCount} {dayClassCount === 1 ? "Class" : "Classes"}
                </span>
              </button>
            );
          })}
        </div>

        {/* Class List */}
        <div className="space-y-3">
          {filteredClasses.length === 0 ? (
            <div className="bg-white py-16 text-center rounded-2xl border border-dashed border-neutral-300">
              <p className="text-brand-black/60 font-body text-sm font-medium">
                No classes match your search query &quot;{searchQuery}&quot; for {selectedDay}.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="mt-3 text-xs text-brand-red font-bold uppercase tracking-wider hover:underline"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            filteredClasses.map((cls, i) => {
              const booked = isAlreadyBooked(cls.id);
              return (
                <div
                  key={cls.id}
                  className={`bg-white rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 sm:p-6 transition-all duration-300 hover:shadow-xl border border-neutral-200/80 hover:border-brand-red/40 group ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{
                    transitionDelay: isVisible ? `${200 + i * 50}ms` : "0ms",
                  }}
                >
                  {/* Left: Time & Studio */}
                  <div className="md:w-44 flex-shrink-0 flex items-center md:flex-col md:items-start justify-between">
                    <div>
                      <span className="font-display text-xl sm:text-2xl font-bold text-brand-black">
                        {cls.time}
                      </span>
                      <span className="block text-[11px] text-neutral-400 font-mono">Islamabad Standard</span>
                    </div>
                    <span className="text-[10px] uppercase font-bold bg-neutral-100 text-neutral-600 px-2.5 py-1 rounded-md border border-neutral-200">
                      Studio A • {cls.category}
                    </span>
                  </div>

                  {/* Middle: Class & Instructor Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <h4 className="font-display text-lg sm:text-xl font-bold text-brand-black uppercase tracking-tight">
                        {cls.name}
                      </h4>
                      {booked && (
                        <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          ✓ Booked
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0 bg-brand-off-white ring-2 ring-neutral-200">
                        <Image
                          src={cls.instructorImage}
                          alt={cls.instructor}
                          width={28}
                          height={28}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <span className="text-brand-black/80 text-xs sm:text-sm font-body font-semibold">
                        Coach {cls.instructor}
                      </span>
                      <span className="text-neutral-300">•</span>
                      <span className="text-neutral-500 text-xs font-mono">
                        {cls.duration}
                      </span>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex items-center gap-2.5 self-end md:self-center">
                    <button
                      onClick={() =>
                        downloadIcsCalendar({
                          name: cls.name,
                          day: selectedDay,
                          time: cls.time,
                          instructor: cls.instructor,
                          duration: cls.duration,
                        })
                      }
                      title="Add to iCal / Google Calendar"
                      className="p-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-xl transition-colors text-xs font-semibold flex items-center gap-1.5"
                    >
                      <svg className="w-4 h-4 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span className="hidden lg:inline">.ics</span>
                    </button>

                    {booked ? (
                      <button
                        onClick={() => cancelBooking(`${selectedDay}-${cls.id}`)}
                        className="px-4 py-2.5 bg-neutral-200 hover:bg-red-100 hover:text-red-700 text-neutral-700 text-xs font-bold uppercase rounded-xl transition-all"
                      >
                        Cancel Spot
                      </button>
                    ) : (
                      <button
                        onClick={() => setBookingClass(cls)}
                        className="px-5 py-2.5 bg-brand-red hover:bg-red-700 text-white font-display font-bold text-xs uppercase tracking-wider transition-all rounded-xl shadow-md shadow-brand-red/20 flex items-center gap-1.5"
                      >
                        Reserve Spot
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* User Bookings Drawer / Modal */}
      {showBookingsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl text-white">
            <div className="bg-gradient-to-r from-red-950 to-neutral-900 px-6 py-5 border-b border-neutral-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-red-400 uppercase tracking-widest block">Member Portal</span>
                <h3 className="text-xl font-bold uppercase">My Reserved Classes</h3>
              </div>
              <button
                onClick={() => setShowBookingsModal(false)}
                className="w-8 h-8 rounded-full bg-neutral-800 text-white flex items-center justify-center text-lg font-bold hover:bg-neutral-700"
              >
                ×
              </button>
            </div>

            <div className="p-6 max-h-[70vh] overflow-y-auto space-y-3">
              {myBookings.length === 0 ? (
                <div className="text-center py-10 text-neutral-400 space-y-2">
                  <div className="text-4xl">📅</div>
                  <p className="text-sm">You haven&apos;t reserved any classes yet.</p>
                  <p className="text-xs text-neutral-500">Select any class from the weekly timetable to lock in your spot.</p>
                </div>
              ) : (
                myBookings.map((b) => (
                  <div
                    key={b.id}
                    className="bg-neutral-950 border border-neutral-800 p-4 rounded-2xl flex items-center justify-between gap-3"
                  >
                    <div>
                      <h5 className="font-bold text-sm text-white">{b.className}</h5>
                      <p className="text-xs text-neutral-400">
                        {b.day} @ {b.time} • Coach {b.instructor} ({b.duration})
                      </p>
                      <span className="text-[10px] text-neutral-500 block mt-1">Booked on {b.bookedAt}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          downloadIcsCalendar({
                            name: b.className,
                            day: b.day,
                            time: b.time,
                            instructor: b.instructor,
                            duration: b.duration,
                          })
                        }
                        title="Download Calendar Reminder"
                        className="p-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-xs"
                      >
                        📅
                      </button>
                      <button
                        onClick={() => cancelBooking(b.id)}
                        title="Cancel Spot"
                        className="p-2 bg-red-950/60 hover:bg-red-900 text-red-300 border border-red-800/60 rounded-lg text-xs"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-4 bg-neutral-950 border-t border-neutral-800 flex justify-end">
              <button
                onClick={() => setShowBookingsModal(false)}
                className="px-5 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold uppercase rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

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
                      Select Branch *
                    </label>
                    <select
                      value={userBranch}
                      onChange={(e) => setUserBranch(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500"
                    >
                      <option value="F-7 Markaz">F-7 Markaz (Flagship HQ)</option>
                      <option value="Blue Area">Blue Area (Executive Center)</option>
                      <option value="Bahria Town Phase 7">Bahria Town Phase 7</option>
                      <option value="DHA Phase II">DHA Phase II Islamabad</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1">
                      Your Full Name *
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
                      We reserved your spot for <strong className="text-white">{bookingClass.name}</strong> on {selectedDay} at {bookingClass.time} ({userBranch}).
                    </p>
                  </div>

                  <div className="flex flex-col gap-2.5">
                    <button
                      onClick={() =>
                        downloadIcsCalendar({
                          name: bookingClass.name,
                          day: selectedDay,
                          time: bookingClass.time,
                          instructor: bookingClass.instructor,
                          duration: bookingClass.duration,
                        })
                      }
                      className="w-full py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white font-semibold text-xs uppercase tracking-wider rounded-xl transition-all border border-neutral-700 flex items-center justify-center gap-2"
                    >
                      📅 Download iCal Calendar Event (.ics)
                    </button>
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

