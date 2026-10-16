// src/content/about.ts
// Who I am, in my own words. Short, specific, no adjectives doing the work.

export const about = {
  eyebrow: "WHO I AM",
  title: "An engineer who moved into product and never stopped building.",
  /** Asterisk pairs render as emphasis, e.g. *people*. Nothing else is markup. */
  paragraphs: [
    "I am an engineer who moved into product and never stopped building. I started in aerospace, where I learned to understand a system down to its failure modes before changing it, and found my footing in product by winning Boeing's internal Grand Challenge with a working prototype rather than a deck.",
    "After five years of airplanes and satellites I wanted to move fast and ship, so I went to a startup sportsbook and took a consumer product from zero to one, then through an acquisition and into three international markets. I am an expert in product analytics tools, market research, and using data to drive decisions.",
    "Along the way I kept building my own tools, and I love working with *people*, so I made that my full-time work. Today I run a consulting practice helping nonprofits put automation and AI to use, and I am open to the right Senior PM through Head of Product role. I am based in Denver, CO.",
  ],
  education: [
    { school: "University of Washington", degree: "M.S., Electrical and Computer Engineering", years: "2018 to 2020" },
    { school: "Boise State University", degree: "B.S., Electrical and Computer Engineering. Minors in physics and applied mathematics", years: "2012 to 2017" },
  ],
} as const;
