export interface Trainer {
  id: string;
  name: string;
  specialty: string;
  bio: string;
  image: string;
  certifications: string[];
}

export const trainers: Trainer[] = [
  {
    id: "ahmed",
    name: "Ahmed Khan",
    specialty: "Strength & Powerlifting",
    bio: "NSCA-certified strength coach with 12 years of experience. Former national-level powerlifter who has coached over 200 athletes to competition readiness.",
    image: "/images/trainer-ahmed.jpg",
    certifications: ["NSCA-CSCS", "USA Weightlifting L2"],
  },
  {
    id: "sara",
    name: "Sara Ali",
    specialty: "HIIT & Cardio Conditioning",
    bio: "ACE-certified group fitness specialist who brings infectious energy to every session. Specializes in metabolic conditioning and fat-loss transformations.",
    image: "/images/trainer-sara.jpg",
    certifications: ["ACE-GFI", "Precision Nutrition L1"],
  },
  {
    id: "bilal",
    name: "Bilal Raza",
    specialty: "Boxing & Combat Sports",
    bio: "Professional boxing coach and former amateur champion. Brings discipline, technique, and relentless intensity to every session on the pads.",
    image: "/images/trainer-bilal.jpg",
    certifications: ["PBF Boxing Coach L3", "First Aid Certified"],
  },
  {
    id: "nadia",
    name: "Nadia Hussain",
    specialty: "Yoga & Mobility",
    bio: "500-hour RYT with a background in sports physiotherapy. Helps athletes and desk workers alike unlock movement and reduce chronic pain.",
    image: "/images/trainer-nadia.jpg",
    certifications: ["RYT-500", "FRC Mobility Specialist"],
  },
  {
    id: "omar",
    name: "Omar Farooq",
    specialty: "Functional Training",
    bio: "CrossFit L2 trainer and movement specialist. Designs programs that translate gym strength into real-world performance and injury resilience.",
    image: "/images/trainer-omar.jpg",
    certifications: ["CrossFit L2", "NASM-CPT"],
  },
  {
    id: "zara",
    name: "Zara Sheikh",
    specialty: "Women's Fitness & Nutrition",
    bio: "Certified personal trainer passionate about creating safe, empowering training environments. Specializes in body recomposition and hormone-aware programming.",
    image: "/images/trainer-zara.jpg",
    certifications: ["ISSA-CPT", "Precision Nutrition L2"],
  },
];
