// src/content/hero.ts
// The opening statement, first person. The headline is the LCP element and
// renders static; one Highlight line per the brand book.

export const hero = {
  eyebrow: "JACOB STEIN · PRODUCT LEADER · DENVER, CO",
  /** Two display lines; the second carries the horizon highlight. */
  headline: {
    before: "Engineering rigor.",
    highlight: "Consumer speed.",
  },
  lead:
    "From large-scale aerospace programs to scrappy zero-to-one consumer products, I have managed products and teams of many shapes and sizes. I am flexible, I come up to speed fast, and I find the way to drive results no matter the situation.",
  secondaryLink: { label: "See the journey", href: "/journey" },
  proofRow: [
    "9+ years in product",
    "Aerospace, satellites, consumer",
    "M.S. Electrical and Computer Engineering",
  ],
} as const;
