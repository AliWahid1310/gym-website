"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Play, Pause, RotateCcw, FastForward, Volume2, VolumeX, Maximize2, Minimize2, Flame, Trophy } from "lucide-react";

type TimerPhase = "idle" | "prep" | "work" | "rest" | "finished";

interface TimerPreset {
  id: string;
  name: string;
  desc: string;
  prep: number;
  work: number;
  rest: number;
  sets: number;
}

const PRESETS: TimerPreset[] = [
  { id: "tabata", name: "Tabata 20/10", desc: "4-Minute Fat Scorcher", prep: 5, work: 20, rest: 10, sets: 8 },
  { id: "hiit30", name: "HIIT 30/15", desc: "Endurance & Speed", prep: 5, work: 30, rest: 15, sets: 6 },
  { id: "boxing", name: "Boxing Rounds", desc: "3m Work / 1m Rest", prep: 10, work: 180, rest: 60, sets: 5 },
  { id: "emom", name: "EMOM 60s", desc: "Every Minute On Minute", prep: 5, work: 45, rest: 15, sets: 10 },
];

export default function IntervalTimer() {
  const [activePreset, setActivePreset] = useState<string>("tabata");
  const [prepTime, setPrepTime] = useState<number>(5);
  const [workTime, setWorkTime] = useState<number>(20);
  const [restTime, setRestTime] = useState<number>(10);
  const [totalSets, setTotalSets] = useState<number>(8);

  const [currentSet, setCurrentSet] = useState<number>(1);
  const [phase, setPhase] = useState<TimerPhase>("idle");
  const [timeLeft, setTimeLeft] = useState<number>(20);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Play audio beeps using Web Audio API
  const playBeep = useCallback((freq = 880, duration = 0.15) => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioCtx();
      }
      if (audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Audio playback failsafe
    }
  }, [soundEnabled]);

  const selectPreset = (preset: TimerPreset) => {
    setActivePreset(preset.id);
    setPrepTime(preset.prep);
    setWorkTime(preset.work);
    setRestTime(preset.rest);
    setTotalSets(preset.sets);
    resetTimer(preset.prep, preset.work);
  };

  const resetTimer = (newPrep = prepTime, newWork = workTime) => {
    setIsRunning(false);
    setPhase("idle");
    setCurrentSet(1);
    setTimeLeft(newPrep > 0 ? newPrep : newWork);
  };

  const startTimer = () => {
    if (phase === "idle" || phase === "finished") {
      setPhase(prepTime > 0 ? "prep" : "work");
      setTimeLeft(prepTime > 0 ? prepTime : workTime);
      setCurrentSet(1);
    }
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const nextInterval = useCallback(() => {
    if (phase === "prep") {
      playBeep(880, 0.4); // High bell
      setPhase("work");
      setTimeLeft(workTime);
    } else if (phase === "work") {
      if (currentSet < totalSets) {
        playBeep(440, 0.25); // Low bell
        setPhase("rest");
        setTimeLeft(restTime);
      } else {
        playBeep(1046, 0.6); // Finish fanfare
        setPhase("finished");
        setIsRunning(false);
      }
    } else if (phase === "rest") {
      playBeep(880, 0.4);
      setCurrentSet((s) => s + 1);
      setPhase("work");
      setTimeLeft(workTime);
    }
  }, [phase, currentSet, totalSets, workTime, restTime, playBeep]);

  // Main countdown effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 4 && prev > 1) {
            playBeep(600, 0.1); // Countdown warning tick
          }
          return prev - 1;
        });
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      nextInterval();
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft, nextInterval, playBeep]);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const totalWorkoutSeconds = prepTime + totalSets * workTime + (totalSets - 1) * restTime;

  // Phase color & text mapping
  const getPhaseStyles = () => {
    switch (phase) {
      case "prep":
        return {
          title: "GET READY",
          color: "text-amber-400",
          border: "border-amber-500",
          bg: "bg-amber-500/10",
          ring: "#f59e0b",
        };
      case "work":
        return {
          title: "WORK / PUSH!",
          color: "text-emerald-400",
          border: "border-emerald-500",
          bg: "bg-emerald-500/10",
          ring: "#10b981",
        };
      case "rest":
        return {
          title: "REST & BREATHE",
          color: "text-blue-400",
          border: "border-blue-500",
          bg: "bg-blue-500/10",
          ring: "#3b82f6",
        };
      case "finished":
        return {
          title: "WORKOUT COMPLETED! 🏆",
          color: "text-red-500",
          border: "border-red-500",
          bg: "bg-red-500/10",
          ring: "#ef4444",
        };
      default:
        return {
          title: "READY TO START",
          color: "text-neutral-300",
          border: "border-neutral-700",
          bg: "bg-neutral-800/40",
          ring: "#52525b",
        };
    }
  };

  const currentStyles = getPhaseStyles();
  const currentPhaseMax = phase === "prep" ? prepTime : phase === "work" ? workTime : phase === "rest" ? restTime : 1;
  const progressRatio = phase === "idle" || phase === "finished" ? 1 : timeLeft / (currentPhaseMax || 1);

  return (
    <section id="interval-timer" className="py-20 bg-[#0A0A0A] text-white relative overflow-hidden border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-red-950/80 text-red-400 border border-red-800/50 mb-4">
            <Flame className="w-3.5 h-3.5" />
            High Intensity Training
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            PFZ <span className="text-red-500">HIIT & Tabata</span> Workout Timer
          </h2>
          <p className="mt-4 text-neutral-400 text-base sm:text-lg">
            Built-in professional interval countdown with high-contrast displays, acoustic audio beeps, and customizable gym rounds.
          </p>
        </div>

        {/* Preset Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto mb-8">
          {PRESETS.map((p) => (
            <button
              key={p.id}
              onClick={() => selectPreset(p)}
              className={`p-3.5 rounded-2xl border text-left transition-all ${
                activePreset === p.id
                  ? "bg-red-950/70 border-red-500 text-white shadow-lg shadow-red-950/50"
                  : "bg-neutral-900 border-neutral-800 text-neutral-400 hover:border-neutral-700"
              }`}
            >
              <div className="font-bold text-sm text-white">{p.name}</div>
              <div className="text-[11px] text-neutral-400 mt-0.5">{p.desc}</div>
              <div className="text-[10px] text-red-400 font-semibold mt-1">
                {p.sets} Sets • {p.work}s/{p.rest}s
              </div>
            </button>
          ))}
        </div>

        {/* Timer Main Screen */}
        <div
          ref={containerRef}
          className={`max-w-4xl mx-auto bg-neutral-900/90 border border-neutral-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden transition-all ${
            isFullscreen ? "fixed inset-0 z-50 rounded-none flex flex-col justify-center items-center bg-black" : ""
          }`}
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between w-full mb-8">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold tracking-wider px-3 py-1 bg-neutral-800 rounded-lg text-neutral-300">
                Set {currentSet} of {totalSets}
              </span>
              <span className="text-xs text-neutral-400 font-medium hidden sm:inline">
                Total Est: {formatTime(totalWorkoutSeconds)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors"
                title={soundEnabled ? "Mute Sound" : "Enable Sound"}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-neutral-500" />}
              </button>
              <button
                onClick={toggleFullscreen}
                className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors"
                title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Mode"}
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Center Circular Display */}
          <div className="flex flex-col items-center justify-center my-4">
            <div
              className={`text-sm sm:text-base font-extrabold uppercase tracking-widest px-5 py-1.5 rounded-full mb-6 ${currentStyles.bg} ${currentStyles.color} border ${currentStyles.border} animate-pulse`}
            >
              {currentStyles.title}
            </div>

            {/* Circular Progress Display */}
            <div className="relative w-56 h-56 sm:w-72 sm:h-72 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
                {/* Background Track */}
                <circle cx="50" cy="50" r="44" stroke="currentColor" strokeWidth="6" className="text-neutral-800 fill-none" />
                {/* Progress Arc */}
                <circle
                  cx="50"
                  cy="50"
                  r="44"
                  stroke={currentStyles.ring}
                  strokeWidth="6"
                  strokeDasharray="276.46"
                  strokeDashoffset={276.46 * (1 - progressRatio)}
                  strokeLinecap="round"
                  className="fill-none transition-all duration-300"
                />
              </svg>

              {/* Time Numbers */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-6xl sm:text-7xl font-black font-mono tracking-tight text-white">
                  {formatTime(timeLeft)}
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mt-1">
                  {phase === "prep" ? "Prep Time" : phase === "work" ? "Work Interval" : phase === "rest" ? "Rest Period" : "Interval"}
                </span>
              </div>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => resetTimer()}
              className="p-4 rounded-2xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-all active:scale-95"
              title="Reset Timer"
            >
              <RotateCcw className="w-6 h-6" />
            </button>

            {isRunning ? (
              <button
                onClick={pauseTimer}
                className="py-4 px-8 rounded-2xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-black text-lg flex items-center gap-2 transition-all shadow-lg shadow-amber-500/30 active:scale-95"
              >
                <Pause className="w-6 h-6 fill-neutral-950" /> PAUSE
              </button>
            ) : (
              <button
                onClick={startTimer}
                className="py-4 px-8 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-black text-lg flex items-center gap-2 transition-all shadow-lg shadow-red-600/30 active:scale-95"
              >
                <Play className="w-6 h-6 fill-white" /> {phase === "idle" ? "START WORKOUT" : "RESUME"}
              </button>
            )}

            <button
              onClick={nextInterval}
              disabled={phase === "idle" || phase === "finished"}
              className="p-4 rounded-2xl bg-neutral-800 hover:bg-neutral-700 disabled:opacity-40 text-neutral-300 transition-all active:scale-95"
              title="Skip Interval"
            >
              <FastForward className="w-6 h-6" />
            </button>
          </div>

          {/* Custom Time Tweaks */}
          {!isFullscreen && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-10 pt-8 border-t border-neutral-800 text-xs">
              <div>
                <span className="text-neutral-500 block mb-1 font-semibold uppercase">Prep (Secs)</span>
                <input
                  type="number"
                  min={0}
                  max={60}
                  value={prepTime}
                  onChange={(e) => setPrepTime(Math.max(0, Number(e.target.value)))}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-xl p-2 font-bold text-white text-center"
                />
              </div>
              <div>
                <span className="text-neutral-500 block mb-1 font-semibold uppercase">Work (Secs)</span>
                <input
                  type="number"
                  min={5}
                  max={600}
                  value={workTime}
                  onChange={(e) => setWorkTime(Math.max(5, Number(e.target.value)))}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-xl p-2 font-bold text-white text-center"
                />
              </div>
              <div>
                <span className="text-neutral-500 block mb-1 font-semibold uppercase">Rest (Secs)</span>
                <input
                  type="number"
                  min={0}
                  max={300}
                  value={restTime}
                  onChange={(e) => setRestTime(Math.max(0, Number(e.target.value)))}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-xl p-2 font-bold text-white text-center"
                />
              </div>
              <div>
                <span className="text-neutral-500 block mb-1 font-semibold uppercase">Total Sets</span>
                <input
                  type="number"
                  min={1}
                  max={30}
                  value={totalSets}
                  onChange={(e) => setTotalSets(Math.max(1, Number(e.target.value)))}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-xl p-2 font-bold text-white text-center"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
