"use client";

import { useState } from "react";
import { Activity, BatteryCharging, Moon, ShieldCheck, HeartPulse, Check, Share2, Sparkles, RefreshCw } from "lucide-react";

type MuscleState = 0 | 1 | 2 | 3; // 0: Fresh, 1: Mild, 2: Sore, 3: Exhausted

interface MuscleGroup {
  id: string;
  name: string;
  category: "push" | "pull" | "legs" | "core";
  icon: string;
}

const MUSCLE_GROUPS: MuscleGroup[] = [
  { id: "chest", name: "Chest & Pecs", category: "push", icon: "🛡️" },
  { id: "shoulders", name: "Shoulders & Delts", category: "push", icon: "🎯" },
  { id: "triceps", name: "Triceps", category: "push", icon: "💪" },
  { id: "back", name: "Lats & Upper Back", category: "pull", icon: "🦅" },
  { id: "biceps", name: "Biceps & Forearms", category: "pull", icon: "⚡" },
  { id: "quads", name: "Quads & Hip Flexors", category: "legs", icon: "🦵" },
  { id: "hamstrings", name: "Hamstrings & Glutes", category: "legs", icon: "🔥" },
  { id: "core", name: "Abs & Core", category: "core", icon: "🧱" },
];

export default function RecoveryTracker() {
  const [muscleStatus, setMuscleStatus] = useState<Record<string, MuscleState>>({
    chest: 0,
    shoulders: 0,
    triceps: 0,
    back: 0,
    biceps: 0,
    quads: 0,
    hamstrings: 0,
    core: 0,
  });

  const [sleepHours, setSleepHours] = useState<number>(7.5);
  const [nutritionQuality, setNutritionQuality] = useState<"high" | "moderate" | "poor">("high");
  const [copied, setCopied] = useState<boolean>(false);

  const updateMuscle = (id: string, value: MuscleState) => {
    setMuscleStatus((prev) => ({ ...prev, [id]: value }));
  };

  const resetMuscles = () => {
    setMuscleStatus({
      chest: 0,
      shoulders: 0,
      triceps: 0,
      back: 0,
      biceps: 0,
      quads: 0,
      hamstrings: 0,
      core: 0,
    });
  };

  // Calculate readiness score
  const totalMuscleFatigue = Object.values(muscleStatus).reduce((a, b) => a + b, 0);
  const maxPossibleFatigue = Object.keys(muscleStatus).length * 3; // 24 max
  const muscleRecoveryRatio = 1 - totalMuscleFatigue / maxPossibleFatigue;

  const sleepMultiplier = sleepHours >= 8 ? 1.0 : sleepHours >= 6.5 ? 0.85 : 0.65;
  const nutritionMultiplier = nutritionQuality === "high" ? 1.0 : nutritionQuality === "moderate" ? 0.85 : 0.7;

  const readinessScore = Math.round(muscleRecoveryRatio * 60 + sleepMultiplier * 25 + nutritionMultiplier * 15);

  // Split readiness status
  const pushFatigue = (muscleStatus.chest + muscleStatus.shoulders + muscleStatus.triceps) / 9;
  const pullFatigue = (muscleStatus.back + muscleStatus.biceps) / 6;
  const legsFatigue = (muscleStatus.quads + muscleStatus.hamstrings) / 6;

  const getRecommendedSplit = () => {
    if (readinessScore < 45) {
      return {
        title: "Active Recovery & Mobility Day",
        badge: "Low Readiness - Rest Required",
        badgeColor: "bg-amber-950/80 text-amber-400 border-amber-800/50",
        advice: "High system fatigue detected. Recommended: Light 20-min cardio, dynamic stretching, sauna/steam session, and high-protein refeeding.",
      };
    }

    const lowestFatigue = Math.min(pushFatigue, pullFatigue, legsFatigue);
    if (lowestFatigue === legsFatigue && legsFatigue < 0.4) {
      return {
        title: "Heavy Lower Body / Leg Day",
        badge: "Legs 100% Prime & Ready",
        badgeColor: "bg-emerald-950/80 text-emerald-400 border-emerald-800/50",
        advice: "Your lower body shows peak recovery. Ideal for heavy squats, deadlifts, and leg hypertrophy training today.",
      };
    } else if (lowestFatigue === pushFatigue && pushFatigue < 0.4) {
      return {
        title: "Chest, Shoulders & Triceps (Push Day)",
        badge: "Push Muscles Fresh",
        badgeColor: "bg-emerald-950/80 text-emerald-400 border-emerald-800/50",
        advice: "Upper body pressing muscles are primed for progressive overload bench press, incline dumbbells, and shoulder presses.",
      };
    } else if (lowestFatigue === pullFatigue && pullFatigue < 0.4) {
      return {
        title: "Back, Lats & Biceps (Pull Day)",
        badge: "Pull Muscles Fresh",
        badgeColor: "bg-emerald-950/80 text-emerald-400 border-emerald-800/50",
        advice: "Your posterior chain and back musculature are recovered. Great day for barbell rows, weighted pull-ups, and lat pulldowns.",
      };
    } else {
      return {
        title: "Moderate Cardio & Core Conditioning",
        badge: "Balanced Maintenance",
        badgeColor: "bg-cyan-950/80 text-cyan-400 border-cyan-800/50",
        advice: "Moderate recovery across all groups. Focus on functional movements, core stability, and moderate zone 2 cardio.",
      };
    }
  };

  const recommendation = getRecommendedSplit();

  const handleShare = () => {
    const text = `🔋 Power Fitness Zone Recovery Assessment:
• Readiness Score: ${readinessScore}%
• Target Recommendation: ${recommendation.title}
• Sleep: ${sleepHours}h | Nutrition: ${nutritionQuality.toUpperCase()}
• Evaluated at: Power Fitness Zone Islamabad`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="recovery-tracker" className="py-20 bg-[#0c0c0c] text-white relative overflow-hidden border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-emerald-950/80 text-emerald-400 border border-emerald-800/50 mb-4">
            <BatteryCharging className="w-3.5 h-3.5" />
            CNS & Muscular Recovery
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            Muscle Soreness & <span className="text-emerald-400">Readiness Score</span>
          </h2>
          <p className="mt-4 text-neutral-400 text-base sm:text-lg">
            Track Delayed Onset Muscle Soreness (DOMS) across muscle groups to train with maximum intensity while preventing overtraining and injury.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Muscle Assessment Matrix */}
          <div className="lg:col-span-7 bg-neutral-900/90 border border-neutral-800 p-6 sm:p-8 rounded-3xl shadow-2xl space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">Target Muscle Group Soreness</h3>
                <p className="text-xs text-neutral-400 mt-0.5">Select soreness level for each muscle from your last session</p>
              </div>
              <button
                onClick={resetMuscles}
                className="text-xs text-neutral-400 hover:text-red-400 flex items-center gap-1 transition-colors"
              >
                <RefreshCw className="w-3 h-3" /> Reset All
              </button>
            </div>

            {/* Muscle grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {MUSCLE_GROUPS.map((m) => {
                const currentVal = muscleStatus[m.id];
                return (
                  <div
                    key={m.id}
                    className="p-3.5 rounded-2xl bg-neutral-800/50 border border-neutral-700/60 flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-white flex items-center gap-1.5">
                        <span>{m.icon}</span> {m.name}
                      </span>
                      <span
                        className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                          currentVal === 0
                            ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                            : currentVal === 1
                            ? "bg-blue-950 text-blue-400 border border-blue-800"
                            : currentVal === 2
                            ? "bg-amber-950 text-amber-400 border border-amber-800"
                            : "bg-red-950 text-red-400 border border-red-800"
                        }`}
                      >
                        {currentVal === 0 ? "Fresh" : currentVal === 1 ? "Mild" : currentVal === 2 ? "Sore" : "Fatigued"}
                      </span>
                    </div>

                    <div className="grid grid-cols-4 gap-1">
                      {[
                        { val: 0, label: "0: Fresh" },
                        { val: 1, label: "1: Mild" },
                        { val: 2, label: "2: Sore" },
                        { val: 3, label: "3: Hard" },
                      ].map((btn) => (
                        <button
                          key={btn.val}
                          onClick={() => updateMuscle(m.id, btn.val as MuscleState)}
                          className={`py-1 rounded-lg text-[10px] font-bold transition-all ${
                            currentVal === btn.val
                              ? "bg-emerald-500 text-neutral-950 shadow-sm"
                              : "bg-neutral-800 text-neutral-400 hover:bg-neutral-700"
                          }`}
                        >
                          {btn.val}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Sleep & Nutrition Factors */}
            <div className="pt-4 border-t border-neutral-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400 flex items-center gap-1">
                    <Moon className="w-3.5 h-3.5 text-blue-400" /> Sleep Last Night
                  </label>
                  <span className="text-xs font-bold text-blue-400">{sleepHours} Hours</span>
                </div>
                <input
                  type="range"
                  min={4}
                  max={10}
                  step={0.5}
                  value={sleepHours}
                  onChange={(e) => setSleepHours(Number(e.target.value))}
                  className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-blue-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1.5">
                  Protein & Diet Quality
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {(["high", "moderate", "poor"] as const).map((q) => (
                    <button
                      key={q}
                      onClick={() => setNutritionQuality(q)}
                      className={`py-2 rounded-xl text-xs font-bold capitalize transition-all border ${
                        nutritionQuality === q
                          ? "bg-emerald-950 border-emerald-500 text-white"
                          : "bg-neutral-800 border-neutral-700 text-neutral-400"
                      }`}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Readiness Report & Prescription */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-gradient-to-br from-neutral-900 via-neutral-900 to-emerald-950/40 border border-emerald-900/40 p-6 sm:p-8 rounded-3xl shadow-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1 mb-2">
                <HeartPulse className="w-4 h-4" /> Calculated Readiness
              </span>

              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-5xl sm:text-6xl font-black text-white">{readinessScore}%</span>
                <span className="text-sm font-semibold text-neutral-400">CNS & Muscle Ready</span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-3 bg-neutral-800 rounded-full overflow-hidden p-0.5 border border-neutral-700 mb-6">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    readinessScore >= 75
                      ? "bg-gradient-to-r from-emerald-500 to-teal-400"
                      : readinessScore >= 50
                      ? "bg-gradient-to-r from-amber-500 to-yellow-400"
                      : "bg-gradient-to-r from-red-600 to-orange-500"
                  }`}
                  style={{ width: `${readinessScore}%` }}
                />
              </div>

              {/* Workout Recommendation Box */}
              <div className="bg-neutral-800/80 border border-neutral-700/80 p-5 rounded-2xl mb-6">
                <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-extrabold uppercase mb-2.5 border ${recommendation.badgeColor}`}>
                  {recommendation.badge}
                </span>
                <h4 className="text-lg font-bold text-white mb-2">{recommendation.title}</h4>
                <p className="text-xs text-neutral-300 leading-relaxed">{recommendation.advice}</p>
              </div>

              {/* Recovery Modalities */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase text-neutral-400 block mb-2">
                  PFZ Recovery Accelerators:
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-neutral-800/40 p-2.5 rounded-xl border border-neutral-800 flex items-center gap-2 text-neutral-300">
                    <span>🧖‍♂️</span>
                    <span>Sauna / Steam Room (15m)</span>
                  </div>
                  <div className="bg-neutral-800/40 p-2.5 rounded-xl border border-neutral-800 flex items-center gap-2 text-neutral-300">
                    <span>🧊</span>
                    <span>Cold Shower Protocol</span>
                  </div>
                  <div className="bg-neutral-800/40 p-2.5 rounded-xl border border-neutral-800 flex items-center gap-2 text-neutral-300">
                    <span>🧪</span>
                    <span>5g Glutamine + BCAAs</span>
                  </div>
                  <div className="bg-neutral-800/40 p-2.5 rounded-xl border border-neutral-800 flex items-center gap-2 text-neutral-300">
                    <span>🧘</span>
                    <span>Foam Rolling (10m)</span>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <button
                  onClick={handleShare}
                  className="w-full py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider bg-emerald-500 hover:bg-emerald-400 text-neutral-950 flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/20"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
                  {copied ? "Readiness Summary Copied!" : "Save / Share Recovery Plan"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
