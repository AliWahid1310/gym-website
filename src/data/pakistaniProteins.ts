export interface PakistaniProteinSource {
  id: string;
  name: string;
  urduName: string;
  category: "Poultry" | "Dairy" | "Meat" | "Legumes" | "Supplements" | "Seafood";
  servingSize: string;
  proteinPerServing: number; // in grams
  typicalPricePkr: number;
  unit: string;
  proteinPerPkr: number; // grams of protein per 100 PKR
  costPerGramProteinPkr: number; // PKR per 1g of protein
  bioavailabilityScore: string; // PDCAAS / DIAAS rating
  dietaryNote: string;
}

export const PAKISTANI_PROTEIN_SOURCES: PakistaniProteinSource[] = [
  {
    id: "chicken-breast",
    name: "Boneless Chicken Breast",
    urduName: "چکن بون لیس",
    category: "Poultry",
    servingSize: "1 kg (Raw)",
    proteinPerServing: 310,
    typicalPricePkr: 950,
    unit: "1 kg",
    proteinPerPkr: 32.6,
    costPerGramProteinPkr: 3.06,
    bioavailabilityScore: "1.00 (High DIAAS)",
    dietaryNote: "The bodybuilding gold standard. Ultra lean, zero carbs, easiest to meal prep in Islamabad & Rawalpindi.",
  },
  {
    id: "daal-chana",
    name: "Daal Chana / Split Chickpeas",
    urduName: "دال چنا",
    category: "Legumes",
    servingSize: "1 kg (Dry)",
    proteinPerServing: 200,
    typicalPricePkr: 320,
    unit: "1 kg",
    proteinPerPkr: 62.5,
    costPerGramProteinPkr: 1.6,
    bioavailabilityScore: "0.78 (Plant Blend)",
    dietaryNote: "Most budget-friendly local source. Combine with rice or roti for a complete amino acid profile.",
  },
  {
    id: "farm-eggs",
    name: "Farm Fresh Eggs (1 Dozen)",
    urduName: "فارمی انڈے",
    category: "Poultry",
    servingSize: "12 Large Eggs",
    proteinPerServing: 72,
    typicalPricePkr: 330,
    unit: "1 Dozen",
    proteinPerPkr: 21.8,
    costPerGramProteinPkr: 4.58,
    bioavailabilityScore: "1.00 (Standard Reference)",
    dietaryNote: "Highest biological value protein. 6g protein per egg with healthy fats and choline.",
  },
  {
    id: "beef-qeema",
    name: "Lean Beef Mince (Qeema)",
    urduName: "گائے کا قیمہ",
    category: "Meat",
    servingSize: "1 kg (Lean Cut)",
    proteinPerServing: 260,
    typicalPricePkr: 1100,
    unit: "1 kg",
    proteinPerPkr: 23.6,
    costPerGramProteinPkr: 4.23,
    bioavailabilityScore: "0.92 (Rich in Iron & Zinc)",
    dietaryNote: "Packed with natural creatine, vitamin B12, and bioavailable heme iron for heavy lifters.",
  },
  {
    id: "rohu-fish",
    name: "Fresh River Fish (Rohu / Thela)",
    urduName: "روہو مچھلی",
    category: "Seafood",
    servingSize: "1 kg (Cleaned)",
    proteinPerServing: 180,
    typicalPricePkr: 680,
    unit: "1 kg",
    proteinPerPkr: 26.5,
    costPerGramProteinPkr: 3.77,
    bioavailabilityScore: "0.96 (Omega-3 Rich)",
    dietaryNote: "High in lean protein and anti-inflammatory omega-3 fatty acids for joint and heart health.",
  },
  {
    id: "fresh-paneer",
    name: "Desi Buffalo Paneer",
    urduName: "دیسی پنیر",
    category: "Dairy",
    servingSize: "1 kg",
    proteinPerServing: 180,
    typicalPricePkr: 980,
    unit: "1 kg",
    proteinPerPkr: 18.4,
    costPerGramProteinPkr: 5.44,
    bioavailabilityScore: "0.95 (Slow Digesting Casein)",
    dietaryNote: "Ideal slow-digesting bedtime protein source to sustain night muscle protein synthesis.",
  },
  {
    id: "whey-isolate",
    name: "Imported Whey Protein Powder",
    urduName: "وہے پروٹین پاؤڈر",
    category: "Supplements",
    servingSize: "1 Scoop (30g)",
    proteinPerServing: 25,
    typicalPricePkr: 340,
    unit: "Per Scoop (~22k/2kg)",
    proteinPerPkr: 7.35,
    costPerGramProteinPkr: 13.6,
    bioavailabilityScore: "1.15 (Fastest Absorption)",
    dietaryNote: "Maximum convenience and rapid leucine surge post-workout, but higher cost due to currency import.",
  },
  {
    id: "buffalo-milk",
    name: "Fresh Whole Buffalo Milk",
    urduName: "بھینس کا تازہ دودھ",
    category: "Dairy",
    servingSize: "1 Liter",
    proteinPerServing: 36,
    typicalPricePkr: 220,
    unit: "1 Liter",
    proteinPerPkr: 16.4,
    costPerGramProteinPkr: 6.11,
    bioavailabilityScore: "1.00 (Casein + Whey blend)",
    dietaryNote: "Excellent caloric density for hardgainers and young athletes bulking up on strength.",
  },
];
