import { Suspense } from "react";
import type { Metadata } from "next";
import { AuthPage } from "@/components/auth/AuthPage";
import { AuthLoader } from "@/components/loaders/AuthLoader";

export const metadata: Metadata = {
  title: "NexTask — Sign in",
};

export default function LoginPage() {
  return (
    <Suspense fallback={<AuthLoader visible />}>
      <AuthPage mode="signin" />
    </Suspense>
  );
}
