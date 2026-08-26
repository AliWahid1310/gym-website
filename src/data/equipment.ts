export interface EquipmentItem {
  id: string;
  name: string;
  brand: string;
  category: "chest-shoulders" | "back" | "legs" | "cardio" | "free-weights";
  image: string;
  primaryMuscle: string;
  secondaryMuscles: string[];
  specs: string;
  proFormCue: string;
  commonMistake: string;
  highlightBadge?: string;
}

export const EQUIPMENT_CATALOG: EquipmentItem[] = [
  {
    id: "eleiko-power-rack",
    name: "Eleiko IPF Competition Power Racks",
    brand: "Eleiko (Sweden)",
    category: "free-weights",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80",
    primaryMuscle: "Full Body (Squat, Bench, Deadlift)",
    secondaryMuscles: ["Core", "Glutes", "Traps", "Upper Back"],
    specs: "3x3 11-gauge steel, precision laser-cut pin holes, magnetic J-cups, and band pegs",
    proFormCue: "Set J-cups at mid-sternum height for squats; pack your lats before un-racking.",
    commonMistake: "Un-racking with loose upper back or setting safety pins too low.",
    highlightBadge: "Competition Spec",
  },
  {
    id: "hammer-incline-press",
    name: "ISO-Lateral Incline Chest Press",
    brand: "Hammer Strength",
    category: "chest-shoulders",
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80",
    primaryMuscle: "Clavicular Pectoralis (Upper Chest)",
    secondaryMuscles: ["Anterior Deltoids", "Triceps Lateral Head"],
    specs: "Converging natural arc movement, plate-loaded independent arms up to 280kg capacity",
    proFormCue: "Keep scapula retracted and drive elbows together at the top of the contraction.",
    commonMistake: "Flaring elbows past 90 degrees, shifting stress onto the rotator cuff.",
    highlightBadge: "Pure Hypertrophy",
  },
  {
    id: "hammer-dy-row",
    name: "ISO-Lateral Front Lat Pulldown / High Row",
    brand: "Hammer Strength",
    category: "back",
    image: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=800&q=80",
    primaryMuscle: "Latissimus Dorsi (Lower Lats)",
    secondaryMuscles: ["Teres Major", "Rhomboids", "Biceps Brachii"],
    specs: "Diverging biomechanical trajectory with dual underhand/neutral grip ergonomics",
    proFormCue: "Initiate the pull by depressing your shoulder blades and driving elbows straight down to your hips.",
    commonMistake: "Yanking with biceps and hyperextending the lumbar spine at peak contraction.",
    highlightBadge: "V-Taper Builder",
  },
  {
    id: "watson-dumbbells",
    name: "Watson Pro Heavy Duty Dumbbells (2.5kg - 60kg)",
    brand: "Watson Gym Equipment",
    category: "free-weights",
    image: "https://images.unsplash.com/photo-1586401100295-7a8336215082?auto=format&fit=crop&w=800&q=80",
    primaryMuscle: "Targeted Isolation & Free-Weight Compound",
    secondaryMuscles: ["Stabilizer Muscles", "Forearm Grip Strength"],
    specs: "Solid steel billet construction, urethane impact coat, revolving knurled thick grips",
    proFormCue: "Squeeze the dumbbell handle firmly throughout the entire range of motion to maximize neural drive.",
    commonMistake: "Dropping dumbbells at end of sets, causing wrist strain and premature wear.",
    highlightBadge: "Up to 60KG",
  },
  {
    id: "pendulum-squat",
    name: "Biomechanic Pendulum & Hack Squat",
    brand: "Arsenal Strength / Atlantis",
    category: "legs",
    image: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=800&q=80",
    primaryMuscle: "Quadriceps (Vastus Medialis & Lateralis)",
    secondaryMuscles: ["Gluteus Maximus", "Adductors"],
    specs: "Counterweighted floating pivot arm for zero spinal compression and deep quad stretch",
    proFormCue: "Place feet low-to-mid platform, descend smoothly until hamstrings touch calves without lifting heels.",
    commonMistake: "Locking knees aggressively at the top or bouncing out of the deep bottom hole.",
    highlightBadge: "Spine Friendly",
  },
  {
    id: "concept2-rower",
    name: "Concept2 RowErg & SkiErg Stations",
    brand: "Concept2",
    category: "cardio",
    image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=800&q=80",
    primaryMuscle: "Cardiovascular System & Full Posterior Chain",
    secondaryMuscles: ["Legs", "Core", "Upper Back", "Lungs"],
    specs: "PM5 performance monitors, spiral damper with air flywheel resistance",
    proFormCue: "Drive sequence: 60% legs drive, 20% hip hinge swing, 20% arm pull finish.",
    commonMistake: "Pulling with arms before fully extending legs on the drive phase.",
    highlightBadge: "HIIT Standard",
  },
  {
    id: "stairmaster-gauntlet",
    name: "StairMaster 8-Series Gauntlet Climbers",
    brand: "StairMaster Core",
    category: "cardio",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80",
    primaryMuscle: "Glutes, Hamstrings & Cardiovascular Base",
    secondaryMuscles: ["Calves", "Core Stabilizers"],
    specs: "Revolving 8-inch step staircase with electronically controlled alternator",
    proFormCue: "Keep upright posture without leaning your body weight onto the handrails.",
    commonMistake: "Slouching heavily over the console, which reduces calorie burn by over 30%.",
    highlightBadge: "Fat Shredder",
  },
  {
    id: "prime-cable-crossover",
    name: "Dual Multi-Adjustable Functional Cable Towers",
    brand: "Prime Fitness / Life Fitness",
    category: "chest-shoulders",
    image: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=800&q=80",
    primaryMuscle: "Pectorals, Deltoids & Rotational Core",
    secondaryMuscles: ["Triceps", "Biceps", "Forearms"],
    specs: "1:2 and 1:4 resistance pulleys, precision ball bearing swivels, full attachment rack",
    proFormCue: "Maintain a slight micro-bend at the elbow and lead with your chest on flies.",
    commonMistake: "Using momentum from the hips rather than isolating the targeted muscle fibers.",
  },
];
