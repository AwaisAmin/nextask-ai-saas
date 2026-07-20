"use client";

import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useOrgStore } from "@/store/org.store";
import { orgRoute } from "@/constants/routes";
import { cn } from "@/lib/utils";
import { OrgMeta } from "./OrgMeta";
import { OrgLogo, ROW } from "./OrgLogo";
import type { OrgNormalListItem } from "../types";

export const OrgNormalItem = ({ org }: { org: OrgNormalListItem }) => {
  const router = useRouter();
  const setActiveOrg = useOrgStore((s) => s.setActiveOrg);

  const handleOpen = () => {
    setActiveOrg(org);
    router.push(orgRoute(org.slug));
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
