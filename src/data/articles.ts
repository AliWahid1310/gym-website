export interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: "Nutrition" | "Strength" | "Cardio" | "Recovery";
  readTime: string;
  date: string;
  author: {
    name: string;
    role: string;
  };
  content: string[];
  takeaways: string[];
}

export const articlesData: Article[] = [
  {
    id: "desi-diet-protein-guide",
    title: "How to Hit 150g+ Protein on a Pakistani Diet (Without Relying Just on Shakes)",
    excerpt: "A practical guide to optimizing local Pakistani meals for maximum lean muscle growth, budgeting, and satiety.",
    category: "Nutrition",
    readTime: "4 min read",
    date: "Aug 2026",
    author: {
      name: "Kamran Siddiqui",
      role: "Sports Nutrition Specialist",
    },
    takeaways: [
      "250g Chicken Breast / Boneless Tikka = ~65g protein",
      "5 Whole Eggs + 2 Egg Whites = ~36g protein",
      "200g Greek Yogurt / Low-fat Dahi = ~18g protein",
      "100g Daal Chana / Boiled Chickpeas = ~15g protein",
    ],
    content: [
      "Hitting high protein targets while eating traditional Pakistani cuisine often feels tricky due to oil-heavy curries and high carb-to-protein ratios. However, with simple ingredient swaps, you can easily exceed 150g of clean protein per day.",
      "Focus on separating pure protein sources from curry gravies. Grilled chicken boti, steamed chicken mince (keema), boiled eggs, and cottage cheese (paneer) allow you to control calorie intake while maxing out essential amino acids.",
      "Pair high-protein meals with complex carbs like brown rice or whole-wheat chapati and fibrous salads (cucumber, tomatoes, lemon) for gut health and prolonged fullness.",
    ],
  },
  {
    id: "compound-lifts-guide",
    title: "The Big 5 Compound Lifts: The Foundation of Every Serious Physique",
    excerpt: "Why Squats, Deadlifts, Bench Press, Overhead Press, and Barbell Rows build more muscle than 20 isolation machines combined.",
    category: "Strength",
    readTime: "5 min read",
    date: "Aug 2026",
    author: {
      name: "Farhan Saeed",
      role: "Head Strength Coach",
    },
    takeaways: [
      "Compounds recruit multiple joint angles and hundreds of muscle fibers simultaneously",
      "Stimulate natural growth hormone and testosterone release",
      "Enable consistent progressive overload week over week",
    ],
    content: [
      "If you only have 45 minutes to train, compound multi-joint movements yield 80% of your muscle-building results. Moving heavy loads through full ranges of motion forces whole-body neuromuscular adaptation.",
      "Prioritize compound lifts at the start of your training sessions when your central nervous system is fresh. Keep rep ranges between 5 to 8 for strength and 8 to 12 for maximum hypertrophy.",
      "Always prioritize form over ego. At Power Fitness Zone, our trainers conduct mandatory barbell form checks to safeguard spine and shoulder joint integrity.",
    ],
  },
  {
    id: "fat-loss-cardio-vs-hiit",
    title: "Steady State Cardio vs HIIT: Which Burns More Body Fat?",
    excerpt: "Demystifying fat oxidation zones, EPOC calorie burn, and how to preserve hard-earned muscle while leaning out.",
    category: "Cardio",
    readTime: "3 min read",
    date: "Aug 2026",
    author: {
      name: "Ali Raza",
      role: "Elite Conditioning Trainer",
    },
    takeaways: [
      "Zone 2 Incline Walking burns a higher percentage of fat per calorie expended",
      "HIIT elevates metabolic rate (EPOC) for up to 14 hours post-workout",
      "Best approach: 2 HIIT sessions + 8,000 daily steps for optimal leanness",
    ],
    content: [
      "Excessive endurance running while in a calorie deficit can risk catabolic muscle loss. Instead, modern sports science favors low-impact incline treadmill walking combined with short, explosive sprint intervals.",
      "HIIT sessions on our curved treadmills or assault bikes for 15-20 minutes create an intense oxygen debt that keeps your body burning calories long after leaving the gym floor.",
    ],
  },
];
