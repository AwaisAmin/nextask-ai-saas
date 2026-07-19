"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useVerifyEmail, useResendVerification } from "@/features/auth/hooks";
import { handleApiError } from "@/lib/api/handle-error";
import { setSessionCookie } from "@/lib/session";
import { clearPendingEmail, getPendingEmail } from "@/lib/pending-email";
import {
  getPendingRedirect,
  clearPendingRedirect,
} from "@/lib/pending-redirect";
import { AuthBrand } from "@/components/auth/AuthBrand";
import { VerifyNoToken } from "./verify/VerifyNoToken";
import { VerifyLoading } from "./verify/VerifyLoading";
import { VerifySuccess } from "./verify/VerifySuccess";
import { VerifyExpired } from "./verify/VerifyExpired";
import { VerifyResent } from "./verify/VerifyResent";

const REDIRECT_DELAY_S = 10;

export const VerifyEmailClient = ({
  token,
  email: emailParam,
}: {
  token?: string;
  email?: string;
}) => {
  const router = useRouter();
  const { isLoading, isSuccess, isError } = useVerifyEmail(token);
  const resendMutation = useResendVerification();
  const [countdown, setCountdown] = useState(REDIRECT_DELAY_S);
  const [resendDone, setResendDone] = useState(false);
  const [email] = useState<string | undefined>(
    () => getPendingEmail() ?? emailParam,
  );

  useEffect(() => {
    clearPendingEmail();
  }, []);

  useEffect(() => {
    if (!isSuccess) return;
    setSessionCookie();
    const redirect = getPendingRedirect();
    clearPendingRedirect();
    const dest = redirect ?? "/dashboard";
    const interval = setInterval(() => {
      setCountdown((n) => {
        if (n <= 1) {
          clearInterval(interval);
          router.push(dest);
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
      <AuthBrand className="absolute top-8 left-8 z-3" />
      <div className="verify-card">{renderState()}</div>
    </div>
  );
};
