export interface MealItem {
  id: string;
  name: string;
  category: "pre_workout" | "post_workout" | "snack" | "ramadan_iftar" | "ramadan_sehri";
  goal: "bulk" | "cut" | "maintain";
  proteinG: number;
  carbsG: number;
  fatsG: number;
  calories: number;
  prepTimeMins: number;
  ingredients: string[];
  instructions: string;
  isDesiSpecial?: boolean;
}

export const MEALS_DATA: MealItem[] = [
  {
    id: "pre-1",
    name: "Desi Egg Whites & Oats Porridge with Banana",
    category: "pre_workout",
    goal: "bulk",
    proteinG: 32,
    carbsG: 65,
    fatsG: 10,
    calories: 480,
    prepTimeMins: 10,
    ingredients: ["6 Egg Whites + 1 Whole Egg", "80g Rolled Oats", "1 Medium Banana", "1 tbsp Peanut Butter", "Cinnamon & Honey"],
    instructions: "Boil or scramble eggs with minimal olive oil. Cook oats in boiling water or milk, top with sliced banana and cinnamon. Consume 75 mins before lifting.",
    isDesiSpecial: true,
  },
  {
    id: "pre-2",
    name: "Black Qahwa + Khajoor (Dates) Energy Rush",
    category: "pre_workout",
    goal: "cut",
    proteinG: 4,
    carbsG: 35,
    fatsG: 0,
    calories: 160,
    prepTimeMins: 5,
    ingredients: ["2 Medjool / Ajwa Dates", "1 Mug Fresh Strong Black Coffee / Peshawari Qahwa", "Pinch of Himalayan Pink Salt"],
    instructions: "Eat dates and sip warm black coffee 30 mins prior to gym for intense natural blood flow, electrolyte balance, and caffeine surge.",
    isDesiSpecial: true,
  },
  {
    id: "post-1",
    name: "Charcoal Grilled Chicken Boti & Steamed Brown Rice",
    category: "post_workout",
    goal: "bulk",
    proteinG: 48,
    carbsG: 55,
    fatsG: 8,
    calories: 490,
    prepTimeMins: 20,
    ingredients: ["200g Lean Chicken Breast marinated in lemon, ginger-garlic & spices", "150g Cooked Brown Rice", "Cucumber & Tomato Salad", "Low-fat Mint Raita"],
    instructions: "Air-fry or grill chicken breast strips. Serve hot with warm brown rice and cucumber salad for immediate amino acid delivery and glycogen replenishment.",
    isDesiSpecial: true,
  },
  {
    id: "post-2",
    name: "Whey Isolate + High-Protein Dahi & Berries",
    category: "post_workout",
    goal: "cut",
    proteinG: 42,
    carbsG: 18,
    fatsG: 4,
    calories: 275,
    prepTimeMins: 3,
    ingredients: ["1 Scoop Whey Isolate (Chocolate or Vanilla)", "150g Low Fat Thick Yogurt / Dahi", "Handful of Pomegranate seeds / Berries"],
    instructions: "Whisk whey protein powder directly into chilled thick yogurt until creamy. Top with fresh berries for high-antioxidant fast muscle repair.",
  },
  {
    id: "ramadan-1",
    name: "Ramadan Fasting Iftar: Chana Chaat & Grilled Beef Seekh",
    category: "ramadan_iftar",
    goal: "maintain",
    proteinG: 45,
    carbsG: 60,
    fatsG: 12,
    calories: 530,
    prepTimeMins: 15,
    ingredients: ["150g Boiled Chickpeas (Safaid Chana)", "2 Lean Grilled Beef / Chicken Seekh Kebabs", "Chopped Onions, Tomatoes, Coriander, Chaat Masala", "Lemon Juice"],
    instructions: "Break fast with water & 1 date. Eat high-protein chana chaat paired with lean grilled kebabs. Wait 45 mins before evening workout.",
    isDesiSpecial: true,
  },
  {
    id: "ramadan-2",
    name: "Ramadan Sehri: Slow-Release Paneer & Wholewheat Roti",
    category: "ramadan_sehri",
    goal: "maintain",
    proteinG: 38,
    carbsG: 50,
    fatsG: 14,
    calories: 480,
    prepTimeMins: 12,
    ingredients: ["150g Fresh Paneer or Egg White Omelet with veggies", "1 Wholewheat (Chakki Atta) Roti", "1 Glass Lassi / Coconut Water", "1 tbsp Chia Seeds soaked in water"],
    instructions: "Combine complex carbs with casein-rich paneer and chia seeds to provide sustained 14-hour amino acid release and avoid thirst during daytime fasting.",
    isDesiSpecial: true,
  },
];
