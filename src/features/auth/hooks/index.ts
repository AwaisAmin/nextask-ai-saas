import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useAuthStore } from "@/store/auth.store";
import { setSessionCookie } from "@/lib/session";
import { setPendingEmail } from "@/lib/pending-email";
import {
  loginApi,
  logoutApi,
  registerApi,
  verifyEmailApi,
  requestPasswordResetApi,
  confirmPasswordResetApi,
  resendVerificationApi,
  socialAuthApi,
} from "../api";
import type { SocialProvider } from "../types";
import type {
  LoginInput,
  RegisterInput,
  PasswordResetRequestInput,
  PasswordResetConfirmInput,
} from "../schemas";

export const useLogin = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setAuth = useAuthStore((s) => s.setAuth);

  return useMutation({
    mutationFn: (data: LoginInput) => loginApi(data),
    onSuccess: ({ data: res }) => {
      if (!res.success) return;

      const { user, tokens } = res.data;

      if (!user.is_verified) {
        toast.warning("Please verify your email before signing in.", {
          description: `We sent a link to ${user.email}. Check your inbox.`,
        });
        setPendingEmail(user.email);
        router.push("/verify-email");
        return;
      }

      setAuth(user, tokens.access_token);
      setSessionCookie();
      const next = searchParams.get("next");
      router.push(next ?? "/dashboard");
    },
  });
};

export const useRegister = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: RegisterInput) => registerApi(data),
    onSuccess: ({ data: res }, variables) => {
      if (res.success) {
        setPendingEmail(variables.email);
        router.push("/verify-email");
      }
    },
  });
};

export const useVerifyEmail = (token: string | undefined) =>
  useQuery({
    queryKey: ["verify-email", token],
    queryFn: () => verifyEmailApi(token!),
    enabled: !!token,
    retry: false,
    staleTime: Infinity,
  });

export const useRequestPasswordReset = () =>
  useMutation({
    mutationFn: (data: PasswordResetRequestInput) =>
      requestPasswordResetApi(data),
  });

export const useResendVerification = () =>
  useMutation({
    mutationFn: (email: string) => resendVerificationApi(email),
  });

export const useSocialAuth = () => {
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);

  return useMutation({
    mutationFn: ({
      provider,
      code,
      redirectUri,
    }: {
      provider: SocialProvider;
      code: string;
      redirectUri: string;
    }) => socialAuthApi(provider, code, redirectUri),
    onSuccess: ({ data: res }) => {
      if (!res.success) return;
      const { user, tokens } = res.data;
      setAuth(user, tokens.access_token);
      setSessionCookie();
      router.push("/dashboard");
    },
  });
};

export const useLogout = () => {
  const router = useRouter();
  const clearAuth = useAuthStore((s) => s.clearAuth);

  return useMutation({
    mutationFn: () => logoutApi(),
    onSettled: () => {
      clearAuth();
      router.push("/login");
    },
  });
};

export const useConfirmPasswordReset = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: PasswordResetConfirmInput) =>
      confirmPasswordResetApi(data),
    onSuccess: ({ data: res }) => {
      if (res.success) {
        toast.success("Password updated! Please sign in.");
        router.push("/login");
      }
    },
  });
};
