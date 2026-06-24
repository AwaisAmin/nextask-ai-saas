import type { ReactNode } from "react";

export const OutlineIcon = ({
  children,
  size = 20,
  strokeWidth = 1.8,
}: {
  children: ReactNode;
  size?: number;
  strokeWidth?: number;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {children}
  </svg>
);
