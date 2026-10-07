"use client";

import { useState, useEffect, useRef } from "react";
import { Wind, Play, Pause, RotateCcw, Volume2, VolumeX, Heart, Activity } from "lucide-react";

type BreathingPattern = "box" | "relax" | "arousal";

interface PatternConfig {
  name: string;
  badge: string;
  inhale: number;
  hold1: number;
  exhale: number;
  hold2: number;
  description: string;
}

const PATTERNS: Record<BreathingPattern, PatternConfig> = {
  box: {
    name: "Box Breathing (4-4-4-4)",
    badge: "Navy SEAL & Athlete Focus",
    inhale: 4,
    hold1: 4,
    exhale: 4,
    hold2: 4,
    description: "Balances autonomic nervous system, clears mental fog, and resets heart rate variability between heavy compound sets.",
  },
  relax: {
    name: "4-7-8 Parasympathetic Reset",
    badge: "Post-Workout Downregulation",
    inhale: 4,
    hold1: 7,
    exhale: 8,
    hold2: 0,
    description: "Extended exhalation triggers the vagus nerve, rapidly lowering adrenaline and priming post-workout sauna/sleep recovery.",
  },
  arousal: {
    name: "CNS Oxygen Charge (2-0-1-0)",
    badge: "Pre-PR Ramp Up",
    inhale: 2,
    hold1: 0,
    exhale: 1,
    hold2: 0,
    description: "Rhythmic rapid oxygenation to elevate alertness, increase sympathetic drive, and prepare neuromuscular pathways.",
  },
};

export default function BreathingPacer() {
  const [patternKey, setPatternKey] = useState<BreathingPattern>("box");
  const [isActive, setIsActive] = useState<boolean>(false);
  const [phase, setPhase] = useState<"Inhale" | "Hold" | "Exhale" | "Pause">("Inhale");
  const [secondsRemaining, setSecondsRemaining] = useState<number>(PATTERNS.box.inhale);
  const [cyclesCompleted, setCyclesCompleted] = useState<number>(0);
  const [audioEnabled, setAudioEnabled] = useState<boolean>(true);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const pattern = PATTERNS[patternKey];

  const playCueSound = (freq = 440) => {
    if (!audioEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
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
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    } catch {
      // AudioContext unavailable
    }
  };

  useEffect(() => {
    if (!isActive) {
      setPhase("Inhale");
      setSecondsRemaining(pattern.inhale);
      return;
    }

    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev > 1) return prev - 1;

        // Transition phases
        if (phase === "Inhale") {
          if (pattern.hold1 > 0) {
            setPhase("Hold");
            playCueSound(520);
            return pattern.hold1;
          } else {
            setPhase("Exhale");
            playCueSound(360);
            return pattern.exhale;
          }
        } else if (phase === "Hold" && pattern.hold1 > 0 && secondsRemaining === 1) {
          setPhase("Exhale");
          playCueSound(360);
          return pattern.exhale;
        } else if (phase === "Exhale") {
          if (pattern.hold2 > 0) {
            setPhase("Pause");
            playCueSound(320);
            return pattern.hold2;
          } else {
            setPhase("Inhale");
            setCyclesCompleted((c) => c + 1);
            playCueSound(440);
            return pattern.inhale;
          }
        } else {
          // Pause / Hold2 finished
          setPhase("Inhale");
          setCyclesCompleted((c) => c + 1);
          playCueSound(440);
          return pattern.inhale;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, phase, pattern, secondsRemaining]);

  const handleReset = () => {
    setIsActive(false);
    setPhase("Inhale");
    setSecondsRemaining(pattern.inhale);
    setCyclesCompleted(0);
  };

  const handlePatternChange = (key: BreathingPattern) => {
    setIsActive(false);
    setPatternKey(key);
    setPhase("Inhale");
    setSecondsRemaining(PATTERNS[key].inhale);
  };

  // Calculate circle scale based on phase
  const getScaleClass = () => {
    if (!isActive) return "scale-90 opacity-80";
    if (phase === "Inhale") return "scale-125 opacity-100";
    if (phase === "Hold") return "scale-125 opacity-90 ring-4 ring-amber-500/50";
    if (phase === "Exhale") return "scale-75 opacity-70";
    return "scale-75 opacity-60";
  };

  return (
    <section id="breathing-pacer" className="py-20 bg-[#080808] text-white relative overflow-hidden border-t border-neutral-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-red-950/80 text-red-400 border border-red-800/50 mb-4">
            <Wind className="w-3.5 h-3.5" />
            CNS & Heart Rate Recovery
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
            Athletic Breathwork & <span className="text-red-500">Recovery Pacer</span>
          </h2>
          <p className="mt-3 text-neutral-400 text-sm sm:text-base">
            Optimize heart rate variability (HRV), flush lactate, and switch between sympathetic drive and parasympathetic calm.
          </p>
        </div>

        {/* Pattern Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {(Object.keys(PATTERNS) as BreathingPattern[]).map((key) => {
            const p = PATTERNS[key];
            const isSelected = patternKey === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => handlePatternChange(key)}
                className={`p-4 rounded-xl text-left border transition-all ${
                  isSelected
                    ? "bg-[#161616] border-red-600 shadow-lg shadow-red-900/20"
                    : "bg-[#111111] border-neutral-800/80 hover:border-neutral-700"
                }`}
              >
                <div className="text-[10px] font-bold uppercase tracking-wider text-red-400 mb-1">
                  {p.badge}
                </div>
                <div className="text-sm font-black text-white mb-1.5">{p.name}</div>
                <div className="text-xs text-neutral-400 leading-relaxed">{p.description}</div>
              </button>
            );
          })}
        </div>

        {/* Visual Pulse Arena */}
        <div className="bg-[#121212] border border-neutral-800 rounded-3xl p-8 sm:p-12 flex flex-col items-center justify-center relative overflow-hidden">
          {/* Audio toggle */}
          <button
            type="button"
            onClick={() => setAudioEnabled(!audioEnabled)}
            className="absolute top-6 right-6 p-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white transition-colors"
            title={audioEnabled ? "Mute audio cues" : "Enable audio cues"}
          >
            {audioEnabled ? <Volume2 className="w-4 h-4 text-red-400" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Animated Breath Sphere */}
          <div className="my-10 relative flex items-center justify-center w-64 h-64">
            {/* Outer glow rings */}
            <div className="absolute inset-0 rounded-full border border-red-500/20 animate-pulse" />
            <div className="absolute -inset-4 rounded-full border border-neutral-800" />

            {/* Pulsing Core */}
            <div
              className={`w-44 h-44 rounded-full bg-gradient-to-tr from-red-600 via-rose-500 to-amber-500 shadow-2xl shadow-red-600/40 flex flex-col items-center justify-center transition-all duration-1000 ease-in-out ${getScaleClass()}`}
            >
              <span className="text-2xl font-black tracking-wider uppercase text-white drop-shadow">
                {isActive ? phase : "Ready"}
              </span>
              {isActive && (
                <span className="text-4xl font-extrabold text-white mt-1 drop-shadow">
                  {secondsRemaining}s
                </span>
              )}
            </div>
          </div>

          {/* Stats Bar */}
          <div className="flex items-center gap-6 text-sm text-neutral-400 mb-8">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-red-500" />
              <span>Cycles Completed: <strong className="text-white">{cyclesCompleted}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-rose-500" />
              <span>Target Cadence: <strong className="text-white">{pattern.inhale + pattern.hold1 + pattern.exhale + pattern.hold2}s cycle</strong></span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setIsActive(!isActive)}
              className="flex items-center gap-2 px-8 py-3.5 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl shadow-lg shadow-red-600/30 transition-all hover:scale-105"
            >
              {isActive ? (
                <>
                  <Pause className="w-4 h-4" /> Pause Pacer
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" /> Start Breathwork
                </>
              )}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-3.5 bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-300 rounded-xl transition-all"
            >
              <RotateCcw className="w-4 h-4" /> Reset
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
