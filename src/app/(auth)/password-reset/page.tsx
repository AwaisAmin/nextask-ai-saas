import type { Metadata } from "next";
import { AuthLeft } from "@/components/auth/AuthLeft";
import { PasswordResetRequestClient } from "@/features/auth/components/PasswordResetRequestClient";
import { AUTH_LEFT_TAG } from "@/constants/auth";

export const metadata: Metadata = {
  title: "NexTask — Reset password",
};

export default function PasswordResetPage() {
  return (
    <div className="auth">
      <AuthLeft tag={AUTH_LEFT_TAG.forgotPassword} />
      <div className="auth-right">
        <PasswordResetRequestClient />
      </div>
    </div>
  );
}
