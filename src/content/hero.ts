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
    "From large-scale aerospace programs to zero-to-one startup companies, I have managed products and teams of many shapes and sizes. I am flexible, resilient, communicative, and I find ways to drive results no matter the environment. Welcome to my portfolio.",
  secondaryLink: { label: "See the journey", href: "/journey" },
  proofRow: [
    "9+ years in product",
    "Aerospace, satellites, consumer",
    "M.S. Electrical and Computer Engineering",
  ],
} as const;
