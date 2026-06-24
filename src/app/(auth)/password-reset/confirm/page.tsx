import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { PasswordResetConfirmClient } from "@/features/auth/components/PasswordResetConfirmClient";

export const metadata: Metadata = {
  title: "NexTask — Set new password",
};

export default async function PasswordResetConfirmPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  if (!token) redirect("/password-reset");

  return (
    <div className="min-h-screen flex items-center justify-center bg-(--bg-0) p-6">
      <div className="w-full max-w-sm">
        <PasswordResetConfirmClient token={token} />
      </div>
    </div>
  );
}
