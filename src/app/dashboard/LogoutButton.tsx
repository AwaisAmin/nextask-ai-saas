"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import { clearSessionCookie } from "@/lib/session";

export const LogoutButton = () => {
  const router = useRouter();
  const clearAuth = useAuthStore((s) => s.clearAuth);

  const handleLogout = () => {
    clearAuth();
    clearSessionCookie();
    router.push("/login");
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        marginTop: "8px",
        padding: "10px 22px",
        borderRadius: "10px",
        background: "var(--bg-2)",
        border: "1px solid var(--border-2)",
        color: "var(--text-1)",
        fontSize: "14px",
        fontWeight: 600,
        cursor: "pointer",
      }}
    >
      Sign out
    </button>
  );
};
