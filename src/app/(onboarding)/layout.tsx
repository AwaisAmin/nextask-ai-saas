import type { Metadata } from "next";
import "../(auth)/auth.css";
import "./onboarding.css";

export const metadata: Metadata = {
  title: "NexTask — Welcome",
  description: "Set up your NexTask workspace in under 2 minutes.",
};

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
