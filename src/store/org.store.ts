import { create } from "zustand";
import { Organization } from "@/src/types/org";

interface OrgState {
  activeOrg: Organization | null;
  setActiveOrg: (org: Organization) => void;
  clearOrg: () => void;
}

export const useOrgStore = create<OrgState>((set) => ({
  activeOrg: null,
  setActiveOrg: (org) => set({ activeOrg: org }),
  clearOrg: () => set({ activeOrg: null }),
}));
