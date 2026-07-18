import apiClient from "@/lib/api/client";
import type { InviteDetails } from "../types";

export const getInviteDetails = async (
  token: string,
): Promise<InviteDetails> => {
  const { data } = await apiClient.get(
    `/api/v1/organizations/invite/preview/?token=${token}`,
  );
  return data.data;
};

export const respondToInvite = async (
  token: string,
  action: "accept" | "decline",
): Promise<void> => {
  await apiClient.post("/api/v1/organizations/invite/respond/", {
    token,
    action,
  });
};
