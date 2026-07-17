import { format, formatDistanceToNow, isValid, parseISO } from "date-fns";

export const toInitials = (name: string): string =>
  (name || "N")
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase() || "N";

export const formatDate = (date: string): string => {
  const parsed = parseISO(date);
  return isValid(parsed) ? format(parsed, "MMM d, yyyy") : "";
};

export const formatDateTime = (date: string): string => {
  const parsed = parseISO(date);
  return isValid(parsed) ? format(parsed, "MMM d, yyyy · h:mm a") : "";
};

export const formatRelative = (date: string): string => {
  const parsed = parseISO(date);
  return isValid(parsed)
    ? formatDistanceToNow(parsed, { addSuffix: true })
    : "";
};
