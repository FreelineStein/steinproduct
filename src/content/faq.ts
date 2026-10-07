// src/content/faq.ts
// Objection-handling FAQ. Questions are written in the buyer's voice (their
// pronouns), answers in the practice voice. The "longer than a week" answer is
// reconciled with the Quick-Win guarantee in src/content/services.ts (EntryOffer
// `guarantee`): if either changes, change both. Rendered copy never uses em or
// en dashes as separators.

export interface FaqItem {
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    question: "What happens on the intro call?",
    answer:
      "30 minutes on a video call. You describe what your team does by hand, and together we pick the workflow with the highest payoff. If there's a fit, you get a written scope and a fixed price afterward. If not, you leave with a clearer list and no obligation.",
  },
  {
    question: "What tools do I need?",
    answer:
      "Whatever you already have. Stein Product builds with the tools you pay for today. The assessment includes recommending the cheapest path, not selling you new software.",
  },
  {
    question: "We're not technical. Is that a problem?",
    answer:
      "No. You bring the workflow knowledge; Stein Product brings the build. You'll be able to run everything yourself.",
  },
  {
    question: "What about our data?",
    answer:
      "The finished automation runs in your own accounts, so your data stays yours. During the build we work wherever you're comfortable: directly in your systems, or in a sandbox handed over at the end.",
  },
  {
    question: "What happens after you build it?",
    answer:
      "You own it. If you want ongoing help, there's a monthly retainer, but nothing breaks if you stop.",
  },
  {
    question: "How does pricing work?",
    answer:
      "Fixed scope, priced on the outcome, never hourly. Projects start with a 50% deposit. If budget is tight, you get a narrower scope, never lower quality.",
  },
  {
    question: "What if it takes longer than a week?",
    answer:
      "Most Quick-Wins ship inside a week. If your workflow needs more than that, you'll know at kickoff, before the build starts, and we either narrow the scope to fit or you get a quote for a fixed-scope build instead. No surprise invoices. And if a Quick-Win does miss the week, the follow-up session to finish it is free.",
  },
];
