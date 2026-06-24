"use client";

import { CheckCircle2, Loader2, Mail, XCircle } from "lucide-react";
import { VERIFY_EMAIL_CONTENT as C } from "@/constants/auth";
import { useVerifyEmail } from "@/features/auth/hooks";
import { AuthStatusCard } from "./AuthStatusCard";

export const VerifyEmailClient = ({ token }: { token?: string }) => {
  const { isLoading, isSuccess, isError } = useVerifyEmail(token);

  if (!token)
    return (
      <AuthStatusCard
        icon={Mail}
        title={C.noToken.title}
        subtitle={C.noToken.subtitle}
        action={{ label: C.noToken.back, href: "/login" }}
      />
    );

  if (isLoading)
    return (
      <div className="text-center">
        <Loader2
          size={40}
          className="animate-spin text-(--primary) mx-auto mb-6"
        />
        <p className="text-sm text-(--text-2)">{C.loading.title}</p>
      </div>
    );

  if (isSuccess)
    return (
      <AuthStatusCard
        icon={CheckCircle2}
        iconClassName="text-emerald-500"
        title={C.success.title}
        subtitle={C.success.subtitle}
        action={{ label: C.success.cta, href: "/login", variant: "primary" }}
      />
    );

  if (isError)
    return (
      <AuthStatusCard
        icon={XCircle}
        iconClassName="text-(--danger)"
        title={C.error.title}
        subtitle={C.error.subtitle}
        action={{ label: C.error.back, href: "/register" }}
      />
    );

  return null;
};
