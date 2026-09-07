export interface Program {
  id: string;
  name: string;
  description: string;
  image: string;
  slug: string;
  duration: string;
  intensity: 'High' | 'Medium' | 'All Levels';
  category: string;
  caloriesBurn: string;
  frequency: string;
  targetFocus: string;
  features: string[];
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
    caloriesBurn: "450-600 kcal",
    frequency: "4-5 Days / Week",
    targetFocus: "Hypertrophy & Max Power",
    features: [
      "Olympic Barbell & Trap Bar Stations",
      "Progressive overload periodization",
      "Power rack & bumper plate access",
      "1-on-1 form checks with master coaches"
    ]
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
    caloriesBurn: "500-750 kcal",
    frequency: "3-4 Days / Week",
    targetFocus: "Cardiovascular Endurance & Fat Loss",
    features: [
      "Heart rate zone tracking monitors",
      "SkiErg, Assault Bikes & Kettlebells",
      "High-energy coach playlist & timing",
      "Metabolic conditioning intervals"
    ]
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
    caloriesBurn: "400-650 kcal",
    frequency: "Customizable",
    targetFocus: "Bespoke Physique & Health Goals",
    features: [
      "InBody 570 body composition analysis",
      "Personalized macro & meal nutrition plan",
      "Weekly posture & strength milestone check",
      "Exclusive private trainer floor access"
    ]
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
    caloriesBurn: "600-800 kcal",
    frequency: "3-4 Days / Week",
    targetFocus: "Agility, Reflexes & Core Power",
    features: [
      "Heavy bag and speed bag stations",
      "Pad work with national level boxers",
      "Footwork agility ladder drills",
      "Full upper body rotation & conditioning"
    ]
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
    caloriesBurn: "200-350 kcal",
    frequency: "2-3 Days / Week",
    targetFocus: "Mobility, Spine Decompression & Flow",
    features: [
      "Vinyasa & Yin mobility sessions",
      "Infrared sauna recovery integration",
      "Guided breathwork (Pranayama)",
      "Joint stability and flexibility routines"
    ]
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
    caloriesBurn: "450-650 kcal",
    frequency: "3-5 Days / Week",
    targetFocus: "Kinetic Chain & Functional Stamina",
    features: [
      "Sled pushes & battle ropes",
      "Plyometric jump boxes & medicine balls",
      "Core rotational stability workouts",
      "Multi-planar athletic conditioning"
    ]
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
    caloriesBurn: "400-550 kcal",
    frequency: "3-4 Days / Week",
    targetFocus: "Relative Strength & Core Mastery",
    features: [
      "Gymnastic rings & parallel bars",
      "Planche & front lever progression ladders",
      "Handstand balance conditioning",
      "Weighted pull-up and dip belts"
    ]
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
    caloriesBurn: "550-750 kcal",
    frequency: "3-4 Days / Week",
    targetFocus: "Lower Body Power & VO2 Max",
    features: [
      "Magnetic resistance studio bikes",
      "Dynamic immersive studio lighting",
      "Sprint hill climb simulations",
      "Real-time power wattage metrics"
    ]
  },
];
