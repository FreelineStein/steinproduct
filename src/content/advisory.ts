// src/content/advisory.ts
// The /advisory page: product consulting, the one offer sold on this site.
// NetGoodLabs has its own link in the nav. Every result is on the résumé.

export const advisoryHeader = {
  eyebrow: "PRODUCT CONSULTING",
  title: "Product consulting, from strategy to shipped.",
  intro:
    "I help companies set the roadmap, measure what ships and build the product practice behind it. Engagements are scoped to the work, from a few hours a week to embedded with your team.",
  ctaLabel: "Email about a project",
} as const;

export interface Service {
  title: string;
  body: string;
}

export const servicesHeader = {
  eyebrow: "WHAT I DO",
  title: "Where I can help.",
} as const;

export const services: Service[] = [
  {
    title: "Roadmap and KPI reset",
    body: "What the team is building, why, and how you will know it worked: one roadmap tied to a short list of KPIs everyone can read.",
  },
  {
    title: "Experimentation and A/B testing framework",
    body: "A testing framework and review cadence that make product changes measurable, from the first A/B test to the weekly readout.",
  },
  {
    title: "Product analytics and instrumentation",
    body: "An event taxonomy, tracking and conversion funnels, so the team can see where users drop off instead of guessing.",
  },
  {
    title: "Zero-to-one product development",
    body: "A new product taken from idea to first release: scoped, specified and cut to what can ship.",
  },
  {
    title: "Streamline organizational workflows",
    body: "The handoffs between product, design, engineering and the business mapped and simplified, with automation where it removes busy work.",
  },
  {
    title: "PM coaching",
    body: "Coaching for product managers, or for a founder doing the product job, on discovery, prioritization and working with stakeholders.",
  },
];

export interface Stat {
  /** Set large, e.g. "15%" */
  value: string;
  label: string;
  org: string;
}

export interface Milestone {
  title: string;
  body: string;
  org: string;
}

export const resultsHeader = {
  eyebrow: "TRACK RECORD",
  title: "Results driven.",
} as const;

export const stats: Stat[] = [
  { value: "15%", label: "more search engagement in the first two months", org: "LeoVegas" },
  { value: "12%", label: "higher search-to-bet conversion in the same two months", org: "LeoVegas" },
  { value: "3", label: "international product launches: Finland, Denmark and Brazil", org: "LeoVegas" },
  { value: "1st", label: "of 150+ teams in Boeing's internal product development Grand Challenge", org: "Boeing" },
];

export const milestones: Milestone[] = [
  {
    title: "A/B testing framework",
    body: "Introduced and scaled the framework that made UX changes measurable.",
    org: "Tipico",
  },
  {
    title: "Event taxonomy",
    body: "Defined the event taxonomy for the product analytics platform.",
    org: "Tipico",
  },
  {
    title: "PM coaching",
    body: "Managed, coached and mentored the product managers on my teams.",
    org: "Tipico and LeoVegas",
  },
];

/** The closing band on /advisory. */
export const advisoryClosingCta = {
  title: "Let's work together.",
  body: "Send a note on the product, where it is stuck and what a good outcome looks like. We'll work out from there whether I'm the right fit.",
} as const;

/** The closing band on every other page. */
export const closingCta = {
  title: "Let's talk.",
  body: "Hiring for a senior product role, or have a system that should run itself? Send me a note.",
} as const;
