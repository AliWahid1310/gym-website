"use client";

import { useState } from "react";

interface ExerciseOption {
  id: string;
  name: string;
  category: string;
  defaultSets: { weight: number; reps: number }[];
  targetRepRange: [number, number];
  incrementKg: number;
}

const EXERCISE_PRESETS: ExerciseOption[] = [
  {
    id: "bench",
    name: "Barbell Bench Press",
    category: "Chest / Push",
    defaultSets: [
      { weight: 80, reps: 10 },
      { weight: 80, reps: 9 },
      { weight: 80, reps: 8 },
    ],
    targetRepRange: [8, 12],
    incrementKg: 2.5,
  },
  {
    id: "squat",
    name: "Barbell Back Squat",
    category: "Legs / Quads",
    defaultSets: [
      { weight: 100, reps: 8 },
      { weight: 100, reps: 8 },
      { weight: 100, reps: 7 },
    ],
    targetRepRange: [6, 10],
    incrementKg: 5.0,
  },
  {
    id: "deadlift",
    name: "Conventional Deadlift",
    category: "Posterior Chain / Pull",
    defaultSets: [
      { weight: 130, reps: 5 },
      { weight: 130, reps: 5 },
      { weight: 130, reps: 5 },
    ],
    targetRepRange: [5, 8],
    incrementKg: 5.0,
  },
  {
    id: "ohp",
    name: "Overhead Military Press",
    category: "Shoulders / Push",
    defaultSets: [
      { weight: 50, reps: 8 },
      { weight: 50, reps: 8 },
      { weight: 50, reps: 6 },
    ],
    targetRepRange: [6, 10],
    incrementKg: 2.5,
  },
  {
    id: "row",
    name: "Barbell Bent-Over Row",
    category: "Back / Pull",
    defaultSets: [
      { weight: 70, reps: 10 },
      { weight: 70, reps: 10 },
      { weight: 70, reps: 9 },
    ],
    targetRepRange: [8, 12],
    incrementKg: 2.5,
  },
];

export default function ProgressiveOverloadCalculator() {
  const [selectedExerciseId, setSelectedExerciseId] = useState<string>("bench");

  // Previous week sets
  const [prevSets, setPrevSets] = useState<{ weight: number; reps: number }[]>([
    { weight: 77.5, reps: 10 },
    { weight: 77.5, reps: 9 },
    { weight: 77.5, reps: 8 },
  ]);

  // Current week sets
  const [currSets, setCurrSets] = useState<{ weight: number; reps: number }[]>([
    { weight: 80, reps: 10 },
    { weight: 80, reps: 9 },
    { weight: 80, reps: 8 },
  ]);

  const activeExercise =
    EXERCISE_PRESETS.find((e) => e.id === selectedExerciseId) || EXERCISE_PRESETS[0];

  const handleExerciseChange = (id: string) => {
    setSelectedExerciseId(id);
    const exercise = EXERCISE_PRESETS.find((e) => e.id === id);
    if (exercise) {
      setCurrSets(exercise.defaultSets.map((s) => ({ ...s })));
      setPrevSets(
        exercise.defaultSets.map((s) => ({
          weight: Math.max(10, s.weight - exercise.incrementKg),
          reps: s.reps,
        }))
      );
    }
  };

  const updateCurrSet = (index: number, field: "weight" | "reps", value: number) => {
    const next = [...currSets];
    next[index] = { ...next[index], [field]: Math.max(0, value) };
    setCurrSets(next);
  };

  const updatePrevSet = (index: number, field: "weight" | "reps", value: number) => {
    const next = [...prevSets];
    next[index] = { ...next[index], [field]: Math.max(0, value) };
    setPrevSets(next);
  };

  const addSet = () => {
    const lastCurr = currSets[currSets.length - 1] || { weight: 60, reps: 8 };
    const lastPrev = prevSets[prevSets.length - 1] || { weight: 60, reps: 8 };
    setCurrSets([...currSets, { ...lastCurr }]);
    setPrevSets([...prevSets, { ...lastPrev }]);
  };

  const removeSet = (index: number) => {
    if (currSets.length <= 1) return;
    setCurrSets(currSets.filter((_, i) => i !== index));
    setPrevSets(prevSets.filter((_, i) => i !== index));
  };

  // Calculations
  const calculateVolume = (sets: { weight: number; reps: number }[]) =>
    sets.reduce((sum, s) => sum + s.weight * s.reps, 0);

  const calculateTotalReps = (sets: { weight: number; reps: number }[]) =>
    sets.reduce((sum, s) => sum + s.reps, 0);

  const prevVolume = calculateVolume(prevSets);
  const currVolume = calculateVolume(currSets);
  const volumeDelta = currVolume - prevVolume;
  const volumePercent =
    prevVolume > 0 ? parseFloat(((volumeDelta / prevVolume) * 100).toFixed(1)) : 0;

  const prevReps = calculateTotalReps(prevSets);
  const currReps = calculateTotalReps(currSets);

  // Overload evaluation
  const allSetsHitMaxReps = currSets.every(
    (s) => s.reps >= activeExercise.targetRepRange[1]
  );
  const hasProgression = volumeDelta > 0;

  return (
    <section
      id="progressive-overload"
      className="py-20 bg-[#0E0E0E] text-white relative overflow-hidden border-t border-neutral-800"
    >
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[300px] bg-red-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            Hypertrophy & Strength Science
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-white">
            Progressive Overload <span className="text-red-500">& Volume Load</span> Tracker
          </h2>
          <p className="mt-4 text-neutral-400 text-base sm:text-lg">
            Track tonnage volume load (Sets × Reps × Weight) and receive automated scientific weight bump recommendations.
          </p>
        </div>

        {/* Exercise Quick Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {EXERCISE_PRESETS.map((ex) => (
            <button
              key={ex.id}
              onClick={() => handleExerciseChange(ex.id)}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all border ${
                selectedExerciseId === ex.id
                  ? "bg-red-600 border-red-500 text-white shadow-lg shadow-red-600/20 scale-105"
                  : "bg-neutral-900/80 border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:text-white"
              }`}
            >
              {ex.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Workout Logs Comparison */}
          <div className="lg:col-span-7 bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-xl">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-neutral-800">
              <div>
                <h3 className="text-lg font-bold text-white uppercase">{activeExercise.name}</h3>
                <span className="text-xs text-neutral-400">{activeExercise.category} • Target Range: {activeExercise.targetRepRange[0]}-{activeExercise.targetRepRange[1]} Reps</span>
              </div>
              <button
                onClick={addSet}
                className="px-3 py-1.5 bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-500/30 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                + Add Set
              </button>
            </div>

            <div className="space-y-4">
              {currSets.map((curr, idx) => (
                <div
                  key={idx}
                  className="bg-neutral-950/70 p-4 rounded-xl border border-neutral-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-neutral-900 border border-neutral-700 text-xs font-bold flex items-center justify-center text-red-400">
                      #{idx + 1}
                    </span>
                    <div className="text-xs">
                      <span className="text-neutral-400 uppercase font-semibold block">Last Session</span>
                      <div className="flex items-center gap-2 mt-1">
                        <input
                          type="number"
                          step="2.5"
                          value={prevSets[idx]?.weight || 0}
                          onChange={(e) => updatePrevSet(idx, "weight", Number(e.target.value))}
                          className="w-16 bg-neutral-900 border border-neutral-800 rounded px-2 py-1 text-xs text-neutral-300 font-mono text-center"
                        />
                        <span className="text-neutral-500 text-xs">kg ×</span>
                        <input
                          type="number"
                          value={prevSets[idx]?.reps || 0}
                          onChange={(e) => updatePrevSet(idx, "reps", Number(e.target.value))}
                          className="w-12 bg-neutral-900 border border-neutral-800 rounded px-2 py-1 text-xs text-neutral-300 font-mono text-center"
                        />
                        <span className="text-neutral-500 text-xs">reps</span>
                      </div>
                    </div>
                  </div>

                  {/* Current Session Inputs */}
                  <div className="flex items-center gap-3 justify-end">
                    <div className="text-xs text-right">
                      <span className="text-emerald-400 uppercase font-semibold block">Today&apos;s Workout</span>
                      <div className="flex items-center gap-2 mt-1">
                        <input
                          type="number"
                          step="2.5"
                          value={curr.weight}
                          onChange={(e) => updateCurrSet(idx, "weight", Number(e.target.value))}
                          className="w-16 bg-neutral-900 border border-red-500/40 rounded px-2 py-1 text-xs text-white font-mono font-bold text-center focus:border-red-500 focus:outline-none"
                        />
                        <span className="text-neutral-400 text-xs">kg ×</span>
                        <input
                          type="number"
                          value={curr.reps}
                          onChange={(e) => updateCurrSet(idx, "reps", Number(e.target.value))}
                          className="w-12 bg-neutral-900 border border-red-500/40 rounded px-2 py-1 text-xs text-white font-mono font-bold text-center focus:border-red-500 focus:outline-none"
                        />
                        <span className="text-neutral-400 text-xs">reps</span>
                      </div>
                    </div>

                    {currSets.length > 1 && (
                      <button
                        onClick={() => removeSet(idx)}
                        className="text-neutral-600 hover:text-red-400 p-1 text-sm transition-colors"
                        title="Remove set"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Volume Analytics & Overload Action Plan */}
          <div className="lg:col-span-5 space-y-6">
            {/* Volume Load Metric Card */}
            <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-xl">
              <span className="text-xs uppercase font-bold text-neutral-400 tracking-wider">Total Volume Load Comparison</span>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800">
                  <span className="text-xs text-neutral-500">Last Week Volume</span>
                  <div className="text-2xl font-black text-neutral-300 mt-1 font-mono">
                    {prevVolume.toLocaleString()} <span className="text-xs text-neutral-500">kg</span>
                  </div>
                  <span className="text-[11px] text-neutral-500">{prevReps} total reps</span>
                </div>

                <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800">
                  <span className="text-xs text-emerald-400 font-semibold">Today&apos;s Volume</span>
                  <div className="text-2xl font-black text-white mt-1 font-mono">
                    {currVolume.toLocaleString()} <span className="text-xs text-neutral-400">kg</span>
                  </div>
                  <span className="text-[11px] text-neutral-400">{currReps} total reps</span>
                </div>
              </div>

              {/* Volume Delta Badge */}
              <div className="mt-5 p-4 rounded-xl bg-neutral-950/80 border border-neutral-800 flex items-center justify-between">
                <span className="text-xs text-neutral-300 font-medium">Volume Load Progress:</span>
                <div className="flex items-center gap-1.5">
                  <span
                    className={`font-black font-mono text-sm px-2.5 py-1 rounded-lg ${
                      volumeDelta >= 0
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : "bg-red-500/10 text-red-400 border border-red-500/20"
                    }`}
                  >
                    {volumeDelta >= 0 ? `+${volumeDelta} kg (+${volumePercent}%)` : `${volumeDelta} kg (${volumePercent}%)`}
                  </span>
                </div>
              </div>

              {/* Scientific Action Recommendation */}
              <div className="mt-6 p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-400">
                  <span>⚡</span> Next Session Progression Protocol:
                </div>
                {allSetsHitMaxReps ? (
                  <p className="text-xs text-emerald-300 leading-relaxed">
                    🔥 <strong>Double Progression Triggered!</strong> You hit the top of your target rep range ({activeExercise.targetRepRange[1]} reps) on all sets. Increase weight by <strong>+{activeExercise.incrementKg} kg</strong> next week and aim for {activeExercise.targetRepRange[0]} reps.
                  </p>
                ) : hasProgression ? (
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    ✅ <strong>Great Overload!</strong> You added {volumeDelta} kg of stimulus. Keep this weight next week and focus on adding +1 rep to sets #{currSets.findIndex((s) => s.reps < activeExercise.targetRepRange[1]) + 1} before adding more barbell weight.
                  </p>
                ) : (
                  <p className="text-xs text-amber-300 leading-relaxed">
                    ⚠️ <strong>Volume Plateau / Recovery Alert:</strong> Your tonnage is slightly below last week. Focus on pre-workout carbs, 8h sleep, or keep this weight to consolidate form.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
