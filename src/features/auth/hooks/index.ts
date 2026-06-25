import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuthStore } from "@/store/auth.store";
import { setSessionCookie } from "@/lib/session";
import { setPendingEmail } from "@/lib/pending-email";
import {
  loginApi,
  registerApi,
  verifyEmailApi,
  requestPasswordResetApi,
  confirmPasswordResetApi,
  resendVerificationApi,
} from "../api";
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
      router.push("/dashboard");
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
