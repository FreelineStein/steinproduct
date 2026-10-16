// src/content/work.ts
// The /builds page. Proof, not promises: every entry is real, a live product,
// a working prototype, an agent that runs my week, shipped client work or
// this site. Own products cleared for the page 2026-10-15; the agents and
// internal tools 2026-10-16. Adding a build later is a data edit here.

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

export const buildsHeader = {
  eyebrow: "BUILDS",
  title: "Things I built, not slides about building.",
  intro:
    "Own products, the agents that run my week, client work and the sites themselves, all shipped with the same AI-agent workflow I use every day.",
  /** Above the full grid on /builds */
  allTitle: "Own products, agents, client work and the sites themselves.",
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
    id: "scout",
    title: "Scout, a weekly lead and job agent",
    label: "Own build",
    status: "Live",
    description:
      "An agent that runs every Monday morning, finds nonprofits and small businesses that likely need an automation built, plus early-stage companies that likely need a product leader, and writes a ranked brief with evidence behind every claim.",
    points: [
      "Public sources only: funder grant announcements, 990 and SEC Form D filings, ATS job boards, startup news and company websites. No logins, nothing behind a wall.",
      "Hard gates first, then a multiplicative rank inside two pools. Every row carries the quote, URL and fetch date for each claim, so I can cite it in outreach.",
      "Runs as a scheduled Claude task with nothing to host. The rubric lives on a Notion config page it reads each run, so tuning is a doc edit. It never contacts anyone; I review the brief in about ten minutes.",
    ],
    tags: ["Agents", "Claude", "Notion", "Lead gen"],
    href: null,
    linkNote: "Internal tool, briefs land in Notion",
  },
  {
    id: "command-center",
    title: "Command center",
    label: "Own build",
    status: "Live",
    description:
      "A local dashboard that answers the question of what to do next the moment I sit down, ranked across consulting, job search, builds and life, with every task editable in place.",
    points: [
      "Tasks are plain markdown in my Obsidian vault, one file per project, in a format the dashboard, my phone assistant and Claude sessions all write the same way.",
      "A transparent rules score ranks the top three on priority, due pressure, age and time until the next meeting. The morning agent pass can pin items with a one-line reason.",
      "TypeScript monorepo: a byte-exact task parser shared by a Hono server that watches the vault and streams changes, and a React front end. Edits touch one line, check a hash first and commit to git. Runs on a Mac mini over Tailscale.",
    ],
    tags: ["TypeScript", "React", "Agents", "Obsidian"],
    href: null,
    linkNote: "Runs on my home network",
  },
  {
    id: "tasha",
    title: "Tasha, a second brain over Discord",
    label: "Own build",
    status: "Live",
    description:
      "An always-on AI assistant I message from my phone. It captures notes and tasks into my Obsidian vault, recalls them later, and runs a weekly triage pass over everything I filed.",
    points: [
      "The vault is the memory, not the chat transcript: the assistant reads and writes markdown files directly, and idle conversations reset so stale chat never competes with what is written down.",
      "Least privilege by design: it commits but cannot push, schedules its own jobs only by asking the host, and every outbound API call goes through a gateway it does not control.",
      "A Node host on a Mac mini spawning per-session Claude Agent SDK containers. Live since July 2026.",
    ],
    tags: ["Agents", "Claude Agent SDK", "Discord", "Node"],
    href: null,
    linkNote: "Private, one user",
  },
  {
    id: "friends-trackers",
    title: "NFL and MLB trackers for a friend group",
    label: "Own build",
    status: "Live",
    description:
      "Two season-long games for the same six friends: cumulative MLB wins across drafted teams, and an NFL predictions game scored live against sportsbook odds.",
    points: [
      "Both read ESPN's public endpoints with no database or login. The MLB app fetches standings in the browser; the NFL app caches standings and futures odds in two route handlers.",
      "The NFL game ranks everyone by forecasted points: each pick's value times its vig-removed probability from the odds, flipping to settled as results land. The scoring math has unit tests.",
      "Next.js, TypeScript and Tailwind on Vercel. Picks and rosters are committed config, because a backend was not worth building for a one-day submission window.",
    ],
    tags: ["Next.js", "Sports data", "Vercel"],
    href: "https://nfl-with-friends.vercel.app",
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
