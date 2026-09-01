"use client";

import { useState } from "react";
import { Activity, ShieldCheck, Clock, Users, Zap, RefreshCw, MessageSquare, MapPin } from "lucide-react";

interface EquipmentItem {
  id: string;
  name: string;
  totalUnits: number;
  inUseUnits: number;
  category: "heavy-lift" | "machines" | "cardio" | "recovery";
  icon: string;
  avgWaitMins: number;
}

interface BranchFloorData {
  branchId: string;
  branchName: string;
  location: string;
  managerWhatsApp: string;
  overallCapacityPercent: number;
  steamSaunaStatus: "Active & Heated" | "Scheduled Maintenance" | "Cleaning Cycle";
  equipment: EquipmentItem[];
}

const BRANCH_FLOOR_DATA: Record<string, BranchFloorData> = {
  f8: {
    branchId: "f8",
    branchName: "F-8 Markaz Flagship",
    location: "Main Ayub Market, F-8, Islamabad",
    managerWhatsApp: "923001234567",
    overallCapacityPercent: 62,
    steamSaunaStatus: "Active & Heated",
    equipment: [
      { id: "squat-racks", name: "Eleiko Olympic Squat Racks", totalUnits: 6, inUseUnits: 4, category: "heavy-lift", icon: "🦵", avgWaitMins: 3 },
      { id: "deadlift-platforms", name: "Rubber Shock Deadlift Platforms", totalUnits: 4, inUseUnits: 3, category: "heavy-lift", icon: "🏋️‍♂️", avgWaitMins: 4 },
      { id: "bench-press", name: "Competition Flat & Incline Benches", totalUnits: 8, inUseUnits: 5, category: "heavy-lift", icon: "🛡️", avgWaitMins: 2 },
      { id: "cable-crossover", name: "Dual Cable Crossover Stations", totalUnits: 4, inUseUnits: 3, category: "machines", icon: "⚡", avgWaitMins: 5 },
      { id: "hack-squat", name: "Heavy Plate-Loaded Hack Squat", totalUnits: 2, inUseUnits: 2, category: "machines", icon: "📐", avgWaitMins: 6 },
      { id: "treadmills", name: "LifeFitness Curve & Commercial Treadmills", totalUnits: 14, inUseUnits: 7, category: "cardio", icon: "🏃", avgWaitMins: 0 },
      { id: "sauna-f8", name: "Finnish Cedar Wood Sauna", totalUnits: 12, inUseUnits: 4, category: "recovery", icon: "🧖", avgWaitMins: 0 },
    ],
  },
  bluearea: {
    branchId: "bluearea",
    branchName: "Blue Area Corporate Zone",
    location: "Jinnah Avenue, Blue Area, Islamabad",
    managerWhatsApp: "923007654321",
    overallCapacityPercent: 78,
    steamSaunaStatus: "Active & Heated",
    equipment: [
      { id: "squat-racks", name: "Hammer Strength Power Cages", totalUnits: 4, inUseUnits: 3, category: "heavy-lift", icon: "🦵", avgWaitMins: 5 },
      { id: "deadlift-platforms", name: "Olympic Deadlift Stations", totalUnits: 3, inUseUnits: 2, category: "heavy-lift", icon: "🏋️‍♂️", avgWaitMins: 3 },
      { id: "bench-press", name: "Olympic Bench Press Racks", totalUnits: 6, inUseUnits: 5, category: "heavy-lift", icon: "🛡️", avgWaitMins: 4 },
      { id: "cable-crossover", name: "Functional 8-Stack Cable Tower", totalUnits: 2, inUseUnits: 2, category: "machines", icon: "⚡", avgWaitMins: 7 },
      { id: "stair-climbers", name: "Matrix Stair Climbers & HIIT Bikes", totalUnits: 8, inUseUnits: 4, category: "cardio", icon: "🪜", avgWaitMins: 0 },
      { id: "hydro-massage", name: "HydroMassage & Cryo Recovery Pods", totalUnits: 2, inUseUnits: 1, category: "recovery", icon: "🧊", avgWaitMins: 5 },
    ],
  },
  bahria: {
    branchId: "bahria",
    branchName: "Bahria Town Mega Club",
    location: "Civic Center, Phase 4, Bahria Town",
    managerWhatsApp: "923009988776",
    overallCapacityPercent: 48,
    steamSaunaStatus: "Active & Heated",
    equipment: [
      { id: "squat-racks", name: "Rogue Monster Lite Racks", totalUnits: 8, inUseUnits: 3, category: "heavy-lift", icon: "🦵", avgWaitMins: 0 },
      { id: "deadlift-platforms", name: "Solid Oak Drop Platforms", totalUnits: 6, inUseUnits: 2, category: "heavy-lift", icon: "🏋️‍♂️", avgWaitMins: 0 },
      { id: "bench-press", name: "Wide Grip & Incline Olympic Benches", totalUnits: 10, inUseUnits: 4, category: "heavy-lift", icon: "🛡️", avgWaitMins: 0 },
      { id: "leg-press", name: "Cybex 45° Incline Heavy Leg Press", totalUnits: 4, inUseUnits: 2, category: "machines", icon: "🔩", avgWaitMins: 2 },
      { id: "rowers-skierg", name: "Concept2 Rowers & SkiErgs", totalUnits: 6, inUseUnits: 2, category: "cardio", icon: "🚣", avgWaitMins: 0 },
      { id: "steam-room", name: "Aromatherapy Eucalyptus Steam Room", totalUnits: 15, inUseUnits: 3, category: "recovery", icon: "💨", avgWaitMins: 0 },
    ],
  },
};

export default function GymEquipmentTracker() {
  const [selectedBranch, setSelectedBranch] = useState<string>("f8");
  const [lastRefreshed, setLastRefreshed] = useState<string>("Just now");
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const activeBranchData = BRANCH_FLOOR_DATA[selectedBranch] || BRANCH_FLOOR_DATA.f8;

  const handleManualRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLastRefreshed("Just now (Live sensor ping)");
    }, 600);
  };

  return (
    <section id="equipment-status" className="py-20 bg-zinc-950 text-white relative border-t border-zinc-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Activity className="w-4 h-4 text-blue-400" />
            Real-Time Floor Radar & Wait Estimator
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
            Live Gym Floor & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Rack Availability</span>
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg">
            Check real-time squat rack openings, bench press availability, and sauna status across all Islamabad branches before stepping out.
          </p>
        </div>

        {/* Branch Selector Switcher */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          {Object.entries(BRANCH_FLOOR_DATA).map(([key, branch]) => (
            <button
              key={key}
              onClick={() => setSelectedBranch(key)}
              className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 flex items-center gap-2.5 border ${
                selectedBranch === key
                  ? "bg-blue-600 text-white border-blue-400 shadow-lg shadow-blue-600/30 scale-105"
                  : "bg-zinc-900/90 text-zinc-400 hover:text-white border-zinc-800"
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>{branch.branchName}</span>
            </button>
          ))}
        </div>

        {/* Main Status Dashboard */}
        <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-md">
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
            <div>
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                <h3 className="text-xl font-bold text-white">
                  {activeBranchData.branchName}
                </h3>
              </div>
              <p className="text-xs text-zinc-400 mt-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                {activeBranchData.location}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleManualRefresh}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs text-zinc-300 border border-zinc-700 transition"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-blue-400" : ""}`} />
                <span>{lastRefreshed}</span>
              </button>

              <a
                href={`https://wa.me/${activeBranchData.managerWhatsApp}?text=Hi%20Power%20Fitness%20Zone%20${encodeURIComponent(activeBranchData.branchName)},%20I%20am%20checking%20equipment%20availability`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white transition shadow"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                WhatsApp Desk
              </a>
            </div>
          </div>

          {/* Overall Stats summary pills */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
            <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-xl">
              <span className="text-[11px] text-zinc-400 font-bold uppercase tracking-wider block">Floor Capacity</span>
              <div className="flex items-center justify-between mt-1">
                <span className="text-2xl font-black text-white">{activeBranchData.overallCapacityPercent}%</span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                  activeBranchData.overallCapacityPercent > 75
                    ? "bg-red-950 text-red-400 border border-red-800"
                    : activeBranchData.overallCapacityPercent > 50
                    ? "bg-amber-950 text-amber-400 border border-amber-800"
                    : "bg-emerald-950 text-emerald-400 border border-emerald-800"
                }`}>
                  {activeBranchData.overallCapacityPercent > 75 ? "Busy" : activeBranchData.overallCapacityPercent > 50 ? "Moderate" : "Smooth Flow"}
                </span>
              </div>
            </div>

            <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-xl">
              <span className="text-[11px] text-zinc-400 font-bold uppercase tracking-wider block">Squat Racks Open</span>
              <div className="flex items-center justify-between mt-1">
                <span className="text-2xl font-black text-blue-400">
                  {activeBranchData.equipment[0].totalUnits - activeBranchData.equipment[0].inUseUnits} of {activeBranchData.equipment[0].totalUnits}
                </span>
                <span className="text-xs text-zinc-400 font-mono">
                  {activeBranchData.equipment[0].avgWaitMins > 0 ? `~${activeBranchData.equipment[0].avgWaitMins}m wait` : "No wait"}
                </span>
              </div>
            </div>

            <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-xl">
              <span className="text-[11px] text-zinc-400 font-bold uppercase tracking-wider block">Sauna & Steam Pods</span>
              <div className="flex items-center justify-between mt-1">
                <span className="text-sm font-bold text-emerald-400">{activeBranchData.steamSaunaStatus}</span>
                <span className="text-xs text-zinc-400">🔥 78°C Ready</span>
              </div>
            </div>
          </div>

          {/* Equipment Status Cards Grid */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Live Zone & Station Breakdown
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {activeBranchData.equipment.map((eq) => {
                const freeUnits = eq.totalUnits - eq.inUseUnits;
                const percentInUse = Math.round((eq.inUseUnits / eq.totalUnits) * 100);

                return (
                  <div
                    key={eq.id}
                    className="p-3.5 bg-zinc-950/70 border border-zinc-800/80 rounded-xl flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl p-2 bg-zinc-900 rounded-lg border border-zinc-800">
                        {eq.icon}
                      </span>
                      <div>
                        <p className="font-semibold text-xs sm:text-sm text-white">{eq.name}</p>
                        <p className="text-[11px] text-zinc-500">
                          {freeUnits > 0 ? (
                            <span className="text-emerald-400 font-medium">● {freeUnits} Available Now</span>
                          ) : (
                            <span className="text-red-400 font-medium">● Full (~{eq.avgWaitMins} min queue)</span>
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-mono font-bold text-zinc-300">
                        {eq.inUseUnits}/{eq.totalUnits} in use
                      </span>
                      <div className="w-16 sm:w-20 h-1.5 bg-zinc-800 rounded-full mt-1.5 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${
                            percentInUse >= 90 ? "bg-red-500" : percentInUse >= 60 ? "bg-amber-500" : "bg-emerald-500"
                          }`}
                          style={{ width: `${percentInUse}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
