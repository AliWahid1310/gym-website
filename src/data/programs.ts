export interface Program {
  id: string;
  name: string;
  description: string;
  image: string;
  slug: string;
}

export const programs: Program[] = [
  {
    id: "strength",
    name: "Strength Training",
    description:
      "Build raw power with periodized programs designed by certified strength coaches.",
    image: "/images/program-strength.jpg",
    slug: "strength-training",
  },
  {
    id: "hiit",
    name: "Group HIIT",
    description:
      "High-intensity interval sessions that torch calories and build endurance in 45 minutes.",
    image: "/images/program-hiit.jpg",
    slug: "group-hiit",
  },
  {
    id: "personal",
    name: "Personal Training",
    description:
      "One-on-one coaching tailored to your goals — from fat loss to competition prep.",
    image: "/images/program-personal.jpg",
    slug: "personal-training",
  },
  {
    id: "boxing",
    name: "Boxing & Kickboxing",
    description:
      "Learn striking fundamentals while getting the most intense full-body workout of your life.",
    image: "/images/program-boxing.jpg",
    slug: "boxing-kickboxing",
  },
  {
    id: "yoga",
    name: "Yoga & Recovery",
    description:
      "Restore mobility, reduce injury risk, and build mental resilience through guided practice.",
    image: "/images/program-yoga.jpg",
    slug: "yoga-recovery",
  },
  {
    id: "functional",
    name: "Functional Fitness",
    description:
      "Real-world movement patterns that make you stronger for life — not just the mirror.",
    image: "/images/program-functional.jpg",
    slug: "functional-fitness",
  },
];
