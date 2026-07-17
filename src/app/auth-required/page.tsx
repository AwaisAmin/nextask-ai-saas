import Link from "next/link";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = { searchParams: Promise<{ next?: string }> };

export default async function AuthRequiredPage({ searchParams }: Props) {
  const { next } = await searchParams;
  const safe = next?.startsWith("/") ? next : "/";
  const loginHref = `/login?next=${safe}`;

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center py-10 px-5"
      style={{
        background:
          "radial-gradient(120% 80% at 50% -10%, color-mix(in oklab, var(--primary) 13%, var(--bg-0)), var(--bg-0) 58%)",
      }}
    >
      {/* Brand */}
      <Link
        href="/"
        className="flex items-center gap-2.5 [font-family:var(--font-display)] font-bold text-[19px] tracking-[-0.02em] text-(--text-0) mb-9"
      >
        <span
          className="w-8 h-8 rounded-[9px] grid place-items-center text-white text-[17px] shrink-0 font-bold select-none"
          style={{
            background:
              "linear-gradient(145deg, var(--primary), color-mix(in oklab, var(--primary) 50%, #000))",
            boxShadow: "0 4px 14px -4px var(--primary)",
          }}
        >
          N
        </span>
        NexTask
      </Link>

      {/* Card */}
      <div
        className="w-full max-w-[400px] bg-(--bg-1) border border-border rounded-(--r-xl) text-center"
        style={{ boxShadow: "var(--shadow-pop)", padding: "40px 36px" }}
      >
        {/* Lock badge */}
        <div
          className="w-16 h-16 rounded-[18px] mx-auto mb-5 flex items-center justify-center"
          style={{
            background: "color-mix(in oklab, var(--primary) 14%, transparent)",
            border:
              "1px solid color-mix(in oklab, var(--primary) 30%, transparent)",
          }}
        >
          <Lock size={28} className="text-(--primary)" />
        </div>

        <h1 className="[font-family:var(--font-display)] text-[22px] font-semibold tracking-[-0.02em] text-(--text-0) mb-2">
          Sign in to continue
        </h1>
        <p className="text-[14px] text-(--text-2) leading-[1.55] mb-8">
          You need to be signed in to access this page.
        </p>

        <div className="space-y-2.5">
          <Button
            asChild
            variant="primary"
            className="w-full py-3.5 text-[15px]"
          >
            <Link href={loginHref}>Sign in</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
