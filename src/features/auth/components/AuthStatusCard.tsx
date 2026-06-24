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
    <div className="auth-status-icon">
      <Icon size={28} className={iconClassName} />
    </div>
    <h1 className="auth-status-title">{title}</h1>
    <p className="auth-status-subtitle">{subtitle}</p>
    {action && (
      <Button asChild variant={action.variant ?? "ghost"} size="sm">
        <Link href={action.href}>{action.label}</Link>
      </Button>
    )}
  </div>
);
