"use client";

import { useState } from "react";
import { Trophy, Award, Users, Target, CheckCircle, Plus, Share2, Sparkles, Flame, ShieldAlert } from "lucide-react";
import { GYM_CHALLENGES, GymChallenge } from "@/data/challenges";

export default function ChallengesSection() {
  const [activeCategory, setActiveCategory] = useState<"all" | "consistency" | "strength" | "endurance" | "transformation">("all");
  const [joinedChallenges, setJoinedChallenges] = useState<Record<string, number>>({
    "consistency-30": 14,
    "century-bench": 85,
  });
  const [activeTab, setActiveTab] = useState<"explore" | "my_challenges">("explore");
  const [justUnlocked, setJustUnlocked] = useState<string | null>(null);

  const filteredChallenges = GYM_CHALLENGES.filter((c) => {
    if (activeCategory === "all") return true;
    return c.category === activeCategory;
  });

  const joinChallenge = (id: string) => {
    if (joinedChallenges[id] === undefined) {
      setJoinedChallenges((prev) => ({ ...prev, [id]: 0 }));
    }
  };

  const incrementProgress = (id: string, max: number, step = 1) => {
    setJoinedChallenges((prev) => {
      const current = prev[id] || 0;
      const nextVal = Math.min(max, current + step);
      if (nextVal >= max && current < max) {
        setJustUnlocked(id);
        setTimeout(() => setJustUnlocked(null), 4000);
      }
      return { ...prev, [id]: nextVal };
    });
  };

  const shareChallenge = (c: GymChallenge) => {
    const text = `🏆 I'm taking on the '${c.title}' at Power Fitness Zone Islamabad!
Goal: ${c.goalTarget} ${c.unit} in ${c.durationDays} days.
Reward: ${c.reward}
Join me at PFZ Gym!`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  return (
    <section id="gym-challenges" className="py-20 bg-[#0c0c0c] text-white relative overflow-hidden border-t border-neutral-800">
      {/* Background glow */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-amber-950/80 text-amber-400 border border-amber-800/50 mb-4">
            <Trophy className="w-3.5 h-3.5" />
            Member Milestones & Rewards
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            Power Fitness <span className="text-amber-400">Monthly Challenges</span>
          </h2>
          <p className="mt-4 text-neutral-400 text-base sm:text-lg">
            Push beyond your limits, earn certified badges, unlock merchandise rewards, and join Islamabad's most dedicated fitness community.
          </p>
        </div>

        {/* Milestone Celebration Banner */}
        {justUnlocked && (
          <div className="mb-8 p-4 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-400 text-neutral-950 font-bold flex items-center justify-between shadow-2xl shadow-amber-500/30 animate-bounce">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🎉</span>
              <div>
                <div className="text-sm uppercase tracking-wider font-black">CHALLENGE CONQUERED!</div>
                <div className="text-xs font-semibold">You completed your target milestone! Claim your reward at the front desk.</div>
              </div>
            </div>
            <Award className="w-8 h-8 fill-neutral-950" />
          </div>
        )}

        {/* Navigation & Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 bg-neutral-900/90 border border-neutral-800 p-3.5 rounded-2xl">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("explore")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === "explore" ? "bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/20" : "text-neutral-400 hover:text-white"
              }`}
            >
              Explore All Challenges ({GYM_CHALLENGES.length})
            </button>
            <button
              onClick={() => setActiveTab("my_challenges")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === "my_challenges" ? "bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/20" : "text-neutral-400 hover:text-white"
              }`}
            >
              Active Progress ({Object.keys(joinedChallenges).length})
            </button>
          </div>

          {activeTab === "explore" && (
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { id: "all", label: "All" },
                { id: "consistency", label: "Consistency" },
                { id: "strength", label: "Strength" },
                { id: "endurance", label: "Cardio" },
                { id: "transformation", label: "Recomp" },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id as "all" | "consistency" | "strength" | "endurance" | "transformation")}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    activeCategory === cat.id ? "bg-neutral-800 text-amber-400 border border-amber-500/50" : "text-neutral-500 hover:text-neutral-300"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Challenges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChallenges
            .filter((c) => activeTab === "explore" || joinedChallenges[c.id] !== undefined)
            .map((c) => {
              const currentProgress = joinedChallenges[c.id];
              const isJoined = currentProgress !== undefined;
              const percent = isJoined ? Math.min(100, Math.round((currentProgress / c.goalTarget) * 100)) : 0;
              const isCompleted = percent >= 100;

              return (
                <div
                  key={c.id}
                  className={`p-6 rounded-3xl border transition-all flex flex-col justify-between relative overflow-hidden ${
                    isCompleted
                      ? "bg-gradient-to-b from-neutral-900 to-amber-950/30 border-amber-500/80 shadow-xl shadow-amber-950/40"
                      : isJoined
                      ? "bg-neutral-900/90 border-neutral-700"
                      : "bg-neutral-900/60 border-neutral-800 hover:border-neutral-700"
                  }`}
                >
                  <div>
                    {/* Top Bar */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-3xl p-2.5 bg-neutral-800 rounded-2xl border border-neutral-700">{c.badge}</div>
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full ${
                            c.difficulty === "Elite"
                              ? "bg-red-950 text-red-400 border border-red-800"
                              : c.difficulty === "Intermediate"
                              ? "bg-amber-950 text-amber-400 border border-amber-800"
                              : "bg-emerald-950 text-emerald-400 border border-emerald-800"
                          }`}
                        >
                          {c.difficulty}
                        </span>
                        <span className="text-[10px] font-semibold text-neutral-400 bg-neutral-800 px-2 py-0.5 rounded-full">
                          {c.durationDays} Days
                        </span>
                      </div>
                    </div>

                    <h3 className="text-lg font-black text-white mb-2">{c.title}</h3>
                    <p className="text-xs text-neutral-400 leading-relaxed mb-4">{c.description}</p>

                    {/* Reward Badge */}
                    <div className="bg-neutral-800/60 border border-neutral-700/60 p-3 rounded-2xl mb-5">
                      <span className="text-[10px] font-extrabold uppercase text-amber-400 flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> Reward on Completion:
                      </span>
                      <div className="text-xs font-bold text-white mt-1">{c.reward}</div>
                    </div>
                  </div>

                  {/* Bottom Action / Progress */}
                  <div>
                    {isJoined ? (
                      <div>
                        <div className="flex justify-between items-center text-xs font-semibold text-neutral-300 mb-1.5">
                          <span>
                            Progress: {currentProgress} / {c.goalTarget} {c.unit}
                          </span>
                          <span className={isCompleted ? "text-amber-400 font-bold" : "text-neutral-400"}>
                            {percent}%
                          </span>
                        </div>
                        <div className="w-full h-2.5 bg-neutral-800 rounded-full overflow-hidden p-0.5 border border-neutral-700 mb-4">
                          <div
                            className={`h-full rounded-full transition-all duration-300 ${
                              isCompleted ? "bg-gradient-to-r from-amber-400 to-yellow-300" : "bg-gradient-to-r from-red-600 to-amber-500"
                            }`}
                            style={{ width: `${percent}%` }}
                          />
                        </div>

                        <div className="flex gap-2">
                          {!isCompleted && (
                            <button
                              onClick={() => incrementProgress(c.id, c.goalTarget, c.goalTarget > 50 ? 5 : 1)}
                              className="flex-1 py-2.5 px-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all border border-neutral-700"
                            >
                              <Plus className="w-3.5 h-3.5 text-amber-400" /> Log +{c.goalTarget > 50 ? 5 : 1} {c.unit}
                            </button>
                          )}
                          {isCompleted && (
                            <div className="flex-1 py-2.5 px-3 rounded-xl bg-amber-500/20 border border-amber-500/50 text-amber-400 text-xs font-bold flex items-center justify-center gap-1.5">
                              <CheckCircle className="w-4 h-4" /> Badge Unlocked!
                            </div>
                          )}
                          <button
                            onClick={() => shareChallenge(c)}
                            className="p-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors"
                            title="Share on WhatsApp"
                          >
                            <Share2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => joinChallenge(c.id)}
                          className="flex-1 py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-amber-500/20"
                        >
                          Accept Challenge
                        </button>
                        <div className="flex items-center gap-1 text-[11px] text-neutral-500 font-semibold pr-1">
                          <Users className="w-3.5 h-3.5" /> {c.participantsCount}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
}
