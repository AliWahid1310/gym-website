# 💪 Power Fitness Zone (PFZ) — Islamabad, Pakistan

A state-of-the-art, high-performance fitness platform and interactive web application built with **Next.js 16 (Turbopack)**, **React 19**, **TypeScript**, and **Tailwind CSS**.

Designed specifically for modern athletes, lifters, and fitness enthusiasts across Islamabad & Rawalpindi branches (F-7 Markaz, G-11 Markaz, DHA Phase 2, Bahria Town Phase 7).

---

## ⚡ Key Features & Interactive Suite

### 🏋️ Strength, Powerlifting & Biomechanics
- **Olympic Barbell 3D Plate Calculator** — Visual barbell sleeve loading rack with calibrated color-coded bumper plates (Red 25kg, Blue 20kg, Yellow 15kg, Green 10kg, White 5kg, Black 2.5kg, Silver 1.25kg, collars), kg/lbs toggle, and CNS ramping warmup progression.
- **Rep Tempo & Cadence Metronome** — Web Audio API synthesized metronome with dynamic pulse ring gauge for Eccentric lowering, Isometric bottom pause, Concentric lifting, and Top squeeze.
- **Gym Set Logger & PR Journal** — Log working sets with RPE ratings, calculate total tonnage volume moved (kg), and celebrate Personal Records with persistent local storage.
- **1-Rep Max (1RM) Predictor** — Epley & Brzycki formula calculations with progressive overload percentage training tables.
- **Strength Standards & SBD Classifier** — Compare compound lifts (Squat, Bench, Deadlift, OHP) against international strength standards and gym ranks.
- **Progressive Overload & Volume Tracker** — Systematic weekly weight jumps and volume progression manager.

### 💳 Member Experience & Community
- **Digital Member Pass Wallet** — 3D interactive holographic flip card with contactless NFC badge, simulated turnstile gate check-in scanner (with audio beeps), and branch access status.
- **Live Multi-Branch Floor & Equipment Radar** — Real-time squat rack availability, sauna status, and floor crowd density across Islamabad facilities.
- **AI Coach Matcher Quiz** — 4-question intelligent assessment matching lifters to certified personal trainers.
- **Interactive Membership Plan Finder** — ROI & value comparison calculator for Silver, Gold, and VIP Elite memberships.
- **Monthly Challenges & Badges** — Leaderboards, community milestone badges, and Islamabad lifter challenges.
- **Gym Etiquette Guide & Lifter IQ** — Code of conduct and 5-question interactive gym etiquette quiz.

### 🥗 Pakistani Nutrition & Biohacking
- **Ramadan Fasting & Gym Protocol** — Optimized training windows (Post-Taraweeh, Pre-Iftar, Post-Iftar, Pre-Suhoor), 3.5L hydration timetable, and halal high-protein Pakistani meal recommendations.
- **Desi High-Protein Recipe Kitchen** — Authentic Pakistani gym meals (Beef Shami, Chicken Karahi, Chana Chaat, Dahi Oats) with portion scalers and PKR cost breakdown.
- **PKR Protein Cost Economy Calculator** — Compare cost-per-gram of protein across Pakistani whole foods and whey supplements.
- **Pre-Workout Caffeine & Sleep Recovery Optimizer** — Pre-workout timing and caffeine half-life tracker to maximize workout intensity while protecting restorative sleep.
- **Macro & TDEE Nutrition Engine** — Precise calories and macro targets tailored for fat loss, clean bulk, or body recomposition.

### ⏱️ Conditioning & Facility Hub
- **HIIT & Tabata Gym Interval Timer** — Custom work/rest intervals with audio beeps and visual fullscreen timer.
- **Dynamic Warm-Up & Mobility Protocol** — Targeted joint prep protocols for upper body, lower body, and full-body sessions.
- **Floating Speed Dial Toolkit Dock** — Quick-access search modal to instantly jump between 20+ fitness calculators and tools.
- **Workout Beats & Soundboard** — Motivation audio tracks and synthesized gym sound effects.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router + Turbopack) |
| **UI Library** | React 19 |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS v4 & Vanilla CSS Design System |
| **Audio Engine** | Web Audio API (Synthesized oscillators & harmonic chords) |
| **Icons** | Lucide React |
| **Typography** | Oswald (Headings), Inter (Body) |

---

## 📦 Getting Started

### Prerequisites
- Node.js 18+ or 20+
- npm, pnpm, or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/AliWahid1310/gym-website.git
cd power-fitness-zone

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Production Build & Validation

```bash
# Validate TypeScript and create optimized production bundle
npm run build

# Start production server
npm start
```

---

## 📁 Repository Structure

```
power-fitness-zone/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # SEO metadata & root layout
│   │   ├── page.tsx                # Master landing & suite integration
│   │   ├── globals.css             # Design tokens & animation keyframes
│   │   └── api/                    # Serverless API endpoints
│   ├── components/
│   │   ├── BarbellPlateCalculator.tsx # 3D Olympic Barbell Racking
│   │   ├── MemberPassWallet.tsx       # Digital 3D Card & QR Scanner
│   │   ├── TempoMetronome.tsx         # Cadence Audio Metronome
│   │   ├── WorkoutLogger.tsx          # Sets & PR Volume Tracker
│   │   ├── RamadanFitnessGuide.tsx    # Ramadan Fasting Protocol
│   │   ├── GymToolkitModal.tsx        # Floating Quick Toolkit Hub
│   │   ├── DesiGymRecipes.tsx         # Pakistani Gym Meal Kitchen
│   │   ├── GymEquipmentTracker.tsx    # Live Floor & Rack Radar
│   │   ├── CaffeineOptimizer.tsx      # Pre-Workout Caffeine Timing
│   │   ├── StrengthStandards.tsx      # Compound Lift Benchmarks
│   │   ├── Hero.tsx, Navbar.tsx, ...  # Core Branding & Sections
│   └── data/                          # Islamabad gym branches & data
└── package.json
```

---

## 📄 License & Attribution

All rights reserved © 2026 Power Fitness Zone / 360 Fitness Islamabad.
