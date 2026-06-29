import {
  PLANS,
  PROJECT_TEMPLATES,
  SLUG_STATUS,
  TAKEN_SLUGS,
} from "@/constants/onboarding";
import type {
  OrgUseCase,
  Plan,
  SeatMessage,
  SeatStatus,
  SlugStatus,
  TemplateId,
} from "./types";

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

export const toInitials = (name: string) =>
  (name || "N")
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase() || "N";

export const isSlugAvailable = (s: string) =>
  s.length >= 3 && !TAKEN_SLUGS.includes(s);

export const getSlugStatus = (slug: string): SlugStatus => {
  if (!slug) return null;
  if (slug.length < 3) return SLUG_STATUS.SHORT;
  return isSlugAvailable(slug) ? SLUG_STATUS.OK : SLUG_STATUS.TAKEN;
};

export const isEmail = (e: string) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e);

export const getRecommendedTemplate = (useCase: OrgUseCase): TemplateId =>
  PROJECT_TEMPLATES.find((t) => t.for.includes(useCase))?.id ?? "product";

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
