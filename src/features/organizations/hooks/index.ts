import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { acceptOrgInviteApi, getOrganizations } from "../api";

export const useOrganizations = () =>
  useQuery({
    queryKey: ["organizations"],
    queryFn: getOrganizations,
    staleTime: 5 * 60 * 1000,
  });

export const useAcceptOrgInvite = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (slug: string) => acceptOrgInviteApi(slug),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
    },
  });
};
