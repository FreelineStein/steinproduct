// src/content/worlds.ts
// The positioning: what each world taught me and why that makes me better
// in the other. Mirrors the LinkedIn About text, finalized 2026-06-26.

export interface World {
  id: string;
  eyebrow: string;
  title: string;
  where: string;
  lesson: string;
  takeaway: string;
}

export const worldsHeader = {
  eyebrow: "TWO WORLDS",
  title: "What I took from each makes me better at the other.",
} as const;

export const worlds: World[] = [
  {
    id: "engineering",
    eyebrow: "HIGH-STAKES ENGINEERING",
    title: "Where the cost of failure is measured in years and millions.",
    where: "Boeing avionics, Maxar satellite software",
    lesson:
      "Verification, validation and complex program management. I led 50-person architecture workshops, translated mission requirements into sequenced backlogs across three engineering teams, and learned when process protects the product and when it is just overhead.",
    takeaway:
      "For consumer teams: a PM who can hold real technical complexity and ship through it.",
  },
  {
    id: "consumer",
    eyebrow: "FAST CONSUMER PRODUCT",
    title: "Where you ship weekly and the numbers tell you the truth.",
    where: "Tipico and LeoVegas sportsbooks",
    lesson:
      "Experimentation-led roadmaps, search and personalization, growth. I rebuilt a content platform after an acquisition to open three European markets, set the KPI framework and test cadence, and lifted search engagement 15% and search-to-bet conversion 12% in two months.",
    takeaway:
      "For aerospace and defense teams: experimentation discipline without lowering the quality bar.",
  },
];

/** The stat row under the two panels. Every figure is on the résumé. */
export const highlights = [
  { value: "9+", label: "years in product, from avionics to consumer apps" },
  { value: "3", label: "international markets launched and run: Finland, Denmark, Brazil" },
  { value: "1st", label: "of 150+ teams in Boeing's internal product challenge" },
  { value: "15%", label: "lift in search engagement in two months, with a 12% lift in search-to-bet conversion" },
] as const;
