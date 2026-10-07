// src/content/services.ts
// The service offering, organized by OUTCOME. Three "buckets" describe what a
// client walks away with; engagement formats (a Quick-Win session, a fixed-scope
// build) live inside a bucket as its entry offer and price anchor. The Enablement
// Retainer is a separate "keep going" layer, not a fourth bucket.
//
// Components read from these exports; no service copy is hard-coded in JSX. Each
// entry's `productKey` points at the matching PRODUCTS entry in src/config/links.ts,
// which holds the real CTA URL (or `null`, which renders a disabled CTA).
//
// Every CTA on the page opens the same free intro call, so every label here says
// "Book a call" (2026-10-07). "Start a ..." read as checkout and landed on Calendly.
//
// Rendered copy never uses em or en dashes as separators (brand book). Comments
// are exempt.
//
// To reword or reprice: edit here. To wire a button: edit links.ts.

import type { PRODUCTS } from "@/config/links";

/** An entry offer: the low-commitment way into a bucket, with its own price. */
export interface EntryOffer {
  /** Offer name, e.g. "AI Quick-Win" */
  name: string;
  /** Price label, e.g. "$1,500 flat" */
  price: string;
  /** One line on what you get */
  detail: string;
  /** Risk-reversal line, shown under the price. Must agree with the FAQ answer on missing the week. */
  guarantee?: string;
}

/** An outcome-based service bucket: the sentence a referrer can repeat. */
export interface ServiceBucket {
  /** Stable id, also used as the anchor target */
  id: string;
  /** Outcome headline: the offer, stated as a result */
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

/** The ongoing partnership layer, rendered as a distinct band after the proof. */
export interface Retainer {
  id: string;
  /** Name only; the price is its own field so the component can set it in the signal face. */
  headline: string;
  /** Price label, e.g. "$2,000/mo" */
  price: string;
  description: string;
  /** Small framing line above the band: where the retainer sits in the motion. */
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
      "You have a repetitive workflow: data entry, document generation, copy-paste between tools. Stein Product assesses it, recommends the most cost-effective approach using tools you already pay for, and builds something that works the way you work.",
    entryOffer: {
      name: "AI Quick-Win",
      price: "$1,500 flat",
      detail:
        "A 90-minute kickoff to pick the workflow and lock the scope. Within a week you get it built and handed over live: a working automation, a recorded walkthrough, and written docs.",
      guarantee:
        "If it isn't live and documented within a week of kickoff, the follow-up session to finish it is free.",
    },
    priceAnchor: "Larger builds are fixed-scope, from $2,500.",
    ctaLabel: "Book a call about a Quick-Win",
    productKey: "quickWin",
  },
  {
    id: "ai-assistant",
    headline: "A custom AI assistant for your business",
    pitch: "An AI teammate that handles a job around the clock.",
    description:
      "Triaging inbound requests, drafting the weekly report, answering questions from your documents: built to do one job well. Everything you end up with runs in your own accounts, so your data stays yours. Stein Product runs on these assistants every day; now it builds them for businesses.",
    priceAnchor: "Fixed scope, priced after the intro call.",
    ctaLabel: "Book a call to scope it",
    productKey: "aiAssistant",
  },
  {
    id: "advisory",
    headline: "Product & AI advisory",
    pitch: "Build, buy, or configure: decided with someone who's shipped all three.",
    description:
      "Principal-level product guidance for teams navigating AI adoption or product decisions, grounded in operator experience across regulated industries (aerospace & defense, consumer sports betting).",
    priceAnchor: "Fixed scope, priced on request.",
    ctaLabel: "Book a call",
    productKey: "advisory",
  },
];

export const retainer: Retainer = {
  id: "retainer",
  headline: "Enablement Retainer",
  price: "$2,000/mo",
  kicker: "The usual path: a Quick-Win first, then keep going.",
  description:
    "For teams that want this every month: one automation of Quick-Win scope shipped each month, plus upkeep of everything already built for you. A shared list of what's next so you always know what's coming, same-day weekday responses, and a monthly what's-new briefing. Month-to-month, cancel anytime.",
  ctaLabel: "Book a call about a retainer",
  productKey: "retainer",
};

/** Small print under the section: how every engagement is priced. */
export const pricingNote =
  "Every engagement is fixed-scope and priced on the outcome, not the hour. Projects start with a 50% deposit. If budget is tight, you get a narrower scope, never lower quality. No surprise invoices.";
