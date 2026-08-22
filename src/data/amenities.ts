export interface Amenity {
  id: string;
  icon: string;
  title: string;
  description: string;
  tag: string;
}

export const amenities: Amenity[] = [
  {
    id: "amenity-1",
    icon: "🔥",
    title: "Finnish Steam & Sauna",
    description: "Detoxify, soothe sore muscle tissue, and boost cardiovascular recovery post-workout in our temperature-controlled steam suites.",
    tag: "Recovery",
  },
  {
    id: "amenity-2",
    icon: "🥤",
    title: "Organic Fuel & Protein Bar",
    description: "Freshly blended whey protein shakes, BCAAs, cold-pressed green juices, and healthy pre-workout snacks on demand.",
    tag: "Nutrition",
  },
  {
    id: "amenity-3",
    icon: "🏋️",
    title: "Olympic Lifting Platforms",
    description: "Shock-absorbing hardwood & rubber platforms equipped with calibrated competition bumpers and Eleiko barbell sets.",
    tag: "Performance",
  },
  {
    id: "amenity-4",
    icon: "🔒",
    title: "Smart RFID Lockers & Showers",
    description: "Keyless high-security RFID lockers, hot rain showers, fresh complimentary towel service, and premium grooming stations.",
    tag: "Comfort",
  },
  {
    id: "amenity-5",
    icon: "🏃",
    title: "Cardio Cinema & Turf Track",
    description: "Immersive entertainment cardio zone alongside a 30-meter indoor sled and sprint agility sprint turf.",
    tag: "Endurance",
  },
  {
    id: "amenity-6",
    icon: "📶",
    title: "High-Speed Wi-Fi & Lounge",
    description: "Dedicated member workspace and lounge area with lightning-fast Wi-Fi to recharge or catch up on work between sessions.",
    tag: "Lifestyle",
  },
];
