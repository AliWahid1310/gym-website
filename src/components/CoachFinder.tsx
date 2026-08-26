"use client";

import { useState } from "react";
import {
  UserCheck,
  Award,
  ChevronRight,
  RotateCcw,
  Sparkles,
  Target,
  Clock,
  HeartHandshake,
  MessageCircle,
  CheckCircle,
  Star
} from "lucide-react";

interface CoachMatchResult {
  name: string;
  role: string;
  experience: string;
  image: string;
  specialty: string;
  matchScore: number;
  quote: string;
  certification: string;
  branch: string;
  idealFor: string;
}

const COACHES: Record<string, CoachMatchResult> = {
  hamza: {
    name: "Coach Hamza",
    role: "Head Bodybuilding & Hypertrophy Coach",
    experience: "9+ Years Experience",
    image: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=600&q=80",
    specialty: "Hypertrophy, Periodization & Stage Prep",
    matchScore: 98,
    quote: "We don't count reps until it starts hurting. Form precision builds champions.",
    certification: "IFBB Pro Trainer & Precision Nutrition L2",
    branch: "I-8 & G-11 Markaz",
    idealFor: "Serious muscle mass, athletic aesthetics, and strict compound lifting.",
  },
  tariq: {
    name: "Captain Tariq",
    role: "Senior Conditioning & Fat Loss Specialist",
    experience: "12+ Years Experience",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80",
    specialty: "High-Energy Fat Loss, HIIT & Mental Grit",
    matchScore: 96,
    quote: "Discipline is doing what needs to be done, even when you don't feel like it.",
    certification: "Ex-Military Physical Training Instructor & ACSM-CPT",
    branch: "I-8 Markaz Islamabad",
    idealFor: "Rapid body fat reduction, mental toughness, and cardiovascular endurance.",
  },
  sarah: {
    name: "Coach Sarah Khan",
    role: "Head Female Transformation & Mobility Director",
    experience: "7+ Years Experience",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80",
    specialty: "Female Toning, Core Rehab & Posture Correction",
    matchScore: 99,
    quote: "Empowering women to build strength, confidence, and pain-free longevity.",
    certification: "ACE Certified Personal Trainer & Pre/Post-Natal Specialist",
    branch: "Ladies Exclusive Wing (I-8 & G-11)",
    idealFor: "Ladies hours training, glute & core sculpt, bridal transformations, and posture fix.",
  },
  bilal: {
    name: "Coach Bilal",
    role: "Strength & Powerlifting Specialist",
    experience: "8+ Years Experience",
    image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=600&q=80",
    specialty: "Squat/Bench/Deadlift Biomechanics & Explosive Strength",
    matchScore: 97,
    quote: "Strength solves almost all movement problems. Lift with intent.",
    certification: "NSCA-CSCS (Certified Strength & Conditioning Specialist)",
    branch: "G-11 Markaz Islamabad",
    idealFor: "Heavy compound strength, 1RM progression, and athletic speed.",
  },
};

export default function CoachFinder() {
  const [step, setStep] = useState<number>(1);
  const [answers, setAnswers] = useState<{
    goal: string;
    experience: string;
    timeSlot: string;
    style: string;
  }>({
    goal: "",
    experience: "",
    timeSlot: "",
    style: "",
  });

  const [matchedCoach, setMatchedCoach] = useState<CoachMatchResult | null>(null);

  const handleSelect = (field: "goal" | "experience" | "timeSlot" | "style", val: string) => {
    const updated = { ...answers, [field]: val };
    setAnswers(updated);

    if (step < 4) {
      setStep(step + 1);
    } else {
      // Calculate match logic
      calculateMatch(updated);
      setStep(5);
    }
  };

  const calculateMatch = (finalAnswers: typeof answers) => {
    if (finalAnswers.timeSlot === "ladies" || finalAnswers.goal === "female-toning") {
      setMatchedCoach(COACHES.sarah);
    } else if (finalAnswers.goal === "powerlifting" || finalAnswers.style === "biomechanics") {
      setMatchedCoach(COACHES.bilal);
    } else if (finalAnswers.goal === "fatloss" || finalAnswers.style === "drill-sergeant") {
      setMatchedCoach(COACHES.tariq);
    } else {
      setMatchedCoach(COACHES.hamza);
    }
  };

  const handleReset = () => {
    setStep(1);
    setAnswers({ goal: "", experience: "", timeSlot: "", style: "" });
    setMatchedCoach(null);
  };

  const whatsappMessage = matchedCoach
    ? `https://wa.me/923335557890?text=${encodeURIComponent(
        `Hi Power Fitness Zone! I completed your Coach Matcher Quiz. I got matched with ${matchedCoach.name} for ${answers.goal || "Personal Training"} (${answers.timeSlot || "Flexible"}). I'd like to book a complimentary 1-on-1 trial session!`
      )}`
    : "https://wa.me/923335557890";

  return (
    <section id="coach-finder" className="py-20 bg-[#080808] text-white relative overflow-hidden border-t border-white/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-red-500" />
            AI Coach Matcher
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Find Your <span className="text-gradient">Ideal Personal Trainer</span>
          </h2>
          <p className="mt-3 text-gray-400 text-sm sm:text-base max-w-xl mx-auto">
            Take our 30-second coach matching quiz to find the certified instructor best suited to your exact schedule, personality, and body goals.
          </p>
        </div>

        {/* Wizard Card Container */}
        <div className="bg-[#121212] border border-white/10 rounded-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          {/* Progress Bar (Steps 1 to 4) */}
          {step <= 4 && (
            <div className="mb-8">
              <div className="flex justify-between items-center text-xs font-semibold text-gray-400 mb-2">
                <span>Step {step} of 4</span>
                <span>{Math.round((step / 4) * 100)}% Completed</span>
              </div>
              <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-red-600 to-red-400 transition-all duration-300 rounded-full"
                  style={{ width: `${(step / 4) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* STEP 1: Main Goal */}
          {step === 1 && (
            <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
              <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <Target className="w-6 h-6 text-red-500" />
                What is your primary fitness goal?
              </h3>
              <p className="text-sm text-gray-400">Choose the objective you want to conquer in the next 90 days.</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  { id: "hypertrophy", label: "Massive Muscle Gain & Bodybuilding", desc: "Hypertrophy, shoulder width & aesthetic physique" },
                  { id: "fatloss", label: "Rapid Fat Shred & Weight Loss", desc: "Drop body fat, tone abs & rev metabolism" },
                  { id: "powerlifting", label: "Pure Strength & Heavy Lifts", desc: "Master the Big 3: Squat, Bench & Deadlift" },
                  { id: "female-toning", label: "Ladies Tone, Glutes & Waist", desc: "Dedicated female fitness, waist cinching & posture" },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleSelect("goal", opt.id)}
                    className="p-4 rounded-xl border border-white/5 bg-black/40 hover:border-red-500/50 hover:bg-red-950/20 text-left transition-all group flex flex-col justify-between"
                  >
                    <div>
                      <p className="font-bold text-white text-base group-hover:text-red-400 transition-colors">
                        {opt.label}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">{opt.desc}</p>
                    </div>
                    <div className="flex justify-end mt-3">
                      <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-red-400 group-hover:translate-x-1 transition-all" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Experience Level */}
          {step === 2 && (
            <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
              <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <UserCheck className="w-6 h-6 text-red-500" />
                What is your gym lifting experience?
              </h3>
              <p className="text-sm text-gray-400">This helps us match the right training depth and pedagogical speed.</p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {[
                  { id: "beginner", title: "Complete Beginner", desc: "0-6 months. Need hands-on form correction & structured onboarding." },
                  { id: "intermediate", title: "Intermediate", desc: "1-3 years. Know the basics, hit a plateau, need advanced programming." },
                  { id: "advanced", title: "Advanced / Athlete", desc: "3+ years. Looking for peak conditioning, PR records, or contest prep." },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleSelect("experience", opt.id)}
                    className="p-4 rounded-xl border border-white/5 bg-black/40 hover:border-red-500/50 hover:bg-red-950/20 text-left transition-all group flex flex-col justify-between"
                  >
                    <div>
                      <p className="font-bold text-white text-base group-hover:text-red-400 transition-colors">
                        {opt.title}
                      </p>
                      <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">{opt.desc}</p>
                    </div>
                    <div className="flex justify-end mt-4">
                      <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-red-400 group-hover:translate-x-1 transition-all" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: Preferred Schedule */}
          {step === 3 && (
            <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
              <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <Clock className="w-6 h-6 text-red-500" />
                When do you plan to workout in Islamabad?
              </h3>
              <p className="text-sm text-gray-400">We align coach availability with your preferred branch and hours.</p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {[
                  { id: "morning", title: "Early Morning (6 AM - 10 AM)", desc: "Quiet energy, fasting sessions, beat the workday rush." },
                  { id: "ladies", title: "Ladies Exclusive (10 AM - 4 PM)", desc: "100% private, female-only certified trainer wing." },
                  { id: "evening", title: "Evening Prime (5 PM - 10 PM)", desc: "High-voltage gym atmosphere, post-work intensity." },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleSelect("timeSlot", opt.id)}
                    className="p-4 rounded-xl border border-white/5 bg-black/40 hover:border-red-500/50 hover:bg-red-950/20 text-left transition-all group flex flex-col justify-between"
                  >
                    <div>
                      <p className="font-bold text-white text-base group-hover:text-red-400 transition-colors">
                        {opt.title}
                      </p>
                      <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">{opt.desc}</p>
                    </div>
                    <div className="flex justify-end mt-4">
                      <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-red-400 group-hover:translate-x-1 transition-all" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: Coaching Style */}
          {step === 4 && (
            <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
              <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <HeartHandshake className="w-6 h-6 text-red-500" />
                What coaching style resonates most with you?
              </h3>
              <p className="text-sm text-gray-400">Choose the accountability dynamic that drives your highest commitment.</p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {[
                  { id: "drill-sergeant", title: "High-Intensity & Tough Love", desc: "Push past comfort zones with zero excuses and raw grit." },
                  { id: "biomechanics", title: "Analytical & Form-Centric", desc: "Scientific biomechanics, injury prevention & progressive overload logs." },
                  { id: "supportive", title: "Supportive & Habit Builder", desc: "Empowering mindset, lifestyle nutrition balance & gradual steps." },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleSelect("style", opt.id)}
                    className="p-4 rounded-xl border border-white/5 bg-black/40 hover:border-red-500/50 hover:bg-red-950/20 text-left transition-all group flex flex-col justify-between"
                  >
                    <div>
                      <p className="font-bold text-white text-base group-hover:text-red-400 transition-colors">
                        {opt.title}
                      </p>
                      <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">{opt.desc}</p>
                    </div>
                    <div className="flex justify-end mt-4">
                      <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-red-400 group-hover:translate-x-1 transition-all" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 5: MATCH RESULT */}
          {step === 5 && matchedCoach && (
            <div className="space-y-6 animate-in zoom-in-95 duration-400">
              {/* Match Header Badge */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  {matchedCoach.matchScore}% Personalized Compatibility Match
                </div>
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Retake Quiz
                </button>
              </div>

              {/* Coach Profile Showcase */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-4 relative rounded-xl overflow-hidden aspect-[4/5] border border-white/10 shadow-lg">
                  <img
                    src={matchedCoach.image}
                    alt={matchedCoach.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex flex-col justify-end p-4">
                    <p className="text-xs font-semibold text-red-400">{matchedCoach.experience}</p>
                    <p className="text-lg font-bold text-white">{matchedCoach.name}</p>
                  </div>
                </div>

                <div className="md:col-span-8 space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-2xl font-extrabold text-white">{matchedCoach.name}</h4>
                      <div className="flex text-amber-400 text-xs">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm font-semibold text-red-400">{matchedCoach.role}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{matchedCoach.branch}</p>
                  </div>

                  <blockquote className="border-l-2 border-red-500 pl-3.5 italic text-sm text-gray-300">
                    &quot;{matchedCoach.quote}&quot;
                  </blockquote>

                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                      <span className="text-gray-300">
                        <strong>Certifications:</strong> {matchedCoach.certification}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-red-400 flex-shrink-0" />
                      <span className="text-gray-300">
                        <strong>Specialty Focus:</strong> {matchedCoach.specialty}
                      </span>
                    </div>
                  </div>

                  <div className="bg-black/50 border border-white/5 rounded-xl p-3.5 text-xs text-gray-300">
                    <strong className="text-white block mb-1">Why you were matched:</strong>
                    {matchedCoach.idealFor}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <a
                      href={whatsappMessage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-all shadow-lg shadow-emerald-900/30"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Chat with {matchedCoach.name} on WhatsApp
                    </a>

                    <a
                      href="#pricing"
                      className="inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-all border border-white/10"
                    >
                      View PT Pricing Plans
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
