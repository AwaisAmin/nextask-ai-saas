import apiClient from "@/lib/api/client";
import type { MemberRole, PlanType } from "@/types/org";
import type {
  MemberAvatar,
  OrgListItem,
  OrgNormalListItem,
  OrgPendingListItem,
} from "../types";

// ── Raw API shapes ─────────────────────────────────────────────────────────────

type ApiMemberPreview = {
  first_name: string;
  last_name: string;
  email: string;
};

type ApiOrg = {
  id: string;
  name: string;
  slug: string;
  plan: PlanType;
  color: string;
  created_at: string;
  my_role: MemberRole;
  member_count: number;
  member_previews: ApiMemberPreview[];
};

type ApiPendingInvite = {
  token: string;
  org_id: string;
  org_name: string;
  org_slug: string;
  org_color: string;
  role: MemberRole;
  member_count: number;
  expires_at: string;
};

// ── Helpers ────────────────────────────────────────────────────────────────────

const AVATAR_COLORS = [
  "#7B61FF",
  "#FF6B5C",
  "#2FBF87",
  "#F5A623",
  "#3B9BFF",
  "#E84CC4",
  "#36C58E",
  "#FF8A4C",
];

const nameToColor = (name: string): string => {
  let h = 0;
  for (const c of name) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return AVATAR_COLORS[h % AVATAR_COLORS.length];
};

const previewToAvatar = (m: ApiMemberPreview): MemberAvatar => ({
  color: nameToColor(`${m.first_name} ${m.last_name}`),
  initial: (m.first_name[0] ?? "?").toUpperCase(),
  email: m.email,
});

// ── Mappers ────────────────────────────────────────────────────────────────────

const mapOrg = (o: ApiOrg): OrgNormalListItem => ({
  id: o.id,
  name: o.name,
  slug: o.slug,
  plan: o.plan,
  color: o.color,
  member_count: o.member_count,
  member_avatars: o.member_previews.map(previewToAvatar),
  role: o.my_role,
});

const mapInvite = (inv: ApiPendingInvite): OrgPendingListItem => ({
  id: inv.org_id,
  name: inv.org_name,
  slug: inv.org_slug,
  plan: "free",
  color: inv.org_color,
  member_count: inv.member_count,
  member_avatars: [],
  role: "invited",
  is_pending: true,
  token: inv.token,
});

// ── API functions ──────────────────────────────────────────────────────────────

export const getOrganizations = async (): Promise<OrgListItem[]> => {
  const { data } = await apiClient.get("/api/v1/organizations/");
  const list: ApiOrg[] = data.data ?? [];
  return list.map(mapOrg);
};

export const getPendingInvites = async (): Promise<OrgListItem[]> => {
  const { data } = await apiClient.get("/api/v1/organizations/my-invites/");
  const list: ApiPendingInvite[] = data.data ?? [];
  return list.map(mapInvite);
};
