// src/content/hero.ts
// The opening statement, first person. The headline is the LCP element and
// renders static; one Highlight line per the brand book.

export const hero = {
  eyebrow: "JACOB STEIN · PRODUCT LEADER · DENVER, CO",
  /** Two display lines; the second carries the horizon highlight. */
  headline: {
    before: "Product leader.",
    highlight: "Builder and advisor.",
  },
  lead:
    "I have spent my career turning complex problems into shipped products, from aircraft and satellite systems at Boeing and Maxar to a consumer sportsbook I helped take from zero to one and into three international markets. I set strategy tied to measurable results, lead and coach product teams, and still build hands-on. Today I advise companies on product, and I am open to Senior PM through Head of Product roles.",
  secondaryLink: { label: "See the journey", href: "/journey" },
  proofRow: [
    "9+ years in product",
    "Aerospace, satellites, consumer",
    "M.S. Electrical and Computer Engineering",
  ],
} as const;
