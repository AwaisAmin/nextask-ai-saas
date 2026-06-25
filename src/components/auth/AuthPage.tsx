"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GitHubIcon, GoogleIcon } from "@/icons";
import { AUTH_CONTENT } from "@/constants/auth";
import { handleApiError } from "@/lib/api/handle-error";
import { loginSchema, registerSchema } from "@/features/auth/schemas";
import type { LoginInput, RegisterInput } from "@/features/auth/schemas";
import { useLogin, useRegister } from "@/features/auth/hooks";
import { AuthLeft } from "./AuthLeft";
import { AuthLoader } from "@/components/loaders/AuthLoader";

type Mode = "signin" | "signup";

type FormValues = {
  full_name?: string;
  email: string;
  password: string;
  confirm_password?: string;
};

export const AuthPage = ({ mode }: { mode: Mode }) => {
  const isSignup = mode === "signup";
  const content = AUTH_CONTENT[mode];

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(isSignup ? registerSchema : loginSchema),
  });

  const loginMutation = useLogin();
  const registerMutation = useRegister();
  const isPending = loginMutation.isPending || registerMutation.isPending;

  const onSubmit = async (values: FormValues) => {
    try {
      if (isSignup) {
        await registerMutation.mutateAsync(values as RegisterInput);
      } else {
        await loginMutation.mutateAsync(values as LoginInput);
      }
    } catch (err) {
      handleApiError(err, setError);
    }
  };

  return (
    <>
      <div className="auth">
        <AuthLeft />

        <div className="auth-right">
          <div className="auth-card" style={{ maxWidth: "380px" }}>
            <h1 className="text-[28px] font-semibold tracking-[-0.02em] mb-1.5 [font-family:var(--font-display)]">
              {content.title}
            </h1>
            <p className="text-sm text-(--text-2) mb-7">{content.subtitle}</p>

            <div className="flex flex-col gap-2.5 mb-5.5">
              <Button
                variant="secondary"
                className="w-full justify-center text-[14.5px] py-3"
              >
                <GoogleIcon size={17} />
                Continue with Google
              </Button>
              <Button
                variant="secondary"
                className="w-full justify-center text-[14.5px] py-3"
              >
                <GitHubIcon size={17} />
                Continue with GitHub
              </Button>
            </div>

            <div className="auth-divider">or with email</div>

            <form onSubmit={handleSubmit(onSubmit)}>
              {isSignup && (
                <Input
                  label="Full name"
                  type="text"
                  placeholder="Your name"
                  autoComplete="name"
                  capitalize
                  error={errors.full_name?.message}
                  {...register("full_name")}
                />
              )}
              <Input
                label="Work email"
                type="email"
                placeholder="you@company.com"
                autoComplete="email"
                error={errors.email?.message}
                {...register("email")}
              />
              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                autoComplete={isSignup ? "new-password" : "current-password"}
                error={errors.password?.message}
                {...register("password")}
              />
              {!isSignup && (
                <div className="flex justify-end -mt-2 mb-3">
                  <Link
                    href="/password-reset"
                    className="text-[12.5px] font-semibold tracking-[0.012em] text-(--primary) hover:opacity-75 transition-opacity duration-200"
                  >
                    Forgot password?
                  </Link>
                </div>
              )}
              {isSignup && (
                <Input
                  label="Confirm password"
                  type="password"
                  placeholder="••••••••"
                  autoComplete="new-password"
                  error={errors.confirm_password?.message}
                  {...register("confirm_password")}
                />
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

      <AuthLoader visible={isPending} />
    </>
  );
};
