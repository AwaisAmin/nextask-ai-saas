import type React from "react";

export const PathIcon = ({
  path,
  size = 20,
  className,
  strokeWidth = 1.8,
  style,
}: {
  path: string;
  size?: number;
  className?: string;
  strokeWidth?: number;
  style?: React.CSSProperties;
}) => (
  <svg
    width={size}
    height={size}
    className={className}
    style={style}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d={path} />
  </svg>
);
