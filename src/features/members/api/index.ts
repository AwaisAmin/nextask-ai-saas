import apiClient from "@/lib/api/client";
import type { InviteDetails } from "../types";

export const getInviteDetails = async (
  token: string,
): Promise<InviteDetails> => {
  const { data } = await apiClient.get(`/api/v1/invitations/${token}/`);
  return data.data;
};

export const acceptInvite = async (
  token: string,
): Promise<{ slug: string }> => {
  const { data } = await apiClient.post(`/api/v1/invitations/${token}/accept/`);
  return data.data;
};

export const declineInvite = async (token: string): Promise<void> => {
  await apiClient.post(`/api/v1/invitations/${token}/decline/`);
};
