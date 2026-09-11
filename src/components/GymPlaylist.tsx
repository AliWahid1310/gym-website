"use client";

import { useState, useRef, useEffect } from "react";

interface Playlist {
  id: string;
  name: string;
  genre: string;
  bpm: string;
  baseBpm: number;
  vibe: string;
  trackCount: number;
  featuredArtists: string[];
  spotifyUrl: string;
  color: string;
  kickFreq: number;
  pattern: number[]; // 16-step beat pattern
}

const playlists: Playlist[] = [
  {
    id: "pr-hype",
    name: "Heavy PR Hype & Gym Phonk",
    genre: "Drift Phonk / Hard Bass",
    bpm: "150 BPM",
    baseBpm: 150,
    vibe: "Maximum Aggression & PR Attempts",
    trackCount: 45,
    featuredArtists: ["Kordhell", "DVRST", "Hensonn", "Pharmacist"],
    spotifyUrl: "https://open.spotify.com",
    color: "from-red-600/30 to-red-950/60",
    kickFreq: 90,
    pattern: [1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0],
  },
  {
    id: "iron-pump",
    name: "Golden Era Hip-Hop & Rap",
    genre: "US & UK Drill / Trap / 90s Hip Hop",
    bpm: "115 BPM",
    baseBpm: 115,
    vibe: "Unbreakable Focus & Chest Day Pump",
    trackCount: 60,
    featuredArtists: ["Eminem", "Pop Smoke", "2Pac", "DMX", "Travis Scott"],
    spotifyUrl: "https://open.spotify.com",
    color: "from-amber-600/30 to-neutral-900",
    kickFreq: 65,
    pattern: [1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0],
  },
  {
    id: "hiit-edm",
    name: "Cardio Rave & High-BPM Hardstyle",
    genre: "Hardstyle / EDM / Speed Up",
    bpm: "160 BPM",
    baseBpm: 160,
    vibe: "Treadmill Sprints & Boxing Conditioning",
    trackCount: 50,
    featuredArtists: ["Tevez", "Sub Zero Project", "Headhunterz", "Timmy Trumpet"],
    spotifyUrl: "https://open.spotify.com",
    color: "from-purple-600/30 to-neutral-900",
    kickFreq: 130,
    pattern: [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
  },
  {
    id: "night-grind",
    name: "Late Night Dark Techno & Cyber",
    genre: "Peak Time Techno / Cyberpunk",
    bpm: "138 BPM",
    baseBpm: 138,
    vibe: "Empty Gym Midnight Flow State",
    trackCount: 40,
    featuredArtists: ["Charlotte de Witte", "Amelie Lens", "Klangkuenstler"],
    spotifyUrl: "https://open.spotify.com",
    color: "from-blue-600/30 to-neutral-900",
    kickFreq: 75,
    pattern: [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
  },
];

export default function GymPlaylist() {
  const [activeId, setActiveId] = useState<string>("pr-hype");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(75);
  const [tempoMultiplier, setTempoMultiplier] = useState<number>(1);
  const [currentStep, setCurrentStep] = useState<number>(0);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const timerIdRef = useRef<number | null>(null);
  const stepRef = useRef<number>(0);

  const activePlaylist = playlists.find((p) => p.id === activeId) || playlists[0];

  function playSynthHit(freq: number, isSnare: boolean) {
    if (!audioCtxRef.current) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AudioContextClass();
    }
    const ctx = audioCtxRef.current;
    if (ctx.state === "suspended") {
      ctx.resume();
    }

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime((volume / 100) * 0.4, ctx.currentTime);
    masterGain.connect(ctx.destination);

    if (isSnare) {
      // Noise buffer for snare/hi-hat
      const bufferSize = ctx.sampleRate * 0.05;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = "highpass";
      filter.frequency.setValueAtTime(1000, ctx.currentTime);

      const snareGain = ctx.createGain();
      snareGain.gain.setValueAtTime(0.2, ctx.currentTime);
      snareGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

      whiteNoise.connect(filter);
      filter.connect(snareGain);
      snareGain.connect(masterGain);
      whiteNoise.start();
    } else {
      // Bass Kick
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.14);

      osc.connect(gain);
      gain.connect(masterGain);

      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    }
  }

  function stopAudio() {
    if (timerIdRef.current) {
      window.clearInterval(timerIdRef.current);
      timerIdRef.current = null;
    }
    setIsPlaying(false);
    setCurrentStep(0);
    stepRef.current = 0;
  }

  function startAudio(pl: Playlist, multiplier = tempoMultiplier) {
    stopAudio();
    const bpm = pl.baseBpm * multiplier;
    const intervalMs = (60000 / bpm) / 4; // 16th notes

    setIsPlaying(true);
    stepRef.current = 0;

    timerIdRef.current = window.setInterval(() => {
      const step = stepRef.current % 16;
      setCurrentStep(step);

      // Play kick if patterned
      if (pl.pattern[step] === 1) {
        playSynthHit(pl.kickFreq, false);
      }
      // Play snare on steps 4 and 12
      if (step === 4 || step === 12) {
        playSynthHit(0, true);
      }

      stepRef.current++;
    }, intervalMs);
  }

  function togglePlay() {
    if (isPlaying) {
      stopAudio();
    } else {
      startAudio(activePlaylist);
    }
  }

  function handleSelectPlaylist(pl: Playlist) {
    setActiveId(pl.id);
    if (isPlaying) {
      startAudio(pl, tempoMultiplier);
    }
  }

  function handleTempoChange(newMultiplier: number) {
    setTempoMultiplier(newMultiplier);
    if (isPlaying) {
      startAudio(activePlaylist, newMultiplier);
    }
  }

  useEffect(() => {
    return () => {
      if (timerIdRef.current) {
        window.clearInterval(timerIdRef.current);
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <section id="gym-music" className="py-24 bg-[#080808] text-white relative overflow-hidden border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-red-950/80 text-red-400 border border-red-800/50 mb-4">
            Soundtrack to Greatness
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            Power Fitness <span className="text-red-500">Audio Beats</span>
          </h2>
          <p className="mt-4 text-neutral-400 text-base sm:text-lg">
            High-energy playlists pumped through our JBL sound system to keep your adrenaline at peak capacity. Preview real gym rhythms live below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Playlist selector tabs */}
          <div className="lg:col-span-6 space-y-3">
            {playlists.map((pl) => {
              const isSelected = pl.id === activeId;
              return (
                <button
                  key={pl.id}
                  onClick={() => handleSelectPlaylist(pl)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between ${
                    isSelected
                      ? "bg-neutral-900 border-red-600 shadow-xl shadow-red-600/20 scale-[1.02]"
                      : "bg-neutral-950/70 border-neutral-800/80 hover:border-neutral-700 hover:bg-neutral-900/60"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-base ${
                      isSelected ? "bg-red-600 text-white" : "bg-neutral-800 text-neutral-400"
                    }`}>
                      {isSelected && isPlaying ? "🔊" : "🎵"}
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-sm sm:text-base">{pl.name}</h3>
                      <div className="flex items-center gap-2 mt-0.5 text-xs text-neutral-400">
                        <span>{pl.genre}</span>
                        <span>•</span>
                        <span className="font-mono text-red-400">{pl.bpm}</span>
                      </div>
                    </div>
                  </div>

                  {/* Equalizer Wave simulation for active playlist */}
                  {isSelected && (
                    <div className="flex items-end gap-1 h-5 shrink-0">
                      <span className={`w-1 bg-red-500 rounded-full h-5 ${isPlaying ? "animate-[bounce_0.6s_infinite]" : "opacity-40"}`} />
                      <span className={`w-1 bg-red-400 rounded-full h-3 ${isPlaying ? "animate-[bounce_0.5s_infinite_0.1s]" : "opacity-40"}`} />
                      <span className={`w-1 bg-red-600 rounded-full h-4 ${isPlaying ? "animate-[bounce_0.7s_infinite_0.2s]" : "opacity-40"}`} />
                      <span className={`w-1 bg-red-500 rounded-full h-2 ${isPlaying ? "animate-[bounce_0.4s_infinite_0.15s]" : "opacity-40"}`} />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Active Playlist Player Display Card */}
          <div className="lg:col-span-6">
            <div className={`bg-gradient-to-br ${activePlaylist.color} border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden backdrop-blur-sm`}>
              <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-400 block">Now Selected</span>
                  <h4 className="text-2xl font-black text-white mt-1">{activePlaylist.name}</h4>
                </div>
                <span className="px-3 py-1 bg-black/40 rounded-full text-xs font-mono font-bold text-emerald-400 border border-emerald-500/30">
                  {Math.round(activePlaylist.baseBpm * tempoMultiplier)} BPM
                </span>
              </div>

              {/* Interactive Audio Synthesizer Beat Preview */}
              <div className="bg-black/50 border border-white/10 rounded-2xl p-4 mb-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-red-400">Gym Beat Preview</span>
                    {isPlaying && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-red-500/20 text-red-300 animate-pulse">
                        LIVE
                      </span>
                    )}
                  </div>
                  <button
                    onClick={togglePlay}
                    className={`px-4 py-1.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                      isPlaying
                        ? "bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/40"
                        : "bg-white hover:bg-neutral-200 text-black shadow"
                    }`}
                  >
                    <span>{isPlaying ? "⏸ Stop Beat" : "▶ Test Rhythm"}</span>
                  </button>
                </div>

                {/* 16-step visual sequencer display */}
                <div className="grid grid-cols-16 gap-1 h-3 mb-4 bg-neutral-900/80 p-1 rounded-lg">
                  {Array.from({ length: 16 }).map((_, idx) => {
                    const isBeat = activePlaylist.pattern[idx] === 1;
                    const isCurrent = isPlaying && currentStep === idx;
                    return (
                      <div
                        key={idx}
                        className={`rounded-xs transition-colors ${
                          isCurrent
                            ? "bg-white ring-2 ring-red-500 shadow-sm shadow-white"
                            : isBeat
                            ? "bg-red-600/80"
                            : "bg-neutral-800"
                        }`}
                      />
                    );
                  })}
                </div>

                {/* Tempo and Volume controls */}
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <div className="flex justify-between text-neutral-400 mb-1">
                      <span>Volume</span>
                      <span className="font-mono text-white">{volume}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={volume}
                      onChange={(e) => setVolume(Number(e.target.value))}
                      className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-red-500"
                      aria-label="Audio preview volume"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-neutral-400 mb-1">
                      <span>Speed</span>
                      <span className="font-mono text-white">{tempoMultiplier}x</span>
                    </div>
                    <div className="flex gap-1">
                      {[0.9, 1.0, 1.15].map((mult) => (
                        <button
                          key={mult}
                          onClick={() => handleTempoChange(mult)}
                          className={`flex-1 py-1 rounded text-[10px] font-bold ${
                            tempoMultiplier === mult
                              ? "bg-red-600 text-white"
                              : "bg-neutral-800 text-neutral-400 hover:text-white"
                          }`}
                        >
                          {mult}x
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-6 text-sm">
                <div>
                  <span className="text-xs uppercase text-neutral-400 font-semibold block mb-1">Recommended For:</span>
                  <p className="text-neutral-200 font-medium">{activePlaylist.vibe}</p>
                </div>

                <div>
                  <span className="text-xs uppercase text-neutral-400 font-semibold block mb-2">Featured Artists & Producers:</span>
                  <div className="flex flex-wrap gap-2">
                    {activePlaylist.featuredArtists.map((artist, i) => (
                      <span key={i} className="px-3 py-1 bg-black/60 border border-white/10 rounded-lg text-xs text-neutral-300">
                        {artist}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 text-xs text-neutral-400">
                  Total Tracks: <strong className="text-white">{activePlaylist.trackCount} high-energy tracks</strong>
                </div>
              </div>

              <a
                href={activePlaylist.spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-[#1DB954] hover:bg-[#1ed760] text-black font-black text-xs sm:text-sm uppercase tracking-wider rounded-2xl transition-all flex items-center justify-center gap-2 shadow-xl shadow-green-900/30"
              >
                <span>🎧 Open Playlist on Spotify</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
