// src/content/hero.ts
// The opening statement, first person. The headline is the LCP element and
// renders static; one Highlight line per the brand book.

export const hero = {
  eyebrow: "JACOB STEIN · PRODUCT LEADER · DENVER, CO",
  /** Three display lines; the middle one carries the horizon highlight. */
  headline: {
    before: "Engineering rigor.",
    highlight: "Consumer speed.",
    after: "One product leader.",
  },
  lead:
    "I have spent nine years moving between two worlds that rarely talk to each other: avionics at Boeing and satellite software at Maxar, then consumer sportsbooks at Tipico and LeoVegas, an MGM Resorts subsidiary, where I led product across three countries and shipped weekly. Now I build with AI every day, for myself and for the people I work with.",
  secondaryLink: { label: "See the journey", href: "#journey" },
  proofRow: [
    "9+ years in product",
    "Aerospace, satellites, consumer",
    "M.S. Electrical and Computer Engineering",
  ],
} as const;
