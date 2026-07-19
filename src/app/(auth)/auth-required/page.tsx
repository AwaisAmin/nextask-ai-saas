import Link from "next/link";
import { Lock, ShieldOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GoBackButton } from "@/components/GoBackButton";
import { AuthBrand } from "@/components/auth/AuthBrand";
import { AUTH_REQUIRED_CONTENT } from "@/constants/auth";

type Props = {
  searchParams: Promise<{ next?: string; reason?: string }>;
};

export default async function AuthRequiredPage({ searchParams }: Props) {
  const { next, reason } = await searchParams;

  if (reason === "unauthorized") {
    const { heading, body } = AUTH_REQUIRED_CONTENT.unauthorized;
    return (
      <div className="ar-bg">
        <AuthBrand className="text-(--text-0) mb-9" />
        <div className="ar-card">
          <div className="auth-badge warn lg">
            <ShieldOff size={28} />
          </div>
          <h1 className="[font-family:var(--font-display)] text-[22px] font-semibold tracking-[-0.02em] text-(--text-0) mb-2">
            {heading}
          </h1>
          <p className="text-[14px] text-(--text-2) leading-[1.55] mb-8">
            {body}
          </p>
          <GoBackButton href="/organizations" />
        </div>
      </div>
    );
  }

  const { heading, body, cta } = AUTH_REQUIRED_CONTENT.unauthenticated;
  const loginHref = next?.startsWith("/") ? `/login?next=${next}` : "/login";

  return (
    <div className="ar-bg">
      <AuthBrand className="text-(--text-0) mb-9" />
      <div className="ar-card">
        <div className="auth-badge primary lg">
          <Lock size={28} />
        </div>
        <h1 className="[font-family:var(--font-display)] text-[22px] font-semibold tracking-[-0.02em] text-(--text-0) mb-2">
          {heading}
        </h1>
        <p className="text-[14px] text-(--text-2) leading-[1.55] mb-8">
          {body}
        </p>
        <Button asChild variant="primary" className="w-full py-3.5 text-[15px]">
          <Link href={loginHref}>{cta}</Link>
        </Button>
      </div>
    </div>
  );
}
