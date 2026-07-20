export type MemberRole = "owner" | "admin" | "member" | "viewer";
export type PlanType = "free" | "pro" | "business" | "enterprise";

export interface Organization {
  id: string;
  name: string;
  slug: string;
  plan: PlanType;
  color: string;
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
