import { useMutation, useQuery } from "@tanstack/react-query";
import { acceptInvite, declineInvite, getInviteDetails } from "../api";

export const useInviteDetails = (token: string) =>
  useQuery({
    queryKey: ["invite", token],
    queryFn: () => getInviteDetails(token),
    enabled: !!token,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

export const useAcceptInvite = () =>
  useMutation({ mutationFn: (token: string) => acceptInvite(token) });

export const useDeclineInvite = () =>
  useMutation({ mutationFn: (token: string) => declineInvite(token) });
