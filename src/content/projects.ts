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
    id: "this-site",
    title: "steinproduct.com — this site",
    description:
      "A statically-exported Next.js build, designed and shipped solo with the same AI-augmented workflow I sell.",
    tags: ["Next.js", "Static export", "Design"],
    label: "Own build",
  },
  {
    id: "habitat-doc-automation",
    title: "Document automation for Habitat for Humanity Inland Valley",
    description:
      "Thirteen hand-filled documents per homeowner, turned into a one-click generator.",
    tags: ["Automation", "Apps Script", "Google Workspace"],
    label: "Client work",
    caseStudy: {
      problem:
        "Every approved homeowner in their home repair program needed 13 legal and program documents — each one filled in by hand, retyping the same applicant details.",
      built:
        "A one-click generator inside the Google Sheet they already worked from — it fills every template and files finished Word and PDF copies in a folder named for the homeowner. No new software, no per-use fees.",
      outcome:
        "Hours of document work removed per applicant, the team maintains it themselves, and the engagement earned a referral.",
    },
  },
];
