"use client";

import { useState } from "react";
import {
  CreditCard,
  QrCode,
  ShieldCheck,
  Zap,
  Flame,
  Building2,
  Calendar,
  Lock,
  Sparkles,
  CheckCircle,
  Copy,
  Download,
  Volume2
} from "lucide-react";

type MembershipTier = "vip" | "gold" | "silver" | "guest";

interface TierDetails {
  name: string;
  badge: string;
  gradient: string;
  borderColor: string;
  textColor: string;
  benefits: string[];
}

const TIERS: Record<MembershipTier, TierDetails> = {
  vip: {
    name: "VIP Elite Access",
    badge: "VIP Diamond",
    gradient: "from-amber-600 via-neutral-900 to-red-950",
    borderColor: "border-amber-500/60",
    textColor: "text-amber-400",
    benefits: ["All 4 Islamabad Branches", "Steam Sauna & Ice Bath", "1-on-1 PT Spotting", "24/7 Access Pass"],
  },
  gold: {
    name: "Gold All-Access",
    badge: "Gold Tier",
    gradient: "from-yellow-700 via-neutral-950 to-neutral-900",
    borderColor: "border-yellow-500/50",
    textColor: "text-yellow-400",
    benefits: ["F-7 & G-11 Dual Access", "Locker Room Included", "Monthly InBody Scan", "Group HIIT & Spin"],
  },
  silver: {
    name: "Silver Strength",
    badge: "Silver Pass",
    gradient: "from-neutral-700 via-neutral-900 to-neutral-950",
    borderColor: "border-neutral-500/50",
    textColor: "text-neutral-300",
    benefits: ["Single Home Branch", "Standard Weightroom", "Cardio Deck", "Water Station Access"],
  },
  guest: {
    name: "1-Day VIP Pass",
    badge: "Guest",
    gradient: "from-red-900 via-neutral-950 to-black",
    borderColor: "border-red-600/60",
    textColor: "text-red-400",
    benefits: ["Single Day Full Access", "Free Equipment Tour", "Trainer Consultation", "No Commitment"],
  },
};

export default function MemberPassWallet() {
  const [tier, setTier] = useState<MembershipTier>("vip");
  const [memberName, setMemberName] = useState<string>("HAMZA MALIK");
  const [homeBranch, setHomeBranch] = useState<string>("F-7 Markaz, Islamabad");
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [scanStatus, setScanStatus] = useState<"idle" | "scanning" | "success">("idle");
  const [copied, setCopied] = useState<boolean>(false);

  const memberId = "PFZ-ISB-8942";
  const lockerNumber = "L-42";
  const validUntil = "31 DEC 2026";
  const workoutStreak = 18;

  const currentTier = TIERS[tier];

  // Play audio beep sound on turnstile check-in simulator
  const handleSimulateScan = () => {
    setScanStatus("scanning");
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.type = "sine";
      osc.frequency.setValueAtTime(880, audioCtx.currentTime); // A5 note
      osc.frequency.setValueAtTime(1320, audioCtx.currentTime + 0.1); // E6 note
      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.3);
    } catch {
      // audio context fallback
    }

    setTimeout(() => {
      setScanStatus("success");
      setTimeout(() => setScanStatus("idle"), 3500);
    }, 600);
  };

  const handleCopyPass = () => {
    navigator.clipboard.writeText(`Power Fitness Zone Member Pass: ${memberName} | ID: ${memberId} | Tier: ${currentTier.name} | Branch: ${homeBranch}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="member-wallet" className="py-20 bg-[#090909] text-white relative overflow-hidden border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-red-950/80 text-red-400 border border-red-800/50 mb-4">
            <CreditCard className="w-3.5 h-3.5 text-red-500" />
            <span>Digital Member Pass</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight uppercase">
            Interactive <span className="text-red-500">Digital Member Wallet</span>
          </h2>
          <p className="mt-3 text-neutral-400 text-sm sm:text-base">
            Access Islamabad branches contactless. Flip your pass, simulate turnstile gate check-in, and manage your workout streak on your smartphone.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* 3D Flip Member Card Column */}
          <div className="lg:col-span-6 flex flex-col items-center">
            {/* Card Container */}
            <div
              onClick={() => setIsFlipped(!isFlipped)}
              className="w-full max-w-md h-[270px] sm:h-[285px] cursor-pointer perspective-1000 select-none group"
            >
              <div
                className={`relative w-full h-full duration-700 transform-style-3d transition-transform ${
                  isFlipped ? "rotate-y-180" : ""
                }`}
                style={{ transformStyle: "preserve-3d", transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
              >
                {/* FRONT OF CARD */}
                <div
                  className={`absolute inset-0 rounded-3xl p-6 bg-gradient-to-br ${currentTier.gradient} border ${currentTier.borderColor} shadow-2xl flex flex-col justify-between overflow-hidden`}
                  style={{ backfaceVisibility: "hidden" }}
                >
                  {/* Holographic Watermark Pattern */}
                  <div className="absolute -right-8 -top-8 w-48 h-48 bg-white/5 rounded-full blur-xl pointer-events-none" />
                  <div className="absolute right-4 bottom-4 opacity-10">
                    <Flame className="w-36 h-36 text-white" />
                  </div>

                  {/* Card Top Row */}
                  <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center font-black text-white text-sm shadow-md">
                        PFZ
                      </div>
                      <div>
                        <span className="font-black text-xs sm:text-sm tracking-wider uppercase block text-white">
                          Power Fitness Zone
                        </span>
                        <span className="text-[10px] text-neutral-400 font-mono">ISLAMABAD, PK</span>
                      </div>
                    </div>

                    <div className={`px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-black/60 border border-white/10 ${currentTier.textColor}`}>
                      {currentTier.badge}
                    </div>
                  </div>

                  {/* Card Middle: Member Name & Chip */}
                  <div className="relative z-10 my-auto">
                    <div className="flex items-center gap-3 mb-2">
                      {/* Gold Chip */}
                      <div className="w-9 h-7 rounded bg-gradient-to-tr from-amber-400 via-yellow-200 to-amber-500 border border-yellow-600 shadow-inner flex flex-col justify-between p-1">
                        <div className="h-[1px] bg-amber-800/40 w-full" />
                        <div className="h-[1px] bg-amber-800/40 w-full" />
                      </div>
                      <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
                        NFC ACTIVE • {memberId}
                      </span>
                    </div>

                    <div className="font-mono font-black text-lg sm:text-xl tracking-wider text-white uppercase drop-shadow-md">
                      {memberName || "MEMBER NAME"}
                    </div>
                    <div className="text-[11px] text-neutral-300 font-medium flex items-center gap-1.5 mt-0.5">
                      <Building2 className="w-3 h-3 text-red-400" />
                      <span>{homeBranch}</span>
                    </div>
                  </div>

                  {/* Card Bottom Row */}
                  <div className="flex items-center justify-between relative z-10 pt-2 border-t border-white/10 text-[11px]">
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-neutral-400 block font-semibold">Valid Thru</span>
                      <span className="font-mono font-bold text-white">{validUntil}</span>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-neutral-400 block font-semibold">Locker</span>
                      <span className="font-mono font-bold text-amber-400">{lockerNumber}</span>
                    </div>
                    <div className="flex items-center gap-1 bg-red-600/30 px-2 py-0.5 rounded border border-red-500/40">
                      <Flame className="w-3 h-3 text-red-400 fill-red-400" />
                      <span className="font-mono font-bold text-white text-xs">{workoutStreak} Days Streak</span>
                    </div>
                  </div>
                </div>

                {/* BACK OF CARD */}
                <div
                  className={`absolute inset-0 rounded-3xl p-6 bg-neutral-950 border ${currentTier.borderColor} shadow-2xl flex flex-col justify-between overflow-hidden`}
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  {/* Magnetic Stripe */}
                  <div className="h-9 -mx-6 bg-neutral-900 border-y border-neutral-800 flex items-center justify-end px-6">
                    <span className="text-[9px] font-mono tracking-widest text-neutral-500">2048-BIT ENCRYPTED GYM KEY</span>
                  </div>

                  {/* QR & Barcode Section */}
                  <div className="flex items-center justify-between gap-4 my-auto">
                    {/* Simulated QR Code Box */}
                    <div className="bg-white p-2.5 rounded-xl shadow-lg flex flex-col items-center justify-center">
                      <div className="w-20 h-20 bg-neutral-900 rounded p-1 flex items-center justify-center">
                        <QrCode className="w-16 h-16 text-white" />
                      </div>
                      <span className="text-[8px] font-mono font-bold text-neutral-800 mt-1">SCAN TURNSTILE</span>
                    </div>

                    {/* Member Details list on back */}
                    <div className="flex-1 text-xs space-y-1.5">
                      <div className="text-[11px] font-bold text-white uppercase">{currentTier.name} Perks:</div>
                      {currentTier.benefits.slice(0, 3).map((benefit, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-neutral-300 text-[11px]">
                          <CheckCircle className="w-3 h-3 text-red-400 flex-shrink-0" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Back Footer */}
                  <div className="flex justify-between items-center text-[10px] text-neutral-500 font-mono pt-2 border-t border-neutral-800">
                    <span>Helpline: +92 51 8899770</span>
                    <span>Click card to flip</span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-xs text-neutral-500 mt-3 flex items-center gap-1.5">
              <span>💡 Tip: Click or tap the card to flip between ID & QR scanner</span>
            </p>

            {/* Turnstile Scan Simulator Banner */}
            <div className="w-full max-w-md mt-5">
              {scanStatus === "success" ? (
                <div className="p-4 bg-emerald-950/80 border border-emerald-500 rounded-2xl flex items-center gap-3 animate-bounce">
                  <ShieldCheck className="w-6 h-6 text-emerald-400 flex-shrink-0" />
                  <div>
                    <div className="font-bold text-sm text-white">ACCESS GRANTED • TURNSTILE UNLOCKED</div>
                    <div className="text-xs text-emerald-300">Welcome to Power Fitness Zone ({homeBranch})!</div>
                  </div>
                </div>
              ) : (
                <button
                  onClick={handleSimulateScan}
                  disabled={scanStatus === "scanning"}
                  className="w-full py-3.5 px-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-xs uppercase tracking-wider rounded-2xl shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 transition-all"
                >
                  <Volume2 className="w-4 h-4" />
                  {scanStatus === "scanning" ? "Scanning Turnstile Optical Sensor..." : "Simulate Turnstile Gate Check-In"}
                </button>
              )}
            </div>
          </div>

          {/* Controls & Customizer Column */}
          <div className="lg:col-span-6 bg-neutral-900/90 border border-neutral-800 p-6 sm:p-8 rounded-3xl shadow-2xl space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                Choose Membership Tier
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {(Object.keys(TIERS) as MembershipTier[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTier(t)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      tier === t
                        ? "bg-red-600/20 border-red-500 text-white shadow-lg shadow-red-600/20"
                        : "bg-neutral-800/40 border-neutral-700/60 text-neutral-400 hover:text-neutral-200"
                    }`}
                  >
                    <div className="font-bold text-xs">{TIERS[t].name}</div>
                    <div className="text-[10px] text-neutral-400 mt-0.5">{TIERS[t].badge}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Name Input */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1.5">
                Member Full Name
              </label>
              <input
                type="text"
                value={memberName}
                onChange={(e) => setMemberName(e.target.value.toUpperCase())}
                placeholder="Enter member name"
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-red-500 transition-colors uppercase"
              />
            </div>

            {/* Islamabad Branch Selector */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1.5">
                Primary Branch
              </label>
              <select
                value={homeBranch}
                onChange={(e) => setHomeBranch(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-500 transition-colors"
              >
                <option value="F-7 Markaz, Islamabad">F-7 Markaz (Flagship Olympic)</option>
                <option value="G-11 Markaz, Islamabad">G-11 Markaz (Strength & Cardio Deck)</option>
                <option value="DHA Phase 2, Islamabad">DHA Phase 2 (Power Zone & Spa)</option>
                <option value="Bahria Town Phase 7, Rawalpindi">Bahria Town Phase 7 (Elite Complex)</option>
              </select>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleCopyPass}
                className="flex-1 py-3 px-4 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-2 transition-colors"
              >
                <Copy className="w-3.5 h-3.5" />
                {copied ? "Pass Copied!" : "Copy Pass Data"}
              </button>
              <a
                href="#pricing"
                className="flex-1 py-3 px-4 bg-red-600 hover:bg-red-700 rounded-xl text-xs font-bold text-white text-center flex items-center justify-center gap-2 shadow-lg shadow-red-600/30 transition-all"
              >
                <Zap className="w-3.5 h-3.5" />
                Upgrade Membership
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
