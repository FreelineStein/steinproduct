// src/content/faq.ts
// Objection-handling FAQ. Final copy — edit only for overflow. Q6's promise is
// reconciled with the Quick-Win guarantee in src/content/services.ts (EntryOffer
// `guarantee`): if either changes, change both.

export interface FaqItem {
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    question: "What tools do I need?",
    answer:
      "Whatever you already have. I build with the tools you pay for today — the assessment includes recommending the cheapest path, not selling you new software.",
  },
  {
    question: "We're not technical. Is that a problem?",
    answer:
      "No. You bring the workflow knowledge; I bring the build. You'll be able to run everything without me.",
  },
  {
    question: "What about our data?",
    answer:
      "Everything runs in your accounts, on your keys. I don't take custody of your data — it stays yours.",
  },
  {
    question: "What happens after you build it?",
    answer:
      "You own it. If you want ongoing help, there's a monthly retainer — but nothing breaks if you stop.",
  },
  {
    question: "How does pricing work?",
    answer:
      "Fixed scope, priced on the outcome, never hourly. Projects start with a 50% deposit. If budget is tight, I narrow the scope — not the quality.",
  },
  {
    question: "What if my workflow can't be automated in one session?",
    answer:
      "Then the follow-up session is free — you don't pay twice to get your first automation live. Either way, you'll leave knowing exactly what it takes, scoped and priced, and the session fee counts toward the build.",
  },
];
