"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LockIcon, MailIcon } from "@/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthBackLink } from "@/components/auth/AuthBackLink";
import { PASSWORD_RESET_CONTENT as C } from "@/constants/auth";
import { passwordResetRequestSchema } from "@/features/auth/schemas";
import type { PasswordResetRequestInput } from "@/features/auth/schemas";
import { useRequestPasswordReset } from "@/features/auth/hooks";
import { handleApiError } from "@/lib/api/handle-error";

export const PasswordResetRequestClient = () => {
  const [sentEmail, setSentEmail] = useState<string | null>(null);
  const [resendCooldown, setResendCooldown] = useState(0);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<PasswordResetRequestInput>({
    resolver: zodResolver(passwordResetRequestSchema),
  });

  const mutation = useRequestPasswordReset();

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const t = setTimeout(() => setResendCooldown((n) => n - 1), 1000);
    return () => clearTimeout(t);
  }, [resendCooldown]);

  const onSubmit = async (values: PasswordResetRequestInput) => {
    try {
      await mutation.mutateAsync(values);
      setSentEmail(values.email);
      setResendCooldown(60);
    } catch (err) {
      handleApiError(err, setError);
    }
  };

  const handleResend = async () => {
    if (!sentEmail || resendCooldown > 0) return;
    try {
      await mutation.mutateAsync({ email: sentEmail });
      setResendCooldown(60);
    } catch {
      // silent — backend deduplicates resends
    }
  };

  if (sentEmail) {
    return (
      <div className="auth-card">
        <div className="auth-badge ai check-pop">
          <MailIcon size={28} />
        </div>
        <h1 className="auth-title">{C.requestSent.title}</h1>
        <p className="auth-sub">
          We sent a password reset link to <b>{sentEmail}</b>. The link expires
          in 1 hour.
        </p>
        <div className="resend-row">
          Didn&apos;t get it?
          <button
            onClick={handleResend}
            disabled={resendCooldown > 0 || mutation.isPending}
          >
            {mutation.isPending ? "Sending…" : "Resend"}
          </button>
          {resendCooldown > 0 && (
            <span>
              in <b className="text-(--text-1)">{resendCooldown}</b>s
            </span>
          )}
        </div>
        <div className="text-center">
          <AuthBackLink />
        </div>
      </div>
    );
  }

  return (
    <div className="auth-card">
      <div className="auth-badge brand">
        <LockIcon size={28} />
      </div>
      <h1 className="auth-title">{C.request.title}</h1>
      <p className="auth-sub">{C.request.subtitle}</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Work email"
          type="email"
          placeholder="you@company.com"
          autoComplete="email"
          error={errors.email?.message}
          {...register("email")}
        />
        <Button
          type="submit"
          variant="primary"
          className="w-full justify-center mt-1.5"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Sending…" : C.request.submit}
        </Button>
      </form>

      <AuthBackLink />
    </div>
  );
};
