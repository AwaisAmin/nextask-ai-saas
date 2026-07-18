import type { MemberRole, Organization } from "@/types/org";

export type FilterRole = "all" | "owner" | "admin" | "member";

export type MemberAvatar = {
  color: string;
  initial: string;
};

export type OrgListItem = Organization & {
  role: MemberRole | "invited";
  member_count: number;
  member_avatars: MemberAvatar[];
  last_visited?: boolean;
  is_pending?: boolean;
};
