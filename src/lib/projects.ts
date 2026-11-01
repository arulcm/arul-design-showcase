import achievements from "@/assets/habit/achievements.jpg";
import profile from "@/assets/habit/profile.jpg";
import focus from "@/assets/habit/focus.jpg";
import weekly from "@/assets/habit/weekly.jpg";
import heatmap from "@/assets/habit/heatmap.jpg";

export type Screenshot = {
  src: string;
  alt: string;
  category: string;
  caption: string;
  /** natural width / height, used to preserve aspect ratio */
  w: number;
  h: number;
  /** very tall captures scroll inside the phone instead of being squashed */
  scroll?: boolean;
};

export type Feature = { title: string; body: string; shot?: number };

export type ProjectVisual = "habit" | "fatigue" | "brush" | "thermal";

export type Project = {
  slug: string;
  index: string;
  title: string;
  shortTitle: string;
  category: string;
  description: string;
  tech: string[];
  highlights: string[];
  featured?: boolean;
  visual: ProjectVisual;
  overview: string;
  challenge: string;
  approach: string[];
  features?: Feature[];
  screenshots?: Screenshot[];
  decisions?: { title: string; body: string }[];
};

export const habitScreens: Screenshot[] = [
  {
    src: profile,
    alt: "Habit Tracker profile screen showing level, XP progress, sync status and stat tiles",
    category: "Profile & gamification",
    caption: "Level, XP progress, sync state and personal stats in one glance.",
    w: 710,
    h: 1601,
  },
  {
    src: focus,
    alt: "Focus Mode screen with a 45:00 timer and 25, 45, 60 and 90 minute session presets",
    category: "Focus Mode & Pomodoro",
    caption: "Four deep-work presets with a single, oversized timer.",
    w: 710,
    h: 1601,
  },
  {
    src: weekly,
    alt: "Weekly Pulse statistics screen with today's completion, all-time done, total XP and a last 7 days bar chart",
    category: "Weekly statistics",
    caption: "Weekly Pulse — today, all-time and XP above a 7-day chart.",
    w: 710,
    h: 1601,
  },
  {
    src: heatmap,
    alt: "Monthly consistency heatmap for October 2026 with active days, total checks and daily streak card",
    category: "Monthly consistency heatmap",
    caption: "A GitHub-style heatmap turns a month of effort into a pattern.",
    w: 710,
    h: 1601,
  },
  {
    src: achievements,
    alt: "Full-length profile capture listing achievement badges such as First Step, Week Warrior and Focus Master",
    category: "Achievements & progress",
    caption: "Full-length capture of the achievement badge wall — scroll inside the phone.",
    w: 198,
    h: 1282,
    scroll: true,
  },
];

export const projects: Project[] = [
  {
    slug: "adaptive-habit-analytics-tracker",
    index: "01",
    title: "Adaptive Habit Analytics Tracker",
    shortTitle: "Habit Tracker",
    category: "Mobile App · Product Design · Development",
    featured: true,
    visual: "habit",
    description:
      "An intelligent habit management application designed to help users build consistency, monitor daily activities, track personal goals, and improve productivity through analytics.",
    tech: ["React Native", "Firebase Authentication", "Cloud Firestore", "JavaScript"],
    highlights: [
      "User authentication",
      "Daily habit tracking",
      "Coding platform tracking",
      "Goal management",
      "Focus timer — 25 / 45 / 60 / 90 min",
      "XP & gamification system",
      "Achievement badges",
      "Streak tracking",
      "Monthly consistency heatmap",
      "Weekly analytics",
      "Profile & progress dashboard",
      "Offline access & sync",
    ],
    overview:
      "Most habit apps stop at a checklist. This one treats consistency as data — every check-in, focus session and goal feeds an analytics layer, while a light gamification system keeps the daily loop rewarding.",
    challenge:
      "Keep people coming back every day without overwhelming them. The app needed to hold habits, goals, coding activity and focus sessions together, yet still feel calm, fast and usable offline.",
    approach: [
      "One dark, low-glare canvas with a single lime accent reserved for progress and primary actions.",
      "Rewards (XP, levels, badges) sit next to the data they come from, so motivation never hides the numbers.",
      "Every analytics view answers one question: how did I do today, this week, this month?",
      "Local-first data with Firestore sync, and the sync status always visible on the profile.",
    ],
    features: [
      { title: "Authentication & onboarding", body: "Firebase Authentication secures each account so progress follows the user across devices." },
      { title: "Profile & gamification dashboard", body: "Level, XP bar, best streak and focus sessions summarised as four calm tiles.", shot: 0 },
      { title: "Goals management", body: "Create goals with deadlines and track completion alongside daily habits." },
      { title: "Coding platform tracking", body: "Check in coding activity across platforms to keep a developer streak alive." },
      { title: "Daily habit tracking", body: "Quick daily check-ins that roll up into streaks and statistics." },
      { title: "Focus Mode & Pomodoro", body: "25, 45, 60 and 90-minute presets. Completing a session rewards +30 XP.", shot: 1 },
      { title: "Weekly statistics", body: "Weekly Pulse shows today's completion, all-time totals, XP and a 7-day chart.", shot: 2 },
      { title: "Monthly consistency heatmap", body: "Active days, total checks and a low-to-high heatmap, with a streak card below.", shot: 3 },
      { title: "Achievements & progress", body: "Badges like First Step, Week Warrior and Focus Master unlock as habits stick.", shot: 4 },
      { title: "Offline access & sync", body: "Works without a connection and syncs changes to Cloud Firestore when back online." },
    ],
    screenshots: habitScreens,
    decisions: [
      {
        title: "One accent, one meaning",
        body: "Lime appears only on progress, active states and the main action. Users learn quickly that green means momentum.",
      },
      {
        title: "Oversized numbers",
        body: "Timers and stats use heavy display type so key values read in under a second — even mid-workout or between tasks.",
      },
      {
        title: "Chunky preset chips",
        body: "Focus durations are large tap targets with distinct icons, cutting the setup to a single tap.",
      },
      {
        title: "Visible sync state",
        body: "'All changes synced' and pending-change counts build trust in the offline-first model.",
      },
      {
        title: "Heatmap over charts",
        body: "A month of check-ins as a colour grid shows patterns and gaps faster than a line chart.",
      },
      {
        title: "Central action in the tab bar",
        body: "The raised centre button keeps the most frequent action within thumb reach on every screen.",
      },
    ],
  },
  {
    slug: "cognitive-fatigue-detection-system",
    index: "02",
    title: "Cognitive Fatigue Detection System",
    shortTitle: "Fatigue Detection",
    category: "Machine Learning · Analytics Dashboard",
    visual: "fatigue",
    description:
      "A real-time cognitive fatigue monitoring system that analyzes user typing patterns, idle time, typing speed, and behavioral signals to estimate fatigue and productivity.",
    tech: ["Python", "Machine Learning", "XGBoost", "Random Forest", "Streamlit", "OpenCV", "MediaPipe"],
    highlights: [
      "Behavioral feature extraction",
      "Fatigue prediction",
      "Personalized baseline calibration",
      "Productivity monitoring",
      "Interactive analytics dashboard",
    ],
    overview:
      "Fatigue builds quietly. This system watches how someone works — typing rhythm, speed, pauses and visual cues — and turns those signals into a live fatigue estimate.",
    challenge:
      "Everyone types differently, so one global threshold would misjudge most people. The model had to learn each user's normal before judging what's tired.",
    approach: [
      "Extract behavioral features from typing patterns, idle time and typing speed.",
      "Use OpenCV and MediaPipe for visual signals that add context to the keystroke data.",
      "Calibrate a personal baseline before predicting, so results are relative to the individual.",
      "Compare XGBoost and Random Forest models for fatigue prediction.",
      "Show results in an interactive Streamlit dashboard for productivity monitoring.",
    ],
  },
  {
    slug: "brushvault-smart-toothbrush",
    index: "03",
    title: "BrushVault — Smart Toothbrush",
    shortTitle: "BrushVault",
    category: "IoT · Embedded Systems · Hardware",
    visual: "brush",
    description:
      "An IoT-based smart toothbrush docking system designed to improve oral hygiene through intelligent monitoring, charging, and sterilization.",
    tech: ["ESP32-C3", "MPU6050", "FSR402", "RTC DS3231", "Embedded Systems", "IoT"],
    highlights: ["Intelligent monitoring", "Charging dock", "Sterilization", "Motion sensing", "Pressure sensing", "Real-time clock scheduling"],
    overview:
      "BrushVault turns a toothbrush holder into a smart dock that monitors, charges and sterilizes — making good oral hygiene the default.",
    challenge:
      "Pack sensing, timekeeping and connectivity into a small, everyday object that must stay simple to use.",
    approach: [
      "ESP32-C3 microcontroller for processing and IoT connectivity.",
      "MPU6050 motion sensor to capture brushing movement.",
      "FSR402 force-sensitive resistor to detect pressure and docking.",
      "RTC DS3231 real-time clock for accurate scheduling and logs.",
    ],
  },
  {
    slug: "urban-thermal-routing-engine",
    index: "04",
    title: "Urban Thermal Routing Engine",
    shortTitle: "Thermal Routing",
    category: "Geospatial · Routing · Data",
    visual: "thermal",
    description:
      "An intelligent urban routing solution that considers environmental temperature and vegetation conditions to identify more comfortable routes.",
    tech: ["Python", "OpenStreetMap", "PostGIS", "Sentinel-2", "MapLibre", "Weather APIs"],
    highlights: ["Heat-aware routing", "Vegetation analysis", "Street network modelling", "Live weather input", "Interactive map"],
    overview:
      "The fastest route isn't always the best one on a hot afternoon. This engine weighs heat and shade so people can choose a more comfortable path.",
    challenge:
      "Combine street networks, satellite vegetation data and live weather into routing costs that stay quick to compute.",
    approach: [
      "Street network from OpenStreetMap stored and queried in PostGIS.",
      "Sentinel-2 satellite imagery to estimate vegetation along streets.",
      "Weather APIs provide current temperature conditions.",
      "Routes rendered on an interactive MapLibre map.",
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
