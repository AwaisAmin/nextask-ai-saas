import { MailIcon } from "@/icons";
import { AuthBackLink } from "@/components/auth/AuthBackLink";
import { VERIFY_EMAIL_CONTENT as C } from "@/constants/auth";
import { VerifyBadge } from "./VerifyBadge";

export const VerifyResent = ({ email }: { email?: string }) => (
  <>
    <VerifyBadge variant="ai">
      <MailIcon size={30} />
    </VerifyBadge>
    <h1 className="auth-title">{C.noToken.title}</h1>
    <p className="auth-sub">
      We sent a new verification link to {email ? <b>{email}</b> : "your email"}
      . It may take a minute to arrive.
    </p>
    <AuthBackLink />
  </>
);
