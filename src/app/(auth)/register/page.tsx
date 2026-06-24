import type { Metadata } from "next";
import { AuthPage } from "@/components/auth/AuthPage";

export const metadata: Metadata = {
  title: "NexTask — Create your workspace",
};

export default function RegisterPage() {
  return <AuthPage mode="signup" />;
}
