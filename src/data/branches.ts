export interface Branch {
  id: string;
  name: string;
  badge: string;
  city: string;
  address: string;
  phone: string;
  whatsapp: string;
  mapUrl: string;
  hours: {
    weekdays: string;
    sunday: string;
  };
  keyFeatures: string[];
  crowdLevels: {
    timeSlot: string;
    level: "Low" | "Moderate" | "Peak";
    percent: number;
  }[];
}

export const branchesData: Branch[] = [
  {
    id: "f8",
    name: "F-8 Markaz Flagship",
    badge: "Flagship HQ",
    city: "Islamabad",
    address: "Plot 14-B, Executive Heights, F-8 Markaz, Islamabad",
    phone: "+92 51 2854901",
    whatsapp: "+92 300 1234567",
    mapUrl: "https://maps.google.com/?q=F-8+Markaz+Islamabad",
    hours: {
      weekdays: "06:00 AM – 11:30 PM",
      sunday: "10:00 AM – 08:00 PM",
    },
    keyFeatures: [
      "12,000 sq.ft 3-Floor Complex",
      "Olympic Lifting Platforms & Eleiko Plates",
      "Cryotherapy & Recovery Sauna",
      "Dedicated Female Studio Suite",
      "Organic Protein Shake Bar",
    ],
    crowdLevels: [
      { timeSlot: "06:00 - 09:00 AM", level: "Moderate", percent: 45 },
      { timeSlot: "09:00 - 03:00 PM", level: "Low", percent: 25 },
      { timeSlot: "05:00 - 09:00 PM", level: "Peak", percent: 90 },
      { timeSlot: "09:00 - 11:30 PM", level: "Moderate", percent: 50 },
    ],
  },
  {
    id: "g8",
    name: "G-8 Community Center",
    badge: "Most Popular",
    city: "Islamabad",
    address: "Main Double Road, Near Ayub Market, G-8/1, Islamabad",
    phone: "+92 51 2289410",
    whatsapp: "+92 300 1234568",
    mapUrl: "https://maps.google.com/?q=G-8+Islamabad",
    hours: {
      weekdays: "06:00 AM – 11:00 PM",
      sunday: "10:00 AM – 07:00 PM",
    },
    keyFeatures: [
      "8,500 sq.ft Functional Training Zone",
      "Hammer Strength & LifeFitness Gear",
      "HIIT & Calisthenics Rig",
      "Shower & Steam Amenities",
    ],
    crowdLevels: [
      { timeSlot: "06:00 - 09:00 AM", level: "Moderate", percent: 40 },
      { timeSlot: "09:00 - 03:00 PM", level: "Low", percent: 20 },
      { timeSlot: "05:00 - 09:00 PM", level: "Peak", percent: 85 },
      { timeSlot: "09:00 - 11:00 PM", level: "Moderate", percent: 45 },
    ],
  },
  {
    id: "f10",
    name: "F-10 Premium Club",
    badge: "Newest Addition",
    city: "Islamabad",
    address: "Sumbal Road, Corner Avenue, F-10 Markaz, Islamabad",
    phone: "+92 51 2110933",
    whatsapp: "+92 300 1234569",
    mapUrl: "https://maps.google.com/?q=F-10+Markaz+Islamabad",
    hours: {
      weekdays: "06:00 AM – 12:00 AM",
      sunday: "10:00 AM – 09:00 PM",
    },
    keyFeatures: [
      "State-of-the-Art Technogym Line",
      "Indoor Sprint Turf Track",
      "Spacious Cardio Theater with View",
      "Complimentary Valet Parking",
    ],
    crowdLevels: [
      { timeSlot: "06:00 - 09:00 AM", level: "Moderate", percent: 35 },
      { timeSlot: "09:00 - 03:00 PM", level: "Low", percent: 20 },
      { timeSlot: "05:00 - 09:00 PM", level: "Peak", percent: 80 },
      { timeSlot: "09:00 - 12:00 AM", level: "Moderate", percent: 40 },
    ],
  },
];
