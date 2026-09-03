"use client";

import { useState } from "react";

export default function ReferralProgram() {
  const [friendsCount, setFriendsCount] = useState<number>(2);
  const [memberName, setMemberName] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [voucherCode, setVoucherCode] = useState<string | null>(null);

  const getRewardTier = (count: number) => {
    if (count === 1) {
      return {
        tierIndex: 1,
        title: "Bronze Ambassador",
        reward: "1 Month Free Membership Dues",
        valuePKR: 8000,
        perks: ["100% Free 30-day gym dues", "1x Guest Day Pass for a friend", "15% off Supplement Bar"],
      };
    } else if (count === 2) {
      return {
        tierIndex: 2,
        title: "Silver Power Champion",
        reward: "2 Months Free + 3 PT Sessions",
        valuePKR: 19000,
        perks: ["2 Free Months membership credit", "3x 1-on-1 Personal Training sessions", "Official PFZ Oversized Tee"],
      };
    } else if (count === 3 || count === 4) {
      return {
        tierIndex: 3,
        title: "Gold Elite Captain",
        reward: "3 Months Free + Leather Lever Belt",
        valuePKR: 32500,
        perks: ["3 Free Months gym dues", "PFZ Competition Leather Belt (PKR 8,500 value)", "Unlimited VIP Sauna Access"],
      };
    } else {
      return {
        tierIndex: 4,
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

  const inviteText = `Hey! I train at Power Fitness Zone and I have a VIP 1-Day Guest Pass for you. Use my referral code "${referralCode}" to claim your free workout pass & 15% discount on joining!`;

  const handleShareInvite = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: "Power Fitness Zone VIP Guest Pass",
          text: inviteText,
          url: "https://powerfitzone.com",
        });
        return;
      } catch {
        // Fallback to whatsapp
      }
    }
    const inviteMsg = encodeURIComponent(
      `${inviteText} Check it out: https://powerfitzone.com`
    );
    window.open(`https://wa.me/?text=${inviteMsg}`, "_blank");
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const generateClaimVoucher = () => {
    const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
    const code = `REWARD-${currentReward.title.split(" ")[0].toUpperCase()}-${randomSuffix}`;
    setVoucherCode(code);
  };

  const milestoneTiers = [
    { count: 1, name: "Bronze (1)", reward: "1 Mo Free" },
    { count: 2, name: "Silver (2)", reward: "2 Mo + 3 PT" },
    { count: 3, name: "Gold (3-4)", reward: "3 Mo + Belt" },
    { count: 5, name: "Diamond (5+)", reward: "6 Mo VIP" },
  ];

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

        {/* Milestone Progress Bar */}
        <div className="mb-12 bg-neutral-900/60 border border-neutral-800 p-6 rounded-3xl backdrop-blur-sm max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs uppercase font-bold text-neutral-400">Milestone Progression</span>
            <span className="text-xs font-mono font-bold text-red-400">{friendsCount} of 5 Friends Goal</span>
          </div>
          
          <div className="w-full bg-neutral-800 h-3 rounded-full overflow-hidden mb-6">
            <div
              className="bg-gradient-to-r from-red-600 via-amber-500 to-emerald-400 h-full transition-all duration-500 rounded-full"
              style={{ width: `${Math.min(100, (friendsCount / 5) * 100)}%` }}
            />
          </div>

          <div className="grid grid-cols-4 gap-2 text-center">
            {milestoneTiers.map((tier, idx) => {
              const isPassed = friendsCount >= tier.count;
              return (
                <div
                  key={idx}
                  className={`p-3 rounded-2xl border transition-all ${
                    isPassed
                      ? "bg-red-950/40 border-red-800/80 text-white"
                      : "bg-neutral-950/50 border-neutral-800/60 text-neutral-500"
                  }`}
                >
                  <div className="text-xs font-bold">{tier.name}</div>
                  <div className="text-[10px] text-neutral-400 mt-0.5">{tier.reward}</div>
                  <span className={`text-[10px] font-bold mt-1 inline-block ${isPassed ? "text-emerald-400" : "text-neutral-600"}`}>
                    {isPassed ? "✓ Unlocked" : "Locked"}
                  </span>
                </div>
              );
            })}
          </div>
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
              💬 Share VIP Pass Invite
            </button>
          </div>

          {/* Unlocked Reward Tier Card */}
          <div className="lg:col-span-6 bg-gradient-to-br from-neutral-900 via-neutral-900 to-[#121212] border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-neutral-800 mb-6">
                <div>
                  <span className="text-xs uppercase font-bold text-red-400 tracking-wider">Unlocked Reward Tier</span>
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

              {/* Instant Claim Voucher Simulator */}
              <div className="mt-6 pt-6 border-t border-neutral-800">
                {!voucherCode ? (
                  <button
                    onClick={generateClaimVoucher}
                    className="w-full py-3 bg-red-600 hover:bg-red-700 text-white text-xs uppercase font-bold tracking-wider rounded-xl transition-all shadow-md shadow-red-600/20"
                  >
                    🎁 Generate Claim Voucher Code
                  </button>
                ) : (
                  <div className="p-4 rounded-xl bg-neutral-950 border border-emerald-500/50 text-center animate-fadeIn">
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest block">
                      Voucher Ready to Redeem at Front Desk:
                    </span>
                    <span className="font-mono text-xl font-black text-white block my-1">
                      {voucherCode}
                    </span>
                    <p className="text-[11px] text-neutral-400">
                      Show this voucher along with your referral list at any branch counter.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-800 text-xs text-neutral-500 text-center">
              Referred friends receive a 15% joining discount when registering with your referral code at any branch desk.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

