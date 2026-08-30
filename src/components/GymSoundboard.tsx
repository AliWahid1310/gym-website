"use client";

import { useState, useRef, useEffect } from "react";

interface SoundEffect {
  id: string;
  name: string;
  category: string;
  icon: string;
  description: string;
  play: (ctx: AudioContext) => void;
}

interface MotivationalQuote {
  quote: string;
  author: string;
  role: string;
  tag: string;
}

const MOTIVATIONAL_QUOTES: MotivationalQuote[] = [
  {
    quote: "The last three or four reps is what makes the muscle grow. This area of pain divides a champion from someone who is not a champion.",
    author: "Arnold Schwarzenegger",
    role: "7x Mr. Olympia",
    tag: "Mindset",
  },
  {
    quote: "Everybody wants to be a bodybuilder, but nobody wants to lift no heavy-ass weights. Ain't nothin' to it but to do it!",
    author: "Ronnie Coleman",
    role: "8x Mr. Olympia",
    tag: "Heavy Duty",
  },
  {
    quote: "Don't stop when you're tired. Stop when you are done. The mind always gives up before the body does.",
    author: "David Goggins",
    role: "Navy SEAL & Ultra-Athlete",
    tag: "Grit",
  },
  {
    quote: "Your body is a direct reflection of your daily habits, self-discipline, and what you refuse to compromise on.",
    author: "Chris Bumstead (CBum)",
    role: "5x Classic Physique Champ",
    tag: "Discipline",
  },
  {
    quote: "If you don't go until failure, you don't stimulate all available muscle motor units. Leave everything in the gym.",
    author: "Dorian Yates",
    role: "6x Mr. Olympia",
    tag: "Blood & Guts",
  },
];

export default function GymSoundboard() {
  const [activeSound, setActiveSound] = useState<string | null>(null);
  const [quoteIndex, setQuoteIndex] = useState<number>(0);
  const [isPlayingVisualizer, setIsPlayingVisualizer] = useState<boolean>(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  const getAudioContext = (): AudioContext => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
    }
    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  // Trigger visualizer animation
  const triggerVisualizer = () => {
    setIsPlayingVisualizer(true);
    setTimeout(() => setIsPlayingVisualizer(false), 1800);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let phase = 0;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const width = canvas.width;
      const height = canvas.height;
      const centerY = height / 2;

      ctx.beginPath();
      ctx.strokeStyle = isPlayingVisualizer ? "#EF4444" : "#404040";
      ctx.lineWidth = isPlayingVisualizer ? 2.5 : 1;

      for (let x = 0; x < width; x++) {
        const amplitude = isPlayingVisualizer
          ? Math.sin(x * 0.04 + phase) * 20 * Math.sin(x * 0.01) +
            Math.cos(x * 0.08 - phase) * 12
          : Math.sin(x * 0.02 + phase * 0.5) * 3;
        const y = centerY + amplitude;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      phase += isPlayingVisualizer ? 0.25 : 0.03;
      animFrameRef.current = requestAnimationFrame(render);
    };

    render();
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlayingVisualizer]);

  // Web Audio FX Synthesizers
  const playBarbellDrop = (ctx: AudioContext) => {
    const now = ctx.currentTime;
    // Low punch
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.exponentialRampToValueAtTime(30, now + 0.5);
    gain.gain.setValueAtTime(0.8, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.5);

    // Metallic ring
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = "triangle";
    osc2.frequency.setValueAtTime(880, now);
    osc2.frequency.exponentialRampToValueAtTime(320, now + 0.8);
    gain2.gain.setValueAtTime(0.4, now);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now);
    osc2.stop(now + 0.8);
  };

  const playBoxingGong = (ctx: AudioContext) => {
    const now = ctx.currentTime;
    const freqs = [380, 520, 690, 840];
    freqs.forEach((f) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(f, now);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.6);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 1.6);
    });
  };

  const playCountdownBeeps = (ctx: AudioContext) => {
    const now = ctx.currentTime;
    // 3 short pips + 1 high blast
    [0, 0.4, 0.8].forEach((timeOffset) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.setValueAtTime(580, now + timeOffset);
      gain.gain.setValueAtTime(0.3, now + timeOffset);
      gain.gain.exponentialRampToValueAtTime(0.001, now + timeOffset + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + timeOffset);
      osc.stop(now + timeOffset + 0.15);
    });

    // High GO pip at 1.2s
    const goOsc = ctx.createOscillator();
    const goGain = ctx.createGain();
    goOsc.frequency.setValueAtTime(1180, now + 1.2);
    goGain.gain.setValueAtTime(0.6, now + 1.2);
    goGain.gain.exponentialRampToValueAtTime(0.001, now + 1.7);
    goOsc.connect(goGain);
    goGain.connect(ctx.destination);
    goOsc.start(now + 1.2);
    goOsc.stop(now + 1.7);
  };

  const playBassDrop = (ctx: AudioContext) => {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(35, now + 1.2);
    gain.gain.setValueAtTime(0.5, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 1.2);
  };

  const playPrVictoryChime = (ctx: AudioContext) => {
    const now = ctx.currentTime;
    const chord = [523.25, 659.25, 783.99, 1046.5]; // C Major
    chord.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + idx * 0.1);
      gain.gain.setValueAtTime(0.4, now + idx * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 1.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * 0.1);
      osc.stop(now + idx * 0.1 + 1.2);
    });
  };

  const SOUND_EFFECTS: SoundEffect[] = [
    {
      id: "barbell",
      name: "Barbell Heavy Drop",
      category: "Heavy Iron",
      icon: "🏋️‍♂️",
      description: "Tectonic barbell collision sound effect for heavy PR deadlifts & squats.",
      play: playBarbellDrop,
    },
    {
      id: "gong",
      name: "Boxing Round Gong",
      category: "HIIT / Combat",
      icon: "🔔",
      description: "Resonant brass fight bell to initiate high-intensity cardio & bag rounds.",
      play: playBoxingGong,
    },
    {
      id: "countdown",
      name: "3-2-1 Set Launch",
      category: "Timer Pips",
      icon: "⏱️",
      description: "Triple tempo beep followed by the high-pitch GO signal for max effort sets.",
      play: playCountdownBeeps,
    },
    {
      id: "bass",
      name: "Pre-Workout Bass Drop",
      category: "Energy Surge",
      icon: "⚡",
      description: "Sub-bass frequency sweep to synchronize heart rate before intense compound sets.",
      play: playBassDrop,
    },
    {
      id: "pr-bell",
      name: "New PR Victory Chime",
      category: "Milestone",
      icon: "🏆",
      description: "Ascending major chord chime celebrating personal weightlifting milestones.",
      play: playPrVictoryChime,
    },
  ];

  const handlePlaySound = (effect: SoundEffect) => {
    try {
      const ctx = getAudioContext();
      effect.play(ctx);
      setActiveSound(effect.id);
      triggerVisualizer();
      setTimeout(() => setActiveSound(null), 800);
    } catch {
      // Audio context fallback
    }
  };

  const activeQuote = MOTIVATIONAL_QUOTES[quoteIndex];

  return (
    <section
      id="gym-soundboard"
      className="py-20 bg-[#0A0A0A] text-white relative overflow-hidden border-t border-neutral-800"
    >
      <div className="absolute top-1/4 right-1/3 w-[600px] h-[300px] bg-red-600/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            Synthesized Workout FX & Focus Hub
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-white">
            Gym Hype <span className="text-red-500">Audio Soundboard</span> & Quotes
          </h2>
          <p className="mt-4 text-neutral-400 text-base sm:text-lg">
            Synthesize round gongs, barbell impact drops, and countdown cues in real time via Web Audio API. Power through your next set with championship mindset.
          </p>
        </div>

        {/* Live Audio Waveform Canvas */}
        <div className="bg-neutral-900/80 border border-neutral-800 rounded-3xl p-6 sm:p-8 backdrop-blur-sm shadow-xl mb-12">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
              <span className="text-xs uppercase font-bold text-neutral-400 tracking-wider">
                Synthesizer Visualizer Wave
              </span>
            </div>
            <span className="text-[11px] font-mono text-red-400">
              {isPlayingVisualizer ? "OUTPUT ACTIVE • 48kHz" : "STANDBY"}
            </span>
          </div>

          <div className="w-full h-20 bg-neutral-950 rounded-2xl border border-neutral-800/80 overflow-hidden flex items-center justify-center p-2">
            <canvas ref={canvasRef} width={800} height={80} className="w-full h-full" />
          </div>
        </div>

        {/* Sound FX Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-14">
          {SOUND_EFFECTS.map((fx) => {
            const isActive = activeSound === fx.id;
            return (
              <button
                key={fx.id}
                onClick={() => handlePlaySound(fx)}
                className={`p-5 rounded-2xl border text-left flex flex-col justify-between transition-all group ${
                  isActive
                    ? "bg-red-600 border-red-500 text-white shadow-xl shadow-red-600/30 scale-95"
                    : "bg-neutral-900/80 border-neutral-800 text-neutral-300 hover:border-red-500/50 hover:bg-neutral-900"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-3xl p-2 rounded-xl bg-neutral-950/80 border border-neutral-800 group-hover:scale-110 transition-transform">
                      {fx.icon}
                    </span>
                    <span className="text-[10px] font-mono uppercase bg-neutral-950 px-2 py-0.5 rounded text-neutral-400">
                      {fx.category}
                    </span>
                  </div>

                  <h3 className="font-bold text-sm text-white mb-1.5">{fx.name}</h3>
                  <p className="text-[11px] text-neutral-400 line-clamp-2 leading-relaxed">
                    {fx.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-800/80 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-red-400">
                  <span>▶ Trigger Sound</span>
                  <span>FX</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Legendary Gym Quotes Carousel */}
        <div className="bg-neutral-900/80 border border-neutral-800 rounded-3xl p-6 sm:p-10 backdrop-blur-sm shadow-2xl relative overflow-hidden">
          <div className="flex items-center justify-between pb-4 border-b border-neutral-800 mb-6">
            <span className="text-xs uppercase font-bold text-neutral-400 flex items-center gap-2">
              <span className="text-red-500 text-base">🔥</span> Championship Mindset Quote
            </span>
            <span className="px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-bold uppercase">
              {activeQuote.tag}
            </span>
          </div>

          <blockquote className="text-xl sm:text-2xl font-bold text-white leading-relaxed italic mb-6">
            &ldquo;{activeQuote.quote}&rdquo;
          </blockquote>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-neutral-800">
            <div>
              <span className="text-base font-extrabold text-white block">{activeQuote.author}</span>
              <span className="text-xs text-neutral-400">{activeQuote.role}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  setQuoteIndex((prev) => (prev === 0 ? MOTIVATIONAL_QUOTES.length - 1 : prev - 1))
                }
                className="w-10 h-10 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-neutral-600 text-white flex items-center justify-center transition-colors"
                aria-label="Previous quote"
              >
                ←
              </button>
              <button
                onClick={() =>
                  setQuoteIndex((prev) => (prev === MOTIVATIONAL_QUOTES.length - 1 ? 0 : prev + 1))
                }
                className="w-10 h-10 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-neutral-600 text-white flex items-center justify-center transition-colors"
                aria-label="Next quote"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
