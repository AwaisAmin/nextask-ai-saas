"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { InputHTMLAttributes } from "react";
import { Button } from "@/components/ui/button";
import { GitHubIcon, GoogleIcon } from "@/icons";
import { AUTH_CONTENT } from "@/constants/auth";
import { AuthLeft } from "./AuthLeft";
import { AuthLoader } from "@/components/loaders/AuthLoader";

type Mode = "signin" | "signup";

function AuthField({
  label,
  ...props
}: { label: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="auth-field">
      <label>{label}</label>
      <input {...props} />
    </div>
  );
}

export function AuthPage({ mode }: { mode: Mode }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const content = AUTH_CONTENT[mode];
  const isSignup = mode === "signup";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => router.push("/dashboard"), 1300);
  }

  return (
    <>
      <div className="auth">
        <AuthLeft />

        <div className="flex items-center justify-center p-10 bg-(--bg-0)">
          <div className="w-full max-w-95">
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

            <form onSubmit={handleSubmit}>
              {isSignup && (
                <AuthField
                  label="Full name"
                  type="text"
                  placeholder="Alex Rivera"
                  autoComplete="name"
                />
              )}
              <AuthField
                label="Work email"
                type="email"
                placeholder="you@company.com"
                autoComplete="email"
                required
              />
              <AuthField
                label="Password"
                type="password"
                placeholder="••••••••"
                autoComplete={isSignup ? "new-password" : "current-password"}
                required
              />
              <Button
                type="submit"
                variant="primary"
                className="w-full justify-center mt-1.5"
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

      <AuthLoader visible={loading} />
    </>
  );
}
