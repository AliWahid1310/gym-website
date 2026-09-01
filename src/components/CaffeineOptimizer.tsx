"use client";

import { useState, useMemo } from "react";
import { Coffee, Moon, Zap, Clock, ShieldCheck, AlertCircle, Sparkles, Share2, Check } from "lucide-react";

interface BeverageOption {
  id: string;
  name: string;
  caffeineMg: number;
  icon: string;
  desc: string;
  pkrCost: string;
}

const BEVERAGES: BeverageOption[] = [
  { id: "espresso", name: "Double Espresso / Black Coffee", caffeineMg: 150, icon: "☕", desc: "Fast peak absorption, clean crash-free pump", pkrCost: "Rs. 150 - 300" },
  { id: "preworkout", name: "Commercial Pre-Workout (1 Scoop)", caffeineMg: 250, icon: "🧪", desc: "High stimulation + Beta-Alanine & Citrulline", pkrCost: "Rs. 250 / scoop" },
  { id: "karakchai", name: "Strong Black Chai / Kehwa", caffeineMg: 75, icon: "🫖", desc: "Desi natural mild caffeine with theanine", pkrCost: "Rs. 60 - 100" },
  { id: "energydrink", name: "Zero Sugar Energy Drink Can", caffeineMg: 160, icon: "🥫", desc: "Taurine + B-Vitamins + caffeine", pkrCost: "Rs. 280 - 450" },
  { id: "greentea", name: "Green Tea / Matcha Extract", caffeineMg: 45, icon: "🍵", desc: "Gentle focus with antioxidant recovery", pkrCost: "Rs. 40 - 80" },
];

export default function CaffeineOptimizer() {
  const [workoutHour, setWorkoutHour] = useState<number>(18); // 6:00 PM
  const [workoutMinute, setWorkoutMinute] = useState<number>(0);
  const [bedHour, setBedHour] = useState<number>(23); // 11:00 PM
  const [selectedBev, setSelectedBev] = useState<string>("espresso");
  const [tolerance, setTolerance] = useState<"low" | "moderate" | "high">("moderate");
  const [bodyWeightKg, setBodyWeightKg] = useState<number>(75);
  const [copied, setCopied] = useState<boolean>(false);

  const activeBev = BEVERAGES.find((b) => b.id === selectedBev) || BEVERAGES[0];

  const analysis = useMemo(() => {
    // Recommended dose: 3-6mg per kg for performance
    const minRecMg = Math.round(bodyWeightKg * (tolerance === "low" ? 2 : tolerance === "moderate" ? 3 : 4));
    const maxRecMg = Math.round(bodyWeightKg * (tolerance === "low" ? 3 : tolerance === "moderate" ? 4.5 : 6));

    // Ideal intake window: 45 mins before workout
    let intakeTotalMins = workoutHour * 60 + workoutMinute - 45;
    if (intakeTotalMins < 0) intakeTotalMins += 24 * 60;
    const intakeH = Math.floor(intakeTotalMins / 60) % 24;
    const intakeM = intakeTotalMins % 60;

    // Bedtime in minutes
    const bedTotalMins = bedHour * 60;
    let workoutTotalMins = workoutHour * 60 + workoutMinute;
    if (bedTotalMins < intakeTotalMins) {
      // Crosses midnight
      workoutTotalMins = workoutTotalMins < intakeTotalMins ? workoutTotalMins + 24 * 60 : workoutTotalMins;
    }
    const hoursBetweenIntakeAndBed = ((bedHour < intakeH ? bedHour + 24 : bedHour) * 60 - intakeTotalMins) / 60;

    // Caffeine half-life is ~5 hours
    const halfLives = hoursBetweenIntakeAndBed / 5;
    const residualCaffeineAtBed = Math.round(activeBev.caffeineMg * Math.pow(0.5, halfLives));

    const isSleepDisrupted = residualCaffeineAtBed > 40;
    const isSevereSleepDisrupted = residualCaffeineAtBed > 80;

    const intakeTimeStr = `${intakeH.toString().padStart(2, "0")}:${intakeM.toString().padStart(2, "0")}`;
    const workoutTimeStr = `${workoutHour.toString().padStart(2, "0")}:${workoutMinute.toString().padStart(2, "0")}`;

    return {
      intakeTimeStr,
      workoutTimeStr,
      minRecMg,
      maxRecMg,
      residualCaffeineAtBed,
      hoursBetweenIntakeAndBed: hoursBetweenIntakeAndBed.toFixed(1),
      isSleepDisrupted,
      isSevereSleepDisrupted,
    };
  }, [workoutHour, workoutMinute, bedHour, activeBev, tolerance, bodyWeightKg]);

  const copyResults = () => {
    const text = `⚡ Islamabad Pre-Workout Caffeine Optimization\n` +
      `Workout Start: ${analysis.workoutTimeStr}\n` +
      `Optimal Caffeine Window: ${analysis.intakeTimeStr} (45 mins prior)\n` +
      `Selected Fuel: ${activeBev.name} (~${activeBev.caffeineMg}mg)\n` +
      `Estimated Bedtime Residual: ${analysis.residualCaffeineAtBed}mg at ${bedHour}:00\n` +
      `Sleep Safety: ${analysis.isSevereSleepDisrupted ? "⚠️ High Risk of Insomnia" : analysis.isSleepDisrupted ? "⚡ Mild Sleep Lag" : "✅ 100% Deep Sleep Protected"}\n\n` +
      `Calculated at Power Fitness Zone`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="caffeine-timing" className="py-20 bg-zinc-950 text-white relative border-t border-zinc-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Coffee className="w-4 h-4 text-amber-400" />
            Bio-Hacking & Sleep Recovery
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
            Pre-Workout Caffeine & <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-red-500">Sleep Optimizer</span>
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg">
            Time your caffeine intake precisely for peak gym pump & strength without sacrificing restorative deep sleep and muscle protein synthesis overnight.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Inputs Column */}
          <div className="lg:col-span-6 bg-zinc-900/80 border border-zinc-800/80 rounded-2xl p-6 sm:p-7 backdrop-blur-sm space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-zinc-800 pb-3">
              <Zap className="w-4 h-4 text-amber-400" />
              1. Your Schedule & Tolerance
            </h3>

            {/* Workout Time & Bed Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-2 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-red-400" />
                  Workout Start Time (24h)
                </label>
                <div className="flex gap-2">
                  <select
                    value={workoutHour}
                    onChange={(e) => setWorkoutHour(Number(e.target.value))}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-sm font-semibold text-white focus:outline-none focus:border-red-500"
                  >
                    {Array.from({ length: 24 }).map((_, i) => (
                      <option key={i} value={i}>
                        {i.toString().padStart(2, "0")}:00 {i >= 12 ? "PM" : "AM"}
                      </option>
                    ))}
                  </select>
                  <select
                    value={workoutMinute}
                    onChange={(e) => setWorkoutMinute(Number(e.target.value))}
                    className="w-24 bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-sm font-semibold text-white focus:outline-none focus:border-red-500"
                  >
                    <option value={0}>:00</option>
                    <option value={15}>:15</option>
                    <option value={30}>:30</option>
                    <option value={45}>:45</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-2 flex items-center gap-1.5">
                  <Moon className="w-3.5 h-3.5 text-blue-400" />
                  Target Bedtime (24h)
                </label>
                <select
                  value={bedHour}
                  onChange={(e) => setBedHour(Number(e.target.value))}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-sm font-semibold text-white focus:outline-none focus:border-blue-500"
                >
                  {Array.from({ length: 24 }).map((_, i) => (
                    <option key={i} value={i}>
                      {i.toString().padStart(2, "0")}:00 {i >= 12 ? "PM" : "AM"}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Body Weight & Tolerance */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-2">
                  Body Weight: <span className="text-white font-bold">{bodyWeightKg} kg</span>
                </label>
                <input
                  type="range"
                  min={45}
                  max={130}
                  value={bodyWeightKg}
                  onChange={(e) => setBodyWeightKg(Number(e.target.value))}
                  className="w-full accent-amber-500 h-2 bg-zinc-800 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-2">
                  Caffeine Sensitivity
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {(["low", "moderate", "high"] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setTolerance(t)}
                      className={`py-2 text-xs font-semibold rounded-lg capitalize border transition ${
                        tolerance === t
                          ? "bg-amber-500/20 text-amber-300 border-amber-500"
                          : "bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-white"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Beverage Selector */}
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-2">
                2. Choose Your Pre-Workout Stimulant / Drink
              </label>
              <div className="space-y-2">
                {BEVERAGES.map((bev) => {
                  const isSelected = selectedBev === bev.id;
                  return (
                    <div
                      key={bev.id}
                      onClick={() => setSelectedBev(bev.id)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? "bg-amber-500/15 border-amber-500/70 shadow-md shadow-amber-500/10"
                          : "bg-zinc-950/60 border-zinc-800/80 hover:border-zinc-700"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{bev.icon}</span>
                        <div>
                          <p className={`font-semibold text-sm ${isSelected ? "text-amber-300" : "text-zinc-200"}`}>
                            {bev.name}
                          </p>
                          <p className="text-xs text-zinc-500">{bev.desc}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-mono font-bold text-amber-400">
                          ~{bev.caffeineMg} mg
                        </span>
                        <p className="text-[10px] text-zinc-500">{bev.pkrCost}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Results & Actionable Timeline Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-7 shadow-xl">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Your Personalized Blueprint
                </span>
                <button
                  onClick={copyResults}
                  className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg border border-zinc-700 transition"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Share2 className="w-3.5 h-3.5" />}
                  {copied ? "Copied" : "Share Plan"}
                </button>
              </div>

              {/* Timeline Cards */}
              <div className="mt-6 space-y-4">
                {/* Optimal Intake */}
                <div className="bg-amber-950/20 border border-amber-500/40 rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                      Optimal Pre-Workout Cup Time
                    </span>
                    <p className="text-2xl font-black text-white mt-0.5">
                      {analysis.intakeTimeStr}
                    </p>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      Drink 45 mins before your {analysis.workoutTimeStr} session for peak blood concentration
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-xl">
                    ⏱️
                  </div>
                </div>

                {/* Performance Dosage Target */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-zinc-950 border border-zinc-800 p-3.5 rounded-xl">
                    <span className="text-[10px] text-zinc-500 font-bold uppercase">Optimal Dose For Weight</span>
                    <p className="text-lg font-bold text-white mt-1">
                      {analysis.minRecMg} - {analysis.maxRecMg} <span className="text-xs font-normal text-zinc-400">mg</span>
                    </p>
                  </div>

                  <div className="bg-zinc-950 border border-zinc-800 p-3.5 rounded-xl">
                    <span className="text-[10px] text-zinc-500 font-bold uppercase">Bedtime Residual Caffeine</span>
                    <p className={`text-lg font-bold mt-1 ${analysis.isSevereSleepDisrupted ? "text-red-400" : analysis.isSleepDisrupted ? "text-amber-400" : "text-green-400"}`}>
                      ~{analysis.residualCaffeineAtBed} <span className="text-xs font-normal text-zinc-400">mg</span>
                    </p>
                  </div>
                </div>

                {/* Sleep Impact Diagnosis */}
                <div className={`p-4 rounded-xl border flex items-start gap-3 ${
                  analysis.isSevereSleepDisrupted
                    ? "bg-red-950/30 border-red-800/60 text-red-200"
                    : analysis.isSleepDisrupted
                    ? "bg-amber-950/25 border-amber-800/50 text-amber-200"
                    : "bg-emerald-950/25 border-emerald-800/50 text-emerald-200"
                }`}>
                  {analysis.isSevereSleepDisrupted ? (
                    <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  ) : analysis.isSleepDisrupted ? (
                    <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  ) : (
                    <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <p className="font-bold text-sm">
                      {analysis.isSevereSleepDisrupted
                        ? "⚠️ High Insomnia & REM Suppression Alert"
                        : analysis.isSleepDisrupted
                        ? "⚡ Mild Sleep Latency Expected"
                        : "✅ 100% Sleep & Recovery Safe"}
                    </p>
                    <p className="text-xs opacity-90 mt-1 leading-relaxed">
                      {analysis.isSevereSleepDisrupted
                        ? `Having ~${activeBev.caffeineMg}mg at ${analysis.intakeTimeStr} leaves ~${analysis.residualCaffeineAtBed}mg in your bloodstream at ${bedHour}:00 bed time. Switch to a non-stim pump or train earlier to safeguard muscle recovery.`
                        : analysis.isSleepDisrupted
                        ? `You have ~${analysis.residualCaffeineAtBed}mg active at bedtime (${analysis.hoursBetweenIntakeAndBed}h clearance). Drink extra water and ensure bedroom is cold and dark.`
                        : `Clearance window is over ${analysis.hoursBetweenIntakeAndBed} hours. You will enjoy maximum gym aggression without compromising muscle hypertrophy sleep.`}
                    </p>
                  </div>
                </div>

                {/* Islamabad Gym Bio-Tip */}
                <div className="bg-zinc-950/70 border border-zinc-800/80 rounded-xl p-3.5 text-xs text-zinc-400">
                  <p className="font-semibold text-zinc-300 mb-1">💡 Islamabad Gym Tip:</p>
                  <p>
                    For late evening sessions after 8:00 PM at Power Fitness Zone, substitute high-stim pre-workouts with strong Kehwa (green tea) + pinch of pink Himalayan salt for natural electrolyte vascularity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
