import { AlertCircleIcon } from "@/icons";
import { Button } from "@/components/ui/button";
import { AuthBackLink } from "@/components/auth/AuthBackLink";
import { VERIFY_EMAIL_CONTENT as C } from "@/constants/auth";
import { VerifyBadge } from "./VerifyBadge";

export const VerifyExpired = ({
  email,
  onResend,
  isPending,
}: {
  email?: string;
  onResend: () => void;
  isPending: boolean;
}) => (
  <>
    <VerifyBadge variant="warn">
      <AlertCircleIcon size={30} />
    </VerifyBadge>
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
      onClick={onResend}
      disabled={isPending}
    >
      {isPending ? "Sending…" : "Resend verification email"}
    </Button>
    <AuthBackLink />
  </>
);
