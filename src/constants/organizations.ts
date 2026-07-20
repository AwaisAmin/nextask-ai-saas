export const ORG_PAGE_TITLE = "Choose a workspace";
export const ORG_PAGE_SUB = "workspaces · jump back in, or start something new";
export const ORG_SEARCH_PLACEHOLDER = "Search workspaces…";

export const ORG_FILTER_ALL = "All";
export const ORG_FILTER_OWNER = "Owner";
export const ORG_FILTER_ADMIN = "Admin";
export const ORG_FILTER_MEMBER = "Member";

export const ORG_FILTERS = [
  { key: "all" as const, label: ORG_FILTER_ALL },
  { key: "owner" as const, label: ORG_FILTER_OWNER },
  { key: "admin" as const, label: ORG_FILTER_ADMIN },
  { key: "member" as const, label: ORG_FILTER_MEMBER },
];

export const ORG_SECTION_PENDING = "PENDING INVITATIONS";
export const ORG_SECTION_RECENT = "RECENT";
export const ORG_SECTION_ALL_PREFIX = "ALL WORKSPACES ·";

export const ORG_BADGE_INVITED = "Invited";
export const ORG_DETAIL_PENDING = "Invited to join ·";
export const ORG_MEMBERS_SUFFIX = "members";

export const ORG_VIEW_INVITE_BTN = "View invite";

export const ORG_CREATE_TITLE = "Create a new organization";
export const ORG_CREATE_SUB = "Start a fresh workspace for another team";
export const ORG_FOOT_NOTE =
  "Looking for an invite? Ask your admin, or open the invite link they shared.";

export const ORG_EMPTY_NO_MATCH = "No workspaces match your search.";
export const ORG_EMPTY_DEFAULT =
  "No workspaces yet. Create your first one below.";

export const ORG_LOAD_ERROR =
  "Couldn't load your workspaces. Please refresh the page.";

export const ORG_PLAN_LABELS: Record<string, string> = {
  free: "Free",
  pro: "Pro",
  business: "Business",
  enterprise: "Enterprise",
};

export const ORG_ROLE_LABELS: Record<string, string> = {
  owner: "Owner",
  admin: "Admin",
  member: "Member",
  viewer: "Viewer",
};
