import { create } from "zustand";
import type { OrgListItem } from "@/features/organizations/types";

interface OrgState {
  activeOrg: OrgListItem | null;
  setActiveOrg: (org: OrgListItem) => void;
  clearOrg: () => void;
}

export const useOrgStore = create<OrgState>((set) => ({
  activeOrg: null,
  setActiveOrg: (org) => set({ activeOrg: org }),
  clearOrg: () => set({ activeOrg: null }),
}));
