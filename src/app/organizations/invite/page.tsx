import type { Metadata } from "next";
import "./invite.css";
import { InviteAcceptClient } from "@/features/members/components/InviteAcceptClient";

export const metadata: Metadata = { title: "Join workspace — NexTask" };

type Props = { searchParams: Promise<{ token?: string }> };

export default async function InviteAcceptPage({ searchParams }: Props) {
  const { token } = await searchParams;
  return <InviteAcceptClient token={token ?? ""} />;
}
