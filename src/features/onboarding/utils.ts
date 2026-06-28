import {
  PROJECT_TEMPLATES,
  SLUG_STATUS,
  TAKEN_SLUGS,
} from "@/constants/onboarding";
import type { OrgUseCase, SlugStatus, TemplateId } from "./types";

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

export const getSeatbarColor = (isOver: boolean, isFull: boolean): string =>
  isOver ? "var(--danger)" : isFull ? "var(--warn)" : "var(--primary)";
