import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type Props = {
  icon: ReactNode;
  badgeClassName: string;
  heading: string;
  body: string;
  cta: string;
} & (
  | { href: string; onClick?: never; isLoading?: never }
  | { onClick: () => void; isLoading?: boolean; href?: never }
);

const LINK_CLS =
  "inline-flex items-center gap-2 text-[14px] font-semibold text-(--primary) hover:underline";

export const StatusCard = ({
  icon,
  badgeClassName,
  heading,
  body,
  cta,
  href,
  onClick,
  isLoading,
}: Props) => (
  <div className="text-center">
    <div
      className={cn(
        "w-16 h-16 rounded-[18px] mx-auto mb-5 flex items-center justify-center",
        badgeClassName,
      )}
    >
      {icon}
    </div>
    <h2 className="[font-family:var(--font-display)] text-[22px] font-semibold text-(--text-0) tracking-[-0.02em] leading-[1.3] mb-2">
      {heading}
    </h2>
    <p className="text-[14px] text-(--text-2) leading-[1.55] mb-7">{body}</p>
    {href ? (
      <Link href={href} className={LINK_CLS}>
        <ChevronLeft size={15} />
        {cta}
      </Link>
    ) : (
      <Button
        variant="ghost"
        className={cn(
          LINK_CLS,
          "h-auto p-0 hover:bg-transparent disabled:opacity-50",
        )}
        onClick={onClick}
        disabled={isLoading}
      >
        <ChevronLeft size={15} />
        {cta}
      </Button>
    )}
  </div>
);
