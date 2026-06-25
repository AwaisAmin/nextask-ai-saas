import type { Metadata } from "next";
import { VerifyEmailClient } from "@/features/auth/components/VerifyEmailClient";

export const metadata: Metadata = {
  title: "NexTask — Verify email",
};

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string; email?: string }>;
}) {
  const { token, email } = await searchParams;
  return <VerifyEmailClient token={token} email={email} />;
}
