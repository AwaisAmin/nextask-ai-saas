"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { VERIFY_EMAIL_CONTENT as C } from "@/constants/auth";
import { useVerifyEmail } from "@/features/auth/hooks";
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

export const VerifyEmailClient = ({ token }: { token?: string }) => {
  const router = useRouter();
  const { isLoading, isSuccess, isError } = useVerifyEmail(token);
  const [countdown, setCountdown] = useState(5);
  const [resendState, setResendState] = useState<"idle" | "sending" | "resent">(
    "idle",
  );

  useEffect(() => {
    if (!isSuccess) return;
    const interval = setInterval(() => {
      setCountdown((n) => {
        if (n <= 1) {
          clearInterval(interval);
          router.push("/login");
        }
        return n - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isSuccess, router]);

  const handleResend = () => {
    setResendState("sending");
    // TODO: wire up resend API when endpoint is available
    setTimeout(() => setResendState("resent"), 900);
  };

  return (
    <div className="verify-stage">
      <div className="verify-stage-glow" />

      <Link
        href="/"
        className="absolute top-8 left-8 z-3 flex items-center gap-2.5 font-bold text-[19px] tracking-[-0.02em] [font-family:var(--font-display)]"
      >
        <span className="auth-logo-mark">N</span>
        NexTask
      </Link>

      <div className="verify-card">
        {/* ── No token: check inbox ─────────────────────────────── */}
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
            <a className="back-link" href="/login">
              <BackChevron />
              {C.noToken.back}
            </a>
          </>
        )}

        {/* ── Verifying ─────────────────────────────────────────── */}
        {token && isLoading && (
          <>
            <div className="verify-ring" />
            <h1 className="auth-title" style={{ fontSize: 24 }}>
              {C.loading.title}
            </h1>
            <p className="auth-sub" style={{ marginBottom: 0 }}>
              Hang tight while we confirm your address. This only takes a
              moment.
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
            <p className="auth-sub">{C.success.subtitle}</p>
            <Button asChild variant="primary" className="w-full justify-center">
              <Link href="/login">
                {C.success.cta}
                <ArrowIcon />
              </Link>
            </Button>
            <div className="mt-4 text-[12.5px] text-(--text-3)">
              Redirecting you automatically in{" "}
              <b className="text-(--text-1)">{countdown}</b>s…
            </div>
          </>
        )}

        {/* ── Expired / error ───────────────────────────────────── */}
        {token && isError && resendState === "idle" && (
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
            <p className="auth-sub">{C.error.subtitle}</p>
            <Button
              variant="primary"
              className="w-full justify-center"
              onClick={handleResend}
            >
              Resend verification email
            </Button>
            <a className="back-link" href="/login">
              <BackChevron />
              {C.noToken.back}
            </a>
          </>
        )}

        {/* ── Resending ─────────────────────────────────────────── */}
        {token && isError && resendState === "sending" && (
          <>
            <div className="verify-ring" />
            <p className="auth-sub" style={{ marginBottom: 0 }}>
              Sending a new link…
            </p>
          </>
        )}

        {/* ── Resent ────────────────────────────────────────────── */}
        {token && isError && resendState === "resent" && (
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
              We sent a new verification link to your email. It may take a
              minute to arrive.
            </p>
            <a className="back-link" href="/login">
              <BackChevron />
              {C.noToken.back}
            </a>
          </>
        )}
      </div>
    </div>
  );
};
