// src/content/consulting.ts
// The /work page: the two ways to hire me. NetGoodLabs is a pointer to its
// own site; product advisory is scoped over email. Both are first person.

export const workPageHeader = {
  eyebrow: "WORK",
  title: "Two ways to work with me.",
  intro:
    "Hands-on AI and automation building for small businesses and nonprofits through NetGoodLabs, and product advisory for teams that need senior product judgment without a full-time hire. A client's own account of what that is like is at the bottom.",
} as const;

export interface Offer {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  /** Three to five concrete shapes the work takes */
  points: string[];
  ctaLabel: string;
}

export const consulting: Offer = {
  id: "consulting",
  eyebrow: "NETGOODLABS",
  title: "AI and automation for small teams, built so their own staff can run it.",
  body: "NetGoodLabs is my consulting practice for small businesses and nonprofits, any organization that does good work and runs on too few people. I started it after the Habitat for Humanity work showed me how much staff time goes into retyping, chasing and assembling the same documents, and how cheaply a plain automation in the tools they already pay for can give that time back. Every engagement starts with a fixed-price, two-week readiness assessment and ends with a handover the team can maintain without me.",
  points: [
    "Custom automations in Google Workspace or Microsoft 365, the CRM and the form tool already in use.",
    "Inbox triage, proposal and grant pipelines, operations dashboards, website analytics, event registration and intake form cleanup, each a fixed scope with a published starting price.",
    "Staff AI training built around the organization's own documents, with a one-page AI use policy for leadership or the board. Nonprofits get their own page with donor, grant and volunteer examples.",
  ],
  ctaLabel: "Visit NetGoodLabs",
};

export const advisory: Offer = {
  id: "advisory",
  eyebrow: "PRODUCT ADVISORY",
  title: "Senior product judgment for teams that are not ready for a full-time hire.",
  body: "For startups and product teams that need a principal-level product lead a few hours a week, not forty. I have run discovery, roadmaps and experimentation programs on aerospace programs and real-money consumer products, and I have managed and coached product managers through the same. Email me with the problem and we will scope the engagement to it.",
  points: [
    "A roadmap and KPI reset: what the team is building, why, and how you will know it worked.",
    "An experimentation cadence that makes UX changes measurable, from the first A/B test to the review ritual.",
    "Instrumentation and product analytics: event tracking and conversion funnels set up so the team can see where users drop off instead of guessing.",
    "A zero-to-one product scoped and specified, with the first release cut to what can ship.",
    "Coaching for a product manager or a founder doing the product job themselves.",
  ],
  ctaLabel: "Email about advisory",
};

export const closingCta = {
  title: "Let's talk.",
  body: "Hiring for a senior product role, or have a system that should run itself? Send me a note.",
} as const;
