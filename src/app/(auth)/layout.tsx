import type { Metadata } from "next";
import "./auth.css";

export const metadata: Metadata = {
  title: "NexTask — Sign in",
  description: "Sign in to your NexTask workspace.",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
