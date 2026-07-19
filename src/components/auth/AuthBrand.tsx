import Link from "next/link";
import { cn } from "@/lib/utils";

const BRAND_NAME = "NexTask";
const BRAND_MARK = "N";

export const AuthBrand = ({ className }: { className?: string }) => (
  <Link
    href="/"
    className={cn(
      "flex items-center gap-2.5 font-bold text-[19px] tracking-[-0.02em] [font-family:var(--font-display)]",
      className,
    )}
  >
    <span className="auth-logo-mark size-8">{BRAND_MARK}</span>
    {BRAND_NAME}
  </Link>
);
