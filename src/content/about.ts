// src/content/about.ts
// Who I am, in my own words. Short, specific, no adjectives doing the work.

export const about = {
  eyebrow: "WHO I AM",
  title: "An engineer who moved into product and never stopped building.",
  /** Asterisk pairs render as emphasis, e.g. *people*. Nothing else is markup. */
  paragraphs: [
    "I started as an electrical systems design engineer, extending MATLAB and Simulink toolchains to support model-based development of airplane systems. I found my footing in product when I won Boeing's internal product development Grand Challenge against 150 other teams, where I built a working prototype and received a meritorious invention award. I then spent a few years as a product owner for offboard and onboard connectivity systems on the New Midsize Airplane program, as well as flight deck systems on the 787, before moving to Maxar Technologies to own the dynamics and controls analysis functions on a low Earth orbit satellite program.",
    "After five years in aerospace, I wanted to work on a product where I could move fast and ship quickly, so I joined Tipico, a startup sportsbook technology company, as a product manager. There I owned all customer-facing surfaces, defined the core end-to-end flows, and grew the product from zero to one. I defined and owned the core KPIs, installed an experimentation and testing framework, and defined the taxonomy for how we tracked and measured events in our product analytics platform. When Tipico was acquired by LeoVegas, I followed. At LeoVegas I led a complete rebuild of the content configuration system, building the foundational operational tool to support multiple countries and markets, and I led the launch of the product in three international markets.",
    "Over the past few years I always kept building my own tools to support my workflows. I love working with *people*, and I wanted to do this full time. That led me to start my own consulting practice, where I work with nonprofits to help them understand and implement automation and AI in their work. I am based in Denver, CO, and while I continue to consult, I am open to the right roles from Senior PM through Head of Product.",
  ],
  education: [
    { school: "University of Washington", degree: "M.S., Electrical and Computer Engineering", years: "2018 to 2020" },
    { school: "Boise State University", degree: "B.S., Electrical and Computer Engineering. Minors in physics and applied mathematics", years: "2012 to 2017" },
  ],
} as const;
