"use client";

import { useState } from "react";

interface PassData {
  passId: string;
  name: string;
  phone: string;
  branch: string;
  goal: string;
  issuedAt: string;
  expiresAt: string;
}

export default function FreePassModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [branch, setBranch] = useState("F-8 Markaz Flagship");
  const [goal, setGoal] = useState("Weight Loss & Tone");
  const [passData, setPassData] = useState<PassData | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGeneratePass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    setLoading(true);
    setTimeout(() => {
      const now = new Date();
      const expiry = new Date(now.getTime() + 48 * 60 * 60 * 1000);
      const randomNum = Math.floor(10000 + Math.random() * 90000);

      setPassData({
        passId: `PFZ-VIP-${randomNum}`,
        name,
        phone,
        branch,
        goal,
        issuedAt: now.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        expiresAt: expiry.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      });
      setLoading(false);
    }, 600);
  };

  const handleShareWhatsApp = () => {
    if (!passData) return;
    const msg = encodeURIComponent(
      `Hello Power Fitness Zone! I just generated my Free 1-Day VIP Pass.\n\n🎫 Pass ID: ${passData.passId}\n👤 Name: ${passData.name}\n📍 Branch: ${passData.branch}\n🎯 Goal: ${passData.goal}\n⏳ Valid Until: ${passData.expiresAt}\n\nPlease confirm my visit!`
    );
    window.open(`https://wa.me/923001234567?text=${msg}`, "_blank");
  };

  return (
    <>
      {/* Floating Action Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 sm:bottom-8 left-4 z-40 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white text-xs sm:text-sm font-extrabold px-4 py-3 rounded-full shadow-2xl shadow-red-600/50 flex items-center gap-2 border border-red-400/40 hover:scale-105 transition-all duration-300 group"
      >
        <span className="text-base group-hover:rotate-12 transition-transform">🎟️</span>
        <span>Claim Free Day Pass</span>
      </button>

      {/* Modal Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-red-950 via-neutral-900 to-neutral-900 px-6 py-5 border-b border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full bg-red-500 animate-ping" />
                <h3 className="text-base sm:text-lg font-black uppercase text-white tracking-wider">
                  1-Day VIP Guest Pass
                </h3>
              </div>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setPassData(null);
                }}
                className="text-neutral-400 hover:text-white text-2xl font-bold transition-colors w-8 h-8 rounded-full flex items-center justify-center bg-neutral-800"
              >
                ×
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 max-h-[85vh] overflow-y-auto">
              {!passData ? (
                <form onSubmit={handleGeneratePass} className="space-y-4">
                  <div className="text-center mb-6">
                    <p className="text-sm text-neutral-300">
                      Experience our world-class gym floor, cardio zone, and locker facilities for 1 full day with zero commitment.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Ali Ahmed"
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-red-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1.5">
                      WhatsApp / Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 0300 1234567"
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-red-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1.5">
                      Select Branch
                    </label>
                    <select
                      value={branch}
                      onChange={(e) => setBranch(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500 transition-colors"
                    >
                      <option value="F-8 Markaz Flagship">F-8 Markaz Flagship</option>
                      <option value="G-8 Community Center">G-8 Community Center</option>
                      <option value="F-10 Premium Club">F-10 Premium Club</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1.5">
                      Primary Fitness Goal
                    </label>
                    <select
                      value={goal}
                      onChange={(e) => setGoal(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500 transition-colors"
                    >
                      <option value="Weight Loss & Tone">Weight Loss & Tone</option>
                      <option value="Muscle Building / Hypertrophy">Muscle Building / Hypertrophy</option>
                      <option value="Strength & Powerlifting">Strength & Powerlifting</option>
                      <option value="HIIT & Athletic Endurance">HIIT & Athletic Endurance</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-4 py-3.5 bg-red-600 hover:bg-red-700 font-black text-sm uppercase tracking-wider text-white rounded-xl shadow-lg shadow-red-600/30 transition-all"
                  >
                    {loading ? "Generating Digital Pass..." : "🎟️ Generate My Instant Pass"}
                  </button>
                  <p className="text-[11px] text-center text-neutral-500">
                    No credit card required. Show this pass at the reception desk.
                  </p>
                </form>
              ) : (
                /* Generated VIP Pass Digital Card */
                <div className="space-y-6 animate-fadeIn">
                  <div className="relative rounded-2xl p-6 bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 border-2 border-red-500/80 shadow-2xl overflow-hidden">
                    {/* Glowing corner badges */}
                    <div className="absolute top-0 right-0 bg-red-600 text-white font-black text-[10px] uppercase px-4 py-1 rounded-bl-xl tracking-wider shadow">
                      VIP PASS
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      <span className="font-display font-black text-xl text-white tracking-wider">
                        POWER <span className="text-red-500">FITNESS ZONE</span>
                      </span>
                    </div>

                    <div className="space-y-3 border-y border-neutral-800 py-4 my-4">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-neutral-400">Pass Code:</span>
                        <span className="font-mono font-bold text-red-400 text-sm tracking-wider">{passData.passId}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-neutral-400">Guest Name:</span>
                        <span className="font-bold text-white text-sm">{passData.name}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-neutral-400">Selected Branch:</span>
                        <span className="font-semibold text-neutral-200">{passData.branch}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-neutral-400">Valid Until:</span>
                        <span className="font-bold text-amber-400">{passData.expiresAt}</span>
                      </div>
                    </div>

                    {/* Inclusions badge list */}
                    <div className="bg-neutral-950/80 rounded-xl p-3 text-[11px] text-neutral-300 space-y-1">
                      <div className="font-semibold text-neutral-200 mb-1">Pass Privileges:</div>
                      <div>✓ Full Gym & Free Weights Access</div>
                      <div>✓ Complimentary InBody Body-Fat Scan</div>
                      <div>✓ Locker & Shower Access</div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <button
                      onClick={handleShareWhatsApp}
                      className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30"
                    >
                      💬 Confirm with Reception via WhatsApp
                    </button>
                    <button
                      onClick={() => setPassData(null)}
                      className="w-full py-2.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-semibold text-xs rounded-xl transition-colors"
                    >
                      ← Generate Another Pass
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
