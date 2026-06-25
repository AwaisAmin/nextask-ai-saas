import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { AuthLeft } from "@/components/auth/AuthLeft";
import { PasswordResetConfirmClient } from "@/features/auth/components/PasswordResetConfirmClient";
import { AUTH_LEFT_TAG } from "@/constants/auth";

export const metadata: Metadata = {
  title: "NexTask — Set new password",
};

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  if (!token) redirect("/password-reset");

  return (
    <div className="auth">
      <AuthLeft tag={AUTH_LEFT_TAG.resetPassword} />
      <div className="auth-right">
        <PasswordResetConfirmClient token={token} />
      </div>
    </div>
  );
}
