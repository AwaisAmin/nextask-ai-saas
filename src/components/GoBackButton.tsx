"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const CLS = cn("w-full py-3.5 text-[15px]");

export const GoBackButton = ({
  href,
  label = "Go back",
}: {
  href?: string;
  label?: string;
}) => {
  const router = useRouter();

  return href ? (
    <Button asChild variant="ghost" className={CLS}>
      <Link href={href}>{label}</Link>
    </Button>
  ) : (
    <Button variant="ghost" className={CLS} onClick={() => router.back()}>
      {label}
    </Button>
  );
};
