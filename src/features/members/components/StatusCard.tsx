import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  icon: React.ReactNode;
  badgeClassName: string;
  heading: string;
  body: string;
  cta: string;
  href: string;
};

export const StatusCard = ({
  icon,
  badgeClassName,
  heading,
  body,
  cta,
  href,
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
    <Link
      href={href}
      className="inline-flex items-center gap-2 text-[14px] font-semibold text-(--primary) hover:underline"
    >
      <ChevronLeft size={15} />
      {cta}
    </Link>
  </div>
);
