"use client";

import Link from "next/link";
import { CheckCircle2, Loader2, Mail, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VERIFY_EMAIL_CONTENT as C } from "@/constants/auth";
import { useVerifyEmail } from "@/features/auth/hooks";

export const VerifyEmailClient = ({ token }: { token?: string }) => {
  const { isLoading, isSuccess, isError } = useVerifyEmail(token);

  if (!token) {
    return (
      <div className="text-center">
        <div className="inline-flex items-center justify-center size-16 rounded-2xl bg-(--bg-2) border border-(--border-1) mb-6">
          <Mail size={28} className="text-(--primary)" />
        </div>
        <h1 className="text-[26px] font-semibold tracking-[-0.02em] mb-2 [font-family:var(--font-display)]">
          {C.noToken.title}
        </h1>
        <p className="text-sm text-(--text-2) max-w-xs mx-auto mb-8">
          {C.noToken.subtitle}
        </p>
        <Button asChild variant="ghost" size="sm">
          <Link href="/login">{C.noToken.back}</Link>
        </Button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="text-center">
        <Loader2
          size={40}
          className="animate-spin text-(--primary) mx-auto mb-6"
        />
        <p className="text-sm text-(--text-2)">{C.loading.title}</p>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="text-center">
        <div className="inline-flex items-center justify-center size-16 rounded-2xl bg-(--bg-2) border border-(--border-1) mb-6">
          <CheckCircle2 size={28} className="text-emerald-500" />
        </div>
        <h1 className="text-[26px] font-semibold tracking-[-0.02em] mb-2 [font-family:var(--font-display)]">
          {C.success.title}
        </h1>
        <p className="text-sm text-(--text-2) max-w-xs mx-auto mb-8">
          {C.success.subtitle}
        </p>
        <Button asChild variant="primary">
          <Link href="/login">{C.success.cta}</Link>
        </Button>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center">
        <div className="inline-flex items-center justify-center size-16 rounded-2xl bg-(--bg-2) border border-(--border-1) mb-6">
          <XCircle size={28} className="text-(--danger)" />
        </div>
        <h1 className="text-[26px] font-semibold tracking-[-0.02em] mb-2 [font-family:var(--font-display)]">
          {C.error.title}
        </h1>
        <p className="text-sm text-(--text-2) max-w-xs mx-auto mb-8">
          {C.error.subtitle}
        </p>
        <Button asChild variant="ghost" size="sm">
          <Link href="/register">{C.error.back}</Link>
        </Button>
      </div>
    );
  }

  return null;
};
