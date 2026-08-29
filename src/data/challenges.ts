export interface GymChallenge {
  id: string;
  title: string;
  badge: string;
  category: "consistency" | "strength" | "endurance" | "transformation";
  goalTarget: number;
  unit: string;
  durationDays: number;
  reward: string;
  participantsCount: number;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Elite";
}

export const GYM_CHALLENGES: GymChallenge[] = [
  {
    id: "consistency-30",
    title: "30-Day Iron Consistency",
    badge: "🔥",
    category: "consistency",
    goalTarget: 20,
    unit: "Gym Sessions",
    durationDays: 30,
    reward: "Exclusive PFZ Pro Shaker + 1 Free Guest Pass",
    participantsCount: 142,
    description: "Check into any Power Fitness Zone branch at least 20 times within 30 days. Prove your discipline and form lifelong lifting habits.",
    difficulty: "Beginner",
  },
  {
    id: "century-bench",
    title: "Century Club (100kg Bench Press)",
    badge: "🏋️‍♂️",
    category: "strength",
    goalTarget: 100,
    unit: "kg 1RM Bench",
    durationDays: 60,
    reward: "Official 'Century Club 100KG' Embroidered Gym Hoodie",
    participantsCount: 88,
    description: "Hit a verified 100kg flat barbell bench press with pause and full lockout verified by a PFZ Head Coach.",
    difficulty: "Elite",
  },
  {
    id: "cardio-100km",
    title: "100km Cardio Assault",
    badge: "⚡",
    category: "endurance",
    goalTarget: 100,
    unit: "km Distance",
    durationDays: 30,
    reward: "1 Free Month of Hydro-Massage & Sauna Access",
    participantsCount: 65,
    description: "Accumulate 100 kilometers across PFZ curved treadmills, Concept2 rowers, and assault air bikes in one calendar month.",
    difficulty: "Intermediate",
  },
  {
    id: "early-bird",
    title: "6:00 AM Dawn Warriors",
    badge: "🌅",
    category: "consistency",
    goalTarget: 12,
    unit: "Morning Check-ins",
    durationDays: 30,
    reward: "Free Premium Coffee / Espresso Bar Tab for 1 Month",
    participantsCount: 94,
    description: "Conquer the morning before the world wakes up. Clock in before 7:00 AM for 12 sessions in a single month.",
    difficulty: "Intermediate",
  },
  {
    id: "body-recomp",
    title: "8-Week Body Recomp Sprint",
    badge: "🏆",
    category: "transformation",
    goalTarget: 4,
    unit: "kg Fat Loss / Muscle Gain",
    durationDays: 56,
    reward: "PKR 50,000 Cash Prize + Lifetime Hall of Fame Feature",
    participantsCount: 210,
    description: "Comprehensive 8-week body transformation tracked on our InBody 770 composition scanner with weekly trainer check-ins.",
    difficulty: "Elite",
  },
  {
    id: "pullup-master",
    title: "500 Pull-Ups Mastery",
    badge: "🦅",
    category: "strength",
    goalTarget: 500,
    unit: "Strict Pull-Ups",
    durationDays: 30,
    reward: "PFZ Heavy Duty Lifting Straps & Dip Belt",
    participantsCount: 118,
    description: "Accumulate 500 strict dead-hang pull-ups over the course of the month to build legendary lat and back strength.",
    difficulty: "Intermediate",
  },
];
