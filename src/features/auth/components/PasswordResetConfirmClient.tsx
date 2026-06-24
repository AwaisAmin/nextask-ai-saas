"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PASSWORD_RESET_CONTENT as C } from "@/constants/auth";
import { passwordResetConfirmSchema } from "@/features/auth/schemas";
import type { PasswordResetConfirmInput } from "@/features/auth/schemas";
import { useConfirmPasswordReset } from "@/features/auth/hooks";
import { handleApiError } from "@/lib/api/handle-error";

type FormValues = Omit<PasswordResetConfirmInput, "token">;

const STRENGTH_LABELS = [
  "",
  "Weak password",
  "Fair password",
  "Good password",
  "Strong password",
];
const STRENGTH_COLORS = [
  "",
  "var(--danger)",
  "var(--warn)",
  "var(--info)",
  "var(--ok)",
];

const LockIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.9"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="4" y="11" width="16" height="10" rx="2" />
    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
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

const ReqCheck = () => (
  <svg
    width="10"
    height="10"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12.5l4.5 4.5L19 7" />
  </svg>
);

const getChecks = (v: string) => ({
  len: v.length >= 8,
  case: /[a-z]/.test(v) && /[A-Z]/.test(v),
  num: /\d/.test(v),
  sym: /[^A-Za-z0-9]/.test(v),
});

export const PasswordResetConfirmClient = ({ token }: { token: string }) => {
  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(passwordResetConfirmSchema),
  });

  const mutation = useConfirmPasswordReset();
  const newPassword = watch("new_password", "");
  const checks = getChecks(newPassword);
  const score = Object.values(checks).filter(Boolean).length;
  const isValid = score >= 3 && checks.len;

  const onSubmit = async (values: FormValues) => {
    try {
      await mutation.mutateAsync({ ...values, token });
    } catch (err) {
      handleApiError(err, setError);
    }
  };

  return (
    <div className="auth-card">
      <div className="auth-badge brand">
        <LockIcon />
      </div>
      <h1 className="auth-title">{C.confirm.title}</h1>
      <p className="auth-sub">{C.confirm.subtitle}</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="New password"
          type="password"
          placeholder="Enter a new password"
          autoComplete="new-password"
          error={errors.new_password?.message}
          {...register("new_password")}
        />

        {/* Strength bars */}
        {newPassword.length > 0 && (
          <>
            <div className="strength">
              {[0, 1, 2, 3].map((i) => (
                <i
                  key={i}
                  style={{
                    background:
                      i < score ? STRENGTH_COLORS[score] : "var(--bg-4)",
                  }}
                />
              ))}
            </div>
            <div
              className="strength-label"
              style={{
                color: newPassword ? STRENGTH_COLORS[score] : "var(--text-2)",
              }}
            >
              {newPassword
                ? STRENGTH_LABELS[score]
                : "Use 8+ characters with a mix of letters, numbers & symbols."}
            </div>
            <ul className="req-list">
              <li className={checks.len ? "met" : ""}>
                <span className="rc">
                  <ReqCheck />
                </span>
                8+ characters
              </li>
              <li className={checks.case ? "met" : ""}>
                <span className="rc">
                  <ReqCheck />
                </span>
                Upper &amp; lowercase
              </li>
              <li className={checks.num ? "met" : ""}>
                <span className="rc">
                  <ReqCheck />
                </span>
                A number
              </li>
              <li className={checks.sym ? "met" : ""}>
                <span className="rc">
                  <ReqCheck />
                </span>
                A symbol
              </li>
            </ul>
          </>
        )}

        <Input
          label="Confirm password"
          type="password"
          placeholder="Re-enter your password"
          autoComplete="new-password"
          error={errors.confirm_password?.message}
          {...register("confirm_password")}
        />

        <Button
          type="submit"
          variant="primary"
          className="w-full justify-center mt-2"
          disabled={mutation.isPending || !isValid}
          style={
            !isValid ? { opacity: 0.55, pointerEvents: "none" } : undefined
          }
        >
          {mutation.isPending ? "Updating…" : C.confirm.submit}
        </Button>
      </form>

      <a className="back-link" href="/login">
        <BackChevron />
        Back to sign in
      </a>
    </div>
  );
};
