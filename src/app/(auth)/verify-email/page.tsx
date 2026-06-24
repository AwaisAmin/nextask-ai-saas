import type { Metadata } from "next";
import { AuthLeft } from "@/components/auth/AuthLeft";
import { VerifyEmailClient } from "@/features/auth/components/VerifyEmailClient";

export const metadata: Metadata = {
  title: "NexTask — Verify email",
};

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  return (
    <div className="auth">
      <AuthLeft />
      <div className="auth-right">
        <div className="auth-right-inner">
          <VerifyEmailClient token={token} />
        </div>
      </div>
    </div>
  );
}
