"use client";

import { useState } from "react";

type ExperienceLevel = "beginner" | "intermediate" | "advanced";
type DaysPerWeek = 3 | 4 | 5 | 6;
type FocusGoal = "hypertrophy" | "strength" | "fat-loss" | "endurance";

interface Exercise {
  name: string;
  sets: string;
  reps: string;
  rest: string;
  notes: string;
}

interface RoutineDay {
  dayName: string;
  focus: string;
  exercises: Exercise[];
}

export default function WorkoutGenerator() {
  const [experience, setExperience] = useState<ExperienceLevel>("intermediate");
  const [days, setDays] = useState<DaysPerWeek>(4);
  const [goal, setGoal] = useState<FocusGoal>("hypertrophy");
  const [copied, setCopied] = useState(false);

  const generateSplit = (): { splitName: string; schedule: RoutineDay[] } => {
    if (days === 3) {
      return {
        splitName: "Full Body Functional Power Split (3-Day)",
        schedule: [
          {
            dayName: "Day 1: Heavy Strength & Anterior Chain",
            focus: "Quads, Chest, Shoulders, Core",
            exercises: [
              { name: "Barbell Back Squats", sets: "4", reps: "6-8", rest: "2.5 min", notes: "Focus on deep parallel depth" },
              { name: "Incline Dumbbell Press", sets: "4", reps: "8-10", rest: "2 min", notes: "Full stretch at bottom" },
              { name: "Overhead Barbell Press", sets: "3", reps: "6-8", rest: "2 min", notes: "Keep core brace tight" },
              { name: "Leg Extensions", sets: "3", reps: "12-15", rest: "90s", notes: "Squeeze at peak contraction" },
              { name: "Hanging Leg Raises", sets: "3", reps: "15", rest: "60s", notes: "Strict control, no swinging" },
            ],
          },
          {
            dayName: "Day 2: Posterior Chain & Pull Power",
            focus: "Back, Hamstrings, Biceps, Traps",
            exercises: [
              { name: "Conventional Deadlifts", sets: "4", reps: "5", rest: "3 min", notes: "Explosive hip hinge" },
              { name: "Chest-Supported T-Bar Rows", sets: "4", reps: "8-10", rest: "90s", notes: "Squeeze lats hard" },
              { name: "Romanian Deadlifts (RDL)", sets: "3", reps: "8-10", rest: "2 min", notes: "Feel intense hamstring stretch" },
              { name: "Barbell Bicep Curls", sets: "3", reps: "10-12", rest: "60s", notes: "Strict elbow posture" },
              { name: "Face Pulls", sets: "4", reps: "15", rest: "60s", notes: "Rear delt and rotator cuff focus" },
            ],
          },
          {
            dayName: "Day 3: Hypertrophy & Metabolic Circuit",
            focus: "Total Body Volume & Upper Symmetry",
            exercises: [
              { name: "Flat Barbell Bench Press", sets: "4", reps: "8", rest: "2 min", notes: "Controlled 3-sec eccentric" },
              { name: "Bulgarian Split Squats", sets: "3 / leg", reps: "10-12", rest: "90s", notes: "Quad & glute burn" },
              { name: "Lat Pulldowns (Wide Grip)", sets: "4", reps: "10-12", rest: "90s", notes: "Drive elbows to ribs" },
              { name: "Dips or Tricep Cable Pushdowns", sets: "3", reps: "12-15", rest: "60s", notes: "Full lockout contraction" },
              { name: "Plank to Push-Up", sets: "3", reps: "60s", rest: "60s", notes: "Maximum core stabilization" },
            ],
          },
        ],
      };
    } else if (days === 4) {
      return {
        splitName: "Upper / Lower Power & Hypertrophy Split (4-Day)",
        schedule: [
          {
            dayName: "Day 1: Upper Body Heavy Power",
            focus: "Chest, Back, Shoulders Strength",
            exercises: [
              { name: "Barbell Bench Press", sets: "4", reps: "5", rest: "3 min", notes: "Strength focus" },
              { name: "Bent-Over Barbell Rows", sets: "4", reps: "6-8", rest: "2 min", notes: "Power pull" },
              { name: "Standing Military Press", sets: "3", reps: "6", rest: "2 min", notes: "Shoulder density" },
              { name: "Weighted Pull-Ups / Lat Pulldown", sets: "3", reps: "6-8", rest: "2 min", notes: "Full range" },
              { name: "Skull Crushers", sets: "3", reps: "10", rest: "90s", notes: "Tricep long head" },
            ],
          },
          {
            dayName: "Day 2: Lower Body Quad & Hamstring Strength",
            focus: "Squat, Quads, Hamstrings, Calves",
            exercises: [
              { name: "Barbell Back Squats", sets: "4", reps: "5", rest: "3 min", notes: "Primary compound" },
              { name: "Lying Leg Curls", sets: "4", reps: "10-12", rest: "90s", notes: "Hamstring isolation" },
              { name: "Leg Press (Heavy)", sets: "3", reps: "10", rest: "2 min", notes: "Foot placement mid-plate" },
              { name: "Standing Calf Raises", sets: "4", reps: "15", rest: "60s", notes: "2-sec pause at bottom" },
            ],
          },
          {
            dayName: "Day 3: Upper Body Hypertrophy & Arms",
            focus: "Volume Pump, Chest, Delts, Arms",
            exercises: [
              { name: "Incline Dumbbell Press", sets: "4", reps: "10-12", rest: "90s", notes: "Upper chest focus" },
              { name: "Cable Seated Rows", sets: "4", reps: "12", rest: "90s", notes: "Mid-back contraction" },
              { name: "Dumbbell Lateral Raises", sets: "4", reps: "15-20", rest: "60s", notes: "Side delt cap" },
              { name: "Incline Dumbbell Curls", sets: "3", reps: "12", rest: "60s", notes: "Bicep peak stretch" },
              { name: "Rope Cable Tricep Extensions", sets: "3", reps: "15", rest: "60s", notes: "Lockout pump" },
            ],
          },
          {
            dayName: "Day 4: Lower Body Posterior & Glute Power",
            focus: "Deadlift, RDL, Glutes, Abs",
            exercises: [
              { name: "Barbell Romanian Deadlifts", sets: "4", reps: "8-10", rest: "2 min", notes: "Hamstring loaded stretch" },
              { name: "Hack Squats", sets: "3", reps: "10-12", rest: "2 min", notes: "Deep knee bend" },
              { name: "Walking Dumbbell Lunges", sets: "3", reps: "12 / leg", rest: "90s", notes: "Glute emphasis" },
              { name: "Cable Woodchoppers & Planks", sets: "3", reps: "15", rest: "60s", notes: "Core rotation" },
            ],
          },
        ],
      };
    } else if (days === 5) {
      return {
        splitName: "Classic 5-Day Bodybuilding Bro Split",
        schedule: [
          { dayName: "Monday: Chest & Abs Destruction", focus: "Pectoral Major & Minor", exercises: [{ name: "Flat Barbell Bench", sets: "4", reps: "8-10", rest: "2 min", notes: "Heavy base" }, { name: "Incline DB Press", sets: "4", reps: "10-12", rest: "90s", notes: "Upper clavicle" }, { name: "Cable Crossovers", sets: "3", reps: "15", rest: "60s", notes: "Inner chest squeeze" }] },
          { dayName: "Tuesday: Back & Lat Thickness", focus: "Lats, Rhomboids, Lower Back", exercises: [{ name: "Deadlifts", sets: "4", reps: "6", rest: "3 min", notes: "Overall power" }, { name: "Weighted Pull-Ups", sets: "4", reps: "8-10", rest: "2 min", notes: "Lat width" }, { name: "Single-Arm DB Row", sets: "3", reps: "10", rest: "90s", notes: "Unilateral control" }] },
          { dayName: "Wednesday: Shoulders & Traps", focus: "Deltoid 3D Symmetry", exercises: [{ name: "Seated DB Overhead Press", sets: "4", reps: "8-10", rest: "2 min", notes: "Front & side delts" }, { name: "Lateral Raises", sets: "5", reps: "15", rest: "60s", notes: "Massive side delts" }, { name: "Barbell Shrugs", sets: "4", reps: "12", rest: "60s", notes: "Trapezius density" }] },
          { dayName: "Thursday: Quad & Hamstring Dominance", focus: "Complete Leg Hypertrophy", exercises: [{ name: "Barbell Back Squats", sets: "4", reps: "8", rest: "2.5 min", notes: "Mass builder" }, { name: "Leg Press", sets: "4", reps: "12", rest: "2 min", notes: "Quad pump" }, { name: "Hamstring Curls", sets: "4", reps: "12", rest: "90s", notes: "Peak squeeze" }] },
          { dayName: "Friday: Gun Show (Biceps & Triceps)", focus: "Arm Hypertrophy & Forearms", exercises: [{ name: "Barbell Preacher Curls", sets: "4", reps: "10-12", rest: "60s", notes: "Bicep peak" }, { name: "Close-Grip Bench Press", sets: "4", reps: "8-10", rest: "90s", notes: "Tricep horsepower" }, { name: "Hammer Curls", sets: "3", reps: "12", rest: "60s", notes: "Brachialis width" }] },
        ],
      };
    } else {
      return {
        splitName: "Push • Pull • Legs Elite 6-Day Split (PPL x 2)",
        schedule: [
          { dayName: "Day 1: Push A (Chest Dominant)", focus: "Chest, Shoulders, Triceps", exercises: [{ name: "Incline Barbell Bench", sets: "4", reps: "6-8", rest: "2 min", notes: "Upper chest focus" }, { name: "Flat DB Press", sets: "3", reps: "10-12", rest: "90s", notes: "Stretch at bottom" }, { name: "Lateral Raises", sets: "4", reps: "15", rest: "60s", notes: "Side delts" }] },
          { dayName: "Day 2: Pull A (Lat Width & Biceps)", focus: "Back Thickness & Biceps", exercises: [{ name: "Weighted Pull-Ups", sets: "4", reps: "6-8", rest: "2 min", notes: "V-Taper width" }, { name: "Barbell Rows", sets: "4", reps: "8", rest: "2 min", notes: "Mid-back" }, { name: "Incline DB Curls", sets: "3", reps: "10-12", rest: "60s", notes: "Bicep stretch" }] },
          { dayName: "Day 3: Legs A (Quad Focus)", focus: "Quads, Calves, Abs", exercises: [{ name: "High-Bar Squats", sets: "4", reps: "6-8", rest: "3 min", notes: "Full depth" }, { name: "Leg Press", sets: "4", reps: "12", rest: "2 min", notes: "Quad loading" }, { name: "Leg Extension Drop Sets", sets: "3", reps: "15", rest: "60s", notes: "Finishers" }] },
          { dayName: "Day 4: Push B (Shoulder Dominant)", focus: "Shoulders, Upper Chest, Triceps", exercises: [{ name: "Standing Overhead Press", sets: "4", reps: "6", rest: "2.5 min", notes: "Shoulder density" }, { name: "Dips (Weighted)", sets: "3", reps: "8-10", rest: "2 min", notes: "Chest & Triceps" }, { name: "Cable Lateral Raises", sets: "4", reps: "15", rest: "60s", notes: "Constant tension" }] },
          { dayName: "Day 5: Pull B (Back Thickness & Traps)", focus: "Deadlift, Upper Back, Forearms", exercises: [{ name: "Rack Pulls / Deadlifts", sets: "4", reps: "5", rest: "3 min", notes: "Posterior strength" }, { name: "Chest-Supported Row", sets: "4", reps: "10", rest: "90s", notes: "Upper back" }, { name: "Hammer Curls", sets: "4", reps: "12", rest: "60s", notes: "Forearms & arms" }] },
          { dayName: "Day 6: Legs B (Hamstrings & Glutes)", focus: "Hamstrings, Glutes, Calves", exercises: [{ name: "Romanian Deadlifts", sets: "4", reps: "8-10", rest: "2 min", notes: "Hamstrings" }, { name: "Bulgarian Split Squats", sets: "3", reps: "10 / leg", rest: "90s", notes: "Glute burn" }, { name: "Seated Leg Curls", sets: "4", reps: "12-15", rest: "60s", notes: "Hamstrings" }] },
        ],
      };
    }
  };

  const currentSplit = generateSplit();

  const handleCopyRoutine = () => {
    let text = `⚡ Power Fitness Zone — ${currentSplit.splitName}\nExperience: ${experience.toUpperCase()} | Goal: ${goal.toUpperCase()}\n\n`;
    currentSplit.schedule.forEach((day) => {
      text += `📌 ${day.dayName} (${day.focus})\n`;
      day.exercises.forEach((ex, idx) => {
        text += `  ${idx + 1}. ${ex.name} - ${ex.sets} sets x ${ex.reps} reps (Rest: ${ex.rest})\n`;
      });
      text += "\n";
    });
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="workout-generator" className="py-24 bg-[#090909] text-white relative overflow-hidden border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-red-950/80 text-red-400 border border-red-800/50 mb-4">
            Smart Training Engine
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            Custom <span className="text-red-500">Workout Split</span> Generator
          </h2>
          <p className="mt-4 text-neutral-400 text-base sm:text-lg">
            Build your science-backed training protocol tailored to your schedule, training age, and target physique.
          </p>
        </div>

        {/* Controls Grid */}
        <div className="bg-neutral-900/90 border border-neutral-800 rounded-3xl p-6 sm:p-8 mb-10 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Days per week */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3">
                Frequency (Days Per Week)
              </label>
              <div className="grid grid-cols-4 gap-2">
                {([3, 4, 5, 6] as DaysPerWeek[]).map((d) => (
                  <button
                    key={d}
                    onClick={() => setDays(d)}
                    className={`py-2.5 rounded-xl font-bold text-sm transition-all border ${
                      days === d
                        ? "bg-red-600 border-red-500 text-white shadow-lg shadow-red-600/30"
                        : "bg-neutral-800/70 border-neutral-700 text-neutral-300 hover:bg-neutral-800"
                    }`}
                  >
                    {d} Days
                  </button>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3">
                Training Experience
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "beginner", label: "Beginner" },
                  { id: "intermediate", label: "Intermed." },
                  { id: "advanced", label: "Advanced" },
                ].map((lvl) => (
                  <button
                    key={lvl.id}
                    onClick={() => setExperience(lvl.id as ExperienceLevel)}
                    className={`py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all border ${
                      experience === lvl.id
                        ? "bg-red-600 border-red-500 text-white shadow-lg shadow-red-600/30"
                        : "bg-neutral-800/70 border-neutral-700 text-neutral-300 hover:bg-neutral-800"
                    }`}
                  >
                    {lvl.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Goal */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3">
                Target Outcome
              </label>
              <select
                value={goal}
                onChange={(e) => setGoal(e.target.value as FocusGoal)}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-500"
              >
                <option value="hypertrophy">Muscle Growth (Hypertrophy)</option>
                <option value="strength">Raw Strength & Power</option>
                <option value="fat-loss">Fat Loss & Conditioning</option>
                <option value="endurance">Athletic Stamina</option>
              </select>
            </div>
          </div>
        </div>

        {/* Split Header & Action */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 bg-neutral-950 p-6 rounded-2xl border border-neutral-800">
          <div>
            <span className="text-xs uppercase font-bold text-red-400 tracking-wider">Active Protocol</span>
            <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">{currentSplit.splitName}</h3>
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <button
              onClick={handleCopyRoutine}
              className="flex-1 sm:flex-none px-5 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs sm:text-sm font-semibold rounded-xl transition-colors border border-neutral-700"
            >
              {copied ? "✓ Copied!" : "📋 Copy Full Routine"}
            </button>
            <a
              href="#contact"
              className="flex-1 sm:flex-none px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-bold rounded-xl transition-all shadow-md shadow-red-600/30 text-center"
            >
              Coach Review
            </a>
          </div>
        </div>

        {/* Days Accordion / Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {currentSplit.schedule.map((day, idx) => (
            <div
              key={idx}
              className="bg-neutral-900/80 border border-neutral-800/90 rounded-3xl p-6 hover:border-red-600/40 transition-all shadow-xl"
            >
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-neutral-800">
                <div>
                  <h4 className="font-extrabold text-base sm:text-lg text-white">{day.dayName}</h4>
                  <span className="text-xs text-red-400 font-semibold">{day.focus}</span>
                </div>
                <span className="w-8 h-8 rounded-full bg-neutral-800 text-neutral-300 flex items-center justify-center font-mono text-xs font-bold">
                  #{idx + 1}
                </span>
              </div>

              <div className="space-y-3">
                {day.exercises.map((ex, exIdx) => (
                  <div
                    key={exIdx}
                    className="p-3 rounded-xl bg-neutral-950/70 border border-neutral-800/60 flex items-center justify-between gap-3 text-xs sm:text-sm"
                  >
                    <div>
                      <div className="font-bold text-white">{ex.name}</div>
                      <div className="text-[11px] text-neutral-400 mt-0.5">{ex.notes}</div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-mono font-bold text-red-400 block">{ex.sets} × {ex.reps}</span>
                      <span className="text-[10px] text-neutral-500 font-mono">Rest: {ex.rest}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
