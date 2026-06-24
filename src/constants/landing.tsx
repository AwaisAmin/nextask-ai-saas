import type { ReactNode } from "react";

// ─── Nav ──────────────────────────────────────────────────────────────────────

export const NAV_LINKS: {
  label: string;
  href: string;
  hideOnMobile?: boolean;
}[] = [
  { label: "Product", href: "#features", hideOnMobile: true },
  { label: "AI Agent", href: "#ai", hideOnMobile: true },
  { label: "Pricing", href: "#pricing", hideOnMobile: true },
  { label: "Sign in", href: "/login" },
];

// ─── Hero ─────────────────────────────────────────────────────────────────────

export const PROMPT = "Plan the website redesign sprint";

export const AI_CARDS = [
  {
    id: "WEB-61",
    title: "Define hero messaging",
    color: "#FF8A4C",
    bars: [true, true, true],
  },
  {
    id: "WEB-62",
    title: "Build hero component",
    color: "#4CA6FF",
    bars: [true, true, false],
  },
  {
    id: "WEB-63",
    title: "Compress media assets",
    color: "#7B61FF",
    bars: [true, true, false],
  },
] as const;

export type AiCard = (typeof AI_CARDS)[number];

export const STEPS = [
  "Reading project context",
  "Checking team workload",
  "Creating 3 tasks & assigning",
];

// ─── Bento ────────────────────────────────────────────────────────────────────

export const TILES: {
  wide: boolean;
  icon: ReactNode;
  title: string;
  desc: string;
  delay: string;
}[] = [
  {
    wide: true,
    icon: (
      <>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M9 4v16M15 4v16" />
      </>
    ),
    title: "Boards & sprints — the Jira you'll actually enjoy",
    desc: "Drag-and-drop Kanban, epics, story points, dependencies and a real Gantt roadmap. Fast keyboard-first navigation throughout.",
    delay: "",
  },
  {
    wide: false,
    icon: (
      <>
        <path d="M6 3h8l4 4v14H6z" />
        <path d="M14 3v4h4" />
        <path d="M9 12h6M9 16h6" />
      </>
    ),
    title: "Docs & wikis",
    desc: "Block-based docs that link straight to tasks. Like Notion, minus the lag.",
    delay: "d1",
  },
  {
    wide: false,
    icon: <path d="M4 5h16v11H9l-4 3.5V16H4z" />,
    title: "Team chat",
    desc: "Channels, threads, mentions and reactions — with AI summaries built in.",
    delay: "",
  },
  {
    wide: false,
    icon: <path d="M13 3 5 13h6l-1 8 8-10h-6z" />,
    title: "No-code automations",
    desc: "IF this THEN that. Notify, assign, escalate and move work automatically.",
    delay: "d1",
  },
  {
    wide: true,
    icon: (
      <>
        <circle cx="11" cy="11" r="6.5" />
        <path d="M20 20l-3.6-3.6" />
      </>
    ),
    title: "Search & insights across everything",
    desc: "Ask in plain language and find any task, doc or message instantly. Velocity, burndown and workload analytics, always up to date.",
    delay: "d2",
  },
];

// ─── AI Section ───────────────────────────────────────────────────────────────

export const ROWS = [
  { who: "Lena", color: "#4CA6FF", before: 92, after: 60, tag: "overloaded" },
  { who: "Dev", color: "#F5B23E", before: 30, after: 58, tag: "has room" },
  { who: "Omar", color: "#36C58E", before: 45, after: 49, tag: "" },
];

export const AI_FEATURES: { icon: ReactNode; title: string; desc: string }[] = [
  {
    icon: (
      <>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M9 4v16M15 4v16" />
      </>
    ),
    title: "Plans sprints for you",
    desc: '"Plan the next sprint" → tasks created, prioritized, assigned by skill and availability.',
  },
  {
    icon: <path d="M4 5h16v11H9l-4 3.5V16H4z" />,
    title: "Turns meetings into action",
    desc: "Paste notes → the agent extracts action items, owners and due dates automatically.",
  },
  {
    icon: <path d="M13 3 5 13h6l-1 8 8-10h-6z" />,
    title: "Keeps everyone unblocked",
    desc: "Daily standups, workload rebalancing, at-risk flags — delivered before you ask.",
  },
];

// ─── Testimonials ─────────────────────────────────────────────────────────────

export const QUOTES = [
  {
    text: "We cancelled Jira, Notion and Slack in the same week. The AI agent plans our sprints better than I do — and the whole team actually enjoys using it.",
    initials: "TB",
    name: "Theo Brandt",
    role: "Head of Product, Loop",
    gradient: "linear-gradient(150deg, #7b61ff, #4b3aa0)",
  },
  {
    text: "Setup took two minutes. By the end of day one we'd shipped our first sprint. The ⌘K agent feels like a senior PM that never sleeps.",
    initials: "SM",
    name: "Sara Malik",
    role: "Design Lead, Northwind",
    gradient: "linear-gradient(150deg, #ff8a4c, #b5552a)",
  },
  {
    text: "Automations + AI summaries cut our status-meeting time in half. Engineering finally has one source of truth.",
    initials: "OR",
    name: "Omar Reyes",
    role: "Eng Manager, Vertex",
    gradient: "linear-gradient(150deg, #36c58e, #1f7a58)",
  },
];

// ─── Stats ────────────────────────────────────────────────────────────────────

export const STATS = [
  {
    label: "Jira + Notion + Slack",
    display: "3 in 1",
    count: null as null,
    suffix: undefined as string | undefined,
  },
  { label: "Less time on busywork", display: "0%", count: 40, suffix: "%" },
  {
    label: "From signup to first task",
    display: "0 min",
    count: 2,
    suffix: " min",
  },
  {
    label: "Teams onboard & counting",
    display: "0+",
    count: 12000,
    suffix: "+",
  },
];

// ─── Trust ────────────────────────────────────────────────────────────────────

export const LOGOS = [
  "Northwind",
  "Loop",
  "Vertex",
  "Cascade",
  "Monarch",
  "Lumen",
  "Forge",
];

// ─── Footer ───────────────────────────────────────────────────────────────────

export const FOOTER_LINKS: Record<string, { label: string; href: string }[]> = {
  Product: [
    { label: "Boards", href: "#features" },
    { label: "Docs", href: "#features" },
    { label: "AI Agent", href: "#ai" },
    { label: "Pricing", href: "#pricing" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Contact", href: "#" },
  ],
  Resources: [
    { label: "Live demo", href: "#" },
    { label: "Mobile app", href: "#" },
    { label: "Docs", href: "#" },
    { label: "Changelog", href: "#" },
  ],
};

// ─── Pricing ──────────────────────────────────────────────────────────────────

export const FREE_FEATURES = [
  "Up to 3 projects & 5 members",
  "Boards, docs & chat",
  "10 AI Agent actions / day",
];

export const PRO_FEATURES = [
  "Unlimited projects · 50 members",
  "100 AI actions / day + automations",
  "Roadmaps, analytics & integrations",
  "Priority support",
];

export const ENTERPRISE_FEATURES = [
  "Everything in Pro, unlimited",
  "SSO / SAML & SCIM",
  "Audit logs, data residency, SLA",
  "Dedicated success manager",
];
