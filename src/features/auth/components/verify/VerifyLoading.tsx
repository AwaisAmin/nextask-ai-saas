import { VERIFY_EMAIL_CONTENT as C } from "@/constants/auth";

export const VerifyLoading = () => (
  <>
    <div className="ring" />
    <h1 className="auth-title text-[24px]">{C.loading.title}</h1>
    <p className="auth-sub mb-0">{C.loading.subtitle}</p>
  </>
);
