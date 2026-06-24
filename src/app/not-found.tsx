import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-(--bg-0) text-(--text-0) flex flex-col items-center justify-center text-center px-6">
      <div className="text-[80px] font-bold tracking-[-0.04em] text-(--text-3) leading-none mb-2">
        404
      </div>
      <h1 className="text-2xl font-semibold mb-3">Page not found</h1>
      <p className="text-(--text-2) mb-8 max-w-sm">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Button asChild variant="primary" size="md">
        <Link href="/">Go home</Link>
      </Button>
    </div>
  );
}
