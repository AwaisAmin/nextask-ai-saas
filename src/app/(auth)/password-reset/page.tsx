import type { Metadata } from "next";
import { AuthLeft } from "@/components/auth/AuthLeft";
import { PasswordResetRequestClient } from "@/features/auth/components/PasswordResetRequestClient";

export const metadata: Metadata = {
  title: "NexTask — Reset password",
};

export default function PasswordResetPage() {
  return (
    <div className="auth">
      <AuthLeft />
      <div className="auth-right">
        <div className="auth-right-inner">
          <PasswordResetRequestClient />
        </div>
      </div>
    </div>
  );
}
