// src/content/process.ts
// The "How it works" strip — three plain-language steps that answer the
// question the hero raises ("live within a week — how?"). Buyer language.
// Edit here; the component reads from this export.
//
// The 90-minute figure may only describe the kickoff, never the delivery
// window; ownership language describes the finished automation, never the
// build process (build location stays flexible — see FAQ "What about our data?").

export interface ProcessStep {
  /** Short step title */
  title: string;
  /** One-line description in buyer language */
  detail: string;
}

export const processSteps: ProcessStep[] = [
  {
    title: "Free intro call",
    detail:
      "30 minutes. We list what you do by hand and pick the workflow with the highest payoff.",
  },
  {
    title: "I build, then hand you the keys",
    detail:
      "I do the building, working through the messy parts so you don't have to. You get a live demo, a recorded walkthrough, and written docs your team can run without me.",
  },
  {
    title: "You own everything",
    detail:
      "The finished automation lives in your accounts, on your keys — your data stays yours, and nothing breaks if you stop working with me.",
  },
];
