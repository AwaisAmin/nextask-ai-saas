import { MailIcon } from "@/icons";
import { AuthBackLink } from "@/components/auth/AuthBackLink";
import { VERIFY_EMAIL_CONTENT as C } from "@/constants/auth";
import { VerifyBadge } from "./VerifyBadge";

export const VerifyNoToken = () => (
  <>
    <VerifyBadge variant="ai">
      <MailIcon size={30} />
    </VerifyBadge>
    <h1 className="auth-title">{C.noToken.title}</h1>
    <p className="auth-sub">{C.noToken.subtitle}</p>
    <AuthBackLink />
  </>
);
