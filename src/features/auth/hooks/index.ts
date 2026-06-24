import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuthStore } from "@/store/auth.store";
import {
  loginApi,
  registerApi,
  verifyEmailApi,
  requestPasswordResetApi,
  confirmPasswordResetApi,
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
      if (res.success) {
        setAuth(res.data.user, res.data.access);
        router.push("/");
      }
    },
  });
};

export const useRegister = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: RegisterInput) => registerApi(data),
    onSuccess: ({ data: res }) => {
      if (res.success) {
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
