"use client";

import { useState } from "react";

export default function ReferralProgram() {
  const [friendsCount, setFriendsCount] = useState<number>(2);
  const [memberName, setMemberName] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  const getRewardTier = (count: number) => {
    if (count === 1) {
      return {
        title: "Bronze Ambassador",
        reward: "1 Month Free Membership Dues",
        valuePKR: 8000,
        perks: ["100% Free 30-day gym dues", "1x Guest Day Pass for a friend", "15% off Supplement Bar"],
      };
    } else if (count === 2) {
      return {
        title: "Silver Power Champion",
        reward: "2 Months Free + 3 PT Sessions",
        valuePKR: 19000,
        perks: ["2 Free Months membership credit", "3x 1-on-1 Personal Training sessions", "Official PFZ Oversized Tee"],
      };
    } else if (count === 3 || count === 4) {
      return {
        title: "Gold Elite Captain",
        reward: "3 Months Free + Leather Lever Belt",
        valuePKR: 32500,
        perks: ["3 Free Months gym dues", "PFZ Competition Leather Belt (PKR 8,500 value)", "Unlimited VIP Sauna Access"],
      };
    } else {
      return {
        title: "Diamond Lifetime Legend",
        reward: "6 Months Free VIP Membership",
        valuePKR: 65000,
        perks: ["6 Full Months VIP Elite access", "Full PFZ Merch & Supplement Stack", "Permanent VIP Locker Reserved"],
      };
    }
  };

  const currentReward = getRewardTier(friendsCount);

  const referralCode = memberName
    ? `PFZ-${memberName.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 8) || "MEMBER"}`
    : "PFZ-VIPFRIEND";

  const handleShareInvite = () => {
    const inviteMsg = encodeURIComponent(
      `Hey! I train at Power Fitness Zone and I have a VIP 1-Day Guest Pass for you. Use my referral code "${referralCode}" to claim your free workout pass & 15% discount on joining! Check it out: https://powerfitzone.com`
    );
    window.open(`https://wa.me/?text=${inviteMsg}`, "_blank");
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="referral" className="py-24 bg-[#0A0A0A] text-white relative overflow-hidden border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-red-950/80 text-red-400 border border-red-800/50 mb-4">
            Member Referral Rewards
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            Train Together. <span className="text-red-500">Get Rewarded.</span>
          </h2>
          <p className="mt-4 text-neutral-400 text-base sm:text-lg">
            Bring your workout buddies to Power Fitness Zone and unlock free monthly dues, personal training sessions, and competition gear.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Simulator Controls */}
          <div className="lg:col-span-6 bg-neutral-900/90 border border-neutral-800 p-6 sm:p-8 rounded-3xl shadow-2xl space-y-6">
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  How Many Friends Will You Invite?
                </label>
                <span className="font-mono font-black text-2xl text-red-500">
                  {friendsCount} {friendsCount === 1 ? "Friend" : "Friends"}
                </span>
              </div>

              <input
                type="range"
                min={1}
                max={6}
                value={friendsCount}
                onChange={(e) => setFriendsCount(Number(e.target.value))}
                className="w-full accent-red-600 cursor-pointer bg-neutral-700 h-3 rounded-lg"
              />
              <div className="flex justify-between text-xs text-neutral-500 mt-2 font-mono">
                <span>1 Friend</span>
                <span>2 Friends</span>
                <span>3 Friends</span>
                <span>4 Friends</span>
                <span>5+ Friends</span>
              </div>
            </div>

            {/* Referral Code Generator */}
            <div className="pt-4 border-t border-neutral-800">
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                Personalize Your Referral Code
              </label>
              <input
                type="text"
                value={memberName}
                onChange={(e) => setMemberName(e.target.value)}
                placeholder="Enter your name (e.g. HAMZA)"
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500 mb-3"
              />

              <div className="flex items-center justify-between p-3.5 bg-neutral-950 border border-dashed border-red-500/60 rounded-xl">
                <div>
                  <span className="text-[10px] uppercase font-bold text-neutral-400 block">Your Active Referral Code:</span>
                  <span className="font-mono font-black text-base text-red-400">{referralCode}</span>
                </div>
                <button
                  onClick={handleCopyCode}
                  className="px-3.5 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-xs font-bold rounded-lg transition-colors border border-neutral-700"
                >
                  {copied ? "✓ Copied" : "Copy Code"}
                </button>
              </div>
            </div>

            <button
              onClick={handleShareInvite}
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30"
            >
              💬 Share Invite Link on WhatsApp
            </button>
          </div>

          {/* Unlocked Reward Tier Card */}
          <div className="lg:col-span-6 bg-gradient-to-br from-neutral-900 via-neutral-900 to-[#121212] border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-neutral-800 mb-6">
                <div>
                  <span className="text-xs uppercase font-bold text-red-400 tracking-wider">Unlocked Level</span>
                  <h3 className="text-2xl font-black text-white">{currentReward.title}</h3>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase text-neutral-500 font-semibold block">Total Reward Value</span>
                  <span className="font-mono font-black text-xl text-emerald-400">
                    PKR {currentReward.valuePKR.toLocaleString("en-PK")}
                  </span>
                </div>
              </div>

              <div className="bg-red-950/40 border border-red-800/40 rounded-2xl p-4 mb-6">
                <span className="text-[11px] uppercase font-bold text-red-400 block mb-1">Primary Incentive:</span>
                <span className="text-lg font-bold text-white">{currentReward.reward}</span>
              </div>

              <div className="space-y-2.5">
                <span className="text-xs uppercase font-semibold text-neutral-400 tracking-wider block">
                  Included Privileges:
                </span>
                {currentReward.perks.map((perk, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-neutral-300">
                    <span className="text-red-500 font-bold">✓</span>
                    <span>{perk}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-neutral-800 text-xs text-neutral-500 text-center">
              Referred friends receive a 15% joining discount when registering with your referral code at any branch desk.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
