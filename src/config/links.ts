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
  tagline: "Principal PM who builds with AI agents.",
  location: "Denver, CO",
  email: "jacob@steinproduct.com", // Cloudflare Email Routing -> jacob.stein.22@gmail.com
} as const;

export const SOCIAL = {
  linkedin: "https://www.linkedin.com/in/jacobstein22/",
  substack: null as string | null, // TODO: paste Substack URL when ready
} as const;

export const CALENDLY = {
  /**
   * PUBLIC "Book a free intro call" CTA.
   * IMPORTANT: use the specific Intro Call EVENT link, NOT the base profile
   * (calendly.com/steinproduct) — the profile exposes the paid Strategy Session.
   */
  introCall: "https://calendly.com/steinproduct/30min" as string | null, // TODO: paste Intro Call event URL
  /** Paid 60-min Strategy Session (Stripe collected at booking) */
  strategySession: "https://calendly.com/steinproduct/paid-strategy-session" as string | null, // TODO: paste Strategy Session event URL
} as const;

/**
 * Hosted Stripe Payment Links. The site only links out to these — there is no
 * Stripe SDK, no keys, no checkout code in this repo. Create each link in the
 * Stripe dashboard (Payment Links) and paste the URL.
 */
export const PRODUCTS: Record<string, ProductLink> = {
  quickWin: {
    id: "quick-win",
    href: "https://buy.stripe.com/9B67sN1B32kV9k5aCJ8ww00", // TODO: Stripe Payment Link — AI Quick-Win Session ($1,000 / $750 intro)
    kind: "stripe-payment-link",
  },
  retainer: {
    id: "retainer",
    href: CALENDLY.introCall, // routes to the free intro call
    kind: "calendly",
  },
  strategySession: {
    id: "strategy-session",
    href: CALENDLY.strategySession, // the paid Strategy Session event
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
