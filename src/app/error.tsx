"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-(--bg-0) text-(--text-0) flex flex-col items-center justify-center text-center px-6">
      <div className="text-[80px] font-bold tracking-[-0.04em] text-(--text-3) leading-none mb-2">
        500
      </div>
      <h1 className="text-2xl font-semibold mb-3">Something went wrong</h1>
      <p className="text-(--text-2) mb-8 max-w-sm">
        An unexpected error occurred. You can try again or go back home.
      </p>
      <div className="flex gap-3">
        <Button variant="ghost" onClick={reset}>
          Try again
        </Button>
        <Button asChild variant="primary">
          <Link href="/">Go home</Link>
        </Button>
      </div>
    </div>
  );
}
