export interface MerchItem {
  id: string;
  name: string;
  category: "apparel" | "gear" | "supplements";
  categoryLabel: string;
  pricePKR: number;
  inStock: boolean;
  tag?: string;
  description: string;
  specs: string[];
}

export const merchData: MerchItem[] = [
  {
    id: "pump-cover-tee",
    name: "PFZ Heavyweight Oversized Pump Cover",
    category: "apparel",
    categoryLabel: "Apparel",
    pricePKR: 3200,
    inStock: true,
    tag: "Best Seller",
    description: "260 GSM combed cotton oversized drop-shoulder tee engineered for hard training and gym aesthetics.",
    specs: ["260 GSM 100% Ring-spun Cotton", "High-density chest print", "Pre-shrunk breathable fabric"],
  },
  {
    id: "leather-lever-belt",
    name: "PFZ Competition Leather Lever Belt (10mm)",
    category: "gear",
    categoryLabel: "Lifting Gear",
    pricePKR: 8500,
    inStock: true,
    tag: "Pro Gear",
    description: "Heavy-duty genuine cowhide leather with matte black stainless steel quick-release lever mechanism.",
    specs: ["10mm Uniform Thickness", "Heavy-duty alloy lever", "IPF Competition spec compliant"],
  },
  {
    id: "whey-isolate",
    name: "PFZ Elite 100% Pure Whey Isolate (2kg)",
    category: "supplements",
    categoryLabel: "Nutrition",
    pricePKR: 14500,
    inStock: true,
    tag: "Lab Tested",
    description: "Ultra-filtered cross-flow microfiltered whey isolate delivering 27g protein and 0g sugar per scoop.",
    specs: ["27g Protein per scoop", "Zero Added Sugar & Low Lactose", "Imported raw ingredients"],
  },
  {
    id: "creatine-monohydrate",
    name: "PFZ Micronized Creatine Monohydrate (300g)",
    category: "supplements",
    categoryLabel: "Nutrition",
    pricePKR: 4800,
    inStock: true,
    tag: "Essential",
    description: "200-mesh micronized creatine monohydrate for rapid cellular ATP regeneration, strength, and power.",
    specs: ["5g Pure Creatine per serving", "Unflavored & ultra-soluble", "60 full servings per tub"],
  },
  {
    id: "pre-workout-ignite",
    name: "PFZ Ignite High-Stim Pre-Workout (30 Servings)",
    category: "supplements",
    categoryLabel: "Nutrition",
    pricePKR: 6200,
    inStock: true,
    tag: "Extreme Energy",
    description: "Formulated with 6,000mg L-Citrulline Malate, 3,200mg Beta-Alanine, and 300mg Caffeine Anhydrous.",
    specs: ["Laser focus & skin-splitting pumps", "Sour Green Apple flavor", "Zero crash formula"],
  },
  {
    id: "steel-shaker",
    name: "PFZ Insulated Stainless Steel Shaker (750ml)",
    category: "gear",
    categoryLabel: "Gear",
    pricePKR: 2400,
    inStock: true,
    description: "Double-wall vacuum insulated shaker bottle keeps drinks icy cold for 24+ hours with zero odor retention.",
    specs: ["750ml volume with measurement marks", "Leak-proof flip cap", "BPA & toxin free"],
  },
];
