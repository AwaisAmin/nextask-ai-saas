import type { Metadata } from "next";
import { PasswordResetRequestClient } from "@/features/auth/components/PasswordResetRequestClient";

export const metadata: Metadata = {
  title: "NexTask — Reset password",
};

export default function PasswordResetPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-(--bg-0) p-6">
      <div className="w-full max-w-sm">
        <PasswordResetRequestClient />
      </div>
    </div>
  );
}
