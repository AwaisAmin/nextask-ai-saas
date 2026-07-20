"use client";

import Link from "next/link";
import { ChevronDown, LogOut } from "lucide-react";
import { Dropdown } from "@/components/ui/dropdown";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth.store";
import { useLogout } from "@/features/auth/hooks";
import { AUTH_LABELS } from "@/constants/auth";
import { toInitials } from "@/lib/format";

export const OrgTopbar = () => {
  const { user } = useAuthStore();
  const logoutMutation = useLogout();
  const name = user ? `${user.first_name} ${user.last_name}` : "";

  return (
    <header className="shrink-0 h-[60px] flex items-center justify-between px-7 border-b border-border bg-(--bg-1)">
      <Link
        href="/"
        className="flex items-center gap-2.5 [font-family:var(--font-display)] font-bold text-[17px] tracking-[-0.02em] text-(--text-0)"
      >
        <span className="org-logo-mark">N</span>
        NexTask
      </Link>

      <Dropdown
        trigger={(toggle) => (
          <Button
            variant="ghost"
            onClick={toggle}
            className="flex items-center gap-[9px] pl-1.5 pr-[10px] py-1.5 rounded-full border-0 bg-transparent hover:bg-(--bg-2) h-auto"
          >
            <span className="org-user-avatar">{toInitials(name)}</span>
            <span className="text-[13.5px] font-semibold text-(--text-1) whitespace-nowrap">
              {name}
            </span>
            <ChevronDown size={13} className="text-(--text-3)" />
          </Button>
        )}
        menuClassName="org-menu"
      >
        <Button
          variant="ghost"
          onClick={() => logoutMutation.mutate()}
          disabled={logoutMutation.isPending}
          className="org-logout-btn w-full h-auto justify-start border-0 bg-transparent text-[13.5px] text-(--danger) rounded-lg px-[10px] py-[9px] gap-2.5 hover:text-(--danger)"
        >
          <LogOut size={15} />
          {logoutMutation.isPending
            ? AUTH_LABELS.loggingOut
            : AUTH_LABELS.logout}
        </Button>
      </Dropdown>
    </header>
  );
};
