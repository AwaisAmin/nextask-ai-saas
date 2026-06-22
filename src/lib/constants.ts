export const API_VERSION = "/api/v1";

export const QUERY_STALE_TIME = 5 * 60 * 1000;
export const QUERY_GC_TIME = 10 * 60 * 1000;

export const DEFAULT_PAGE_SIZE = 20;

export const PLAN_LIMITS = {
  FREE: { projects: 3, members: 5, ai_calls: 10 },
  PRO: { projects: Infinity, members: 50, ai_calls: 100 },
  BUSINESS: { projects: Infinity, members: 200, ai_calls: 500 },
  ENTERPRISE: { projects: Infinity, members: Infinity, ai_calls: 2000 },
} as const;

export const TASK_STATUS_LABEL: Record<string, string> = {
  todo: "To Do",
  in_progress: "In Progress",
  done: "Done",
};

export const TASK_PRIORITY_LABEL: Record<string, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
};

export const MEMBER_ROLE_LABEL: Record<string, string> = {
  owner: "Owner",
  admin: "Admin",
  member: "Member",
  viewer: "Viewer",
};
