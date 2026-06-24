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

export default function PasswordResetPage() {
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

  if (sentEmail) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-(--bg-0) p-6">
        <div className="w-full max-w-sm text-center">
          <div className="inline-flex items-center justify-center size-16 rounded-2xl bg-(--bg-2) border border-(--border-1) mb-6">
            <Mail size={28} className="text-(--primary)" />
          </div>
          <h1 className="text-[26px] font-semibold tracking-[-0.02em] mb-2 [font-family:var(--font-display)]">
            {C.requestSent.title}
          </h1>
          <p className="text-sm text-(--text-2) max-w-xs mx-auto mb-8">
            {C.requestSent.subtitle.replace("{email}", sentEmail)}
          </p>
          <Button asChild variant="ghost" size="sm">
            <Link href="/login">{C.requestSent.back}</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-(--bg-0) p-6">
      <div className="w-full max-w-sm">
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
      </div>
    </div>
  );
}
