import { VERIFY_EMAIL_CONTENT as C } from "@/constants/auth";

export const VerifyLoading = () => (
  <>
    <div className="ring" />
    <h1 className="auth-title" style={{ fontSize: 24 }}>
      {C.loading.title}
    </h1>
    <p className="auth-sub" style={{ marginBottom: 0 }}>
      {C.loading.subtitle}
    </p>
  </>
);
