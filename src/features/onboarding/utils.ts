import {
  CHECKOUT_ANNUAL_DISCOUNT,
  INVITE_NEXT_LABEL_SKIP,
  PLANS,
  PROJECT_TEMPLATES,
  SEAT_FILL_COLORS,
  SLUG_STATUS,
  TAKEN_SLUGS,
  UNLIMITED_SEAT_DENOMINATOR,
} from "@/constants/onboarding";
import type {
  BillingCycle,
  CheckoutFormState,
  InviteRow,
  OrgUseCase,
  Plan,
  SeatMessage,
  SeatStatus,
  SlugStatus,
  TemplateId,
} from "./types";

export { toInitials } from "@/lib/format";

// ── Slug ──────────────────────────────────────────────────────────────────────

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

export const isSlugAvailable = (s: string) =>
  s.length >= 3 && !TAKEN_SLUGS.includes(s);

export const getSlugStatus = (slug: string): SlugStatus => {
  if (!slug) return null;
  if (slug.length < 3) return SLUG_STATUS.SHORT;
  return isSlugAvailable(slug) ? SLUG_STATUS.OK : SLUG_STATUS.TAKEN;
};

// ── Shared ────────────────────────────────────────────────────────────────────

export const isEmail = (e: string) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e);

export const getRecommendedTemplate = (useCase: OrgUseCase): TemplateId =>
  PROJECT_TEMPLATES.find((t) => t.for.includes(useCase))?.id ?? "product";

// ── Seat / invite ─────────────────────────────────────────────────────────────

export const seatStatus = (plan: Plan, used: number): SeatStatus => {
  const p = PLANS[plan];
  const limit = p.seats;
  if (used < limit)
    return { state: "ok", used, limit, over: 0, remaining: limit - used };
  if (used === limit)
    return { state: "full", used, limit, over: 0, remaining: 0 };
  const over = used - limit;
  return {
    state: p.overage === "pending" ? "pending" : "overage",
    used,
    limit,
    over,
  };
};

export const seatMessage = (plan: Plan, used: number): SeatMessage | null => {
  const s = seatStatus(plan, used);
  const p = PLANS[plan];
  if (s.state === "ok" || s.state === "full") return null;
  if (s.state === "pending") {
    return {
      title: `${s.over} over your ${p.name} plan.`,
      body: "Extra invites are saved as pending — upgrade to Pro to activate them.",
      cta: { label: "Upgrade to Pro", action: "upgrade:pro" },
    };
  }
  return {
    title: `${s.over} extra seat${s.over > 1 ? "s" : ""} — +$${s.over * p.priceMonthly}/mo.`,
    body: "Your team can keep growing. You'll be billed for additional seats.",
    cta: { label: "Review billing", action: "billing" },
  };
};

export const getInviteNextLabel = (
  validCount: number,
  activeCount: number,
  pendingCount: number,
): string => {
  if (validCount === 0) return INVITE_NEXT_LABEL_SKIP;
  if (pendingCount > 0)
    return `Send ${activeCount} & save ${pendingCount} pending`;
  return `Send ${validCount} invite${validCount > 1 ? "s" : ""} & continue`;
};

export const getUpgradeReason = (used: number): string =>
  `You're inviting ${used} people — more than Free allows. Go Pro to activate everyone now.`;

export const getDividerLabel = (planName: string): string =>
  `${planName} limit · below activate when you upgrade`;

export const computeInviteStats = (rows: InviteRow[], plan: Plan) => {
  const p = PLANS[plan];
  const activeSlots =
    p.seats === Infinity ? Infinity : Math.max(0, p.seats - 1);
  const validEmails = rows.map((r) => r.email.trim()).filter(isEmail);
  const used = 1 + validEmails.length;
  const status = seatStatus(plan, used);
  const message = seatMessage(plan, used);
  const pendingCount =
    activeSlots === Infinity
      ? 0
      : Math.max(0, validEmails.length - activeSlots);
  const activeCount = validEmails.length - pendingCount;

  let validSeen = 0;
  const rowStates = rows.map((row) => {
    const valid = isEmail(row.email.trim());
    const isPending =
      valid && activeSlots !== Infinity && validSeen >= activeSlots;
    if (valid) validSeen++;
    return { ...row, isPending };
  });
  const firstPendingIdx = rowStates.findIndex((r) => r.isPending);

  const denominator =
    p.seats === Infinity ? UNLIMITED_SEAT_DENOMINATOR : p.seats;
  const fillPct = Math.min(100, (used / denominator) * 100);
  const fillColor = SEAT_FILL_COLORS[status.state];

  return {
    p,
    validEmails,
    used,
    status,
    message,
    pendingCount,
    activeCount,
    rowStates,
    firstPendingIdx,
    fillPct,
    fillColor,
  };
};

// ── Checkout ──────────────────────────────────────────────────────────────────

export const fmtPrice = (n: number) => (n % 1 === 0 ? String(n) : n.toFixed(2));

export const calcProPrice = (seats: number, cycle: BillingCycle) => {
  const perSeatMo = PLANS.pro.priceMonthly;
  const annualUnit = Math.round(perSeatMo * CHECKOUT_ANNUAL_DISCOUNT);
  const unit = cycle === "annual" ? annualUnit : perSeatMo;
  const monthly = unit * seats;
  const billedNow = cycle === "annual" ? monthly * 12 : monthly;
  const saved = cycle === "annual" ? (perSeatMo - annualUnit) * seats * 12 : 0;
  return { unit, monthly, billedNow, saved };
};

export const formatCardNum = (v: string): string => {
  const digits = v.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(.{4})/g, "$1 ").trim();
};

export const formatExpiry = (v: string): string => {
  const d = v.replace(/\D/g, "").slice(0, 4);
  return d.length >= 3 ? `${d.slice(0, 2)} / ${d.slice(2)}` : d;
};

export const isCheckoutValid = (f: CheckoutFormState): boolean =>
  f.name.trim().length >= 2 &&
  f.cardNum.replace(/\s/g, "").length >= 15 &&
  f.expiry.replace(/\D/g, "").length === 4 &&
  f.cvc.length >= 3;
