"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useVerifyEmail, useResendVerification } from "@/features/auth/hooks";
import { handleApiError } from "@/lib/api/handle-error";
import { VerifyNoToken } from "./verify/VerifyNoToken";
import { VerifyLoading } from "./verify/VerifyLoading";
import { VerifySuccess } from "./verify/VerifySuccess";
import { VerifyExpired } from "./verify/VerifyExpired";
import { VerifyResent } from "./verify/VerifyResent";

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

  const renderState = () => {
    if (!token) return <VerifyNoToken />;
    if (isLoading) return <VerifyLoading />;
    if (isSuccess) return <VerifySuccess email={email} countdown={countdown} />;
    if (isError && resendDone) return <VerifyResent email={email} />;
    if (isError)
      return (
        <VerifyExpired
          email={email}
          onResend={handleResend}
          isPending={resendMutation.isPending}
        />
      );
    return null;
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
      <div className="verify-card">{renderState()}</div>
    </div>
  );
};
