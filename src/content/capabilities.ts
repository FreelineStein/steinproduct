// src/content/capabilities.ts
// What I am good at, grouped the way the résumé groups it.

export interface CapabilityGroup {
  title: string;
  items: string[];
}

export const capabilitiesHeader = {
  eyebrow: "CAPABILITIES",
  title: "What I bring to a team.",
} as const;

export const capabilities: CapabilityGroup[] = [
  {
    title: "Leadership",
    items: [
      "Team building and coaching",
      "Executive stakeholder management",
      "Cross-functional leadership across time zones",
      "Product operations",
      "International go-to-market",
    ],
  },
  {
    title: "Product",
    items: [
      "Growth strategy and experimentation",
      "Zero-to-one product",
      "Search, discovery and personalization",
      "Engagement and retention",
      "KPI frameworks and roadmap prioritization",
    ],
  },
  {
    title: "Technical",
    items: [
      "Python and SQL",
      "LLMs: Claude, GPT, Gemini",
      "Claude Code, Cursor, agent workflows",
      "Mixpanel, Growthbook, Domo",
      "Figma, Jira, Git, SAFe and Scrum",
    ],
  },
];
