"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Activity,
  Flame,
  Zap,
  Clock,
  Sparkles,
  Award
} from "lucide-react";

interface TempoPreset {
  name: string;
  desc: string;
  eccentric: number; // Down / Lowering seconds
  pauseBottom: number; // Isometric Bottom hold seconds
  concentric: number; // Up / Lifting seconds
  pauseTop: number; // Top Squeeze seconds
  tag: string;
}

const TEMPO_PRESETS: TempoPreset[] = [
  {
    name: "3-1-1-0 Hypertrophy Builder",
    desc: "The gold standard for muscle growth and mind-muscle connection.",
    eccentric: 3,
    pauseBottom: 1,
    concentric: 1,
    pauseTop: 0,
    tag: "Most Popular",
  },
  {
    name: "4-2-1-0 High Time-Under-Tension",
    desc: "Maximizes metabolic stress and mechanical tension on muscle fibers.",
    eccentric: 4,
    pauseBottom: 2,
    concentric: 1,
    pauseTop: 0,
    tag: "Hypertrophy",
  },
  {
    name: "4-3-1-0 Isometric Pause Mastery",
    desc: "Eliminates stretch reflex for pause squats, bench presses & dead-stops.",
    eccentric: 4,
    pauseBottom: 3,
    concentric: 1,
    pauseTop: 0,
    tag: "Strength",
  },
  {
    name: "2-0-1-0 Explosive Speed & Power",
    desc: "Dynamic effort lifting focused on high velocity barbell speed.",
    eccentric: 2,
    pauseBottom: 0,
    concentric: 1,
    pauseTop: 0,
    tag: "Powerlifting",
  },
];

type Phase = "eccentric" | "pauseBottom" | "concentric" | "pauseTop" | "complete";

export default function TempoMetronome() {
  const [selectedPresetIndex, setSelectedPresetIndex] = useState<number>(0);
  const [eccentric, setEccentric] = useState<number>(3);
  const [pauseBottom, setPauseBottom] = useState<number>(1);
  const [concentric, setConcentric] = useState<number>(1);
  const [pauseTop, setPauseTop] = useState<number>(0);

  const [targetReps, setTargetReps] = useState<number>(8);
  const [currentRep, setCurrentRep] = useState<number>(1);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [currentPhase, setCurrentPhase] = useState<Phase>("eccentric");
  const [phaseSecondsLeft, setPhaseSecondsLeft] = useState<number>(3);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [totalTutSeconds, setTotalTutSeconds] = useState<number>(0);

  const audioCtxRef = useRef<AudioContext | null>(null);

  // Play audio tone
  const playTone = useCallback((freq: number, duration: number = 0.1) => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      }
      if (audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }
      const osc = audioCtxRef.current.createOscillator();
      const gain = audioCtxRef.current.createGain();
      osc.connect(gain);
      gain.connect(audioCtxRef.current.destination);
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, audioCtxRef.current.currentTime);
      gain.gain.setValueAtTime(0.2, audioCtxRef.current.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtxRef.current.currentTime + duration);
      osc.start();
      osc.stop(audioCtxRef.current.currentTime + duration);
    } catch {
      // Audio fallback
    }
  }, [soundEnabled]);

  // Apply preset
  const handleSelectPreset = (idx: number) => {
    setSelectedPresetIndex(idx);
    const p = TEMPO_PRESETS[idx];
    setEccentric(p.eccentric);
    setPauseBottom(p.pauseBottom);
    setConcentric(p.concentric);
    setPauseTop(p.pauseTop);
    handleReset();
  };

  const handleReset = () => {
    setIsActive(false);
    setCurrentRep(1);
    setCurrentPhase("eccentric");
    setPhaseSecondsLeft(eccentric);
    setTotalTutSeconds(0);
  };

  // Timer interval engine
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && currentPhase !== "complete") {
      interval = setInterval(() => {
        setTotalTutSeconds((prev) => prev + 1);

        setPhaseSecondsLeft((prev) => {
          if (prev > 1) {
            // Regular tick
            playTone(440, 0.08); // A4 tick
            return prev - 1;
          }

          // Phase transition
          if (currentPhase === "eccentric") {
            if (pauseBottom > 0) {
              setCurrentPhase("pauseBottom");
              playTone(554.37, 0.15); // C#5 bottom cue
              return pauseBottom;
            } else {
              setCurrentPhase("concentric");
              playTone(880, 0.2); // A5 explode cue
              return concentric;
            }
          } else if (currentPhase === "pauseBottom") {
            setCurrentPhase("concentric");
            playTone(880, 0.2); // A5 explode cue
            return concentric;
          } else if (currentPhase === "concentric") {
            if (pauseTop > 0) {
              setCurrentPhase("pauseTop");
              playTone(659.25, 0.15); // E5 squeeze cue
              return pauseTop;
            } else {
              // Check if completed rep
              if (currentRep >= targetReps) {
                setCurrentPhase("complete");
                setIsActive(false);
                playTone(1046.5, 0.5); // C6 victory tone
                return 0;
              } else {
                setCurrentRep((r) => r + 1);
                setCurrentPhase("eccentric");
                playTone(523.25, 0.15); // C5 start next rep
                return eccentric;
              }
            }
          } else if (currentPhase === "pauseTop") {
            if (currentRep >= targetReps) {
              setCurrentPhase("complete");
              setIsActive(false);
              playTone(1046.5, 0.5);
              return 0;
            } else {
              setCurrentRep((r) => r + 1);
              setCurrentPhase("eccentric");
              playTone(523.25, 0.15);
              return eccentric;
            }
          }
          return 0;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [
    isActive,
    currentPhase,
    currentRep,
    targetReps,
    eccentric,
    pauseBottom,
    concentric,
    pauseTop,
    playTone,
  ]);

  const singleRepTime = eccentric + pauseBottom + concentric + pauseTop;
  const estimatedSetTime = singleRepTime * targetReps;

  const getPhaseDisplay = () => {
    switch (currentPhase) {
      case "eccentric":
        return {
          title: "LOWERING (ECCENTRIC)",
          action: "Control the descent smoothly",
          color: "text-blue-400",
          border: "border-blue-500",
          bg: "bg-blue-950/40",
        };
      case "pauseBottom":
        return {
          title: "BOTTOM PAUSE (ISOMETRIC)",
          action: "Hold deep stretch • Zero bounce",
          color: "text-amber-400",
          border: "border-amber-500",
          bg: "bg-amber-950/40",
        };
      case "concentric":
        return {
          title: "DRIVE UP (CONCENTRIC)",
          action: "Explosive upward power & intent",
          color: "text-red-400",
          border: "border-red-500",
          bg: "bg-red-950/40",
        };
      case "pauseTop":
        return {
          title: "TOP SQUEEZE (PEAK)",
          action: "Lockout & contract muscles",
          color: "text-emerald-400",
          border: "border-emerald-500",
          bg: "bg-emerald-950/40",
        };
      case "complete":
        return {
          title: "SET COMPLETED!",
          action: "Great job! Rest 90-180 seconds now",
          color: "text-emerald-400",
          border: "border-emerald-500",
          bg: "bg-emerald-950/60",
        };
    }
  };

  const phaseMeta = getPhaseDisplay();

  return (
    <section id="tempo-metronome" className="py-20 bg-[#080808] text-white relative overflow-hidden border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-red-950/80 text-red-400 border border-red-800/50 mb-4">
            <Activity className="w-3.5 h-3.5 text-red-500 animate-pulse" />
            <span>Time-Under-Tension Precision</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight uppercase">
            Rep Tempo & <span className="text-red-500">Cadence Metronome</span>
          </h2>
          <p className="mt-3 text-neutral-400 text-sm sm:text-base">
            Control your eccentric lowering, eliminate momentum bounces, and guarantee explosive muscle hypertrophy with live auditory cadence cues.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Visual Pulse Metronome Box */}
          <div className="lg:col-span-6 bg-neutral-900/90 border border-neutral-800 p-6 sm:p-8 rounded-3xl shadow-2xl flex flex-col items-center justify-between text-center relative overflow-hidden">
            {/* Top Toolbar */}
            <div className="w-full flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                <Clock className="w-3.5 h-3.5 text-red-500" />
                <span>Total TUT: <strong className="text-white">{totalTutSeconds}s</strong></span>
              </div>
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`p-2 rounded-xl border transition-all ${
                  soundEnabled
                    ? "bg-neutral-800 border-neutral-700 text-red-400 hover:text-white"
                    : "bg-neutral-800/40 border-neutral-700/40 text-neutral-500"
                }`}
                title="Toggle Sound"
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
            </div>

            {/* Circular Pulse Visual Gauge */}
            <div className="my-6 relative flex items-center justify-center">
              {/* Outer pulsing ring */}
              <div
                className={`w-56 h-56 sm:w-64 sm:h-64 rounded-full border-4 flex flex-col items-center justify-center transition-all duration-300 ${phaseMeta.border} ${phaseMeta.bg} ${
                  isActive ? "scale-105 shadow-2xl shadow-red-600/20" : "scale-100"
                }`}
              >
                <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 font-bold mb-1">
                  {currentPhase === "complete" ? "VICTORY" : `REP ${currentRep} / ${targetReps}`}
                </span>

                <div className="font-mono font-black text-6xl sm:text-7xl text-white tracking-tight">
                  {currentPhase === "complete" ? "✓" : phaseSecondsLeft}
                </div>

                <span className={`text-xs font-black uppercase tracking-wider mt-2 ${phaseMeta.color}`}>
                  {phaseMeta.title}
                </span>
              </div>
            </div>

            {/* Phase Subtitle / Guidance */}
            <div className="w-full p-3 rounded-2xl bg-neutral-950/70 border border-neutral-800/80 mb-6">
              <div className="text-xs font-semibold text-neutral-200">
                {phaseMeta.action}
              </div>
            </div>

            {/* Play / Pause / Reset Controls */}
            <div className="w-full flex items-center justify-center gap-4">
              <button
                onClick={handleReset}
                className="p-4 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-2xl text-neutral-300 transition-colors"
                title="Reset Set"
              >
                <RotateCcw className="w-5 h-5" />
              </button>

              <button
                onClick={() => {
                  if (currentPhase === "complete") {
                    handleReset();
                    setIsActive(true);
                  } else {
                    setIsActive(!isActive);
                  }
                }}
                className={`flex-1 py-4 px-6 rounded-2xl font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl transition-all ${
                  isActive
                    ? "bg-amber-600 hover:bg-amber-700 text-white shadow-amber-600/30"
                    : "bg-red-600 hover:bg-red-700 text-white shadow-red-600/30"
                }`}
              >
                {isActive ? (
                  <>
                    <Pause className="w-5 h-5" /> Pause Cadence
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" /> {currentPhase === "complete" ? "Restart Set" : "Start Rep Tempo"}
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Configuration & Presets Column */}
          <div className="lg:col-span-6 space-y-6">
            {/* Presets Grid */}
            <div className="bg-neutral-900/90 border border-neutral-800 p-6 rounded-3xl shadow-2xl">
              <h3 className="font-bold text-sm uppercase tracking-wider text-white mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-red-500" />
                Select Hypertrophy & Strength Cadence
              </h3>

              <div className="space-y-2.5">
                {TEMPO_PRESETS.map((preset, idx) => (
                  <button
                    key={preset.name}
                    onClick={() => handleSelectPreset(idx)}
                    className={`w-full p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between ${
                      selectedPresetIndex === idx
                        ? "bg-red-600/15 border-red-500 text-white shadow-md shadow-red-600/10"
                        : "bg-neutral-950/60 border-neutral-800/80 text-neutral-300 hover:bg-neutral-800"
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs sm:text-sm text-white">{preset.name}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-red-950 text-red-400 border border-red-800/60 font-mono">
                          {preset.tag}
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-400 mt-0.5">{preset.desc}</p>
                    </div>
                    <span className="font-mono font-bold text-xs text-red-400 flex-shrink-0 ml-2">
                      {preset.eccentric + preset.pauseBottom + preset.concentric + preset.pauseTop}s/rep
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Sliders & Target Reps */}
            <div className="bg-neutral-900/90 border border-neutral-800 p-6 rounded-3xl shadow-2xl space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-neutral-800">
                <h4 className="font-bold text-xs uppercase tracking-wider text-neutral-300">
                  Target Repetitions & Set Duration
                </h4>
                <span className="text-xs font-mono text-red-400 font-bold">~{estimatedSetTime}s total set</span>
              </div>

              {/* Target Reps Slider */}
              <div>
                <div className="flex justify-between items-center mb-1 text-xs">
                  <span className="text-neutral-400">Target Reps:</span>
                  <span className="font-mono font-bold text-white text-sm">{targetReps} reps</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={20}
                  value={targetReps}
                  onChange={(e) => {
                    setTargetReps(Number(e.target.value));
                    handleReset();
                  }}
                  className="w-full accent-red-600 cursor-pointer bg-neutral-700 h-2 rounded-lg"
                />
              </div>

              {/* Individual Phase Timers Grid */}
              <div className="grid grid-cols-4 gap-2 pt-2 text-center text-xs">
                <div className="p-2.5 bg-neutral-950 rounded-xl border border-neutral-800">
                  <span className="text-[9px] uppercase text-blue-400 block font-bold">Eccentric</span>
                  <span className="font-mono font-black text-lg text-white">{eccentric}s</span>
                </div>
                <div className="p-2.5 bg-neutral-950 rounded-xl border border-neutral-800">
                  <span className="text-[9px] uppercase text-amber-400 block font-bold">Pause</span>
                  <span className="font-mono font-black text-lg text-white">{pauseBottom}s</span>
                </div>
                <div className="p-2.5 bg-neutral-950 rounded-xl border border-neutral-800">
                  <span className="text-[9px] uppercase text-red-400 block font-bold">Concentric</span>
                  <span className="font-mono font-black text-lg text-white">{concentric}s</span>
                </div>
                <div className="p-2.5 bg-neutral-950 rounded-xl border border-neutral-800">
                  <span className="text-[9px] uppercase text-emerald-400 block font-bold">Top</span>
                  <span className="font-mono font-black text-lg text-white">{pauseTop}s</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
