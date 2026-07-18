import { OrgItem } from "./OrgItem";
import type { OrgListItem } from "../types";

type Props = {
  label: string;
  items: OrgListItem[];
};

export const OrgSection = ({ label, items }: Props) => (
  <div>
    <div className="text-[11px] font-bold tracking-[.07em] text-(--text-3) px-1 pt-[14px] pb-2">
      {label}
    </div>
    <div className="flex flex-col gap-[7px]">
      {items.map((org) => (
        <OrgItem key={org.id} org={org} />
      ))}
    </div>
  </div>
);
