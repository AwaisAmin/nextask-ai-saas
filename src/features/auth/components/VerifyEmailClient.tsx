"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { VERIFY_EMAIL_CONTENT as C } from "@/constants/auth";
import { useVerifyEmail, useResendVerification } from "@/features/auth/hooks";
import { handleApiError } from "@/lib/api/handle-error";
import { Button } from "@/components/ui/button";

const CheckIcon = () => (
  <svg
    width="34"
    height="34"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12.5l4.5 4.5L19 7" />
  </svg>
);

const WarnIcon = () => (
  <svg
    width="30"
    height="30"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7.5V13" />
    <path d="M12 16.5h.01" />
  </svg>
);

const MailIcon = () => (
  <svg
    width="30"
    height="30"
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

const ArrowIcon = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const BackLink = () => (
  <div style={{ display: "flex", justifyContent: "center" }}>
    <a className="back-link" href="/login">
      <BackChevron />
      {C.error.back}
    </a>
  </div>
);

export const VerifyEmailClient = ({
  token,
  email,
}: {
  token?: string;
  email?: string;
}) => {
  const router = useRouter();
  const { isLoading, isSuccess, isError } = useVerifyEmail(token);
  const resendMutation = useResendVerification();

  const [countdown, setCountdown] = useState(5);
  const [resendDone, setResendDone] = useState(false);

  useEffect(() => {
    if (!isSuccess) return;
    const interval = setInterval(() => {
      setCountdown((n) => {
        if (n <= 1) {
          clearInterval(interval);
          router.push("/dashboard");
        }
        return n - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isSuccess, router]);

  const handleResend = async () => {
    if (!email) return;
    try {
      await resendMutation.mutateAsync(email);
      setResendDone(true);
    } catch (err) {
      handleApiError(err);
    }
  };

  return (
    <div className="verify-stage">
      <div className="glow" />

      <Link
        href="/"
        className="absolute top-8 left-8 z-3 flex items-center gap-2.5 font-bold text-[19px] tracking-[-0.02em] [font-family:var(--font-display)]"
      >
        <span className="auth-logo-mark">N</span>
        NexTask
      </Link>

      <div className="verify-card">
        {/* ── No token ─────────────────────────────────────────── */}
        {!token && (
          <>
            <div
              className="auth-badge ai check-pop"
              style={{ margin: "0 auto 22px" }}
            >
              <MailIcon />
            </div>
            <h1 className="auth-title">{C.noToken.title}</h1>
            <p className="auth-sub">{C.noToken.subtitle}</p>
            <BackLink />
          </>
        )}

        {/* ── Verifying ─────────────────────────────────────────── */}
        {token && isLoading && (
          <>
            <div className="ring" />
            <h1 className="auth-title" style={{ fontSize: 24 }}>
              {C.loading.title}
            </h1>
            <p className="auth-sub" style={{ marginBottom: 0 }}>
              {C.loading.subtitle}
            </p>
          </>
        )}

        {/* ── Verified ──────────────────────────────────────────── */}
        {token && isSuccess && (
          <>
            <div
              className="auth-badge ok check-pop"
              style={{
                width: 66,
                height: 66,
                borderRadius: 20,
                margin: "0 auto 24px",
              }}
            >
              <CheckIcon />
            </div>
            <h1 className="auth-title">{C.success.title}</h1>
            <p className="auth-sub">
              Your address {email ? <b>{email}</b> : "your email"} is confirmed.
              Your NexTask workspace is ready to go.
            </p>
            <Button asChild variant="primary" className="w-full justify-center">
              <Link href="/dashboard">
                {C.success.cta}
                <ArrowIcon />
              </Link>
            </Button>
            <div
              style={{
                marginTop: 18,
                fontSize: "12.5px",
                color: "var(--text-3)",
              }}
            >
              Redirecting you automatically in{" "}
              <b style={{ color: "var(--text-1)" }}>{countdown}</b>s…
            </div>
          </>
        )}

        {/* ── Expired ───────────────────────────────────────────── */}
        {token && isError && !resendDone && (
          <>
            <div
              className="auth-badge warn"
              style={{
                width: 66,
                height: 66,
                borderRadius: 20,
                margin: "0 auto 24px",
              }}
            >
              <WarnIcon />
            </div>
            <h1 className="auth-title">{C.error.title}</h1>
            <p className="auth-sub">
              {C.error.subtitle}
              {email && (
                <>
                  {" "}
                  We&apos;ll resend it to <b>{email}</b>.
                </>
              )}
            </p>
            <Button
              variant="primary"
              className="w-full justify-center"
              onClick={handleResend}
              disabled={resendMutation.isPending}
            >
              {resendMutation.isPending
                ? "Sending…"
                : "Resend verification email"}
            </Button>
            <BackLink />
          </>
        )}

        {/* ── Resent ────────────────────────────────────────────── */}
        {token && isError && resendDone && (
          <>
            <div
              className="auth-badge ai check-pop"
              style={{
                width: 66,
                height: 66,
                borderRadius: 20,
                margin: "0 auto 24px",
              }}
            >
              <MailIcon />
            </div>
            <h1 className="auth-title">{C.noToken.title}</h1>
            <p className="auth-sub">
              We sent a new verification link to{" "}
              {email ? <b>{email}</b> : "your email"}. It may take a minute to
              arrive.
            </p>
            <BackLink />
          </>
        )}
      </div>
    </div>
  );
};
