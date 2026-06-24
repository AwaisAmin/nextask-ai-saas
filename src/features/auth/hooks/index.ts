import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import { loginApi, registerApi } from "../api";
import type { LoginInput, RegisterInput } from "../schemas";

export function useLogin() {
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
}

export function useRegister() {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: RegisterInput) => registerApi(data),
    onSuccess: ({ data: res }) => {
      if (res.success) {
        router.push("/verify-email");
      }
    },
  });
}
