// src/content/journey.ts
// The timeline, newest first. Every line is on the résumé; employer names
// are public there and on LinkedIn, so they are named here (2026-10-15).
// Education lives in src/content/about.ts, not here (2026-10-16).

export interface JourneyStop {
  id: string;
  /** Set in the signal face, e.g. "Aug 2024 to Apr 2026" */
  dates: string;
  org: string;
  /** Short location or context line */
  where: string;
  role: string;
  /** Two or three concrete bullets */
  points: string[];
  /** Marks the current chapter */
  current?: boolean;
}

export const journeyHeader = {
  eyebrow: "THE JOURNEY",
  title: "From the flight deck to the bet slip.",
  intro: "How an electrical engineer ended up running consumer product.",
} as const;

export const journey: JourneyStop[] = [
  {
    id: "stein-product",
    dates: "2026 to now",
    org: "Stein Product and NetGoodLabs",
    where: "Denver, CO. Independent",
    role: "Founder, product consulting and AI automation",
    current: true,
    points: [
      "Consult on product for companies that need senior product judgment: roadmaps tied to KPIs, experimentation, analytics and zero-to-one launches, scoped from a few hours a week to embedded with the team.",
      "Founded NetGoodLabs, which gives teams clear rules and training for using AI, automates the work that moves by hand between their tools, and builds custom software where nothing off the shelf fits.",
      "Shipped a one-click document generator for a Habitat for Humanity chapter that replaced 13 hand-filled documents per homeowner; the team maintains it themselves. I build my own products with AI agents every day.",
    ],
  },
  {
    id: "leovegas",
    dates: "Aug 2024 to Apr 2026",
    org: "LeoVegas Group",
    where: "An MGM Resorts subsidiary. Remote, Denver",
    role: "Principal Product Manager, Player Engagement",
    points: [
      "Owned vision, roadmap and outcomes for sportsbook search, discovery, personalization and engagement across Finland, Denmark and Brazil.",
      "Followed Tipico's US product into LeoVegas on acquisition, then led a complete rebuild of the content configuration system: the foundational operational tool that took it from US-only to multiple countries and markets, and launched the product in three international markets.",
      "Set the KPI framework and experimentation cadence: 15% more search engagement and 12% higher search-to-bet conversion in the first two months. Managed and coached two product managers.",
    ],
  },
  {
    id: "tipico-lead",
    dates: "Nov 2023 to Aug 2024",
    org: "Tipico",
    where: "Denver, CO",
    role: "Product Lead, Frontend and Content Curation",
    points: [
      "Promoted to lead two product managers and own every customer-facing sportsbook experience: browsing, search, bet placement and bet tracking.",
      "Defined and shipped a new sportsbook search from zero, and overhauled content curation with intelligent automation so the homepage surfaced the right events and markets.",
      "Introduced and scaled the A/B testing framework that made UX changes measurable.",
    ],
  },
  {
    id: "tipico-pm",
    dates: "Feb 2022 to Oct 2023",
    org: "Tipico",
    where: "Denver, CO",
    role: "Product Manager, Sportsbook",
    points: [
      "Owned every customer-facing surface and the core end-to-end betting flows in a fast-growing startup, and grew the product from zero to one: teasers, an enhanced bet slip, a rebuilt My Bets experience.",
      "Defined and owned the core KPIs, installed the experimentation and testing framework, and defined the event taxonomy for the product analytics platform.",
      "Led a cross-functional engineering squad and partnered with design, trading, compliance and CRM so features met regulatory and customer goals.",
    ],
  },
  {
    id: "maxar",
    dates: "Feb 2021 to Feb 2022",
    org: "Maxar Technologies",
    where: "Denver, CO",
    role: "Product Owner, WorldView Legion satellite",
    points: [
      "Owned the dynamics and controls analysis functions across three engineering teams on a new low Earth orbit imaging satellite constellation.",
      "Translated mission requirements into sequenced backlogs and introduced modern agile practice that improved delivery velocity and roadmap predictability.",
    ],
  },
  {
    id: "boeing",
    dates: "Jun 2017 to Jun 2020",
    org: "The Boeing Company",
    where: "Seattle, WA",
    role: "Technical Product Owner and Innovation Lead, after Electrical Systems Design Engineer",
    points: [
      "Started as an electrical systems design engineer, extending MATLAB and Simulink toolchains to support model-based development of airplane systems.",
      "Won first place among 150+ teams in Boeing's internal product development Grand Challenge with a working prototype of a passenger app built on external aircraft camera feeds, and received a meritorious invention award for it.",
      "Technical product owner for onboard and offboard connectivity on the New Midsize Airplane program, and for flight deck systems on the 787: program-wide strategy, a multi-year roadmap that aligned senior leaders, and 50-person architecture workshops that settled the end-to-end connectivity design. Earned an M.S. from the University of Washington alongside the job.",
    ],
  },
];
