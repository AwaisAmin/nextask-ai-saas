import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { AuthLeft } from "@/components/auth/AuthLeft";
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
    <div className="auth">
      <AuthLeft />
      <div className="auth-right">
        <div className="auth-right-inner">
          <PasswordResetConfirmClient token={token} />
        </div>
      </div>
    </div>
  );
}
