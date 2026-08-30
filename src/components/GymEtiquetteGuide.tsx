"use client";

import { useState } from "react";

interface EtiquetteRule {
  id: string;
  icon: string;
  title: string;
  doText: string;
  dontText: string;
  importance: "Mandatory" | "Standard" | "Safety Critical";
}

interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const ETIQUETTE_RULES: EtiquetteRule[] = [
  {
    id: "rerack",
    icon: "🏋️‍♂️",
    title: "Rerack Dumbbells & Plates",
    doText: "Return dumbbells to their exact numbered slot and strip plates off barbells & leg press after finishing.",
    dontText: "Leave 20kg plates loaded on machines or scatter pairs across the turf floor.",
    importance: "Safety Critical",
  },
  {
    id: "hygiene",
    icon: "🧼",
    title: "Sanitize & Wipe Benches",
    doText: "Use the provided disinfectant spray and paper towels or a gym towel on benches and cardio screens.",
    dontText: "Walk away leaving sweat puddles on leather benches or leather cable grips.",
    importance: "Mandatory",
  },
  {
    id: "work-in",
    icon: "🤝",
    title: "Allow Working-In During Rush Hours",
    doText: "Welcome fellow members to alternate sets during your rest intervals on popular machines (e.g., Lat Pulldown).",
    dontText: "Sit on equipment scrolling through social media for 5 minutes between sets when others are waiting.",
    importance: "Standard",
  },
  {
    id: "collars",
    icon: "🔒",
    title: "Use Barbell Safety Collars",
    doText: "Always lock barbell weights with barbell clips on Olympic benches, squats, and overhead presses.",
    dontText: "Lift heavy without collars where shifting plates can cause sudden catastrophic imbalance.",
    importance: "Safety Critical",
  },
  {
    id: "audio",
    icon: "🎧",
    title: "Headphones & Call Etiquette",
    doText: "Keep personal audio inside earbuds or headphones. Take emergency phone calls in the lounge or reception.",
    dontText: "Play loudspeaker music or conduct loud phone conversations across the free weights section.",
    importance: "Mandatory",
  },
  {
    id: "filming",
    icon: "📱",
    title: "Privacy & Filming Ethics",
    doText: "Angle cameras strictly to your personal lifting area, checking that other members are not filmed without consent.",
    dontText: "Set up massive tripods blocking high-traffic gym walkways or film others in locker rooms.",
    importance: "Mandatory",
  },
];

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    question: "You just completed your 4th set of heavy leg press (300kg). What is the mandatory next step?",
    options: [
      "Walk away to the water cooler and leave the plates for the next heavy lifter.",
      "Unload all plates and return them to the proper plate tree storage racks.",
      "Take off only 2 plates so the machine looks ready.",
    ],
    correctIndex: 1,
    explanation: "Unloading your plates is standard gym etiquette and ensures safety for lifters of all strength levels.",
  },
  {
    question: "A member asks: 'How many sets do you have left on the cable crossover?' Best response?",
    options: [
      "Tell them you have 2 sets left and ask if they'd like to work-in and alternate during your rest.",
      "Ignore them and put on your headphones louder.",
      "Tell them you'll be using it for the next 45 minutes.",
    ],
    correctIndex: 0,
    explanation: "Sharing equipment and welcoming working-in builds strong gym camaraderie and efficiency.",
  },
  {
    question: "Why should you always carry a fresh workout towel into the gym floor?",
    options: [
      "To save a machine while you leave for 15 minutes.",
      "To wipe down sweat from seats, benches, and cardio grips for hygiene.",
      "Only for style points in photos.",
    ],
    correctIndex: 1,
    explanation: "Maintaining dry, clean contact surfaces protects fellow members and prolongs gym upholstery.",
  },
  {
    question: "When is it appropriate to drop weights loudly on the floor?",
    options: [
      "After every single dumbbell bicep curl set.",
      "Only with bumper plates on dedicated Olympic deadlift lifting platforms in an emergency bailout.",
      "Whenever you want everyone to look at you.",
    ],
    correctIndex: 1,
    explanation: "Controlled eccentric lowering protects your joints and gym equipment. Deadlift platforms are designed for safe bailouts.",
  },
  {
    question: "Where should you stand when performing dumbbell lateral raises?",
    options: [
      "Directly in front of the dumbbell rack blocking 10 pairs of weights.",
      "Step back at least 2-3 paces from the rack to allow others clear access to weights.",
      "In the middle of the main walking aisle.",
    ],
    correctIndex: 1,
    explanation: "Stepping back 2-3 paces keeps the dumbbell racks accessible for everyone without bottlenecking.",
  },
];

export default function GymEtiquetteGuide() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [quizFinished, setQuizFinished] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSelectOption = (index: number) => {
    const nextAnswers = [...selectedAnswers];
    nextAnswers[currentQuestion] = index;
    setSelectedAnswers(nextAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const calculateScore = () => {
    return selectedAnswers.reduce((score, ans, idx) => {
      return ans === QUIZ_QUESTIONS[idx].correctIndex ? score + 1 : score;
    }, 0);
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setQuizFinished(false);
  };

  const score = calculateScore();

  const handleShareBadge = () => {
    navigator.clipboard.writeText(
      `🏆 I scored ${score}/5 on the Power Fitness Zone Gym Etiquette & Respectful Lifter IQ Test! Join the elite fitness community in Islamabad: https://powerfitnesszone.pk`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section
      id="gym-etiquette"
      className="py-20 bg-[#0E0E0E] text-white relative overflow-hidden border-t border-neutral-800"
    >
      <div className="absolute top-1/3 left-1/4 w-[550px] h-[300px] bg-red-600/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            Gym Culture & Respect Standards
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-white">
            Gym Etiquette & <span className="text-red-500">Lifter IQ</span> Guide
          </h2>
          <p className="mt-4 text-neutral-400 text-base sm:text-lg">
            Our gym culture is built on mutual respect, hygiene, and safe lifting. Master the unwritten rules and earn your Certified Respectful Lifter badge.
          </p>
        </div>

        {/* 6 Rules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {ETIQUETTE_RULES.map((rule) => (
            <div
              key={rule.id}
              className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6 backdrop-blur-sm shadow-xl flex flex-col justify-between hover:border-red-500/40 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl p-2.5 rounded-xl bg-neutral-950 border border-neutral-800">
                    {rule.icon}
                  </span>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                      rule.importance === "Safety Critical"
                        ? "bg-red-500/10 text-red-400 border-red-500/30"
                        : rule.importance === "Mandatory"
                        ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                        : "bg-blue-500/10 text-blue-400 border-blue-500/30"
                    }`}
                  >
                    {rule.importance}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors mb-3">
                  {rule.title}
                </h3>

                <div className="space-y-3">
                  <div className="bg-neutral-950/80 p-3 rounded-xl border border-neutral-800 text-xs">
                    <span className="text-emerald-400 font-bold flex items-center gap-1.5 mb-1">
                      <span>✅</span> DO:
                    </span>
                    <p className="text-neutral-300 leading-relaxed">{rule.doText}</p>
                  </div>

                  <div className="bg-neutral-950/80 p-3 rounded-xl border border-neutral-800 text-xs">
                    <span className="text-red-400 font-bold flex items-center gap-1.5 mb-1">
                      <span>❌</span> DON&apos;T:
                    </span>
                    <p className="text-neutral-400 leading-relaxed">{rule.dontText}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Lifter IQ Quiz Card */}
        <div className="max-w-3xl mx-auto bg-neutral-900/90 border border-neutral-800 rounded-3xl p-6 sm:p-10 backdrop-blur-sm shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

          {!quizStarted ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-red-600/20 border border-red-500/30 flex items-center justify-center text-3xl">
                🎓
              </div>
              <h3 className="text-2xl font-black uppercase text-white tracking-wide">
                Test Your Gym Etiquette IQ
              </h3>
              <p className="mt-2 text-neutral-400 text-sm max-w-lg mx-auto">
                Take this 5-question situational quiz to test your gym floor etiquette and earn the official Power Fitness Zone Certified Respectful Lifter Pass.
              </p>
              <button
                onClick={() => setQuizStarted(true)}
                className="mt-6 px-8 py-3.5 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl shadow-lg shadow-red-600/30 transition-all scale-105 active:scale-95 uppercase tracking-wider text-xs"
              >
                Start Etiquette Quiz (5 Questions)
              </button>
            </div>
          ) : !quizFinished ? (
            <div>
              {/* Question Header */}
              <div className="flex items-center justify-between pb-4 border-b border-neutral-800 mb-6">
                <span className="text-xs uppercase font-bold text-red-400 tracking-wider">
                  Question {currentQuestion + 1} of {QUIZ_QUESTIONS.length}
                </span>
                <div className="w-32 h-2 bg-neutral-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-red-600 transition-all duration-300"
                    style={{ width: `${((currentQuestion + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                  />
                </div>
              </div>

              <h4 className="text-lg sm:text-xl font-bold text-white mb-6 leading-snug">
                {QUIZ_QUESTIONS[currentQuestion].question}
              </h4>

              {/* Options */}
              <div className="space-y-3 mb-8">
                {QUIZ_QUESTIONS[currentQuestion].options.map((opt, idx) => {
                  const isSelected = selectedAnswers[currentQuestion] === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full text-left p-4 rounded-xl border text-sm font-medium transition-all flex items-start gap-3 ${
                        isSelected
                          ? "bg-red-600/20 border-red-500 text-white shadow-md shadow-red-600/20"
                          : "bg-neutral-950/70 border-neutral-800 text-neutral-300 hover:border-neutral-700"
                      }`}
                    >
                      <span
                        className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 ${
                          isSelected
                            ? "bg-red-600 border-red-500 text-white"
                            : "border-neutral-700 text-neutral-500"
                        }`}
                      >
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>

              {/* Footer navigation */}
              <div className="flex justify-between items-center pt-4 border-t border-neutral-800">
                <button
                  onClick={resetQuiz}
                  className="text-xs text-neutral-500 hover:text-neutral-300"
                >
                  Cancel
                </button>
                <button
                  disabled={selectedAnswers[currentQuestion] === undefined}
                  onClick={handleNext}
                  className={`px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all ${
                    selectedAnswers[currentQuestion] !== undefined
                      ? "bg-red-600 text-white shadow-lg shadow-red-600/30 hover:bg-red-500"
                      : "bg-neutral-800 text-neutral-500 cursor-not-allowed"
                  }`}
                >
                  {currentQuestion < QUIZ_QUESTIONS.length - 1 ? "Next Question →" : "Finish & View Badge"}
                </button>
              </div>
            </div>
          ) : (
            /* Results & Certified Badge */
            <div className="text-center py-4">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-red-600/20 border border-red-500/40 text-4xl mb-4 shadow-xl shadow-red-600/20">
                {score >= 4 ? "🥇" : "🥈"}
              </div>

              <span className="text-xs font-bold uppercase tracking-widest text-red-400 block mb-1">
                Etiquette Assessment Result
              </span>
              <h3 className="text-3xl font-black uppercase text-white">
                Score: {score} / {QUIZ_QUESTIONS.length} Correct
              </h3>

              {/* Certified Badge Preview */}
              <div className="my-6 p-6 rounded-2xl bg-neutral-950 border-2 border-red-500/50 relative shadow-2xl max-w-md mx-auto text-left">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500" />
                    <span className="font-bold text-xs uppercase tracking-wider text-white">
                      Power Fitness Zone
                    </span>
                  </div>
                  <span className="text-[10px] font-mono uppercase bg-red-500/20 text-red-400 px-2 py-0.5 rounded">
                    VERIFIED LIFTER
                  </span>
                </div>

                <div className="py-4">
                  <div className="text-lg font-black text-white uppercase tracking-tight">
                    {score === 5
                      ? "Master of Gym Etiquette"
                      : score >= 4
                      ? "Certified Respectful Lifter"
                      : "Developing Gym Member"}
                  </div>
                  <p className="text-xs text-neutral-400 mt-1">
                    Recognized for upholding pristine gym floor etiquette, hygiene, equipment care, and community respect at Power Fitness Zone Islamabad.
                  </p>
                </div>

                <div className="pt-3 border-t border-neutral-800 flex justify-between items-center text-[10px] text-neutral-500 font-mono">
                  <span>ID: PFZ-ETIQ-{Math.floor(1000 + Math.random() * 9000)}</span>
                  <span>ISLAMABAD, PK</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={handleShareBadge}
                  className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl text-xs uppercase tracking-wider shadow-lg shadow-red-600/30 transition-all"
                >
                  {copied ? "✓ Copied to Clipboard!" : "📋 Copy & Share Score"}
                </button>
                <button
                  onClick={resetQuiz}
                  className="px-6 py-3 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-semibold rounded-xl text-xs uppercase tracking-wider transition-all"
                >
                  Retake Quiz
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
