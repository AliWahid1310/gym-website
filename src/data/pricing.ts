export interface PricingTier {
  id: string;
  name: string;
  monthlyPrice: number;
  quarterlyPrice: number;
  annualPrice: number;
  description: string;
  features: string[];
  highlighted: boolean;
  badge?: string;
  cta: string;
}

export const pricingTiers: PricingTier[] = [
  {
    id: "starter",
    name: "Starter",
    monthlyPrice: 8000,
    quarterlyPrice: 21600, // 10% off
    annualPrice: 72000,   // 25% off (6000/mo)
    description: "Everything you need to kickstart your fitness.",
    features: [
      "Full gym floor & cardio access",
      "Locker room & power showers",
      "2 group fitness classes / week",
      "Initial fitness assessment",
      "Mobile gym companion access",
    ],
    highlighted: false,
    cta: "Get Started",
  },
  {
    id: "pro",
    name: "Pro",
    monthlyPrice: 15000,
    quarterlyPrice: 40500, // 10% off
    annualPrice: 135000,  // 25% off (11250/mo)
    description: "For serious lifters and athletes seeking progress.",
    features: [
      "All-branch gym floor access",
      "Unlimited group & HIIT classes",
      "1 personal training session / month",
      "Monthly InBody composition analysis",
      "Customized sports nutrition plan",
      "1 VIP guest pass / month",
      "Priority class & equipment booking",
    ],
    highlighted: true,
    badge: "Most Popular",
    cta: "Join Pro",
  },
  {
    id: "elite",
    name: "Elite VIP",
    monthlyPrice: 25000,
    quarterlyPrice: 67500, // 10% off
    annualPrice: 225000,  // 25% off (18750/mo)
    description: "The ultimate white-glove training & recovery experience.",
    features: [
      "Everything in Pro Tier",
      "4 dedicated PT sessions / month",
      "Dedicated senior nutritionist coaching",
      "Sauna, steam & cold plunge access",
      "Monthly deep tissue recovery session",
      "Permanent reserved VIP locker",
      "Unlimited guest passes",
      "Complimentary shake per workout",
    ],
    highlighted: false,
    cta: "Go Elite VIP",
  },
];

export interface FeatureComparison {
  name: string;
  category: string;
  starter: boolean | string;
  pro: boolean | string;
  elite: boolean | string;
}

export const comparisonFeatures: FeatureComparison[] = [
  { name: "Gym Floor & Free Weights Access", category: "Access", starter: "Single Branch", pro: "All 3 Branches", elite: "All 3 Branches (Priority)" },
  { name: "Locker & Power Showers", category: "Access", starter: true, pro: true, elite: "VIP Reserved Locker" },
  { name: "Group Fitness Classes", category: "Classes", starter: "2 / week", pro: "Unlimited", elite: "Unlimited + Front Row" },
  { name: "InBody Composition Scans", category: "Assessment", starter: "1x Initial", pro: "Monthly", elite: "Bi-Weekly + Dietitian Review" },
  { name: "Personal Training Sessions", category: "Coaching", starter: false, pro: "1 / month", elite: "4 / month (1x weekly)" },
  { name: "Customized Nutrition Macro Plan", category: "Nutrition", starter: false, pro: true, elite: "Weekly Diet Adjustments" },
  { name: "Sauna, Steam & Cryotherapy", category: "Recovery", starter: false, pro: "Add-on Discount", elite: "Unlimited Access" },
  { name: "Monthly Guest Passes", category: "Perks", starter: false, pro: "1 Pass / Month", elite: "Unlimited" },
];

export function formatPKR(amount: number): string {
  return `PKR ${amount.toLocaleString("en-PK")}`;
}
