"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ORG_FILTERS } from "@/constants/organizations";
import type { FilterRole } from "../types";

type Props = {
  active: FilterRole;
  onSelect: (role: FilterRole) => void;
};

export const OrgFilters = ({ active, onSelect }: Props) => (
  <div className="flex gap-[7px] pb-[14px]">
    {ORG_FILTERS.map(({ key, label }) => (
      <Button
        key={key}
        variant="ghost"
        size="sm"
        onClick={() => onSelect(key)}
        className={cn(
          "rounded-full px-[13px] py-[6px] h-auto text-[12.5px]",
          active === key
            ? "bg-(--primary-soft) border-(--primary-line) text-(--primary) hover:bg-(--primary-soft) hover:text-(--primary)"
            : "bg-(--bg-2) border-border text-(--text-2) hover:text-(--text-0) hover:bg-(--bg-2)",
        )}
      >
        {label}
      </Button>
    ))}
  </div>
);
