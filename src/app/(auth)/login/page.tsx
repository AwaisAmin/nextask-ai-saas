import type { Metadata } from "next";
import { AuthPage } from "@/components/auth/AuthPage";

export const metadata: Metadata = {
  title: "NexTask — Sign in",
};

export default function LoginPage() {
  return <AuthPage mode="signin" />;
}
