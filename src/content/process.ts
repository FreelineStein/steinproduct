// src/content/process.ts
// The "How it works" strip — three plain-language steps that answer the
// question the hero raises ("often in one session — how?"). Buyer language,
// ~40 words total. Edit here; the component reads from this export.

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
    title: "We build it together",
    detail:
      "A working session in your accounts, on your tools. Most first automations go live in the session.",
  },
  {
    title: "You own everything",
    detail:
      "It runs in your accounts, on your keys. No dependency on me — unless you want more.",
  },
];
