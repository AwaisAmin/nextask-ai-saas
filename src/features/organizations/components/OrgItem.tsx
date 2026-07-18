"use client";

import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OrgAvatar } from "@/components/OrgAvatar";
import { useOrgStore } from "@/store/org.store";
import { handleApiError } from "@/lib/api/handle-error";
import { ORG_ACCEPT_BTN, ORG_ACCEPTING_BTN } from "@/constants/organizations";
import { cn } from "@/lib/utils";
import { useAcceptOrgInvite } from "../hooks";
import { OrgMeta } from "./OrgMeta";
import type { OrgListItem } from "../types";

const ROW = cn(
  "flex items-center gap-[13px] px-[13px] py-3",
  "rounded-[13px] border border-border bg-(--bg-1)",
);

const OrgLogo = ({ org }: { org: OrgListItem }) => (
  <div className="relative shrink-0">
    <OrgAvatar name={org.name} accent={org.accent} size={38} radius={11} />
    {org.last_visited && (
      <span className="absolute -bottom-1 -right-1 size-[15px] rounded-full bg-(--ok) border-2 border-(--bg-1)" />
    )}
  </div>
);

const OrgPendingItem = ({ org }: { org: OrgListItem }) => {
  const router = useRouter();
  const acceptMutation = useAcceptOrgInvite();

  const handleAccept = async () => {
    try {
      await acceptMutation.mutateAsync(org.slug);
      router.push(`/${org.slug}`);
    } catch (err) {
      handleApiError(err);
    }
  };

  return (
    <div className={cn(ROW, "opacity-[.82]")}>
      <OrgLogo org={org} />
      <OrgMeta org={org} />
      <Button
        variant="ghost"
        size="sm"
        onClick={handleAccept}
        disabled={acceptMutation.isPending}
        className="shrink-0 rounded-[9px] bg-(--bg-3) border-(--border-2) text-(--text-0) hover:bg-(--primary) hover:border-transparent hover:text-(--primary-ink)"
      >
        {acceptMutation.isPending ? ORG_ACCEPTING_BTN : ORG_ACCEPT_BTN}
      </Button>
    </div>
  );
};

const OrgNormalItem = ({ org }: { org: OrgListItem }) => {
  const router = useRouter();
  const setActiveOrg = useOrgStore((s) => s.setActiveOrg);

  const handleOpen = () => {
    setActiveOrg(org);
    router.push(`/${org.slug}`);
  };

  return (
    <Button
      variant="ghost"
      onClick={handleOpen}
      className={cn(
        ROW,
        "group hover:border-(--primary-line) hover:bg-(--bg-2) w-full h-auto justify-start text-left",
      )}
    >
      <OrgLogo org={org} />
      <OrgMeta org={org} />
      <ChevronRight
        size={18}
        className="shrink-0 text-(--text-3) transition-all duration-130 group-hover:text-(--primary) group-hover:translate-x-0.5"
      />
    </Button>
  );
};

export const OrgItem = ({ org }: { org: OrgListItem }) =>
  org.is_pending ? <OrgPendingItem org={org} /> : <OrgNormalItem org={org} />;
