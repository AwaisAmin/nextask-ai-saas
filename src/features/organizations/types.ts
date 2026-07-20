import type { MemberRole, PlanType } from "@/types/org";

export type FilterRole = "all" | "owner" | "admin" | "member";

export type MemberAvatar = {
  color: string;
  initial: string;
  email: string;
};

export type OrgNormalListItem = {
  id: string;
  name: string;
  slug: string;
  plan: PlanType;
  color: string;
  member_count: number;
  member_avatars: MemberAvatar[];
  role: MemberRole;
  last_visited?: boolean;
  is_pending?: false;
};

export type OrgPendingListItem = {
  id: string;
  name: string;
  slug: string;
  plan: PlanType;
  color: string;
  member_count: number;
  member_avatars: MemberAvatar[];
  role: "invited";
  is_pending: true;
  token: string;
};

export type OrgListItem = OrgNormalListItem | OrgPendingListItem;
