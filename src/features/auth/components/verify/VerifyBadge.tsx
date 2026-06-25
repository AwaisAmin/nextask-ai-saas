export type BadgeVariant = "ok" | "warn" | "ai";

export const VerifyBadge = ({
  variant,
  children,
}: {
  variant: BadgeVariant;
  children: React.ReactNode;
}) => (
  <div
    className={`auth-badge ${variant} check-pop`}
    style={{ width: 66, height: 66, borderRadius: 20, margin: "0 auto 24px" }}
  >
    {children}
  </div>
);
