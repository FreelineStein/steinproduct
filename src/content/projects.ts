// src/content/projects.ts
// Proof, not promises. Every entry here is real: a live product, this site, or
// shipped client work. Adding a project later is a data edit here, not a code
// change.
//
// To feature work: add an entry with a `label` (provenance) and, if it links
// out, an `href`. A client engagement can carry a structured `caseStudy`
// (problem / built / outcome) instead of a bare description.

export interface Project {
  id: string;
  title: string;
  /** One-line description (used when there's no caseStudy) */
  description: string;
  /** External link (live product, case study, repo). `null`/absent = not a link. */
  href?: string | null;
  /** Short tags, e.g. ["Next.js", "Automation"] */
  tags: string[];
  /** Provenance label shown on the card, e.g. "Own product" / "Client work" */
  label: string;
  /** Optional structured case study — renders in place of `description`. */
  caseStudy?: {
    problem: string;
    built: string;
    outcome: string;
  };
}

export const projects: Project[] = [
  {
    id: "pick-receipts",
    title: "Pick Receipts",
    description:
      "A sports-betting transparency platform I designed, built, and shipped solo.",
    href: "https://pickreceipts.com/",
    tags: ["Sports Betting", "Web App", "Next.js"],
    label: "Own product",
  },
  {
    id: "this-site",
    title: "steinproduct.com — this site",
    description:
      "A statically-exported Next.js build, designed and shipped solo with the same AI-augmented workflow I sell.",
    tags: ["Next.js", "Static export", "Design"],
    label: "Own build",
  },
  {
    id: "nonprofit-doc-automation",
    title: "Document automation for a Temecula nonprofit affiliate",
    description:
      "A repetitive document-generation workflow, done by hand, turned into a working automation.",
    tags: ["Automation", "Document generation"],
    label: "Client work",
    caseStudy: {
      problem:
        "A repetitive document-generation workflow was being done by hand, week after week.",
      built:
        "I assessed the workflow and built an automation using tools they already paid for — no new software to buy.",
      outcome:
        "Hours of manual work removed every week, and the engagement earned a referral.",
    },
  },
];
