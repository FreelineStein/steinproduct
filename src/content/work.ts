// src/content/work.ts
// Proof, not promises. Every entry is real: a live product, a working
// prototype, shipped client work or this site. Own products are cleared for
// the page as of 2026-10-15. Adding work later is a data edit here.

export interface WorkItem {
  id: string;
  title: string;
  /** Provenance: "Own product", "Own build", "Client work" */
  label: string;
  /** Short status set in a Tag: "Live", "Prototype", "Shipped" */
  status: "Live" | "Prototype" | "Shipped";
  /** One plain sentence on what it is */
  description: string;
  /** Three or four concrete facts */
  points: string[];
  tags: string[];
  /** External link. null = no public link yet. */
  href: string | null;
  /** Shown instead of the link when href is null */
  linkNote?: string;
}

export const workHeader = {
  eyebrow: "WORK",
  title: "Things I built, not slides about building.",
  intro:
    "Own products, client work and this site, all shipped with the same AI-agent workflow I use every day.",
} as const;

export const work: WorkItem[] = [
  {
    id: "pick-receipts",
    title: "Pick Receipts",
    label: "Own product",
    status: "Live",
    description:
      "The real win and loss record of sports-betting creators, built from their own public posts, so followers can see whether the picks actually win.",
    points: [
      "Paste a post URL, no account needed. Claude reads the picks out of the text and images, with a second model as fallback.",
      "A scheduled job settles every pick against ESPN scores and grabs closing odds: spreads, moneylines, totals, props and each leg of a parlay.",
      "FastAPI and PostgreSQL on the back end, Next.js on the front, PostHog for product analytics. Bot protection with Turnstile, rate limits and a honeypot.",
    ],
    tags: ["Sports betting", "Claude", "FastAPI", "Next.js"],
    href: "https://pickreceipts.com",
  },
  {
    id: "ambient",
    title: "Ambient, a smart home monitor",
    label: "Own build",
    status: "Prototype",
    description:
      "An AI home monitor that watches the porch, garage and pets and sends plain-English alerts with a photo, like a package left by the front door at 2:14pm.",
    points: [
      "Cheap on-device models watch all the time; Claude only interprets the moments that matter, so it is fast and inexpensive to run.",
      "Privacy first: cameras stream only on the home network to a machine at home. One module can send data out, and it sends event text plus at most one downscaled photo.",
      "Python, a config-driven five-layer design, alerts to Discord, 30 offline tests and a demo that needs no hardware. About $120 of hardware to start.",
    ],
    tags: ["Computer vision", "Claude", "Python", "Hardware"],
    href: null,
    linkNote: "Phase 1 code complete, camera install next",
  },
  {
    id: "habitat-doc-automation",
    title: "Document automation for Habitat for Humanity Inland Valley",
    label: "Client work",
    status: "Shipped",
    description:
      "Thirteen hand-filled documents per homeowner in their home repair program, turned into a one-click generator inside the Google Sheet they already used.",
    points: [
      "Fills every template and files finished Word and PDF copies in a folder named for the homeowner. No new software, no per-use fees.",
      "Skipped AI on purpose: a plain automation was the cheaper, more reliable answer for this job.",
      "Hours of document work removed per applicant. The team maintains it themselves, and the engagement earned a referral.",
    ],
    tags: ["Automation", "Google Sheets", "Documents"],
    href: null,
    linkNote: "Internal tool, no public link",
  },
  {
    id: "netgoodlabs",
    title: "NetGoodLabs",
    label: "Own build",
    status: "Live",
    description:
      "My consulting practice for nonprofits, with its own site: a fixed-price readiness assessment and an a la carte menu of automations.",
    points: [
      "Designed and shipped in a day from a written design system: warm-paper palette, serif display type, one action color.",
      "Next.js static export, typed content files so copy and prices are data edits, PostHog analytics, Lighthouse 100 on mobile and desktop.",
    ],
    tags: ["Next.js", "Design system", "Static site"],
    href: "https://netgoodlabs.vercel.app",
  },
  {
    id: "this-site",
    title: "This site, steinproduct.com",
    label: "Own build",
    status: "Live",
    description:
      "A brand system and a live 3D hero, designed and shipped with the same agent workflow behind everything else here.",
    points: [
      "First Light, a brand from scratch: a sunrise-from-orbit logo, three typefaces, color tokens, components and a written brand book.",
      "The hero is a 162-tile planet modeled in Blender by an AI agent, exported at under 400 KB and rendered live in the browser. It turns on its own, lifts under the cursor and comes apart on a click. Phones get a still image.",
      "Static, fast, nothing to maintain.",
    ],
    tags: ["Brand system", "3D hero", "Next.js"],
    href: null,
    linkNote: "You are looking at it",
  },
];
