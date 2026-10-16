// src/content/about.ts
// Who I am, in my own words. Short, specific, no adjectives doing the work.

export const about = {
  eyebrow: "WHO I AM",
  title: "An engineer who moved into product and never stopped building.",
  paragraphs: [
    "I started as an electrical systems design engineer, extending MATLAB and Simulink toolchains to support model-based development of airplane systems. I found my footing in product when I won Boeing's internal product development Grand Challenge against 150 other teams, where I built a working prototype and received a meritorious invention award. I then spent a few years as a product owner for offboard and onboard connectivity systems on the New Midsize Airplane program, as well as flight deck systems on the 787.",
    "Since then I have run product for satellite control software at Maxar and for real-money sportsbooks at Tipico and LeoVegas, where I managed and coached other product managers and shipped to players in Finland, Denmark and Brazil. The through-line is the same everywhere: understand the system down to its failure modes, decide what matters, and ship it.",
    "Today I build with AI agents daily. This site, the automation I shipped for a Habitat for Humanity chapter, and my own products were all made that way. I am based in Denver and open to Senior PM through Head of Product roles, and to the right consulting engagement.",
  ],
  education: [
    { school: "University of Washington", degree: "M.S., Electrical and Computer Engineering", years: "2018 to 2020" },
    { school: "Boise State University", degree: "B.S., Electrical and Computer Engineering. Minors in physics and applied mathematics", years: "2012 to 2017" },
  ],
} as const;
