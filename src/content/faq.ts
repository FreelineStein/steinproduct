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
      "The finished automation runs in your accounts, on your keys — your data stays yours. During the build we work wherever you're comfortable: directly in your systems, or in a sandbox I hand over at the end.",
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
    question: "What if it takes longer than a week?",
    answer:
      "Most Quick-Wins ship inside a week. If your workflow needs more than that, you'll know at kickoff — before I build — and we either narrow the scope to fit, or I quote a fixed-scope build instead. No surprise invoices.",
  },
];
