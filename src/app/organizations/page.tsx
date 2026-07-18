import type { Metadata } from "next";
import "./organizations.css";
import { OrgListClient } from "@/features/organizations/components/OrgListClient";

export const metadata: Metadata = { title: "Your workspaces — NexTask" };

export default function OrganizationsPage() {
  return <OrgListClient />;
}
