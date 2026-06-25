import type { Metadata } from "next";
import { LogoutButton } from "./LogoutButton";

export const metadata: Metadata = {
  title: "NexTask — Dashboard",
};

export default function DashboardPlaceholderPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "16px",
        background: "var(--bg-0)",
        color: "var(--text-1)",
        fontFamily: "var(--font-body)",
      }}
    >
      <div
        style={{
          width: "48px",
          height: "48px",
          borderRadius: "14px",
          display: "grid",
          placeItems: "center",
          background:
            "linear-gradient(145deg, var(--primary), color-mix(in oklab, var(--primary) 50%, #000))",
          color: "#fff",
          fontWeight: 700,
          fontSize: "22px",
          fontFamily: "var(--font-display)",
          boxShadow: "0 8px 24px -6px var(--primary)",
        }}
      >
        N
      </div>
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "28px",
          fontWeight: 600,
          letterSpacing: "-0.02em",
          margin: 0,
        }}
      >
        Welcome to NexTask
      </h1>
      <p style={{ fontSize: "15px", color: "var(--text-2)", margin: 0 }}>
        Dashboard coming soon — Phase 2 in progress.
      </p>
      <LogoutButton />
    </div>
  );
}
