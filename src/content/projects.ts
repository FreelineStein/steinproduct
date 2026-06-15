// src/content/projects.ts
// Things Jacob has built. This is the extensibility hook for the future
// portfolio/studio site — adding a project later is a data edit here, not a
// code change. For v1 the Projects section is a "coming soon" stub.
//
// To feature work: add an entry, set `comingSoon: false`, and (optionally) a
// `href`. Mark client work with kind: "client".

export interface Project {
  id: string;
  title: string;
  /** One-line description */
  description: string;
  /** Optional external link (case study, live demo, repo) */
  href?: string;
  /** Short tags, e.g. ["Sports betting", "Next.js"] */
  tags: string[];
  /** Whether this is personal or client work */
  kind: "personal" | "client";
  /** Hide details behind a "coming soon" treatment for v1 */
  comingSoon?: boolean;
}

export const projects: Project[] = [
  {
    id: "client-reporting-dashboard",
    title: "Client Reporting Dashboard",
    description:
      "Dashboards that cleanly surface and visualize all of your most important company data.",
    tags: ["Dashboards", "Data Viz", "Automation"],
    kind: "personal",
    comingSoon: true,
  },
  {
    id: "pick-receipts",
    title: "Pick Receipts",
    description: "A sports-betting transparency platform.",
    tags: ["Sports Betting", "Web App", "Next.js"],
    kind: "personal",
    comingSoon: true,
  },
  {
    id: "custom-fantasy-sport-games",
    title: "Custom Fantasy Sport Games",
    description: "Automated sports data tracking to make custom games easy.",
    tags: ["Sports Data", "Automation"],
    kind: "personal",
    comingSoon: true,
  },
];
