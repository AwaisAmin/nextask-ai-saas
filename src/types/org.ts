export type MemberRole = "owner" | "admin" | "member" | "viewer";
export type PlanType = "FREE" | "PRO" | "BUSINESS" | "ENTERPRISE";

export interface Organization {
  id: string;
  name: string;
  slug: string;
  plan: PlanType;
  created_at: string;
}

export interface Member {
  id: string;
  user: {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
  };
  role: MemberRole;
  joined_at: string;
}
