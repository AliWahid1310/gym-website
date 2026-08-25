"use client";

import { useState } from "react";

interface Playlist {
  id: string;
  name: string;
  genre: string;
  bpm: string;
  vibe: string;
  trackCount: number;
  featuredArtists: string[];
  spotifyUrl: string;
  color: string;
}

const playlists: Playlist[] = [
  {
    id: "pr-hype",
    name: "Heavy PR Hype & Gym Phonk",
    genre: "Drift Phonk / Hard Bass",
    bpm: "140 - 165 BPM",
    vibe: "Maximum Aggression & PR Attempts",
    trackCount: 45,
    featuredArtists: ["Kordhell", "DVRST", "Hensonn", "Pharmacist"],
    spotifyUrl: "https://open.spotify.com",
    color: "from-red-600/30 to-red-950/60",
  },
  {
    id: "iron-pump",
    name: "Golden Era Hip-Hop & Rap",
    genre: "US & UK Drill / Trap / 90s Hip Hop",
    bpm: "90 - 130 BPM",
    vibe: "Unbreakable Focus & Chest Day Pump",
    trackCount: 60,
    featuredArtists: ["Eminem", "Pop Smoke", "2Pac", "DMX", "Travis Scott"],
    spotifyUrl: "https://open.spotify.com",
    color: "from-amber-600/30 to-neutral-900",
  },
  {
    id: "hiit-edm",
    name: "Cardio Rave & High-BPM Hardstyle",
    genre: "Hardstyle / EDM / Speed Up",
    bpm: "150 - 175 BPM",
    vibe: "Treadmill Sprints & Boxing Conditioning",
    trackCount: 50,
    featuredArtists: ["Tevez", "Sub Zero Project", "Headhunterz", "Timmy Trumpet"],
    spotifyUrl: "https://open.spotify.com",
    color: "from-purple-600/30 to-neutral-900",
  },
  {
    id: "night-grind",
    name: "Late Night Dark Techno & Cyber",
    genre: "Peak Time Techno / Cyberpunk",
    bpm: "135 - 145 BPM",
    vibe: "Empty Gym Midnight Flow State",
    trackCount: 40,
    featuredArtists: ["Charlotte de Witte", "Amelie Lens", "Klangkuenstler"],
    spotifyUrl: "https://open.spotify.com",
    color: "from-blue-600/30 to-neutral-900",
  },
];

export default function GymPlaylist() {
  const [activeId, setActiveId] = useState<string>("pr-hype");

  const activePlaylist = playlists.find((p) => p.id === activeId) || playlists[0];

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
            High-energy playlists pumped through our JBL sound system to keep your adrenaline at peak capacity.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Playlist selector tabs */}
          <div className="lg:col-span-6 space-y-3">
            {playlists.map((pl) => {
              const isSelected = pl.id === activeId;
              return (
                <button
                  key={pl.id}
                  onClick={() => setActiveId(pl.id)}
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
                      🎵
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
                      <span className="w-1 bg-red-500 rounded-full animate-[bounce_0.8s_infinite] h-5" />
                      <span className="w-1 bg-red-400 rounded-full animate-[bounce_0.6s_infinite_0.2s] h-3" />
                      <span className="w-1 bg-red-600 rounded-full animate-[bounce_0.9s_infinite_0.4s] h-4" />
                      <span className="w-1 bg-red-500 rounded-full animate-[bounce_0.7s_infinite_0.1s] h-2" />
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
                  <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-400 block">Now Playing Vibe</span>
                  <h4 className="text-2xl font-black text-white mt-1">{activePlaylist.name}</h4>
                </div>
                <span className="px-3 py-1 bg-black/40 rounded-full text-xs font-mono font-bold text-emerald-400 border border-emerald-500/30">
                  {activePlaylist.bpm}
                </span>
              </div>

              <div className="space-y-4 mb-8 text-sm">
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
