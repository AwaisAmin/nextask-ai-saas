import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

type Action = {
  label: string;
  href: string;
  variant?: "primary" | "ghost";
};

type AuthStatusCardProps = {
  icon: LucideIcon;
  iconClassName?: string;
  title: string;
  subtitle: string;
  action?: Action;
};

export const AuthStatusCard = ({
  icon: Icon,
  iconClassName = "text-(--primary)",
  title,
  subtitle,
  action,
}: AuthStatusCardProps) => (
  <div className="text-center">
    <div className="inline-flex items-center justify-center size-16 rounded-2xl bg-(--bg-2) border border-(--border-1) mb-6">
      <Icon size={28} className={iconClassName} />
    </div>
    <h1 className="text-[26px] font-semibold tracking-[-0.02em] mb-2 [font-family:var(--font-display)]">
      {title}
    </h1>
    <p className="text-sm text-(--text-2) max-w-xs mx-auto mb-8">{subtitle}</p>
    {action && (
      <Button asChild variant={action.variant ?? "ghost"} size="sm">
        <Link href={action.href}>{action.label}</Link>
      </Button>
    )}
  </div>
);
