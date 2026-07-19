import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuthStore } from "@/store/auth.store";
import { setSessionCookie } from "@/lib/session";
import { setPendingEmail } from "@/lib/pending-email";
import {
  getPendingRedirect,
  clearPendingRedirect,
} from "@/lib/pending-redirect";
import { ROUTES } from "@/constants/routes";
import { AUTH_TOASTS } from "@/constants/auth";
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
  const setAuth = useAuthStore((s) => s.setAuth);

  return useMutation({
    mutationFn: (data: LoginInput) => loginApi(data),
    onSuccess: ({ data: res }) => {
      if (!res.success) return;

      const { user } = res.data;

      if (!user.is_verified) {
        const { message, description } = AUTH_TOASTS.unverifiedEmail;
        toast.warning(message, { description: description(user.email) });
        setPendingEmail(user.email);
        router.push(ROUTES.verifyEmail);
        return;
      }

      setAuth(user);
      setSessionCookie();
      const next = new URLSearchParams(window.location.search).get("next");
      const redirect = getPendingRedirect() ?? next;
      clearPendingRedirect();
      router.push(redirect ?? ROUTES.dashboard);
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
        router.push(ROUTES.verifyEmail);
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
      const { user } = res.data;
      setAuth(user);
      setSessionCookie();
      const redirect = getPendingRedirect();
      clearPendingRedirect();
      router.push(redirect ?? ROUTES.dashboard);
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
      router.push(ROUTES.login);
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
        toast.success(AUTH_TOASTS.passwordUpdated);
        router.push(ROUTES.login);
      }
    },
  });
};
