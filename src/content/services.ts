// src/content/services.ts
// The productized service ladder. Components read from this array — no service
// copy is hard-coded in JSX. Each service's `productKey` points at the matching
// entry in src/config/links.ts (PRODUCTS), which holds the real CTA URL.
//
// To add or reprice a service: edit here. To wire its button: edit links.ts.

import type { PRODUCTS } from "@/config/links";

export interface Service {
  /** Stable id, also used as the anchor target and matches PRODUCTS[].id */
  id: string;
  /** Display name */
  name: string;
  /** Primary price label, e.g. "$1,000" or "$3,000–$6,000" */
  price: string;
  /** Optional pricing aside, e.g. "$750 for the first few" or cadence */
  priceNote?: string;
  /** One-line outcome — rendered as the emphasized promise */
  outcome: string;
  /** 2–3 supporting detail bullets */
  details: string[];
  /** CTA button label */
  ctaLabel: string;
  /** Which PRODUCTS entry in links.ts holds this CTA's destination URL */
  productKey: keyof typeof PRODUCTS;
  /** Visually highlight this card as the recommended entry point */
  featured?: boolean;
}

export const services: Service[] = [
  {
    id: "quick-win",
    name: "AI Quick-Win Session",
    price: "$1,000",
    priceNote: "$750 for the first few",
    outcome:
      "One repetitive workflow, turned into a working tool — live, in ~90 minutes.",
    details: [
      "A single focused session",
      "We build one real automation together",
      "You keep it, plus a Loom walkthrough",
    ],
    ctaLabel: "Book a Quick-Win",
    productKey: "quickWin",
    featured: true,
  },
  {
    id: "workflow-sprint",
    name: "AI Workflow Sprint",
    price: "$3,000–$6,000",
    priceNote: "over two weeks",
    outcome: "A bigger workflow rebuilt end-to-end, tested and handed off.",
    details: [
      "Scoped to one meaningful process",
      "Built, documented, and shipped",
      "Async-friendly",
    ],
    ctaLabel: "Start a sprint",
    productKey: "workflowSprint",
  },
  {
    id: "retainer",
    name: "Enablement Retainer",
    price: "$1,500/mo",
    priceNote: "month-to-month",
    outcome: "One new working tool or automation shipped every month.",
    details: [
      "Shared backlog you prioritize",
      "Same-day weekday async",
      'Monthly "what\'s new" briefing',
      "Cancel anytime (30 days)",
    ],
    ctaLabel: "Talk about a retainer",
    productKey: "retainer",
  },
  {
    id: "strategy-session",
    name: "Paid Strategy Session",
    price: "$200–$400",
    outcome:
      "60 minutes to pressure-test where AI actually helps your business.",
    details: [
      "No build, just sharp direction",
      "Book and pay in one step",
    ],
    ctaLabel: "Book a strategy session",
    productKey: "strategySession",
  },
];
