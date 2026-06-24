"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PASSWORD_RESET_CONTENT as C } from "@/constants/auth";
import { passwordResetRequestSchema } from "@/features/auth/schemas";
import type { PasswordResetRequestInput } from "@/features/auth/schemas";
import { useRequestPasswordReset } from "@/features/auth/hooks";
import { handleApiError } from "@/lib/api/handle-error";
import { AuthStatusCard } from "./AuthStatusCard";

export const PasswordResetRequestClient = () => {
  const [sentEmail, setSentEmail] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<PasswordResetRequestInput>({
    resolver: zodResolver(passwordResetRequestSchema),
  });

  const mutation = useRequestPasswordReset();

  const onSubmit = async (values: PasswordResetRequestInput) => {
    try {
      await mutation.mutateAsync(values);
      setSentEmail(values.email);
    } catch (err) {
      handleApiError(err, setError);
    }
  };

  if (sentEmail)
    return (
      <AuthStatusCard
        icon={Mail}
        title={C.requestSent.title}
        subtitle={C.requestSent.subtitle.replace("{email}", sentEmail)}
        action={{ label: C.requestSent.back, href: "/login" }}
      />
    );

  return (
    <>
      <h1 className="text-[26px] font-semibold tracking-[-0.02em] mb-1.5 [font-family:var(--font-display)]">
        {C.request.title}
      </h1>
      <p className="text-sm text-(--text-2) mb-7">{C.request.subtitle}</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Work email"
          type="email"
          placeholder="you@company.com"
          autoComplete="email"
          error={errors.email?.message}
          {...register("email")}
        />
        <Button
          type="submit"
          variant="primary"
          className="w-full justify-center mt-1.5"
          disabled={mutation.isPending}
        >
          {C.request.submit}
        </Button>
      </form>

      <p className="text-center text-[13.5px] text-(--text-2) mt-5.5">
        <Link
          href="/login"
          className="text-primary font-semibold hover:underline underline-offset-4"
        >
          {C.request.back}
        </Link>
      </p>
    </>
  );
};
