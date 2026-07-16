// src/config/links.ts
// Single source of truth for every external URL on steinproduct.com.
// Components and content files import from here — never hard-code a URL elsewhere.
// Fill in each `TODO` value, then delete the comment. `null` = not live yet
// (components hide or disable the relevant CTA when a link is null).

export interface ProductLink {
  /** Matches the `id` of the corresponding entry in src/content/services.ts */
  id: string;
  /** Where the CTA sends the visitor */
  href: string | null;
  /** What kind of destination this is, so the UI can label/handle it correctly */
  kind: "stripe-payment-link" | "calendly" | "email" | "external";
}

export const SITE = {
  name: "Stein Product",
  wordmark: "SteinProduct",
  domain: "steinproduct.com",
  url: "https://steinproduct.com",
  tagline: "Principal PM who builds with modern AI.",
  location: "Denver, CO",
  email: "jacob@steinproduct.com", // Cloudflare Email Routing -> jacob.stein.22@gmail.com
} as const;

export const SOCIAL = {
  linkedin: "https://www.linkedin.com/in/jacobstein22/",
  substack: "https://substack.com/@jacobstein626773" as string | null,
} as const;

export const CALENDLY = {
  /**
   * PUBLIC "Book a free intro call" CTA.
   * IMPORTANT: use the specific Intro Call EVENT link, NOT the base profile
   * (calendly.com/steinproduct) — the profile exposes the paid Strategy Session.
   */
  introCall: "https://calendly.com/steinproduct/intro" as string | null, // TODO: paste Intro Call event URL
  /**
   * Paid 60-min Strategy Session (Stripe collected at booking).
   * PARKED: the Strategy Session tier is not shown on the site right now. The
   * URL is kept here so re-adding the service is just restoring its cards in
   * src/content/services.ts and a PRODUCTS entry below.
   */
  strategySession: "https://calendly.com/steinproduct/paid-strategy-session" as string | null,
} as const;

/**
 * Hosted Stripe Payment Links. The site only links out to these — there is no
 * Stripe SDK, no keys, no checkout code in this repo. Create each link in the
 * Stripe dashboard (Payment Links) and paste the URL.
 */
export const PRODUCTS: Record<string, ProductLink> = {
  // Bucket 1 entry offer.
  // PARKED CHECKOUT (2026-07-16): the old Payment Link
  // (buy.stripe.com/9B67sN1B32kV9k5aCJ8ww00) sells the retired $1,000/$750
  // session, so it can't stay live against $1,500 flat copy. Rather than
  // disable the CTA and leave bucket 1 with no conversion path, it routes to
  // the free intro call — a working path at no wrong price. The Quick-Win now
  // opens with a kickoff anyway, so booking one is a truer first step than
  // paying up front. TODO(Jacob): once the $1,500 Payment Link exists in
  // Stripe, decide whether to restore direct checkout here or keep the
  // call-first funnel; archive the old link either way.
  quickWin: {
    id: "quick-win",
    href: CALENDLY.introCall,
    kind: "calendly",
  },
  // Bucket 2 (custom AI assistant) — bespoke, no public price; routes to a scoping call.
  aiAssistant: {
    id: "ai-assistant",
    href: CALENDLY.introCall, // routes to the free intro call to scope the build
    kind: "calendly",
  },
  // Bucket 3 (product & AI advisory) — priced on request; routes to an intro call.
  advisory: {
    id: "advisory",
    href: CALENDLY.introCall, // routes to the free intro call
    kind: "calendly",
  },
  retainer: {
    id: "retainer",
    href: CALENDLY.introCall, // routes to the free intro call
    kind: "calendly",
  },
} as const;

/** Convenience: the primary header/hero CTA target. */
export const PRIMARY_CTA = {
  label: "Book a free intro call",
  href: CALENDLY.introCall, // resolves to null until the intro link is set
} as const;

/** mailto: helper for the contact/footer link. */
export const MAILTO = `mailto:${SITE.email}`;
