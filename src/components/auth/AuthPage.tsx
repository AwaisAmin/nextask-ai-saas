"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GitHubIcon, GoogleIcon } from "@/icons";
import { AUTH_CONTENT, AUTH_FORM } from "@/constants/auth";
import { handleApiError } from "@/lib/api/handle-error";
import { loginSchema, registerSchema } from "@/features/auth/schemas";
import type { LoginInput, RegisterInput } from "@/features/auth/schemas";
import { useLogin, useRegister } from "@/features/auth/hooks";
import { setPendingRedirect } from "@/lib/pending-redirect";
import { AuthLeft } from "./AuthLeft";
import { AuthLoader } from "@/components/loaders/AuthLoader";
import { PasswordStrength } from "@/features/auth/components/PasswordStrength";
import { getGitHubOAuthUrl, getGoogleOAuthUrl } from "@/lib/oauth";
import type { AuthMode, AuthFormValues } from "./types";

export const AuthPage = ({ mode }: { mode: AuthMode }) => {
  const isSignup = mode === "signup";
  const content = AUTH_CONTENT[mode];
  const { fields, oauth, forgotPassword } = AUTH_FORM;

  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors },
  } = useForm<AuthFormValues>({
    resolver: zodResolver(isSignup ? registerSchema : loginSchema),
  });

  const password = useWatch({ control, name: "password", defaultValue: "" });

  const loginMutation = useLogin();
  const registerMutation = useRegister();
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    const next = new URLSearchParams(window.location.search).get("next");
    if (next) setPendingRedirect(next);
  }, []);

  const isPending = loginMutation.isPending || registerMutation.isPending;

  const onSubmit = async (values: AuthFormValues) => {
    try {
      if (isSignup) {
        await registerMutation.mutateAsync(values as RegisterInput);
      } else {
        await loginMutation.mutateAsync(values as LoginInput);
      }
      setIsNavigating(true);
    } catch (err) {
      handleApiError(err, setError);
    }
  };

  return (
    <>
      <div className="auth">
        <AuthLeft />

        <div className="auth-right">
          <div className="auth-card max-w-[380px]">
            <h1 className="text-[28px] font-semibold tracking-[-0.02em] mb-1.5 [font-family:var(--font-display)]">
              {content.title}
            </h1>
            <p className="text-sm text-(--text-2) mb-7">{content.subtitle}</p>

            <div className="flex flex-col gap-2.5 mb-5.5">
              <Button
                variant="secondary"
                className="w-full justify-center text-[14.5px] py-3"
                onClick={() => (window.location.href = getGoogleOAuthUrl())}
              >
                <GoogleIcon size={17} />
                {oauth.google}
              </Button>
              <Button
                variant="secondary"
                className="w-full justify-center text-[14.5px] py-3"
                onClick={() => (window.location.href = getGitHubOAuthUrl())}
              >
                <GitHubIcon size={17} />
                {oauth.github}
              </Button>
            </div>

            <div className="auth-divider">{oauth.divider}</div>

            <form onSubmit={handleSubmit(onSubmit)}>
              {isSignup && (
                <Input
                  label={fields.name.label}
                  type="text"
                  placeholder={fields.name.placeholder}
                  autoComplete="name"
                  capitalize
                  error={errors.full_name?.message}
                  {...register("full_name")}
                />
              )}
              <Input
                label={fields.email.label}
                type="email"
                placeholder={fields.email.placeholder}
                autoComplete="email"
                error={errors.email?.message}
                {...register("email")}
              />
              <Input
                label={fields.password.label}
                type="password"
                placeholder={fields.password.placeholder}
                autoComplete={isSignup ? "new-password" : "current-password"}
                error={errors.password?.message}
                {...register("password")}
              />
              {isSignup && <PasswordStrength password={password} />}
              {!isSignup && (
                <div className="flex justify-end -mt-2 mb-3">
                  <Link
                    href={forgotPassword.href}
                    className="text-[12.5px] font-semibold tracking-[0.012em] text-(--primary) hover:opacity-75 transition-opacity duration-200"
                  >
                    {forgotPassword.label}
                  </Link>
                </div>
              )}
              <Button
                type="submit"
                variant="primary"
                className="w-full justify-center mt-1.5"
                disabled={isPending}
              >
                {content.submit}
              </Button>
            </form>

            <p className="text-center text-[13.5px] text-(--text-2) mt-5.5">
              {content.switchText}{" "}
              <Link
                href={content.switchHref}
                className="text-primary font-semibold hover:underline underline-offset-4"
              >
                {content.switchLink}
              </Link>
            </p>
          </div>
        </div>
      </div>

      <AuthLoader visible={isPending || isNavigating} />
    </>
  );
};
