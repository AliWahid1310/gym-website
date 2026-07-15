export interface ClassSession {
  id: string;
  time: string;
  name: string;
  instructor: string;
  instructorImage: string;
  duration: string;
  category: ClassCategory;
}

export type ClassCategory =
  | "all"
  | "strength"
  | "cardio"
  | "boxing"
  | "yoga";

export const categories: { id: ClassCategory; label: string }[] = [
  { id: "all", label: "All Classes" },
  { id: "strength", label: "Strength" },
  { id: "cardio", label: "Cardio" },
  { id: "boxing", label: "Boxing" },
  { id: "yoga", label: "Yoga" },
];

export const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

export type Day = (typeof days)[number];

export const schedule: Record<Day, ClassSession[]> = {
  Monday: [
    {
      id: "mon-1",
      time: "6:00 AM",
      name: "Power Lift",
      instructor: "Ahmed Khan",
      instructorImage: "/images/trainer-ahmed.jpg",
      duration: "60 min",
      category: "strength",
    },
    {
      id: "mon-2",
      time: "8:00 AM",
      name: "HIIT Burn",
      instructor: "Sara Ali",
      instructorImage: "/images/trainer-sara.jpg",
      duration: "45 min",
      category: "cardio",
    },
    {
      id: "mon-3",
      time: "10:00 AM",
      name: "Boxing Fundamentals",
      instructor: "Bilal Raza",
      instructorImage: "/images/trainer-bilal.jpg",
      duration: "60 min",
      category: "boxing",
    },
    {
      id: "mon-4",
      time: "5:00 PM",
      name: "Vinyasa Flow",
      instructor: "Nadia Hussain",
      instructorImage: "/images/trainer-nadia.jpg",
      duration: "60 min",
      category: "yoga",
    },
    {
      id: "mon-5",
      time: "7:00 PM",
      name: "Strength Circuit",
      instructor: "Omar Farooq",
      instructorImage: "/images/trainer-omar.jpg",
      duration: "50 min",
      category: "strength",
    },
  ],
  Tuesday: [
    {
      id: "tue-1",
      time: "6:00 AM",
      name: "Cardio Blast",
      instructor: "Sara Ali",
      instructorImage: "/images/trainer-sara.jpg",
      duration: "45 min",
      category: "cardio",
    },
    {
      id: "tue-2",
      time: "9:00 AM",
      name: "Kickboxing",
      instructor: "Bilal Raza",
      instructorImage: "/images/trainer-bilal.jpg",
      duration: "60 min",
      category: "boxing",
    },
    {
      id: "tue-3",
      time: "12:00 PM",
      name: "Power Yoga",
      instructor: "Nadia Hussain",
      instructorImage: "/images/trainer-nadia.jpg",
      duration: "60 min",
      category: "yoga",
    },
    {
      id: "tue-4",
      time: "6:00 PM",
      name: "Deadlift Workshop",
      instructor: "Ahmed Khan",
      instructorImage: "/images/trainer-ahmed.jpg",
      duration: "75 min",
      category: "strength",
    },
  ],
  Wednesday: [
    {
      id: "wed-1",
      time: "6:00 AM",
      name: "HIIT Burn",
      instructor: "Sara Ali",
      instructorImage: "/images/trainer-sara.jpg",
      duration: "45 min",
      category: "cardio",
    },
    {
      id: "wed-2",
      time: "8:00 AM",
      name: "Olympic Lifting",
      instructor: "Ahmed Khan",
      instructorImage: "/images/trainer-ahmed.jpg",
      duration: "60 min",
      category: "strength",
    },
    {
      id: "wed-3",
      time: "4:00 PM",
      name: "Boxing Sparring",
      instructor: "Bilal Raza",
      instructorImage: "/images/trainer-bilal.jpg",
      duration: "60 min",
      category: "boxing",
    },
    {
      id: "wed-4",
      time: "7:00 PM",
      name: "Recovery Yoga",
      instructor: "Nadia Hussain",
      instructorImage: "/images/trainer-nadia.jpg",
      duration: "60 min",
      category: "yoga",
    },
  ],
  Thursday: [
    {
      id: "thu-1",
      time: "6:00 AM",
      name: "Strength & Conditioning",
      instructor: "Omar Farooq",
      instructorImage: "/images/trainer-omar.jpg",
      duration: "60 min",
      category: "strength",
    },
    {
      id: "thu-2",
      time: "9:00 AM",
      name: "Tabata Express",
      instructor: "Sara Ali",
      instructorImage: "/images/trainer-sara.jpg",
      duration: "30 min",
      category: "cardio",
    },
    {
      id: "thu-3",
      time: "5:00 PM",
      name: "Boxing Cardio",
      instructor: "Bilal Raza",
      instructorImage: "/images/trainer-bilal.jpg",
      duration: "45 min",
      category: "boxing",
    },
    {
      id: "thu-4",
      time: "7:00 PM",
      name: "Power Lift",
      instructor: "Ahmed Khan",
      instructorImage: "/images/trainer-ahmed.jpg",
      duration: "60 min",
      category: "strength",
    },
  ],
  Friday: [
    {
      id: "fri-1",
      time: "6:00 AM",
      name: "HIIT Burn",
      instructor: "Sara Ali",
      instructorImage: "/images/trainer-sara.jpg",
      duration: "45 min",
      category: "cardio",
    },
    {
      id: "fri-2",
      time: "10:00 AM",
      name: "Yoga & Mobility",
      instructor: "Nadia Hussain",
      instructorImage: "/images/trainer-nadia.jpg",
      duration: "60 min",
      category: "yoga",
    },
    {
      id: "fri-3",
      time: "5:00 PM",
      name: "Fight Night Prep",
      instructor: "Bilal Raza",
      instructorImage: "/images/trainer-bilal.jpg",
      duration: "75 min",
      category: "boxing",
    },
  ],
  Saturday: [
    {
      id: "sat-1",
      time: "8:00 AM",
      name: "Weekend Warrior HIIT",
      instructor: "Sara Ali",
      instructorImage: "/images/trainer-sara.jpg",
      duration: "60 min",
      category: "cardio",
    },
    {
      id: "sat-2",
      time: "10:00 AM",
      name: "Open Gym Lifting",
      instructor: "Ahmed Khan",
      instructorImage: "/images/trainer-ahmed.jpg",
      duration: "90 min",
      category: "strength",
    },
    {
      id: "sat-3",
      time: "12:00 PM",
      name: "Boxing Bootcamp",
      instructor: "Bilal Raza",
      instructorImage: "/images/trainer-bilal.jpg",
      duration: "60 min",
      category: "boxing",
    },
  ],
  Sunday: [
    {
      id: "sun-1",
      time: "9:00 AM",
      name: "Restorative Yoga",
      instructor: "Nadia Hussain",
      instructorImage: "/images/trainer-nadia.jpg",
      duration: "75 min",
      category: "yoga",
    },
    {
      id: "sun-2",
      time: "11:00 AM",
      name: "Functional Strength",
      instructor: "Omar Farooq",
      instructorImage: "/images/trainer-omar.jpg",
      duration: "60 min",
      category: "strength",
    },
  ],
};
