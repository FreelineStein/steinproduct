// src/config/links.ts
// Single source of truth for every external URL on steinproduct.com.
// Components and content files import from here; never hard-code a URL
// elsewhere. `null` = not live yet (components disable the relevant CTA).

export interface ProductLink {
  id: string;
  href: string | null;
  kind: "calendly" | "email" | "external";
}

export const SITE = {
  name: "Stein Product",
  wordmark: "SteinProduct",
  domain: "steinproduct.com",
  url: "https://steinproduct.com",
  /** Feeds the footer, the manifest and the generated OG card. */
  tagline: "Jacob Stein. Product leader, engineer by training, builder by habit.",
  location: "Denver, CO",
  email: "jacob@steinproduct.com", // Cloudflare Email Routing -> jacob.stein.22@gmail.com
} as const;

/** The person the site is about. */
export const PERSON = {
  name: "Jacob Stein",
  title: "Product leader",
  linkedin: "https://www.linkedin.com/in/jacobstein22/",
  substack: "https://substack.com/@jacobstein626773" as string | null,
} as const;

/** Kept for existing imports; prefer PERSON. */
export const SOCIAL = {
  linkedin: PERSON.linkedin,
  substack: PERSON.substack,
} as const;

/**
 * The consulting practice. Nonprofit AI and automation work lives on its own
 * site; this site only points there. TODO(Jacob): swap in the purchased
 * domain once netgoodlabs has one.
 */
export const CONSULTING = {
  name: "NetGoodLabs",
  url: "https://netgoodlabs.vercel.app",
  tagline: "AI and automation for nonprofits, built to be run by your team.",
} as const;

/**
 * PARKED: the free intro call from the consulting era. Not rendered anywhere
 * on the portfolio; kept so restoring a booking CTA is a one-line change.
 */
export const CALENDLY = {
  introCall: "https://calendly.com/steinproduct/intro" as string | null,
} as const;

/** mailto: helper for every contact link. */
export const MAILTO = `mailto:${SITE.email}`;

/** The one action on the page: get in touch. */
export const PRIMARY_CTA = {
  label: "Get in touch",
  href: MAILTO as string | null,
  kind: "email" as ProductLink["kind"],
} as const;

