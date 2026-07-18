import { Suspense } from "react";
import type { Metadata } from "next";
import { AuthPage } from "@/components/auth/AuthPage";
import { AuthLoader } from "@/components/loaders/AuthLoader";

export const metadata: Metadata = {
  title: "NexTask — Create your workspace",
};

export default function RegisterPage() {
  return (
    <Suspense fallback={<AuthLoader visible />}>
      <AuthPage mode="signup" />
    </Suspense>
  );
}
