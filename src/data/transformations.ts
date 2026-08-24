export interface Transformation {
  id: string;
  name: string;
  age: number;
  profession: string;
  category: "fat-loss" | "muscle-gain" | "recomp";
  categoryLabel: string;
  duration: string;
  trainer: string;
  startingWeight: string;
  currentWeight: string;
  achievement: string;
  keyMetric: string;
  quote: string;
  program: string;
  highlights: string[];
}

export const transformationsData: Transformation[] = [
  {
    id: "t1",
    name: "Zainab Malik",
    age: 28,
    profession: "Software Engineer",
    category: "fat-loss",
    categoryLabel: "Fat Loss & Conditioning",
    duration: "16 Weeks",
    trainer: "Farhan Saeed",
    startingWeight: "84 kg",
    currentWeight: "66 kg",
    achievement: "-18 kg Body Weight",
    keyMetric: "-12% Body Fat",
    quote: "Power Fitness Zone changed my entire lifestyle. The structured HIIT workouts and personalized nutrition guidance helped me overcome years of sedentary desk-job weight gain.",
    program: "HIIT + Functional Circuit Training",
    highlights: ["Dropped 4 dress sizes", "Doubled cardio endurance", "Zero back pain from desk posture"],
  },
  {
    id: "t2",
    name: "Hamza Tariq",
    age: 24,
    profession: "University Student",
    category: "muscle-gain",
    categoryLabel: "Hypertrophy & Strength",
    duration: "24 Weeks",
    trainer: "Ali Raza",
    startingWeight: "61 kg",
    currentWeight: "74 kg",
    achievement: "+13 kg Lean Muscle",
    keyMetric: "+45 kg Squat PR",
    quote: "I was always underweight and struggled to gain mass. With Ali Raza's progressive overload protocol and calorie surplus plan, I transformed my physique completely.",
    program: "Hypertrophy Strength Protocol",
    highlights: ["Bench Press: 50kg → 95kg", "Deadlift: 70kg → 140kg", "Consistent 3,200 kcal surplus plan"],
  },
  {
    id: "t3",
    name: "Bilal Chaudhry",
    age: 36,
    profession: "Corporate Executive",
    category: "recomp",
    categoryLabel: "Body Recomposition",
    duration: "20 Weeks",
    trainer: "Kamran Siddiqui",
    startingWeight: "92 kg",
    currentWeight: "81 kg",
    achievement: "-11 kg Fat, +4 kg Muscle",
    keyMetric: "Visible 6-Pack Abs",
    quote: "Balancing 60-hour work weeks with fitness was tough until I joined Power Fitness Zone's executive morning training schedule. Incredible coaching and environment.",
    program: "Executive Conditioning & Strength",
    highlights: ["Waist size reduced from 38 to 32", "Resting heart rate down to 58 bpm", "Daily energy through the roof"],
  },
  {
    id: "t4",
    name: "Ayesha Noor",
    age: 31,
    profession: "Doctor / Surgeon",
    category: "fat-loss",
    categoryLabel: "Post-Pregnancy Recovery",
    duration: "18 Weeks",
    trainer: "Zoya Ahmed",
    startingWeight: "78 kg",
    currentWeight: "63 kg",
    achievement: "-15 kg Fat Loss",
    keyMetric: "Core Strength Restored",
    quote: "Coach Zoya designed a postpartum safe, high-energy strength routine. The private women-friendly studio hours gave me the comfort and focus I needed.",
    program: "Core Rebuild & Metabolic Burn",
    highlights: ["Full diastasis recti recovery", "10,000 steps + 4 gym sessions weekly", "Healthy, sustainable nutrition"],
  },
];
