export interface PricingTier {
  id: string;
  name: string;
  monthlyPrice: number;
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
    annualPrice: 76000,
    description: "Everything you need to get moving.",
    features: [
      "Full gym floor access",
      "Locker room & showers",
      "2 group classes per week",
      "Basic fitness assessment",
      "Mobile app access",
    ],
    highlighted: false,
    cta: "Get Started",
  },
  {
    id: "pro",
    name: "Pro",
    monthlyPrice: 15000,
    annualPrice: 144000,
    description: "For those who train with purpose.",
    features: [
      "Unlimited gym floor access",
      "Unlimited group classes",
      "1 personal training session/month",
      "Quarterly body composition analysis",
      "Nutrition consultation",
      "Guest pass (1/month)",
      "Priority class booking",
    ],
    highlighted: true,
    badge: "Most Popular",
    cta: "Join Pro",
  },
  {
    id: "elite",
    name: "Elite",
    monthlyPrice: 25000,
    annualPrice: 240000,
    description: "The ultimate training experience.",
    features: [
      "Everything in Pro",
      "4 personal training sessions/month",
      "Custom meal plan by nutritionist",
      "Recovery suite access (sauna, ice bath)",
      "Monthly sports massage",
      "VIP locker",
      "Unlimited guest passes",
      "Early access to events & workshops",
    ],
    highlighted: false,
    cta: "Go Elite",
  },
];

export function formatPKR(amount: number): string {
  return `PKR ${amount.toLocaleString("en-PK")}`;
}
