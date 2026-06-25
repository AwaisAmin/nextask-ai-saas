"use client";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LockIcon } from "@/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthBackLink } from "@/components/auth/AuthBackLink";
import { PasswordStrength } from "./PasswordStrength";
import { getPasswordScore } from "../utils/password";
import { PASSWORD_RESET_CONTENT as C } from "@/constants/auth";
import { passwordResetConfirmSchema } from "@/features/auth/schemas";
import type { PasswordResetConfirmInput } from "@/features/auth/schemas";
import { useConfirmPasswordReset } from "@/features/auth/hooks";
import { handleApiError } from "@/lib/api/handle-error";

type FormValues = Omit<PasswordResetConfirmInput, "token">;

export const PasswordResetConfirmClient = ({
  token,
  email,
}: {
  token: string;
  email?: string;
}) => {
  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(passwordResetConfirmSchema),
  });

  const mutation = useConfirmPasswordReset();
  const newPassword = useWatch({
    control,
    name: "new_password",
    defaultValue: "",
  });
  const { checks, score } = getPasswordScore(newPassword);
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
        <LockIcon size={28} />
      </div>
      <h1 className="auth-title">{C.confirm.title}</h1>
      <p className="auth-sub">
        {email ? (
          <>
            Resetting the password for <b>{email}</b>. Make it at least 8
            characters.
          </>
        ) : (
          C.confirm.subtitle
        )}
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="New password"
          type="password"
          placeholder="Enter a new password"
          autoComplete="new-password"
          error={errors.new_password?.message}
          {...register("new_password")}
        />

        <PasswordStrength password={newPassword} />

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

      <AuthBackLink />
    </div>
  );
};
