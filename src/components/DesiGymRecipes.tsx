"use client";

import { useState } from "react";
import { Utensils, Flame, DollarSign, Clock, Check, ChefHat, X, Sparkles, Filter } from "lucide-react";

interface Recipe {
  id: string;
  title: string;
  category: "high-protein" | "cutting" | "bulking" | "budget" | "quick";
  categoryLabel: string;
  prepTime: string;
  calories: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  costPkr: number;
  imageIcon: string;
  description: string;
  ingredients: { item: string; amount: string }[];
  steps: string[];
}

const RECIPES: Recipe[] = [
  {
    id: "tandoori-tikka",
    title: "Air-Fried Tandoori Chicken Breast Bowl",
    category: "high-protein",
    categoryLabel: "High Protein / Cutting",
    prepTime: "20 Mins",
    calories: 390,
    proteinG: 48,
    carbsG: 18,
    fatG: 6,
    costPkr: 270,
    imageIcon: "🍗",
    description: "Juicy Pakistani spice marinated boneless chicken cubes with roasted cumin brown rice and fresh mint.",
    ingredients: [
      { item: "Boneless Skinless Chicken Breast", amount: "220g" },
      { item: "Low Fat Desi Dahi (Yogurt)", amount: "2 tbsp" },
      { item: "Shan / Homemade Tandoori Masala", amount: "1.5 tsp" },
      { item: "Ginger-Garlic Paste", amount: "1 tsp" },
      { item: "Lemon Juice & Olive Oil Spray", amount: "1 tbsp" },
      { item: "Boiled Basmati / Brown Rice", amount: "60g dry weight" },
    ],
    steps: [
      "Dice chicken into bite-sized cubes and create shallow diagonal slits.",
      "Mix yogurt, ginger-garlic paste, tandoori masala, and lemon juice into a smooth marinade.",
      "Coat chicken thoroughly and rest for 15 mins (or overnight in fridge).",
      "Air fry at 200°C for 14-16 minutes or sear on a non-stick cast-iron grill pan until charred edges form.",
      "Serve hot with steamed rice and cucumber slices.",
    ],
  },
  {
    id: "qeema-skillet",
    title: "Spicy Beef Mince & Sweet Potato Skillet",
    category: "bulking",
    categoryLabel: "Clean Bulking & Strength",
    prepTime: "25 Mins",
    calories: 490,
    proteinG: 52,
    carbsG: 42,
    fatG: 12,
    costPkr: 340,
    imageIcon: "🥩",
    description: "Lean Pakistani beef qeema sautéed with crushed coriander, sweet potato cubes, and green chilies.",
    ingredients: [
      { item: "Lean Minced Beef (90/10 Qeema)", amount: "220g" },
      { item: "Sweet Potato (Shakarkandi), diced", amount: "150g" },
      { item: "Chopped Onion & Tomatoes", amount: "1 medium" },
      { item: "Crushed Red Pepper & Garam Masala", amount: "1 tsp" },
      { item: "Desi Ghee / Olive Oil", amount: "1 tsp (5g)" },
    ],
    steps: [
      "Steam or microwave diced sweet potatoes for 4 mins until tender.",
      "Heat desi ghee in a pan, sauté onions until golden translucent.",
      "Add beef qeema, ginger garlic, tomatoes, and spices. Sauté on medium-high heat until water evaporates.",
      "Toss in cooked sweet potato cubes and toast for 3 minutes until crispy.",
      "Garnish with sliced green chilies and fresh coriander.",
    ],
  },
  {
    id: "egg-daal-khichdi",
    title: "High-Protein Moong Daal & Egg White Khichdi",
    category: "budget",
    categoryLabel: "Budget / High Fiber",
    prepTime: "15 Mins",
    calories: 410,
    proteinG: 36,
    carbsG: 48,
    fatG: 5,
    costPkr: 140,
    imageIcon: "🍲",
    description: "Budget powerhouse combining yellow moong lentils, 4 boiled egg whites, turmeric, and zeera tadka.",
    ingredients: [
      { item: "Yellow Moong Daal", amount: "60g dry" },
      { item: "Basmati Rice", amount: "30g dry" },
      { item: "Farm Fresh Egg Whites (Boiled)", amount: "4 large whites + 1 yolk" },
      { item: "Turmeric & Himalayan Pink Salt", amount: "1/2 tsp each" },
      { item: "Cumin Seeds (Zeera) & Desi Ghee", amount: "1/2 tsp ghee for aroma" },
    ],
    steps: [
      "Rinse and boil moong daal with rice, turmeric, and salt until soft and porridge-like (12 mins).",
      "Dice boiled egg whites and stir directly into warm khichdi.",
      "Perform a micro-tadka with 1/2 tsp ghee and zeera in a small ladle, pour over top.",
      "Serve with 2 tbsp plain homemade yogurt for probiotic digestion.",
    ],
  },
  {
    id: "chana-salad",
    title: "Islamabad Black Chana & Paneer Power Chaat",
    category: "quick",
    categoryLabel: "Quick 10-Min Prep",
    prepTime: "10 Mins",
    calories: 320,
    proteinG: 28,
    carbsG: 38,
    fatG: 6,
    costPkr: 120,
    imageIcon: "🥗",
    description: "Refreshing pre-workout or afternoon snack packed with slow-digesting complex carbs and desi protein.",
    ingredients: [
      { item: "Boiled Kala Chana (Black Chickpeas)", amount: "150g cooked" },
      { item: "Low-Fat Desi Paneer / Cottage Cheese", amount: "60g diced" },
      { item: "Diced Cucumber, Tomato & Red Onion", amount: "1 cup" },
      { item: "Chaat Masala & Lemon Squeeze", amount: "1 tsp" },
      { item: "Fresh Mint Leaves", amount: "Handful" },
    ],
    steps: [
      "In a large bowl, combine chilled boiled chickpeas with diced veggies.",
      "Toss in light paneer cubes gently.",
      "Sprinkle chaat masala, squeeze half a fresh lemon, and mix well.",
      "Enjoy immediately as a high-satiety snack.",
    ],
  },
  {
    id: "whey-desi-halwa",
    title: "Post-Workout Oats & Whey Desi Sheera/Halwa",
    category: "high-protein",
    categoryLabel: "High Protein Dessert",
    prepTime: "8 Mins",
    calories: 380,
    proteinG: 38,
    carbsG: 44,
    fatG: 6,
    costPkr: 210,
    imageIcon: "🥣",
    description: "Satisfies desi sweet tooth cravings while delivering fast-acting whey protein and glycogen reload.",
    ingredients: [
      { item: "Rolled Oats / Sooji", amount: "50g" },
      { item: "Whey Protein Isolate (Vanilla or Chocolate)", amount: "1 scoop (30g)" },
      { item: "Skim Milk or Water", amount: "200ml" },
      { item: "Cardamom (Ilaichi) powder & Cinnamon", amount: "1/4 tsp" },
      { item: "Crushed Almonds (Badam)", amount: "5 pieces (8g)" },
    ],
    steps: [
      "Dry toast rolled oats or sooji in a non-stick saucepan for 2 mins with cardamom until fragrant.",
      "Add milk and simmer on low flame until thick porridge forms (3-4 mins).",
      "Turn OFF heat completely (crucial so whey doesn't clump).",
      "Stir in 1 scoop of whey protein powder until smooth and creamy.",
      "Top with crushed almonds and enjoy warm.",
    ],
  },
];

export default function DesiGymRecipes() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeRecipe, setActiveRecipe] = useState<Recipe | null>(null);
  const [portions, setPortions] = useState<number>(1);

  const filteredRecipes = selectedCategory === "all"
    ? RECIPES
    : RECIPES.filter((r) => r.category === selectedCategory);

  return (
    <section id="desi-recipes" className="py-20 bg-black text-white relative border-t border-zinc-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Utensils className="w-4 h-4 text-emerald-400" />
            Pakistani Bodybuilding Fuel
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
            Desi High-Protein <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Kitchen & Recipes</span>
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg">
            Delicious, cost-effective Pakistani meals designed to hit your daily protein targets without tasteless boiled food.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { id: "all", label: "All Recipes" },
            { id: "high-protein", label: "🔥 High Protein" },
            { id: "cutting", label: "✂️ Cutting" },
            { id: "bulking", label: "💪 Bulking" },
            { id: "budget", label: "💰 Budget Friendly" },
            { id: "quick", label: "⚡ Under 15 Mins" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
                selectedCategory === cat.id
                  ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 scale-105 border border-emerald-500"
                  : "bg-zinc-900/80 text-zinc-400 hover:text-white border border-zinc-800"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Recipe Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 flex flex-col justify-between hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-950/20 transition group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl p-2.5 bg-zinc-950 rounded-xl border border-zinc-800 group-hover:scale-110 transition">
                    {recipe.imageIcon}
                  </span>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-800/40">
                    {recipe.categoryLabel}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-300 transition">
                  {recipe.title}
                </h3>
                <p className="text-xs text-zinc-400 line-clamp-2 mb-4 leading-relaxed">
                  {recipe.description}
                </p>

                {/* Macro summary pills */}
                <div className="grid grid-cols-4 gap-1.5 py-3 bg-zinc-950/80 rounded-xl border border-zinc-800/60 mb-4 text-center">
                  <div>
                    <span className="text-[10px] text-zinc-500 block uppercase">Calories</span>
                    <span className="text-xs font-bold text-white">{recipe.calories}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-emerald-400 block uppercase font-bold">Protein</span>
                    <span className="text-xs font-bold text-emerald-400">{recipe.proteinG}g</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-500 block uppercase">Carbs</span>
                    <span className="text-xs font-bold text-zinc-300">{recipe.carbsG}g</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-500 block uppercase">Fat</span>
                    <span className="text-xs font-bold text-zinc-300">{recipe.fatG}g</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs text-zinc-400 pt-3 border-t border-zinc-800/80 mb-4">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-zinc-500" />
                    {recipe.prepTime}
                  </span>
                  <span className="text-emerald-400 font-bold font-mono">
                    ~Rs. {recipe.costPkr} / meal
                  </span>
                </div>

                <button
                  onClick={() => {
                    setActiveRecipe(recipe);
                    setPortions(1);
                  }}
                  className="w-full py-2.5 rounded-xl bg-zinc-800 hover:bg-emerald-600 text-white font-semibold text-xs transition flex items-center justify-center gap-2 group-hover:bg-emerald-600"
                >
                  <ChefHat className="w-4 h-4" />
                  View Recipe & Cook Prep
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Cooking Modal */}
        {activeRecipe && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
            <div className="bg-zinc-900 border border-zinc-700 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl">
              <button
                onClick={() => setActiveRecipe(null)}
                className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white rounded-lg bg-zinc-800 hover:bg-zinc-700 transition"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">{activeRecipe.imageIcon}</span>
                <div>
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                    {activeRecipe.categoryLabel}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    {activeRecipe.title}
                  </h3>
                </div>
              </div>

              {/* Portion Scaler Selector */}
              <div className="flex items-center justify-between bg-zinc-950 p-3 rounded-xl border border-zinc-800 mb-6">
                <span className="text-xs font-semibold text-zinc-300">Portion Scaler:</span>
                <div className="flex gap-2">
                  {[1, 2, 4].map((p) => (
                    <button
                      key={p}
                      onClick={() => setPortions(p)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                        portions === p
                          ? "bg-emerald-600 text-white"
                          : "bg-zinc-800 text-zinc-400 hover:text-white"
                      }`}
                    >
                      {p} {p === 1 ? "Serving" : "Servings (Bulk)"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Scaled Macros */}
              <div className="grid grid-cols-4 gap-2 mb-6 bg-emerald-950/20 border border-emerald-900/40 p-4 rounded-xl text-center">
                <div>
                  <span className="text-[10px] text-zinc-400 uppercase">Total Calories</span>
                  <p className="text-lg font-black text-white">{activeRecipe.calories * portions} kcal</p>
                </div>
                <div>
                  <span className="text-[10px] text-emerald-400 uppercase font-bold">Protein</span>
                  <p className="text-lg font-black text-emerald-400">{activeRecipe.proteinG * portions}g</p>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-400 uppercase">Carbohydrates</span>
                  <p className="text-lg font-black text-zinc-200">{activeRecipe.carbsG * portions}g</p>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-400 uppercase">Est. Cost</span>
                  <p className="text-lg font-black text-emerald-300">Rs. {activeRecipe.costPkr * portions}</p>
                </div>
              </div>

              {/* Ingredients */}
              <div className="mb-6">
                <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  Ingredients Required ({portions} {portions === 1 ? "serving" : "servings"})
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeRecipe.ingredients.map((ing, i) => (
                    <div key={i} className="flex items-center justify-between p-2.5 bg-zinc-950 rounded-lg border border-zinc-800/80 text-xs">
                      <span className="text-zinc-300 font-medium">{ing.item}</span>
                      <span className="text-emerald-400 font-mono font-semibold ml-2">{ing.amount}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cooking Steps */}
              <div>
                <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                  <ChefHat className="w-4 h-4 text-emerald-400" />
                  Step-by-Step Cooking Guide
                </h4>
                <ol className="space-y-2.5 text-xs text-zinc-300 leading-relaxed">
                  {activeRecipe.steps.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-3 p-3 bg-zinc-950/60 rounded-xl border border-zinc-800/60">
                      <span className="w-5 h-5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800/50 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
