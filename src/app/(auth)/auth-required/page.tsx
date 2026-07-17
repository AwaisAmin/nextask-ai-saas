import Link from "next/link";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = { searchParams: Promise<{ next?: string }> };

export default async function AuthRequiredPage({ searchParams }: Props) {
  const { next } = await searchParams;
  const safe = next?.startsWith("/") ? next : "/";
  const loginHref = `/login?next=${safe}`;

  return (
    <div className="ar-bg">
      <Link
        href="/"
        className="flex items-center gap-2.5 [font-family:var(--font-display)] font-bold text-[19px] tracking-[-0.02em] text-(--text-0) mb-9"
      >
        <span className="auth-logo-mark size-8">N</span>
        NexTask
      </Link>

      <div className="ar-card">
        <div className="auth-badge primary lg">
          <Lock size={28} />
        </div>

        <h1 className="[font-family:var(--font-display)] text-[22px] font-semibold tracking-[-0.02em] text-(--text-0) mb-2">
          Sign in to continue
        </h1>
        <p className="text-[14px] text-(--text-2) leading-[1.55] mb-8">
          You need to be signed in to access this page.
        </p>

        <Button asChild variant="primary" className="w-full py-3.5 text-[15px]">
          <Link href={loginHref}>Sign in</Link>
        </Button>
      </div>
    </div>
  );
}
