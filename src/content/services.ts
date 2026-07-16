// src/content/services.ts
// The service offering, organized by OUTCOME. Three "buckets" describe what a
// client walks away with; engagement formats (a Quick-Win session, a fixed-scope
// build) live inside a bucket as its entry offer and price anchor. The Enablement
// Retainer is a separate "keep going" layer, not a fourth bucket.
//
// Components read from these exports — no service copy is hard-coded in JSX. Each
// entry's `productKey` points at the matching PRODUCTS entry in src/config/links.ts,
// which holds the real CTA URL (or `null`, which renders a disabled CTA).
//
// To reword or reprice: edit here. To wire a button: edit links.ts.

import type { PRODUCTS } from "@/config/links";

/** An entry offer — the low-commitment way into a bucket, with its own price. */
export interface EntryOffer {
  /** Offer name, e.g. "AI Quick-Win Session" */
  name: string;
  /** Price label, e.g. "$750 for my first three clients (then $1,000)" */
  price: string;
  /** One line on what you get */
  detail: string;
  /** Risk-reversal / guarantee line, shown under the price. Must match FAQ Q6. */
  guarantee?: string;
}

/** An outcome-based service bucket — the sentence a referrer can repeat. */
export interface ServiceBucket {
  /** Stable id, also used as the anchor target */
  id: string;
  /** Outcome headline — the offer, stated as a result */
  headline: string;
  /** One-line emphasized promise */
  pitch: string;
  /** Supporting paragraph */
  description: string;
  /** Optional low-commitment entry point with a published price */
  entryOffer?: EntryOffer;
  /** Optional price anchor when there's no fixed entry price, e.g. "from $2,500" */
  priceAnchor?: string;
  /** CTA button label */
  ctaLabel: string;
  /** Which PRODUCTS entry in links.ts holds this CTA's destination URL */
  productKey: keyof typeof PRODUCTS;
}

/** The ongoing partnership layer, rendered as a distinct band below the buckets. */
export interface Retainer {
  id: string;
  /** Includes the price inline, e.g. "Enablement Retainer — $1,500/mo" */
  headline: string;
  description: string;
  /** Small framing line above the band — where the retainer sits in the motion. */
  kicker: string;
  ctaLabel: string;
  productKey: keyof typeof PRODUCTS;
}

export const serviceBuckets: ServiceBucket[] = [
  {
    id: "custom-automation",
    headline: "Custom automation for your business",
    pitch: "Stop doing it by hand.",
    description:
      "You have a repetitive workflow — data entry, document generation, copy-paste between tools. I assess it, recommend the most cost-effective approach using tools you already pay for, and build something that works the way you work.",
    entryOffer: {
      name: "AI Quick-Win Session",
      price: "$750 for my first three clients (then $1,000)",
      detail: "One 90-minute working session; you leave with one automation live.",
      guarantee:
        "If we don't get your first automation live in the session, the follow-up session is free.",
    },
    priceAnchor: "Larger builds are fixed-scope, from $2,500.",
    ctaLabel: "Book a Quick-Win",
    productKey: "quickWin",
  },
  {
    id: "ai-assistant",
    headline: "A custom AI assistant for your business",
    pitch: "An AI teammate that handles a job around the clock.",
    description:
      "Triaging inbound requests, drafting the weekly report, answering questions from your documents — built to do one job well. Everything runs in your accounts, on your keys: your data stays yours. I build and operate AI assistants for my own work every day; now I build them for businesses.",
    priceAnchor: "Scoped per engagement.",
    ctaLabel: "Let's scope it",
    productKey: "aiAssistant",
  },
  {
    id: "advisory",
    headline: "Product & AI advisory",
    pitch: "Build, buy, or configure — decided with someone who's shipped all three.",
    description:
      "Principal-level product guidance for teams navigating AI adoption or product decisions — grounded in operator experience across regulated industries (aerospace & defense, sports betting).",
    priceAnchor: "Pricing on request.",
    ctaLabel: "Book an intro call",
    productKey: "advisory",
  },
];

export const retainer: Retainer = {
  id: "retainer",
  headline: "Enablement Retainer — $1,500/mo",
  kicker: "The usual path: start with a Quick-Win, then keep going.",
  description:
    "For teams that want this every month: one new working tool or automation, shipped each month. A shared list of what's next so you always know what's coming, same-day weekday responses, and a monthly what's-new briefing. Month-to-month, cancel anytime.",
  ctaLabel: "Start a retainer",
  productKey: "retainer",
};

/** Small print under the section — how every engagement is priced. */
export const pricingNote =
  "Every engagement is fixed-scope and priced on the outcome, not the hour. Projects start with a 50% deposit. If budget is tight, I narrow the scope — not the quality.";
