// Script to generate placeholder images for Power Fitness Zone
// Run with: node scripts/generate-placeholders.mjs

import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";

const PUBLIC_DIR = join(process.cwd(), "public", "images");

// Ensure directory exists
mkdirSync(PUBLIC_DIR, { recursive: true });

function createPlaceholder(filename, width, height, label, bgColor = "#1a1a1a", accentColor = "#D91E2A") {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect fill="${bgColor}" width="${width}" height="${height}"/>
  <rect fill="${accentColor}" x="0" y="${height - 4}" width="${width}" height="4" opacity="0.6"/>
  <text fill="#666" font-family="Arial,sans-serif" font-size="${Math.max(16, Math.min(32, width / 20))}" font-weight="bold" text-anchor="middle" x="${width / 2}" y="${height / 2 - 10}">${label}</text>
  <text fill="#444" font-family="Arial,sans-serif" font-size="${Math.max(12, Math.min(18, width / 30))}" text-anchor="middle" x="${width / 2}" y="${height / 2 + 20}">${width} × ${height}</text>
</svg>`;
  
  writeFileSync(join(PUBLIC_DIR, filename), svg);
  console.log(`Created: ${filename}`);
}

// Hero
createPlaceholder("hero-training-floor.jpg", 1920, 1080, "HERO — TRAINING FLOOR");

// Programs
createPlaceholder("program-strength.jpg", 800, 600, "STRENGTH TRAINING");
createPlaceholder("program-hiit.jpg", 800, 600, "GROUP HIIT");
createPlaceholder("program-personal.jpg", 800, 600, "PERSONAL TRAINING");
createPlaceholder("program-boxing.jpg", 800, 600, "BOXING & KICKBOXING");
createPlaceholder("program-yoga.jpg", 800, 600, "YOGA & RECOVERY");
createPlaceholder("program-functional.jpg", 800, 600, "FUNCTIONAL FITNESS");

// Trainers
createPlaceholder("trainer-ahmed.jpg", 600, 800, "AHMED KHAN", "#222");
createPlaceholder("trainer-sara.jpg", 600, 800, "SARA ALI", "#222");
createPlaceholder("trainer-bilal.jpg", 600, 800, "BILAL RAZA", "#222");
createPlaceholder("trainer-nadia.jpg", 600, 800, "NADIA HUSSAIN", "#222");
createPlaceholder("trainer-omar.jpg", 600, 800, "OMAR FAROOQ", "#222");
createPlaceholder("trainer-zara.jpg", 600, 800, "ZARA SHEIKH", "#222");

// Members (testimonials)
createPlaceholder("member-hassan.jpg", 200, 200, "HM", "#333");
createPlaceholder("member-ayesha.jpg", 200, 200, "AT", "#333");
createPlaceholder("member-faisal.jpg", 200, 200, "FA", "#333");
createPlaceholder("member-mehreen.jpg", 200, 200, "MS", "#333");
createPlaceholder("member-usman.jpg", 200, 200, "UG", "#333");

// Owner
createPlaceholder("owner-portrait.jpg", 600, 750, "FOUNDER PORTRAIT", "#1a1a1a");

// Virtual tour / facility
createPlaceholder("gym-interior-wide.jpg", 1920, 1080, "GYM INTERIOR — WIDE SHOT");

// OG Image
createPlaceholder("og-image.jpg", 1200, 630, "POWER FITNESS ZONE — OG IMAGE");

console.log("\nAll placeholders generated!");
