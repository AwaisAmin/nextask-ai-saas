import type { Metadata } from "next";
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
    <div className="min-h-screen flex items-center justify-center bg-(--bg-0) p-6">
      <div className="w-full max-w-sm">
        <VerifyEmailClient token={token} />
      </div>
    </div>
  );
}
