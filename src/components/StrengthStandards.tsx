"use client";

import { useState, useMemo } from "react";
import { Award, Trophy, Dumbbell, Shield, TrendingUp, Sparkles, Share2, Check, Target } from "lucide-react";

type LiftTier = "Beginner" | "Novice" | "Intermediate" | "Advanced" | "Elite";

interface LiftStandard {
  key: string;
  name: string;
  icon: string;
  weight: number;
  // multipliers for male: [Novice, Intermediate, Advanced, Elite]
  maleMultipliers: [number, number, number, number];
  femaleMultipliers: [number, number, number, number];
}

const LIFTS: LiftStandard[] = [
  { key: "bench", name: "Barbell Bench Press", icon: "🛡️", weight: 80, maleMultipliers: [0.8, 1.15, 1.5, 1.9], femaleMultipliers: [0.5, 0.75, 1.0, 1.3] },
  { key: "squat", name: "Barbell Back Squat", icon: "🦵", weight: 110, maleMultipliers: [1.1, 1.5, 2.0, 2.5], femaleMultipliers: [0.75, 1.1, 1.5, 1.9] },
  { key: "deadlift", name: "Conventional Deadlift", icon: "🏋️‍♂️", weight: 140, maleMultipliers: [1.3, 1.8, 2.4, 2.9], femaleMultipliers: [0.9, 1.3, 1.8, 2.3] },
  { key: "ohp", name: "Overhead Military Press", icon: "🎯", weight: 50, maleMultipliers: [0.55, 0.75, 1.0, 1.3], femaleMultipliers: [0.35, 0.5, 0.7, 0.95] },
];

export default function StrengthStandards() {
  const [gender, setGender] = useState<"male" | "female">("male");
  const [bodyWeight, setBodyWeight] = useState<number>(75);
  const [bench, setBench] = useState<number>(85);
  const [squat, setSquat] = useState<number>(120);
  const [deadlift, setDeadlift] = useState<number>(150);
  const [ohp, setOhp] = useState<number>(55);
  const [copied, setCopied] = useState<boolean>(false);

  const getTier = (ratio: number, multipliers: [number, number, number, number]): { tier: LiftTier; color: string; percent: number } => {
    const [nov, inter, adv, elite] = multipliers;
    if (ratio < nov) {
      const p = Math.min(100, Math.max(10, Math.round((ratio / nov) * 25)));
      return { tier: "Beginner", color: "text-zinc-400 border-zinc-700 bg-zinc-800/40", percent: p };
    }
    if (ratio < inter) {
      const p = 25 + Math.round(((ratio - nov) / (inter - nov)) * 25);
      return { tier: "Novice", color: "text-blue-400 border-blue-500/40 bg-blue-950/20", percent: p };
    }
    if (ratio < adv) {
      const p = 50 + Math.round(((ratio - inter) / (adv - inter)) * 25);
      return { tier: "Intermediate", color: "text-emerald-400 border-emerald-500/40 bg-emerald-950/20", percent: p };
    }
    if (ratio < elite) {
      const p = 75 + Math.round(((ratio - adv) / (elite - adv)) * 25);
      return { tier: "Advanced", color: "text-amber-400 border-amber-500/40 bg-amber-950/20", percent: p };
    }
    return { tier: "Elite", color: "text-red-500 border-red-500/50 bg-red-950/30", percent: 100 };
  };

  const results = useMemo(() => {
    const userWeights: Record<string, number> = {
      bench,
      squat,
      deadlift,
      ohp,
    };

    const evaluatedLifts = LIFTS.map((lift) => {
      const weight = userWeights[lift.key] || 0;
      const ratio = Number((weight / bodyWeight).toFixed(2));
      const mults = gender === "male" ? lift.maleMultipliers : lift.femaleMultipliers;
      const tierInfo = getTier(ratio, mults);

      // Target for next tier
      let nextTargetWeight = 0;
      let nextTierName = "";
      if (ratio < mults[0]) {
        nextTargetWeight = Math.round(mults[0] * bodyWeight);
        nextTierName = "Novice";
      } else if (ratio < mults[1]) {
        nextTargetWeight = Math.round(mults[1] * bodyWeight);
        nextTierName = "Intermediate";
      } else if (ratio < mults[2]) {
        nextTargetWeight = Math.round(mults[2] * bodyWeight);
        nextTierName = "Advanced";
      } else if (ratio < mults[3]) {
        nextTargetWeight = Math.round(mults[3] * bodyWeight);
        nextTierName = "Elite";
      } else {
        nextTargetWeight = Math.round(mults[3] * bodyWeight);
        nextTierName = "Record Breaker";
      }

      return {
        ...lift,
        userWeight: weight,
        ratio,
        ...tierInfo,
        nextTargetWeight,
        nextTierName,
      };
    });

    const totalWeight = bench + squat + deadlift;
    const totalRatio = Number((totalWeight / bodyWeight).toFixed(2));

    let overallRank = "Power Rookie";
    let rankBadge = "🥉";
    let rankColor = "text-zinc-300";
    let percentile = 35;

    if (totalRatio >= 5.5) {
      overallRank = "Islamabad Apex Legend";
      rankBadge = "👑";
      rankColor = "text-red-500";
      percentile = 99;
    } else if (totalRatio >= 4.5) {
      overallRank = "Titan Lifter";
      rankBadge = "🥇";
      rankColor = "text-amber-400";
      percentile = 90;
    } else if (totalRatio >= 3.5) {
      overallRank = "Silver Beast";
      rankBadge = "🥈";
      rankColor = "text-emerald-400";
      percentile = 70;
    } else if (totalRatio >= 2.5) {
      overallRank = "Iron Warrior";
      rankBadge = "🛡️";
      rankColor = "text-blue-400";
      percentile = 50;
    }

    return {
      evaluatedLifts,
      totalWeight,
      totalRatio,
      overallRank,
      rankBadge,
      rankColor,
      percentile,
    };
  }, [gender, bodyWeight, bench, squat, deadlift, ohp]);

  const copyStats = () => {
    const text = `🏆 Islamabad Power Fitness Zone - Strength Classification\n` +
      `Bodyweight: ${bodyWeight}kg (${gender.toUpperCase()})\n` +
      `Big 3 Total: ${results.totalWeight}kg (${results.totalRatio}x BW)\n` +
      `Club Rank: ${results.rankBadge} ${results.overallRank} (Top ${100 - results.percentile}% of lifters)\n\n` +
      results.evaluatedLifts
        .map((l) => `• ${l.name}: ${l.userWeight}kg (${l.ratio}x BW) - ${l.tier}`)
        .join("\n") +
      `\n\nTest your strength at Power Fitness Zone Islamabad`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="strength-standards" className="py-20 bg-zinc-950 text-white relative border-t border-zinc-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Trophy className="w-4 h-4 text-red-500" />
            Competitive Powerlifting & Level Classifier
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
            Strength Level & <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-400">Powerlifting Standard</span>
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg">
            Compare your one-rep max compound lifts against worldwide strength standards and discover your official Power Fitness Zone gym rank tier.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls & Inputs */}
          <div className="lg:col-span-5 bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 sm:p-7 space-y-5">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Dumbbell className="w-4 h-4 text-red-500" />
                1. Enter Your Stats
              </h3>
              {/* Gender selector */}
              <div className="flex bg-zinc-950 p-1 rounded-lg border border-zinc-800">
                <button
                  onClick={() => setGender("male")}
                  className={`px-3 py-1 text-xs font-bold rounded-md transition ${
                    gender === "male" ? "bg-red-600 text-white" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  Male
                </button>
                <button
                  onClick={() => setGender("female")}
                  className={`px-3 py-1 text-xs font-bold rounded-md transition ${
                    gender === "female" ? "bg-red-600 text-white" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  Female
                </button>
              </div>
            </div>

            {/* Bodyweight */}
            <div>
              <div className="flex justify-between text-xs font-medium text-zinc-400 mb-1.5">
                <span>Bodyweight</span>
                <span className="text-white font-bold">{bodyWeight} kg</span>
              </div>
              <input
                type="range"
                min={45}
                max={140}
                value={bodyWeight}
                onChange={(e) => setBodyWeight(Number(e.target.value))}
                className="w-full accent-red-500 h-2 bg-zinc-800 rounded-lg cursor-pointer"
              />
            </div>

            {/* Bench */}
            <div>
              <div className="flex justify-between text-xs font-medium text-zinc-400 mb-1.5">
                <span>1RM Bench Press</span>
                <span className="text-white font-bold">{bench} kg ({(bench / bodyWeight).toFixed(2)}x BW)</span>
              </div>
              <input
                type="range"
                min={20}
                max={220}
                step={2.5}
                value={bench}
                onChange={(e) => setBench(Number(e.target.value))}
                className="w-full accent-red-500 h-2 bg-zinc-800 rounded-lg cursor-pointer"
              />
            </div>

            {/* Squat */}
            <div>
              <div className="flex justify-between text-xs font-medium text-zinc-400 mb-1.5">
                <span>1RM Back Squat</span>
                <span className="text-white font-bold">{squat} kg ({(squat / bodyWeight).toFixed(2)}x BW)</span>
              </div>
              <input
                type="range"
                min={30}
                max={300}
                step={2.5}
                value={squat}
                onChange={(e) => setSquat(Number(e.target.value))}
                className="w-full accent-red-500 h-2 bg-zinc-800 rounded-lg cursor-pointer"
              />
            </div>

            {/* Deadlift */}
            <div>
              <div className="flex justify-between text-xs font-medium text-zinc-400 mb-1.5">
                <span>1RM Conventional Deadlift</span>
                <span className="text-white font-bold">{deadlift} kg ({(deadlift / bodyWeight).toFixed(2)}x BW)</span>
              </div>
              <input
                type="range"
                min={40}
                max={350}
                step={2.5}
                value={deadlift}
                onChange={(e) => setDeadlift(Number(e.target.value))}
                className="w-full accent-red-500 h-2 bg-zinc-800 rounded-lg cursor-pointer"
              />
            </div>

            {/* OHP */}
            <div>
              <div className="flex justify-between text-xs font-medium text-zinc-400 mb-1.5">
                <span>1RM Overhead Press</span>
                <span className="text-white font-bold">{ohp} kg ({(ohp / bodyWeight).toFixed(2)}x BW)</span>
              </div>
              <input
                type="range"
                min={15}
                max={150}
                step={2.5}
                value={ohp}
                onChange={(e) => setOhp(Number(e.target.value))}
                className="w-full accent-red-500 h-2 bg-zinc-800 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* Results & Tier Leaderboard */}
          <div className="lg:col-span-7 space-y-6">
            {/* Overall Rank Header Banner */}
            <div className="bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-950 border border-zinc-800 rounded-2xl p-6 relative overflow-hidden shadow-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-zinc-950 border border-zinc-700/60 flex items-center justify-center text-3xl shadow-inner">
                    {results.rankBadge}
                  </div>
                  <div>
                    <span className="text-xs font-bold tracking-wider uppercase text-zinc-400">
                      Official Gym Classification
                    </span>
                    <h4 className={`text-2xl font-black ${results.rankColor}`}>
                      {results.overallRank}
                    </h4>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      Stronger than <span className="text-white font-bold">{results.percentile}%</span> of gym members
                    </p>
                  </div>
                </div>

                <div className="text-left sm:text-right border-t sm:border-t-0 pt-3 sm:pt-0 border-zinc-800">
                  <span className="text-[11px] text-zinc-500 uppercase font-mono">SBD Total</span>
                  <div className="text-2xl font-black text-white">{results.totalWeight} <span className="text-sm font-normal text-zinc-400">kg</span></div>
                  <span className="text-xs text-red-400 font-mono font-bold">{results.totalRatio}x Bodyweight</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-zinc-800/80 flex justify-end">
                <button
                  onClick={copyStats}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-medium text-zinc-200 transition"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Share2 className="w-3.5 h-3.5 text-zinc-400" />}
                  {copied ? "Stats Copied!" : "Share My Rank"}
                </button>
              </div>
            </div>

            {/* Individual Compound Lifts Progress Breakdown */}
            <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-6 space-y-4">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Target className="w-4 h-4 text-red-500" />
                Individual Lift Performance & Next Milestone
              </h4>

              <div className="space-y-4">
                {results.evaluatedLifts.map((lift) => (
                  <div key={lift.key} className="bg-zinc-950 border border-zinc-800/80 p-4 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{lift.icon}</span>
                        <div>
                          <span className="text-sm font-bold text-white">{lift.name}</span>
                          <span className="text-xs text-zinc-500 ml-2 font-mono">{lift.userWeight} kg ({lift.ratio}x BW)</span>
                        </div>
                      </div>
                      <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${lift.color}`}>
                        {lift.tier}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden mb-2">
                      <div
                        className="h-full bg-gradient-to-r from-red-600 to-amber-500 rounded-full transition-all duration-500"
                        style={{ width: `${lift.percent}%` }}
                      />
                    </div>

                    <div className="flex justify-between items-center text-[11px] text-zinc-400">
                      <span>Milestone Target:</span>
                      <span className="text-zinc-300 font-medium">
                        Lift <strong className="text-red-400 font-bold">{lift.nextTargetWeight} kg</strong> to reach <strong className="text-white">{lift.nextTierName}</strong>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
