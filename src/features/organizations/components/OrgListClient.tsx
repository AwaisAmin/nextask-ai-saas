"use client";

import { useMemo, useState, useTransition } from "react";
import {
  ORG_EMPTY_DEFAULT,
  ORG_EMPTY_NO_MATCH,
  ORG_PAGE_SUB,
  ORG_PAGE_TITLE,
  ORG_SECTION_ALL_PREFIX,
  ORG_SECTION_PENDING,
  ORG_SECTION_RECENT,
} from "@/constants/organizations";
import { cn } from "@/lib/utils";
import { OrgSkeleton } from "@/components/loaders/OrgSkeleton";
import { useOrganizations } from "../hooks";
import { OrgTopbar } from "./OrgTopbar";
import { OrgSearch } from "./OrgSearch";
import { OrgFilters } from "./OrgFilters";
import { OrgSection } from "./OrgSection";
import { OrgFooter } from "./OrgFooter";
import type { FilterRole } from "../types";

export const OrgListClient = () => {
  const [isPending, startTransition] = useTransition();
  const { data: orgs = [], isLoading } = useOrganizations();
  const [query, setQuery] = useState("");
  const [filterRole, setFilterRole] = useState<FilterRole>("all");

  const { pending, recent, rest, totalCount } = useMemo(() => {
    const q = query.toLowerCase();
    let shown = orgs.filter((o) => o.name.toLowerCase().includes(q));
    if (filterRole !== "all") {
      shown = shown.filter((o) =>
        o.is_pending ? false : o.role.toLowerCase() === filterRole,
      );
    }
    return {
      pending: shown.filter((o) => o.is_pending),
      recent: shown.filter((o) => !o.is_pending && o.last_visited),
      rest: shown
        .filter((o) => !o.is_pending && !o.last_visited)
        .sort((a, b) => a.name.localeCompare(b.name)),
      totalCount: orgs.filter((o) => !o.is_pending).length,
    };
  }, [orgs, query, filterRole]);

  const hasResults = pending.length + recent.length + rest.length > 0;

  return (
    <div className="h-screen flex flex-col bg-(--bg-0) overflow-hidden">
      <OrgTopbar />

      <div className="flex-1 min-h-0 flex flex-col items-center overflow-hidden">
        {/* Fixed head — never scrolls */}
        <div className="w-full max-w-[620px] px-6 pt-[34px] shrink-0">
          <h1 className="[font-family:var(--font-display)] text-[25px] font-semibold tracking-[-0.02em] text-(--text-0)">
            {ORG_PAGE_TITLE}
          </h1>
          <p className="text-[13.5px] text-(--text-2) mt-1">
            <b className="text-(--text-0) font-semibold">{totalCount}</b>{" "}
            {ORG_PAGE_SUB}
          </p>
          <OrgSearch
            value={query}
            onChange={(q) => startTransition(() => setQuery(q))}
          />
          <OrgFilters
            active={filterRole}
            onSelect={(role) => startTransition(() => setFilterRole(role))}
          />
        </div>

        {/* Scrollable list */}
        <div
          className={cn(
            "w-full max-w-[620px] flex-1 min-h-0 overflow-y-auto px-6 transition-opacity duration-150",
            isPending && "opacity-50",
          )}
        >
          {isLoading ? (
            <div className="flex flex-col gap-[7px] pt-2 pb-4">
              {[0, 1, 2].map((i) => (
                <OrgSkeleton key={i} />
              ))}
            </div>
          ) : !hasResults ? (
            <div className="text-center py-10 text-[13.5px] text-(--text-3)">
              {query ? ORG_EMPTY_NO_MATCH : ORG_EMPTY_DEFAULT}
            </div>
          ) : (
            <div className="pb-4">
              {pending.length > 0 && (
                <OrgSection label={ORG_SECTION_PENDING} items={pending} />
              )}
              {recent.length > 0 && (
                <OrgSection label={ORG_SECTION_RECENT} items={recent} />
              )}
              {rest.length > 0 && (
                <OrgSection
                  label={`${ORG_SECTION_ALL_PREFIX} ${rest.length}`}
                  items={rest}
                />
              )}
            </div>
          )}
        </div>

        <OrgFooter />
      </div>
    </div>
  );
};
