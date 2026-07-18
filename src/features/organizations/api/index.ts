import apiClient from "@/lib/api/client";
import type { OrgListItem } from "../types";

export const getOrganizations = async (): Promise<OrgListItem[]> => {
  const { data } = await apiClient.get("/api/v1/organizations/");
  return data.data ?? data.results ?? [];
};

export const acceptOrgInviteApi = async (slug: string): Promise<void> => {
  await apiClient.post(`/api/v1/organizations/${slug}/members/accept/`);
};
