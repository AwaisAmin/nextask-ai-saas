import { MailIcon } from "@/icons";
import { AuthBackLink } from "@/components/auth/AuthBackLink";
import { VERIFY_EMAIL_CONTENT as C } from "@/constants/auth";

export const VerifyNoToken = () => (
  <>
    <div className="auth-badge ai check-pop" style={{ margin: "0 auto 22px" }}>
      <MailIcon size={30} />
    </div>
    <h1 className="auth-title">{C.noToken.title}</h1>
    <p className="auth-sub">{C.noToken.subtitle}</p>
    <AuthBackLink />
  </>
);
