import { OrgAvatar } from "@/components/OrgAvatar";
import { cn } from "@/lib/utils";
import type { OrgListItem } from "../types";

export const ROW = cn(
  "flex items-center gap-[13px] px-[13px] py-3",
  "rounded-[13px] border border-border bg-(--bg-1)",
);

export const OrgLogo = ({ org }: { org: OrgListItem }) => (
  <div className="relative shrink-0">
    <OrgAvatar name={org.name} accent={org.color} size={38} radius={11} />
    {!org.is_pending && org.last_visited && (
      <span className="absolute -bottom-1 -right-1 size-[15px] rounded-full bg-(--ok) border-2 border-(--bg-1)" />
    )}
  </div>
);
