"use client";

import { useState, useEffect } from "react";
import { Flame, Play, Pause, RotateCcw, CheckCircle2, ChevronRight, ShieldAlert, Sparkles, Copy, Check, Clock } from "lucide-react";

interface WarmupExercise {
  name: string;
  repsOrDuration: string;
  focus: string;
  tip: string;
  icon: string;
  seconds: number;
}

interface RoutineTemplate {
  title: string;
  target: string;
  icon: string;
  exercises: WarmupExercise[];
}

const WARMUP_ROUTINES: Record<string, RoutineTemplate> = {
  push: {
    title: "Upper Body & Push Day Mobility",
    target: "Rotator cuff, pecs, anterior delts & wrist flexors",
    icon: "🛡️",
    exercises: [
      { name: "Arm Circles & Cross-Body Swings", repsOrDuration: "30s", focus: "Scapular warming", tip: "Start small then widen circles gradually to open shoulder capsules.", icon: "🔄", seconds: 30 },
      { name: "Band / Towel Shoulder Dislocates", repsOrDuration: "12 Reps", focus: "Rotator cuff & thoracic spine", tip: "Keep core tight; do not arch your lower back as hands pass overhead.", icon: "🏹", seconds: 40 },
      { name: "Scapular Push-ups & Prone Y-Raises", repsOrDuration: "10 Reps", focus: "Serratus anterior & traps", tip: "Keep arms locked straight; push chest away from floor with shoulder blades.", icon: "💪", seconds: 35 },
      { name: "Doorway / Wall Pec Stretch with Pulse", repsOrDuration: "40s total", focus: "Pec minor & bicep tendon", tip: "Gentle pulse at end-range to prime bench press range of motion.", icon: "🚪", seconds: 40 },
      { name: "Wrist Rotations & Floor Palms Press", repsOrDuration: "30s", focus: "Wrist extension stability", tip: "Crucial before heavy barbell pressing to prevent wrist strain.", icon: "🤲", seconds: 30 },
    ],
  },
  pull: {
    title: "Back & Pull Day Primer",
    target: "Lats, rhomboids, rear delts, thoracic spine & biceps",
    icon: "🦅",
    exercises: [
      { name: "Cat-Cow & Thoracic Rotations", repsOrDuration: "45s", focus: "Spine decompression", tip: "Inhale when arching up, exhale and round upper spine completely.", icon: "🐈", seconds: 45 },
      { name: "Dead Hang from Pull-up Bar", repsOrDuration: "30s", focus: "Lat stretch & grip activation", tip: "Let shoulders sink freely; take 3 deep belly breaths.", icon: "🧗", seconds: 30 },
      { name: "Scapular Pull-ups (Passive to Active)", repsOrDuration: "8 Reps", focus: "Lower lat & scapular depression", tip: "Do not bend elbows; pull down exclusively via shoulder blades.", icon: "⚡", seconds: 35 },
      { name: "Band Pull-Aparts / Face Pull Primers", repsOrDuration: "15 Reps", focus: "Rear delts & rhomboids", tip: "Squeeze shoulder blades together for 1 full second at peak contraction.", icon: "🎯", seconds: 40 },
      { name: "Hip Hinge Lat Stretch on Upright Post", repsOrDuration: "30s", focus: "Lumbodorsal fascia", tip: "Hinge hips back while gripping upright post at hip level.", icon: "📐", seconds: 30 },
    ],
  },
  legs: {
    title: "Leg Day & Squat Mobility Protocol",
    target: "Ankle dorsiflexion, hip flexors, adductors & glute activation",
    icon: "🦵",
    exercises: [
      { name: "World's Greatest Stretch & Lunge Twist", repsOrDuration: "5 reps/side", focus: "Hip flexors, thoracic & hamstrings", tip: "Drive back hip forward while reaching top arm toward the gym ceiling.", icon: "🌍", seconds: 50 },
      { name: "Deep Bodyweight Squat Pry with Elbows", repsOrDuration: "40s hold", focus: "Ankle mobility & groin opening", tip: "Push knees outward with elbows; keep heels glued flat to the floor.", icon: "🧘", seconds: 40 },
      { name: "Glute Bridges with 2s Squeeze", repsOrDuration: "12 Reps", focus: "Gluteus maximus firing", tip: "Drive exclusively through heels; wake up glutes before loading barbells.", icon: "🔥", seconds: 35 },
      { name: "Ankle Dorsiflexion Wall Drives", repsOrDuration: "10 drives/leg", focus: "Calf & Achilles mobility", tip: "Drive knee past toes without letting the heel lift off the ground.", icon: "🦶", seconds: 40 },
      { name: "Lateral Cossack Squat Shifts", repsOrDuration: "6 reps/side", focus: "Adductors & hip internal rotation", tip: "Stay low during transitions; point straight leg toe up.", icon: "🦀", seconds: 45 },
    ],
  },
  deadlift: {
    title: "Heavy Deadlift & Posterior Chain Prep",
    target: "Hamstrings, spinal erectors, glutes & core bracing",
    icon: "🏋️‍♂️",
    exercises: [
      { name: "Inchworm into High Plank", repsOrDuration: "5 Reps", focus: "Hamstrings & shoulder stability", tip: "Walk hands out with minimal knee bend to stretch posterior chain.", icon: "🐛", seconds: 45 },
      { name: "Bird-Dogs with Strict Core Lock", repsOrDuration: "6 reps/side", focus: "Core anti-rotation & lower back", tip: "Don't let hips tilt; imagine balancing a glass of water on your lower back.", icon: "🐕", seconds: 40 },
      { name: "Single-Leg Romanian Deadlift Reach (Unloaded)", repsOrDuration: "8 reps/leg", focus: "Hamstring stretch & balance", tip: "Push back heel toward the wall behind you; maintain flat spine.", icon: "⚖️", seconds: 45 },
      { name: "Barbell / PVC Good Mornings", repsOrDuration: "10 Reps", focus: "Hinge pattern motor priming", tip: "Soft knees, push hips back until hamstrings are at maximum stretch.", icon: "🌾", seconds: 35 },
      { name: "Diaphragmatic 360° Core Bracing Drills", repsOrDuration: "3 deep cycles", focus: "Intra-abdominal pressure", tip: "Expand belly, sides, and lower back simultaneously before lifting.", icon: "🫁", seconds: 30 },
    ],
  },
  fullbody: {
    title: "Full Body HIIT & Dynamic Cardio Primer",
    target: "Heart rate elevation, CNS activation & multi-joint agility",
    icon: "⚡",
    exercises: [
      { name: "High Knees into Butt Kicks", repsOrDuration: "40s", focus: "Elevate heart rate & quad/hamstring elasticity", tip: "Stay light on balls of feet; pump arms actively in rhythm.", icon: "🏃", seconds: 40 },
      { name: "Walking Lunges with Torso Reach", repsOrDuration: "10 total", focus: "Dynamic leg drive & core", tip: "Take deep strides; touch back knee lightly near floor.", icon: "🚶", seconds: 45 },
      { name: "Jumping Jacks into Mountain Climbers", repsOrDuration: "45s", focus: "Cardio conditioning & shoulders", tip: "Maintain swift, controlled cadence without sagging hips.", icon: "🏔️", seconds: 45 },
      { name: "A-Skips & Lateral Shuffles", repsOrDuration: "30s", focus: "Ankle stiffness & fast-twitch CNS", tip: "Snap foot quickly off the ground; explosive rhythm.", icon: "⚡", seconds: 30 },
    ],
  },
};

export default function WarmupGenerator() {
  const [selectedCategory, setSelectedCategory] = useState<string>("push");
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [copied, setCopied] = useState<boolean>(false);

  const currentRoutine = WARMUP_ROUTINES[selectedCategory] || WARMUP_ROUTINES.push;
  const currentExercise = currentRoutine.exercises[activeStepIndex] || currentRoutine.exercises[0];

  useEffect(() => {
    setActiveStepIndex(0);
    setTimerRunning(false);
    setTimeLeft(currentRoutine.exercises[0].seconds);
  }, [selectedCategory, currentRoutine.exercises]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timerRunning && timeLeft === 0) {
      if (activeStepIndex < currentRoutine.exercises.length - 1) {
        setActiveStepIndex((prev) => prev + 1);
        setTimeLeft(currentRoutine.exercises[activeStepIndex + 1].seconds);
      } else {
        setTimerRunning(false);
      }
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerRunning, timeLeft, activeStepIndex, currentRoutine.exercises]);

  const toggleTimer = () => {
    setTimerRunning(!timerRunning);
  };

  const resetTimer = () => {
    setTimerRunning(false);
    setTimeLeft(currentExercise.seconds);
  };

  const selectStep = (idx: number) => {
    setActiveStepIndex(idx);
    setTimerRunning(false);
    setTimeLeft(currentRoutine.exercises[idx].seconds);
  };

  const copyRoutine = () => {
    const text = `🔥 ${currentRoutine.title} - Power Fitness Zone Warm-up Protocol\n\nTarget: ${currentRoutine.target}\n\n` +
      currentRoutine.exercises
        .map((ex, i) => `${i + 1}. ${ex.name} (${ex.repsOrDuration})\n   Focus: ${ex.focus}\n   Coach Tip: ${ex.tip}`)
        .join("\n\n") +
      `\n\n🏋️‍♂️ Generated at Power Fitness Zone Islamabad`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const totalRoutineSeconds = currentRoutine.exercises.reduce((acc, ex) => acc + ex.seconds, 0);
  const totalMinutes = Math.ceil(totalRoutineSeconds / 60);

  return (
    <section id="warmup-generator" className="py-20 bg-gradient-to-b from-black via-zinc-950 to-black text-white relative overflow-hidden">
      {/* Background glow accent */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Flame className="w-4 h-4 text-red-500" />
            Injury Prevention & CNS Activation
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
            Dynamic Warm-Up & <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400">Mobility Primer</span>
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg">
            Cold muscles cause gym tears and limit 1RM output. Select your workout split below for a tailored joint mobility protocol with audio-ready timer guidance.
          </p>
        </div>

        {/* Category Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          {Object.entries(WARMUP_ROUTINES).map(([key, item]) => {
            const isSelected = selectedCategory === key;
            return (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                  isSelected
                    ? "bg-red-600 text-white shadow-lg shadow-red-600/30 scale-105 border border-red-500"
                    : "bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800/80"
                }`}
              >
                <span className="text-base">{item.icon}</span>
                <span>{item.title.split("&")[0].trim()}</span>
              </button>
            );
          })}
        </div>

        {/* Main Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Routine Exercises List */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-zinc-900/90 border border-zinc-800/80 rounded-2xl p-6 backdrop-blur-md">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-zinc-800">
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <span>{currentRoutine.icon}</span>
                    {currentRoutine.title}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-red-400" />
                    Est. Duration: ~{totalMinutes} mins ({currentRoutine.exercises.length} Exercises)
                  </p>
                </div>
                <button
                  onClick={copyRoutine}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-medium border border-zinc-700 transition"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5 text-zinc-400" />}
                  {copied ? "Copied Routine!" : "Copy Routine"}
                </button>
              </div>

              <div className="mt-4 p-3 bg-red-950/20 border border-red-900/30 rounded-xl flex items-start gap-2.5 text-xs text-red-300">
                <ShieldAlert className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span><strong>Target Prep:</strong> {currentRoutine.target}. Perform before loading weights.</span>
              </div>

              <div className="mt-5 space-y-2.5">
                {currentRoutine.exercises.map((ex, idx) => {
                  const isActive = idx === activeStepIndex;
                  return (
                    <div
                      key={idx}
                      onClick={() => selectStep(idx)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                        isActive
                          ? "bg-red-900/20 border-red-500/60 shadow-md shadow-red-900/20"
                          : "bg-zinc-950/60 border-zinc-800/60 hover:border-zinc-700 hover:bg-zinc-800/40"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                          isActive ? "bg-red-600 text-white" : "bg-zinc-800 text-zinc-400"
                        }`}>
                          {idx + 1}
                        </span>
                        <div>
                          <p className={`font-semibold text-sm ${isActive ? "text-white" : "text-zinc-300"}`}>
                            {ex.name}
                          </p>
                          <p className="text-xs text-zinc-500">
                            Focus: <span className="text-zinc-400">{ex.focus}</span>
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs px-2.5 py-1 rounded-full bg-zinc-800/80 text-red-400 font-mono font-medium border border-zinc-700/50">
                          {ex.repsOrDuration}
                        </span>
                        <ChevronRight className={`w-4 h-4 ${isActive ? "text-red-500" : "text-zinc-600"}`} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Active Exercise Focus & Live Timer */}
          <div className="lg:col-span-5">
            <div className="bg-gradient-to-b from-zinc-900 to-zinc-950 border border-zinc-800 rounded-2xl p-6 sm:p-7 sticky top-24 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold text-red-400 tracking-wider uppercase bg-red-950/40 border border-red-900/40 px-2.5 py-1 rounded-md">
                  Step {activeStepIndex + 1} of {currentRoutine.exercises.length}
                </span>
                <span className="text-2xl">{currentExercise.icon}</span>
              </div>

              <h4 className="text-xl sm:text-2xl font-black text-white mb-2 leading-tight">
                {currentExercise.name}
              </h4>
              <p className="text-xs text-zinc-400 mb-6 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                Target: <span className="text-zinc-300 font-medium">{currentExercise.focus}</span>
              </p>

              {/* Countdown Dial / Progress Display */}
              <div className="bg-zinc-950 border border-zinc-800/80 rounded-2xl p-6 mb-6 text-center">
                <div className="text-5xl font-black font-mono tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400 mb-1">
                  {timeLeft}s
                </div>
                <p className="text-xs text-zinc-500 uppercase tracking-widest font-mono">Suggested Countdown</p>

                {/* Controls */}
                <div className="flex items-center justify-center gap-3 mt-5">
                  <button
                    onClick={toggleTimer}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition shadow-lg ${
                      timerRunning
                        ? "bg-amber-600 hover:bg-amber-500 text-white shadow-amber-600/20"
                        : "bg-red-600 hover:bg-red-500 text-white shadow-red-600/30"
                    }`}
                  >
                    {timerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                    {timerRunning ? "Pause Interval" : "Start Interval"}
                  </button>
                  <button
                    onClick={resetTimer}
                    className="p-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white border border-zinc-700 transition"
                    title="Reset timer"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Coach execution note */}
              <div className="bg-zinc-900/70 border border-zinc-800/60 rounded-xl p-4">
                <p className="text-xs font-semibold text-zinc-300 mb-1 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-red-400" />
                  Power Coach Form Cue:
                </p>
                <p className="text-xs text-zinc-400 leading-relaxed italic">
                  &ldquo;{currentExercise.tip}&rdquo;
                </p>
              </div>

              {/* Next step navigation */}
              <div className="mt-6 flex items-center justify-between pt-4 border-t border-zinc-800">
                <button
                  disabled={activeStepIndex === 0}
                  onClick={() => selectStep(activeStepIndex - 1)}
                  className="text-xs font-semibold text-zinc-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition"
                >
                  ← Previous Exercise
                </button>
                <button
                  disabled={activeStepIndex === currentRoutine.exercises.length - 1}
                  onClick={() => selectStep(activeStepIndex + 1)}
                  className="text-xs font-semibold text-red-400 hover:text-red-300 disabled:opacity-30 disabled:pointer-events-none transition flex items-center gap-1"
                >
                  Next Exercise →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
