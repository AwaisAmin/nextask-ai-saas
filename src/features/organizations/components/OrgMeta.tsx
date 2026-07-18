import {
  ORG_BADGE_INVITED,
  ORG_DETAIL_PENDING,
  ORG_MEMBERS_SUFFIX,
  ORG_PLAN_LABELS,
  ORG_ROLE_LABELS,
} from "@/constants/organizations";
import { cn } from "@/lib/utils";
import { AvatarStack } from "./AvatarStack";
import type { OrgListItem } from "../types";

export const OrgMeta = ({ org }: { org: OrgListItem }) => {
  const planLabel = ORG_PLAN_LABELS[org.plan] ?? org.plan;
  const roleLabel = ORG_ROLE_LABELS[org.role] ?? org.role;

  return (
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2 [font-family:var(--font-display)] text-[14px] font-semibold text-(--text-0)">
        <span className="truncate">{org.name}</span>
        {org.is_pending ? (
          <span className="org-badge-pending">{ORG_BADGE_INVITED}</span>
        ) : (
          <span
            className={cn(
              "shrink-0 text-[10px] font-bold tracking-[.03em] px-[7px] py-[2px] rounded-full",
              org.role === "owner"
                ? "bg-(--primary-soft) text-(--primary)"
                : "bg-(--bg-3) text-(--text-2)",
            )}
          >
            {roleLabel}
          </span>
        )}
      </div>

      <div className="flex items-center gap-[7px] text-[12px] text-(--text-3) mt-0.5">
        {org.is_pending ? (
          <span>
            {ORG_DETAIL_PENDING} {org.member_count} {ORG_MEMBERS_SUFFIX}
          </span>
        ) : (
          <>
            {org.member_avatars.length > 0 && (
              <AvatarStack avatars={org.member_avatars} />
            )}
            <span>
              {org.member_count} {ORG_MEMBERS_SUFFIX}
            </span>
            <span className="size-[3px] rounded-full bg-(--text-3) shrink-0" />
            <span>{planLabel}</span>
          </>
        )}
      </div>
    </div>
  );
};
