"use client";

import { useEffect, useRef } from "react";
import { AlertCircleIcon } from "@/icons";
import { AuthBackLink } from "@/components/auth/AuthBackLink";
import { useSocialAuth } from "@/features/auth/hooks";
import { handleApiError } from "@/lib/api/handle-error";
import { OAUTH_REDIRECT_URIS } from "@/lib/oauth";
import type { SocialProvider } from "@/features/auth/types";

export const OAuthCallbackClient = ({
  provider,
  code,
}: {
  provider: SocialProvider;
  code: string;
}) => {
  const mutation = useSocialAuth();
  const hasFired = useRef(false);

  useEffect(() => {
    if (hasFired.current) return;
    hasFired.current = true;
    mutation.mutate(
      { provider, code, redirectUri: OAUTH_REDIRECT_URIS[provider] },
      { onError: (err) => handleApiError(err) },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (mutation.isError) {
    return (
      <div className="verify-card">
        <div className="auth-badge lg warn check-pop mx-auto mb-[22px]">
          <AlertCircleIcon size={28} />
        </div>
        <h1 className="auth-title">Sign-in failed</h1>
        <p className="auth-sub">
          Something went wrong connecting your account. Please try again.
        </p>
        <AuthBackLink />
      </div>
    );
  }

  return (
    <div className="verify-card">
      <div className="ring mx-auto" />
      <h1 className="auth-title text-[24px]">Signing you in…</h1>
      <p className="auth-sub mb-0">Connecting your account, just a moment.</p>
    </div>
  );
};
