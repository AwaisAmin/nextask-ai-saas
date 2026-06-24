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

export const PasswordResetConfirmClient = ({ token }: { token: string }) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(passwordResetConfirmSchema),
  });

  const mutation = useConfirmPasswordReset();

  const onSubmit = async (values: FormValues) => {
    try {
      await mutation.mutateAsync({ ...values, token });
    } catch (err) {
      handleApiError(err, setError);
    }
  };

  return (
    <>
      <h1 className="auth-status-title mb-1.5">{C.confirm.title}</h1>
      <p className="text-sm text-(--text-2) mb-7">{C.confirm.subtitle}</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="New password"
          type="password"
          placeholder="••••••••"
          autoComplete="new-password"
          error={errors.new_password?.message}
          {...register("new_password")}
        />
        <Input
          label="Confirm password"
          type="password"
          placeholder="••••••••"
          autoComplete="new-password"
          error={errors.confirm_password?.message}
          {...register("confirm_password")}
        />
        <Button
          type="submit"
          variant="primary"
          className="w-full justify-center mt-1.5"
          disabled={mutation.isPending}
        >
          {C.confirm.submit}
        </Button>
      </form>
    </>
  );
};
