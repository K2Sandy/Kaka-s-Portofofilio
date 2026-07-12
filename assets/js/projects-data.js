/**
 * PROJECTS DATA
 * -------------------------------------------------------------------------
 * Single source of truth for the project grid on the homepage.
 * To add a new project in the future:
 *   1. Duplicate projects/TEMPLATE.html, rename it, fill in the content.
 *   2. Add a new object to this array below (copy an existing one as a guide).
 *   3. That's it — the homepage grid, filters, and counters update automatically.
 * -------------------------------------------------------------------------
 */
const PROJECTS = [
  {
    id: "glucoscan",
    name: "GlucoScan",
    brandA: "Gluco",
    brandB: "Scan",
    tagline: "Scan a food label, know your sugar limit — instantly.",
    period: "Dec 2025 – Mar 2026",
    category: "Mobile",
    tags: ["Android", "Healthcare", "On-device AI"],
    emoji: "🩸",
    image: "assets/img/gluco-thumb.webp",
    award: { tier: "silver", label: "2nd Place", event: "National Scientific Paper Competition (LKTIN) by IYSA" },
    repo: "https://github.com/K2Sandy/GlucoScan-Android-App",
    page: "projects/glucoscan.html",
    summary: "An Android app that helps diabetes patients monitor daily sugar intake by scanning food packaging labels with the camera."
  },
  {
    id: "mindguard",
    name: "MindGuard",
    brandA: "Mind",
    brandB: "Guard",
    tagline: "A quiet layer of protection between students and toxic feeds.",
    period: "Mar 2026 – May 2026",
    category: "Web",
    tags: ["Browser Extension", "Mental Health", "Privacy-first"],
    emoji: "🛡️",
    image: "assets/img/mind-thumb.webp",
    award: { tier: "bronze", label: "Finalist", event: "2026 UGM Public Health Hackathon" },
    repo: "https://github.com/K2Sandy/MindGuard_Extension",
    page: "projects/mindguard.html",
    summary: "A privacy-centric browser extension that filters distressing content in real time to support student mental health."
  },
  {
    id: "windsense",
    name: "WindSense",
    brandA: "Wind",
    brandB: "Sense",
    tagline: "An early warning system that reads the wind before it strikes.",
    period: "May 2024 – Sept 2024",
    category: "IoT",
    tags: ["Arduino", "C/C++", "Hardware"],
    emoji: "🌬️",
    image: "assets/img/wind-thumb.webp",
    award: { tier: "gold", label: "Gold Medal", event: "International Indonesia Inventors Day 2024" },
    repo: "https://github.com/K2Sandy/WindSense",
    page: "projects/windsense.html",
    summary: "An IoT-based smart early warning system that tracks wind speed and direction and sends instant mobile alerts."
  },
  {
    id: "escapedisaster",
    name: "EscapeDisaster",
    brandA: "Escape",
    brandB: "Disaster",
    tagline: "Practicing the seconds that matter, before they matter for real.",
    period: "Aug 2025 – Sept 2025",
    category: "Game",
    tags: ["TurboWarp", "Education", "Mobile"],
    emoji: "🎮",
    image: "assets/img/escape_thumb.webp",
    award: { tier: "bronze", label: "Competition Entry", event: "Disaster Education Media Competition (DEMC) U-DARE 3.0 by TDMRC USK" },
    repo: "https://github.com/K2Sandy/EscapeDisasterGame",
    page: "projects/escapedisaster.html",
    summary: "A mobile educational game that teaches self-rescue procedures for earthquakes and tsunamis through simulated scenarios."
  }

  /* Add your next project here — e.g.:
  {
    id: "askara",
    name: "ASKARA",
    brandA: "AS",
    brandB: "KARA",
    tagline: "...",
    period: "2026",
    category: "Mobile",
    tags: ["Flutter", "EdTech"],
    emoji: "✍️",
    award: { tier: "gold", label: "...", event: "..." },
    repo: "https://github.com/...",
    page: "projects/askara.html",
    summary: "..."
  }
  */
];

const AWARD_ICON = {
  gold: `<svg viewBox="0 0 24 24" fill="none"><path d="M12 2l2.4 4.86 5.36.78-3.88 3.78.92 5.34L12 14.2l-4.8 2.56.92-5.34-3.88-3.78 5.36-.78L12 2z" fill="currentColor"/></svg>`,
  silver: `<svg viewBox="0 0 24 24" fill="none"><path d="M12 2l2.4 4.86 5.36.78-3.88 3.78.92 5.34L12 14.2l-4.8 2.56.92-5.34-3.88-3.78 5.36-.78L12 2z" fill="currentColor"/></svg>`,
  bronze: `<svg viewBox="0 0 24 24" fill="none"><path d="M12 2l2.4 4.86 5.36.78-3.88 3.78.92 5.34L12 14.2l-4.8 2.56.92-5.34-3.88-3.78 5.36-.78L12 2z" fill="currentColor"/></svg>`
};
