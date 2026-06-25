"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PASSWORD_RESET_CONTENT as C } from "@/constants/auth";
import { passwordResetRequestSchema } from "@/features/auth/schemas";
import type { PasswordResetRequestInput } from "@/features/auth/schemas";
import { useRequestPasswordReset } from "@/features/auth/hooks";
import { handleApiError } from "@/lib/api/handle-error";

const LockIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.9"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 11V8a6 6 0 0 1 12 0v3" />
    <rect x="4" y="11" width="16" height="10" rx="2" />
    <path d="M12 15v2" />
  </svg>
);

const MailIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.9"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 7l8 6 8-6" />
    <rect x="4" y="5" width="16" height="14" rx="2" />
  </svg>
);

const BackChevron = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 6l-6 6 6 6" />
  </svg>
);

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

  const startCooldown = () => {
    setResendCooldown(60);
  };

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const t = setTimeout(() => setResendCooldown((n) => n - 1), 1000);
    return () => clearTimeout(t);
  }, [resendCooldown]);

  const onSubmit = async (values: PasswordResetRequestInput) => {
    try {
      await mutation.mutateAsync(values);
      setSentEmail(values.email);
      startCooldown();
    } catch (err) {
      handleApiError(err, setError);
    }
  };

  const handleResend = async () => {
    if (!sentEmail || resendCooldown > 0) return;
    try {
      await mutation.mutateAsync({ email: sentEmail });
      startCooldown();
    } catch {
      // silent — already sent
    }
  };

  if (sentEmail) {
    return (
      <div className="auth-card">
        <div className="auth-badge ai check-pop">
          <MailIcon />
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
              in <b style={{ color: "var(--primary)" }}>{resendCooldown}s</b>
            </span>
          )}
        </div>

        <div className="text-center">
          <a className="back-link" href="/login">
            <BackChevron />
            {C.requestSent.back}
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-card">
      <div className="auth-badge brand">
        <LockIcon />
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

      <a className="back-link" href="/login">
        <BackChevron />
        {C.request.back}
      </a>
    </div>
  );
};
