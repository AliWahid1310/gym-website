"use client";

import { useState, useEffect } from "react";
import {
  Dumbbell,
  Plus,
  Trash2,
  Trophy,
  Save,
  Share2,
  TrendingUp,
  CheckCircle,
  Sparkles,
  Flame,
  Calendar,
  Layers
} from "lucide-react";

interface ExerciseSet {
  id: string;
  weight: number;
  reps: number;
  rpe: number;
  isPR?: boolean;
}

interface LoggedExercise {
  name: string;
  category: string;
  sets: ExerciseSet[];
}

const COMMON_EXERCISES = [
  { name: "Barbell Bench Press", category: "Chest & Triceps" },
  { name: "Barbell Back Squat", category: "Quads & Glutes" },
  { name: "Conventional Deadlift", category: "Posterior Chain" },
  { name: "Standing Overhead Press", category: "Shoulders" },
  { name: "Barbell Bent-Over Row", category: "Upper Back" },
  { name: "Incline Dumbbell Press", category: "Upper Chest" },
  { name: "Romanian Deadlift (RDL)", category: "Hamstrings & Glutes" },
  { name: "Lat Pulldown / Pull-Ups", category: "Lats" },
  { name: "Barbell Bicep Curl", category: "Arms" },
  { name: "Cable Tricep Pushdown", category: "Arms" },
];

export default function WorkoutLogger() {
  const [selectedExercise, setSelectedExercise] = useState<string>("Barbell Bench Press");
  const [sets, setSets] = useState<ExerciseSet[]>([
    { id: "1", weight: 80, reps: 8, rpe: 7.5 },
    { id: "2", weight: 90, reps: 6, rpe: 8.5 },
    { id: "3", weight: 100, reps: 4, rpe: 9.5, isPR: true },
  ]);

  const [workoutDate, setWorkoutDate] = useState<string>(new Date().toISOString().split("T")[0]);
  const [copied, setCopied] = useState<boolean>(false);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  // Load from localStorage on client mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("pfz_current_workout_sets");
      if (saved) {
        setSets(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  // Save to localStorage
  const handleSaveWorkout = () => {
    try {
      localStorage.setItem("pfz_current_workout_sets", JSON.stringify(sets));
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2500);
    } catch {
      // ignore
    }
  };

  const handleAddSet = () => {
    const lastSet = sets[sets.length - 1];
    const newSet: ExerciseSet = {
      id: Date.now().toString(),
      weight: lastSet ? lastSet.weight : 60,
      reps: lastSet ? lastSet.reps : 8,
      rpe: lastSet ? lastSet.rpe : 8,
    };
    setSets([...sets, newSet]);
  };

  const handleRemoveSet = (id: string) => {
    if (sets.length === 1) return;
    setSets(sets.filter((s) => s.id !== id));
  };

  const handleUpdateSet = (id: string, field: keyof ExerciseSet, val: number | boolean) => {
    setSets(
      sets.map((s) => (s.id === id ? { ...s, [field]: val } : s))
    );
  };

  // Metrics
  const totalVolume = sets.reduce((acc, s) => acc + s.weight * s.reps, 0);
  const totalReps = sets.reduce((acc, s) => acc + s.reps, 0);
  const maxWeight = Math.max(...sets.map((s) => s.weight), 0);
  const avgRpe = (sets.reduce((acc, s) => acc + s.rpe, 0) / (sets.length || 1)).toFixed(1);

  // Estimated 1RM from heaviest set
  const heaviestSet = sets.reduce((max, s) => (s.weight > max.weight ? s : max), sets[0] || { weight: 0, reps: 1 });
  const estimated1RM = heaviestSet.reps === 1
    ? heaviestSet.weight
    : Math.round(heaviestSet.weight * (1 + heaviestSet.reps / 30));

  const handleCopyReport = () => {
    const lines = [
      `🏋️ Power Fitness Zone — Daily Workout Log`,
      `📅 Date: ${workoutDate}`,
      `💪 Exercise: ${selectedExercise}`,
      ...sets.map((s, idx) => `  Set ${idx + 1}: ${s.weight} kg × ${s.reps} reps (RPE ${s.rpe})${s.isPR ? " 🏆 PR!" : ""}`),
      `📊 Total Volume: ${totalVolume.toLocaleString()} kg | Est. 1RM: ${estimated1RM} kg`,
    ];
    navigator.clipboard.writeText(lines.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="workout-logger" className="py-20 bg-[#070707] text-white relative overflow-hidden border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-red-950/80 text-red-400 border border-red-800/50 mb-4">
            <Trophy className="w-3.5 h-3.5 text-red-500" />
            <span>Daily Lift & PR Journal</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight uppercase">
            Gym Set Logger & <span className="text-red-500">Volume Tracker</span>
          </h2>
          <p className="mt-3 text-neutral-400 text-sm sm:text-base">
            Track working sets, calculate total tonnage volume moved, log RPE ratings, and celebrate your heaviest Personal Records (PRs) in real-time.
          </p>
        </div>

        {/* 4 Stats Summary Banner */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="p-5 rounded-2xl bg-neutral-900/90 border border-neutral-800 flex items-center gap-3.5 shadow-lg">
            <div className="p-3 bg-red-600/20 text-red-500 rounded-xl border border-red-500/30">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold block">Total Volume</span>
              <span className="font-mono font-black text-2xl text-white">{totalVolume.toLocaleString()} <span className="text-xs text-red-400 font-sans">KG</span></span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-neutral-900/90 border border-neutral-800 flex items-center gap-3.5 shadow-lg">
            <div className="p-3 bg-blue-600/20 text-blue-500 rounded-xl border border-blue-500/30">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold block">Estimated 1RM</span>
              <span className="font-mono font-black text-2xl text-white">{estimated1RM} <span className="text-xs text-blue-400 font-sans">KG</span></span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-neutral-900/90 border border-neutral-800 flex items-center gap-3.5 shadow-lg">
            <div className="p-3 bg-amber-600/20 text-amber-500 rounded-xl border border-amber-500/30">
              <Flame className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold block">Total Reps</span>
              <span className="font-mono font-black text-2xl text-white">{totalReps} <span className="text-xs text-amber-400 font-sans">reps</span></span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-neutral-900/90 border border-neutral-800 flex items-center gap-3.5 shadow-lg">
            <div className="p-3 bg-emerald-600/20 text-emerald-500 rounded-xl border border-emerald-500/30">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold block">Avg Intensity</span>
              <span className="font-mono font-black text-2xl text-white">RPE {avgRpe}</span>
            </div>
          </div>
        </div>

        {/* Main Logging Board */}
        <div className="bg-neutral-900/90 border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          {/* Top Selection Row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-6 border-b border-neutral-800">
            <div className="flex-1 max-w-md">
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1.5">
                Current Exercise
              </label>
              <select
                value={selectedExercise}
                onChange={(e) => setSelectedExercise(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white font-bold focus:outline-none focus:border-red-500 transition-colors"
              >
                {COMMON_EXERCISES.map((ex) => (
                  <option key={ex.name} value={ex.name}>
                    {ex.name} ({ex.category})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <input
                type="date"
                value={workoutDate}
                onChange={(e) => setWorkoutDate(e.target.value)}
                className="bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-neutral-300 font-mono focus:outline-none focus:border-red-500"
              />
            </div>
          </div>

          {/* Sets Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-neutral-800 text-neutral-400 uppercase text-[11px] tracking-wider">
                  <th className="py-3 px-3">Set</th>
                  <th className="py-3 px-3">Weight (KG)</th>
                  <th className="py-3 px-3">Reps</th>
                  <th className="py-3 px-3">RPE Rating</th>
                  <th className="py-3 px-3">Volume Load</th>
                  <th className="py-3 px-3 text-center">PR Status</th>
                  <th className="py-3 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/60">
                {sets.map((set, index) => {
                  const setVolume = set.weight * set.reps;
                  return (
                    <tr
                      key={set.id}
                      className={`hover:bg-neutral-950/40 transition-colors ${
                        set.isPR ? "bg-red-950/20" : ""
                      }`}
                    >
                      {/* Set Number */}
                      <td className="py-3.5 px-3 font-mono font-bold text-neutral-300">
                        #{index + 1}
                      </td>

                      {/* Weight input */}
                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-1.5">
                          <input
                            type="number"
                            min={0}
                            step={2.5}
                            value={set.weight}
                            onChange={(e) =>
                              handleUpdateSet(set.id, "weight", Number(e.target.value))
                            }
                            className="w-20 bg-neutral-950 border border-neutral-800 rounded-lg px-2.5 py-1.5 text-xs sm:text-sm text-white font-mono font-bold focus:border-red-500 focus:outline-none"
                          />
                          <span className="text-[11px] text-neutral-500 font-mono">kg</span>
                        </div>
                      </td>

                      {/* Reps input */}
                      <td className="py-3.5 px-3">
                        <input
                          type="number"
                          min={1}
                          max={50}
                          value={set.reps}
                          onChange={(e) =>
                            handleUpdateSet(set.id, "reps", Number(e.target.value))
                          }
                          className="w-16 bg-neutral-950 border border-neutral-800 rounded-lg px-2.5 py-1.5 text-xs sm:text-sm text-white font-mono font-bold focus:border-red-500 focus:outline-none"
                        />
                      </td>

                      {/* RPE input */}
                      <td className="py-3.5 px-3">
                        <select
                          value={set.rpe}
                          onChange={(e) =>
                            handleUpdateSet(set.id, "rpe", Number(e.target.value))
                          }
                          className="bg-neutral-950 border border-neutral-800 rounded-lg px-2 py-1.5 text-xs text-neutral-200 font-mono focus:border-red-500 focus:outline-none"
                        >
                          <option value={6}>6.0 (Warm/Light)</option>
                          <option value={7}>7.0 (3 Reps in Tank)</option>
                          <option value={7.5}>7.5 (2-3 Reps in Tank)</option>
                          <option value={8}>8.0 (2 Reps in Tank)</option>
                          <option value={8.5}>8.5 (1-2 Reps in Tank)</option>
                          <option value={9}>9.0 (1 Rep in Tank)</option>
                          <option value={9.5}>9.5 (Maybe 1 Rep)</option>
                          <option value={10}>10.0 (Absolute Max Failure)</option>
                        </select>
                      </td>

                      {/* Calculated Volume */}
                      <td className="py-3.5 px-3 font-mono font-bold text-red-400">
                        {setVolume.toLocaleString()} kg
                      </td>

                      {/* PR Toggle Badge */}
                      <td className="py-3.5 px-3 text-center">
                        <button
                          onClick={() => handleUpdateSet(set.id, "isPR", !set.isPR)}
                          className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider transition-all border ${
                            set.isPR
                              ? "bg-amber-500/20 border-amber-500 text-amber-300 shadow-md shadow-amber-500/20"
                              : "bg-neutral-800/40 border-neutral-700/60 text-neutral-500 hover:text-neutral-300"
                          }`}
                        >
                          {set.isPR ? "🏆 PR HIT!" : "Mark PR"}
                        </button>
                      </td>

                      {/* Delete Action */}
                      <td className="py-3.5 px-3 text-right">
                        <button
                          onClick={() => handleRemoveSet(set.id)}
                          className="p-1.5 rounded-lg text-neutral-500 hover:text-red-400 hover:bg-neutral-800 transition-colors"
                          title="Remove Set"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Add Set & Action Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-neutral-800">
            <button
              onClick={handleAddSet}
              className="w-full sm:w-auto py-2.5 px-5 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              <Plus className="w-4 h-4 text-red-500" />
              Add Working Set
            </button>

            <div className="w-full sm:w-auto flex items-center gap-3">
              <button
                onClick={handleCopyReport}
                className="flex-1 sm:flex-initial py-2.5 px-4 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                <Share2 className="w-3.5 h-3.5 text-neutral-300" />
                {copied ? "Copied to Clipboard!" : "Copy Summary"}
              </button>

              <button
                onClick={handleSaveWorkout}
                className="flex-1 sm:flex-initial py-2.5 px-5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 transition-all"
              >
                <Save className="w-3.5 h-3.5" />
                {savedSuccess ? "Saved to Storage!" : "Save Workout"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
