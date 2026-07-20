import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getOrganizations, getPendingInvites } from "../api";
import type { OrgListItem } from "../types";

export const useOrganizations = () =>
  useQuery({
    queryKey: ["organizations"],
    queryFn: getOrganizations,
    staleTime: 5 * 60 * 1000,
  });

export const usePendingInvites = () =>
  useQuery({
    queryKey: ["pending-invites"],
    queryFn: getPendingInvites,
    staleTime: 5 * 60 * 1000,
  });

export const useOrganizationsAndInvites = (): {
  data: OrgListItem[];
  isLoading: boolean;
  isError: boolean;
} => {
  const orgsQuery = useOrganizations();
  const invitesQuery = usePendingInvites();

  const data = useMemo(
    () => [...(invitesQuery.data ?? []), ...(orgsQuery.data ?? [])],
    [invitesQuery.data, orgsQuery.data],
  );

  return {
    data,
    isLoading: orgsQuery.isLoading || invitesQuery.isLoading,
    isError: orgsQuery.isError || invitesQuery.isError,
  };
};
