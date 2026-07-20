"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ORG_VIEW_INVITE_BTN } from "@/constants/organizations";
import { inviteRoute } from "@/constants/routes";
import { cn } from "@/lib/utils";
import { OrgMeta } from "./OrgMeta";
import { OrgLogo, ROW } from "./OrgLogo";
import type { OrgPendingListItem } from "../types";

export const OrgPendingItem = ({ org }: { org: OrgPendingListItem }) => (
  <div className={cn(ROW, "opacity-[.82]")}>
    <OrgLogo org={org} />
    <OrgMeta org={org} />
    <Button
      asChild
      variant="ghost"
      size="sm"
      className="shrink-0 rounded-[9px] bg-(--bg-3) border border-(--border-2) text-(--text-0) hover:bg-(--primary) hover:border-transparent hover:text-(--primary-ink) gap-1"
    >
      <Link href={inviteRoute(org.token)}>
        {ORG_VIEW_INVITE_BTN}
        <ChevronRight size={13} />
      </Link>
    </Button>
  </div>
);
