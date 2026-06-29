import { APP_DOMAIN } from "@/lib/constants";
import type {
  BillingCycle,
  CheckoutFormState,
  InviteRow,
  MemberRole,
  OnboardingCtx,
  OrgSize,
  Plan,
  SeatState,
  Template,
  TemplateId,
  UseCase,
} from "@/features/onboarding/types";

// ── Slug field ───────────────────────────────────────────────────────────────

export const SLUG_STATUS = {
  OK: "ok",
  SHORT: "short",
  TAKEN: "taken",
} as const;

export const SLUG_STATUS_LABELS = {
  ok: "available",
  short: "too short",
  taken: "taken",
} as const;

// ── Timing ───────────────────────────────────────────────────────────────────

export const ANIM_DURATION_MS = 320;
export const COPIED_RESET_MS = 1500;

// ── OnboardingPage ────────────────────────────────────────────────────────────

export const STEP_COUNT = 3;
export const INVITE_STEP_INDEX = 1;
export const PROJECT_STEP_INDEX = 2;

export const SKIP_LABELS: Record<number, string> = {
  1: "Skip for now",
  2: "Skip — start blank",
};

export const BUILD_TITLE_BLANK = "Setting up your project…";
export const BUILD_TITLE_AI = "Building your workspace…";
export const ONBOARDING_DESTINATION = "/organizations";

export const AI_BUILD_STEPS = [
  "Creating the project board",
  "Generating starter tasks with AI",
  "Assigning by skill & setting due dates",
  "Writing your first daily standup",
] as const;

export const BLANK_BUILD_STEPS = ["Creating the project board"] as const;

export const DEFAULT_CTX: OnboardingCtx = {
  plan: "free",
  org: {
    name: "",
    slug: "",
    accent: "#7B61FF",
    useCase: "product",
    size: "2-10",
  },
  invites: [],
  project: { name: "My Project", tplId: "blank" },
};

// ── StepOrg ───────────────────────────────────────────────────────────────────

export const ORG_ACCENTS = [
  "#7B61FF",
  "#FF6B5C",
  "#2FBF87",
  "#F5A623",
  "#3B9BFF",
  "#E84CC4",
] as const;

export const ORG_USE_CASES: UseCase[] = [
  {
    id: "product",
    path: "M3 3h18v6H3zM3 13h8v8H3zM15 13h6v8h-6z",
    label: "Product & engineering",
  },
  {
    id: "agency",
    path: "M12 3l9 5-9 5-9-5zM3 13l9 5 9-5",
    label: "Agency & clients",
  },
  {
    id: "marketing",
    path: "M3 11l18-7-7 18-2.5-7z",
    label: "Marketing & content",
  },
  {
    id: "ops",
    path: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM2 12h20",
    label: "Operations & other",
  },
];

export const ORG_SIZES: { label: string; value: OrgSize }[] = [
  { label: "Just me", value: "Just me" },
  { label: "2–10", value: "2-10" },
  { label: "11–50", value: "11-50" },
  { label: "51–200", value: "51-200" },
  { label: "200+", value: "200+" },
];

export const ORG_LARGE_SIZES: OrgSize[] = ["11-50", "51-200", "200+"];

export const TAKEN_SLUGS = [
  "acme",
  "google",
  "test",
  "admin",
  "app",
  "nextask",
  "demo",
];

// ── StepInvite ───────────────────────────────────────────────────────────────

export const SLUG_PREFIX = `${APP_DOMAIN}/`;
export const INVITE_LINK_BASE = `${APP_DOMAIN}/join/`;
export const INVITE_LINK_SUFFIX = "-x8f2";

export const PLANS = {
  free: {
    id: "free" as Plan,
    name: "Free",
    priceMonthly: 0,
    perSeat: false,
    seats: 5,
    projects: 3,
    aiPerDay: 10,
    overage: "pending" as const,
  },
  pro: {
    id: "pro" as Plan,
    name: "Pro",
    priceMonthly: 12,
    perSeat: true,
    seats: 50,
    projects: Infinity,
    aiPerDay: 100,
    overage: "bill" as const,
  },
} satisfies Record<Plan, object>;

// ── Checkout ─────────────────────────────────────────────────────────────────

export const CHECKOUT_ANNUAL_DISCOUNT = 0.8;

export const CHECKOUT_BADGE = "✦ NexTask Pro";
export const CHECKOUT_HEADLINE = "Activate your whole team";

export const BILLING_CYCLES: {
  id: BillingCycle;
  label: string;
  badge?: string;
}[] = [
  { id: "monthly", label: "Monthly" },
  { id: "annual", label: "Annual", badge: "−20%" },
];

export const CYCLE_BILLED_LABEL: Record<BillingCycle, string> = {
  monthly: "monthly",
  annual: "annually",
};

export const CYCLE_PERIOD: Record<BillingCycle, string> = {
  monthly: "/mo",
  annual: "/yr",
};

export const CHECKOUT_FEATURES = [
  "Unlimited projects & up to 50 members",
  "100 AI Agent actions / day",
  "Roadmaps, analytics & automations",
  "Priority support",
] as const;

export const COUNTRIES = [
  "United States",
  "United Kingdom",
  "Pakistan",
  "India",
  "Canada",
  "Australia",
  "Germany",
] as const;

export const CHECKOUT_DEFAULT_FORM: CheckoutFormState = {
  name: "",
  cardNum: "",
  expiry: "",
  cvc: "",
  country: COUNTRIES[0],
};

// ── Seat bar ──────────────────────────────────────────────────────────────────

export const SEAT_FILL_COLORS: Record<SeatState, string> = {
  ok: "var(--primary)",
  full: "var(--warn)",
  pending: "var(--danger)",
  overage: "var(--info)",
};

export const UNLIMITED_SEAT_DENOMINATOR = 60;

// ── StepInvite UI strings ─────────────────────────────────────────────────────

export const STEP_INVITE_TITLE = "Invite your team";
export const STEP_INVITE_SUB_PRE =
  "NexTask is better together. Invite teammates to";
export const STEP_INVITE_SUB_POST = "— they'll get an email to join.";
export const FALLBACK_ORG_NAME = "your workspace";
export const FALLBACK_ORG_SLUG = "workspace";
export const DEFAULT_INVITE_ROLE: MemberRole = "member";
export const SEAT_LABEL_UNLIMITED = "Unlimited";
export const SEATBAR_SEATS_LABEL = "seats used";
export const SEATBAR_PLAN_SUFFIX = "plan";
export const INVITE_EMAIL_PLACEHOLDER = "name@company.com";
export const INVITE_NEXT_LABEL_SKIP = "Continue without inviting";
export const INVITE_PENDING_LABEL = "Pending";
export const INVITE_PENDING_PILL_TITLE = "Saved as pending until you upgrade";
export const INVITE_LINK_LABEL = "Or share an invite link";
export const INVITE_COPY_LABEL = "Copy";
export const INVITE_COPIED_LABEL = "Copied";
export const INVITE_ADD_ROW_LABEL = "Add another";
export const BULK_TOGGLE_PROMPT = "Got a list?";
export const BULK_TOGGLE_CTA = "Paste multiple emails";
export const BULK_PASTE_PLACEHOLDER =
  "alex@acme.com, sara@acme.com, omar@acme.com";

export const INVITE_ROLES: { id: MemberRole; name: string; desc: string }[] = [
  { id: "admin", name: "Admin", desc: "Manage members, billing & settings" },
  { id: "member", name: "Member", desc: "Create and work on projects" },
  { id: "viewer", name: "Viewer", desc: "Read-only access" },
];

export const DEFAULT_INVITE_ROWS: InviteRow[] = [
  { email: "", role: "member" },
  { email: "", role: "member" },
  { email: "", role: "member" },
];

// ── StepProject ──────────────────────────────────────────────────────────────

export const TEMPLATE_RECOMMENDED_LABEL = "Recommended";
export const TEMPLATE_EMPTY_LABEL = "Empty board";
export const TEMPLATE_AI_TASKS_LABEL = "AI tasks included";

export const PROJECT_TEMPLATES: Template[] = [
  {
    id: "product",
    emoji: "◆",
    color: "#7B61FF",
    name: "Product / Sprint",
    desc: "Kanban, sprints, bugs & backlog",
    tasks: 8,
    for: ["product"],
  },
  {
    id: "marketing",
    emoji: "✦",
    color: "#FF8A4C",
    name: "Marketing campaign",
    desc: "Briefs, content calendar, launch",
    tasks: 7,
    for: ["marketing"],
  },
  {
    id: "design",
    emoji: "▲",
    color: "#36C58E",
    name: "Design / Agency",
    desc: "Research, explore, deliver to clients",
    tasks: 6,
    for: ["agency", "ops"],
  },
  {
    id: "blank",
    emoji: "＋",
    color: "#7E8595",
    name: "Blank project",
    desc: "Just the columns — start fresh",
    tasks: 0,
    for: [],
  },
];

export const DEFAULT_PROJECT_NAMES: Record<TemplateId, string> = {
  product: "Website Redesign",
  marketing: "Q3 Launch",
  design: "Brand Refresh",
  blank: "My Project",
};
