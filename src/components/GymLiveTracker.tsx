"use client";

import { useState } from "react";
import {
  Users,
  Clock,
  MapPin,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  ChevronRight,
  Sun,
  Moon
} from "lucide-react";

interface HourlyCrowdData {
  hour: number;
  timeLabel: string;
  occupancyPercent: number;
  isLadiesOnly?: boolean;
}

const WEEKDAY_HOURLY_DATA: HourlyCrowdData[] = [
  { hour: 6, timeLabel: "6 AM", occupancyPercent: 20 },
  { hour: 7, timeLabel: "7 AM", occupancyPercent: 35 },
  { hour: 8, timeLabel: "8 AM", occupancyPercent: 45 },
  { hour: 9, timeLabel: "9 AM", occupancyPercent: 30 },
  { hour: 10, timeLabel: "10 AM", occupancyPercent: 40, isLadiesOnly: true },
  { hour: 11, timeLabel: "11 AM", occupancyPercent: 55, isLadiesOnly: true },
  { hour: 12, timeLabel: "12 PM", occupancyPercent: 50, isLadiesOnly: true },
  { hour: 13, timeLabel: "1 PM", occupancyPercent: 35, isLadiesOnly: true },
  { hour: 14, timeLabel: "2 PM", occupancyPercent: 40, isLadiesOnly: true },
  { hour: 15, timeLabel: "3 PM", occupancyPercent: 45, isLadiesOnly: true },
  { hour: 16, timeLabel: "4 PM", occupancyPercent: 55 },
  { hour: 17, timeLabel: "5 PM", occupancyPercent: 75 },
  { hour: 18, timeLabel: "6 PM", occupancyPercent: 92 },
  { hour: 19, timeLabel: "7 PM", occupancyPercent: 95 },
  { hour: 20, timeLabel: "8 PM", occupancyPercent: 88 },
  { hour: 21, timeLabel: "9 PM", occupancyPercent: 65 },
  { hour: 22, timeLabel: "10 PM", occupancyPercent: 35 },
  { hour: 23, timeLabel: "11 PM", occupancyPercent: 15 },
];

const WEEKEND_HOURLY_DATA: HourlyCrowdData[] = [
  { hour: 8, timeLabel: "8 AM", occupancyPercent: 30 },
  { hour: 9, timeLabel: "9 AM", occupancyPercent: 45 },
  { hour: 10, timeLabel: "10 AM", occupancyPercent: 60, isLadiesOnly: true },
  { hour: 11, timeLabel: "11 AM", occupancyPercent: 70, isLadiesOnly: true },
  { hour: 12, timeLabel: "12 PM", occupancyPercent: 65, isLadiesOnly: true },
  { hour: 13, timeLabel: "1 PM", occupancyPercent: 40, isLadiesOnly: true },
  { hour: 14, timeLabel: "2 PM", occupancyPercent: 45, isLadiesOnly: true },
  { hour: 15, timeLabel: "3 PM", occupancyPercent: 50, isLadiesOnly: true },
  { hour: 16, timeLabel: "4 PM", occupancyPercent: 65 },
  { hour: 17, timeLabel: "5 PM", occupancyPercent: 80 },
  { hour: 18, timeLabel: "6 PM", occupancyPercent: 85 },
  { hour: 19, timeLabel: "7 PM", occupancyPercent: 80 },
  { hour: 20, timeLabel: "8 PM", occupancyPercent: 60 },
  { hour: 21, timeLabel: "9 PM", occupancyPercent: 40 },
  { hour: 22, timeLabel: "10 PM", occupancyPercent: 20 },
];

export default function GymLiveTracker() {
  const [selectedBranch, setSelectedBranch] = useState<"i8" | "g11">("i8");
  const [selectedDay, setSelectedDay] = useState<"mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun">("mon");
  const [selectedHour, setSelectedHour] = useState<number>(18); // Default 6 PM peak

  const isWeekend = selectedDay === "sat" || selectedDay === "sun";
  const hourlyData = isWeekend ? WEEKEND_HOURLY_DATA : WEEKDAY_HOURLY_DATA;

  const currentSlot = hourlyData.find((d) => d.hour === selectedHour) || hourlyData[0];

  let statusBadge = {
    label: "Optimal Time - Low Wait",
    color: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
    barColor: "bg-emerald-500",
    description: "Zero waiting times for power racks, cable stations, and free weights.",
  };

  if (currentSlot.isLadiesOnly) {
    statusBadge = {
      label: "Ladies Exclusive Hours",
      color: "bg-pink-500/10 border-pink-500/30 text-pink-400",
      barColor: "bg-pink-500",
      description: "100% private female training session with certified female trainers on floor.",
    };
  } else if (currentSlot.occupancyPercent >= 80) {
    statusBadge = {
      label: "Peak Surge - Electric Energy",
      color: "bg-red-500/10 border-red-500/30 text-red-400",
      barColor: "bg-red-500",
      description: "High-voltage gym atmosphere. Plan supersets and ask for equipment sharing.",
    };
  } else if (currentSlot.occupancyPercent >= 50) {
    statusBadge = {
      label: "Moderate Activity",
      color: "bg-yellow-500/10 border-yellow-500/30 text-yellow-400",
      barColor: "bg-yellow-500",
      description: "Comfortable training flow. Ample space across all resistance zones.",
    };
  }

  return (
    <section id="live-tracker" className="py-20 bg-[#0c0c0c] text-white relative overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Users className="w-3.5 h-3.5 text-red-500" />
            Live Islamabad Gym Capacity
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Peak Hours & <span className="text-gradient">Crowd Activity Meter</span>
          </h2>
          <p className="mt-4 text-gray-400 text-sm sm:text-base">
            Plan your workouts effortlessly. Check live floor traffic, machine availability trends, and ladies-exclusive hours before heading out.
          </p>
        </div>

        {/* Control Row: Branch & Day Selector */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#141414] border border-white/10 p-4 rounded-2xl mb-8">
          {/* Branch Selector */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs font-bold text-gray-400 flex items-center gap-1.5 min-w-[60px]">
              <MapPin className="w-4 h-4 text-red-500" />
              Branch:
            </span>
            <div className="flex bg-black/60 p-1 rounded-xl border border-white/10 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setSelectedBranch("i8")}
                className={`flex-1 sm:flex-none px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedBranch === "i8" ? "bg-red-600 text-white shadow-md" : "text-gray-400 hover:text-white"
                }`}
              >
                I-8 Markaz (Flagship)
              </button>
              <button
                type="button"
                onClick={() => setSelectedBranch("g11")}
                className={`flex-1 sm:flex-none px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedBranch === "g11" ? "bg-red-600 text-white shadow-md" : "text-gray-400 hover:text-white"
                }`}
              >
                G-11 Markaz
              </button>
            </div>
          </div>

          {/* Day of Week Selector */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {[
              { id: "mon", label: "Mon" },
              { id: "tue", label: "Tue" },
              { id: "wed", label: "Wed" },
              { id: "thu", label: "Thu" },
              { id: "fri", label: "Fri" },
              { id: "sat", label: "Sat" },
              { id: "sun", label: "Sun" },
            ].map((d) => (
              <button
                key={d.id}
                type="button"
                onClick={() => setSelectedDay(d.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedDay === d.id
                    ? "bg-white text-black shadow"
                    : "bg-black/40 text-gray-400 hover:text-white hover:bg-white/10"
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Display Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Interactive Hourly Visualizer */}
          <div className="lg:col-span-8 bg-[#121212] border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="font-bold text-lg text-white">Daily Traffic Profile</h3>
                  <p className="text-xs text-gray-400">Click any hour below to inspect capacity</p>
                </div>
                <div className="flex items-center gap-3 text-[11px] text-gray-400">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Low
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" /> Medium
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500" /> Peak
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-pink-500" /> Ladies
                  </span>
                </div>
              </div>

              {/* Bar Chart Grid */}
              <div className="grid grid-cols-6 sm:grid-cols-9 md:grid-cols-18 gap-2 items-end h-44 pt-6 pb-2 border-b border-white/10">
                {hourlyData.map((item) => {
                  const isSelected = item.hour === selectedHour;
                  let barColorClass = "bg-emerald-500/70 hover:bg-emerald-400";
                  if (item.isLadiesOnly) barColorClass = "bg-pink-500/80 hover:bg-pink-400";
                  else if (item.occupancyPercent >= 80) barColorClass = "bg-red-500/80 hover:bg-red-400";
                  else if (item.occupancyPercent >= 50) barColorClass = "bg-yellow-500/80 hover:bg-yellow-400";

                  return (
                    <button
                      key={item.hour}
                      type="button"
                      onClick={() => setSelectedHour(item.hour)}
                      className={`flex flex-col items-center h-full justify-end group transition-all relative ${
                        isSelected ? "scale-105" : "opacity-80 hover:opacity-100"
                      }`}
                    >
                      {/* Percent Tooltip */}
                      <span className="text-[10px] text-gray-300 font-mono mb-1 group-hover:text-white">
                        {item.occupancyPercent}%
                      </span>
                      {/* Bar */}
                      <div
                        className={`w-full rounded-t-md transition-all ${barColorClass} ${
                          isSelected ? "ring-2 ring-white shadow-lg" : ""
                        }`}
                        style={{ height: `${Math.max(12, item.occupancyPercent)}%` }}
                      />
                      {/* Label */}
                      <span
                        className={`text-[10px] mt-2 font-medium ${
                          isSelected ? "text-red-400 font-bold" : "text-gray-500"
                        }`}
                      >
                        {item.timeLabel}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Tips Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="bg-black/40 border border-white/5 rounded-xl p-3.5 text-xs">
                <div className="flex items-center gap-1.5 text-amber-400 font-bold mb-1">
                  <Sun className="w-3.5 h-3.5" />
                  Best Morning Slot
                </div>
                <p className="text-gray-300">6:00 AM - 9:00 AM for fastest rack and dumbbell access.</p>
              </div>

              <div className="bg-black/40 border border-white/5 rounded-xl p-3.5 text-xs">
                <div className="flex items-center gap-1.5 text-pink-400 font-bold mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  Ladies Exclusive
                </div>
                <p className="text-gray-300">10:00 AM - 4:00 PM private secure floor access daily.</p>
              </div>

              <div className="bg-black/40 border border-white/5 rounded-xl p-3.5 text-xs">
                <div className="flex items-center gap-1.5 text-blue-400 font-bold mb-1">
                  <Moon className="w-3.5 h-3.5" />
                  Night Owl Lifting
                </div>
                <p className="text-gray-300">9:30 PM - 11:30 PM for quiet focused heavyweight sets.</p>
              </div>
            </div>
          </div>

          {/* Right Column: Selected Slot Status Card */}
          <div className="lg:col-span-4 bg-gradient-to-b from-[#181818] to-[#101010] border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex justify-between items-center">
                <span className="text-xs uppercase tracking-wider text-gray-400 font-bold">
                  {selectedBranch === "i8" ? "I-8 Markaz" : "G-11 Markaz"}
                </span>
                <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${statusBadge.color}`}>
                  {statusBadge.label}
                </span>
              </div>

              <div className="mt-6 mb-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-extrabold text-white font-heading">
                    {currentSlot.occupancyPercent}%
                  </span>
                  <span className="text-sm font-semibold text-gray-400">Capacity Occupancy</span>
                </div>

                <div className="w-full h-2.5 bg-gray-800 rounded-full overflow-hidden mt-3">
                  <div
                    className={`h-full ${statusBadge.barColor} transition-all duration-300`}
                    style={{ width: `${currentSlot.occupancyPercent}%` }}
                  />
                </div>
              </div>

              <div className="mt-6 bg-black/40 border border-white/5 rounded-xl p-4 space-y-2">
                <p className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-red-500" />
                  Time Slot: {currentSlot.timeLabel} ({selectedDay.toUpperCase()})
                </p>
                <p className="text-xs text-gray-300 leading-relaxed">{statusBadge.description}</p>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-white/10">
              <a
                href="#free-pass"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all shadow-lg shadow-red-900/30"
              >
                Claim Free 1-Day Trial Pass
                <ChevronRight className="w-4 h-4" />
              </a>

              <a
                href="https://wa.me/923335557890?text=Hi!%20What%20is%20the%20current%20crowd%20level%20at%20Power%20Fitness%20Zone%20Islamabad?"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs font-semibold transition-all border border-white/5"
              >
                Live Reception WhatsApp Query
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
