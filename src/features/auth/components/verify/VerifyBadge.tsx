import type { BadgeVariant } from "../../types";

export const VerifyBadge = ({
  variant,
  children,
}: {
  variant: BadgeVariant;
  children: React.ReactNode;
}) => <div className={`auth-badge lg ${variant} check-pop`}>{children}</div>;
