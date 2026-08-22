export interface Program {
  id: string;
  name: string;
  description: string;
  image: string;
  slug: string;
  duration: string;
  intensity: 'High' | 'Medium' | 'All Levels';
  category: string;
}

export const programs: Program[] = [
  {
    id: "strength",
    name: "Strength Training",
    description:
      "Build raw power with periodized programs designed by certified strength coaches.",
    image: "/images/program-strength.jpg",
    slug: "strength-training",
    duration: "60 Mins",
    intensity: "High",
    category: "STRENGTH",
  },
  {
    id: "hiit",
    name: "Group HIIT",
    description:
      "High-intensity interval sessions that torch calories and build endurance in 45 minutes.",
    image: "/images/program-hiit.jpg",
    slug: "group-hiit",
    duration: "45 Mins",
    intensity: "High",
    category: "CARDIO",
  },
  {
    id: "personal",
    name: "Personal Training",
    description:
      "One-on-one coaching tailored to your goals — from fat loss to competition prep.",
    image: "/images/program-personal.jpg",
    slug: "personal-training",
    duration: "Custom",
    intensity: "All Levels",
    category: "1-ON-1",
  },
  {
    id: "boxing",
    name: "Boxing & Kickboxing",
    description:
      "Learn striking fundamentals while getting the most intense full-body workout of your life.",
    image: "/images/program-boxing.jpg",
    slug: "boxing-kickboxing",
    duration: "50 Mins",
    intensity: "High",
    category: "COMBAT",
  },
  {
    id: "yoga",
    name: "Yoga & Recovery",
    description:
      "Restore mobility, reduce injury risk, and build mental resilience through guided practice.",
    image: "/images/program-yoga.jpg",
    slug: "yoga-recovery",
    duration: "60 Mins",
    intensity: "Medium",
    category: "RECOVERY",
  },
  {
    id: "functional",
    name: "Functional Fitness",
    description:
      "Real-world movement patterns that make you stronger for life — not just the mirror.",
    image: "/images/program-functional.jpg",
    slug: "functional-fitness",
    duration: "50 Mins",
    intensity: "Medium",
    category: "ATHLETIC",
  },
  {
    id: "calisthenics",
    name: "Calisthenics & Bodyweight",
    description:
      "Master advanced bodyweight mechanics, ring work, muscle-ups, and core control for superhuman strength.",
    image: "/images/program-strength.jpg",
    slug: "calisthenics-bodyweight",
    duration: "55 Mins",
    intensity: "High",
    category: "BODYWEIGHT",
  },
  {
    id: "spin",
    name: "Spin & Cycle Sprint",
    description:
      "High-cadence rhythm cycling and interval climbs designed to supercharge lung capacity and endurance.",
    image: "/images/program-hiit.jpg",
    slug: "spin-cycle-sprint",
    duration: "45 Mins",
    intensity: "High",
    category: "ENDURANCE",
  },
];
