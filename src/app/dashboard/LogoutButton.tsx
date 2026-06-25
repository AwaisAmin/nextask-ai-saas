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
      className="mt-2 px-5.5 py-2.5 rounded-[10px] bg-(--bg-2) border border-(--border-2) text-sm font-semibold text-(--text-1) cursor-pointer hover:bg-(--bg-3) transition-colors"
    >
      Sign out
    </button>
  );
};
