import type { Metadata } from "next";
import "./landing.css";

export const metadata: Metadata = {
  title: "NexTask — One workspace. One AI teammate.",
  description:
    "NexTask replaces Jira, Notion and Slack with one calm workspace — and an AI Agent that actually does the work.",
};

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
