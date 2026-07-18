import apiClient from "@/lib/api/client";
import type { ApiResponse } from "@/types/api";
import type { User } from "@/types/user";
import type { AuthData, SocialProvider } from "../types";
import type {
  LoginInput,
  RegisterInput,
  PasswordResetRequestInput,
  PasswordResetConfirmInput,
} from "../schemas";

export const loginApi = (data: LoginInput) =>
  apiClient.post<ApiResponse<AuthData>>("/api/v1/auth/login/", data);

export const registerApi = (data: RegisterInput) =>
  apiClient.post<ApiResponse<{ user: User }>>("/api/v1/auth/register/", data);

export const verifyEmailApi = (token: string) =>
  apiClient.get<ApiResponse<null>>(`/api/v1/auth/verify-email/?token=${token}`);

export const requestPasswordResetApi = (data: PasswordResetRequestInput) =>
  apiClient.post<ApiResponse<null>>("/api/v1/auth/password-reset/", data);

export const confirmPasswordResetApi = (data: PasswordResetConfirmInput) =>
  apiClient.post<ApiResponse<null>>(
    "/api/v1/auth/password-reset/confirm/",
    data,
  );

export const resendVerificationApi = (email: string) =>
  apiClient.post<ApiResponse<null>>("/api/v1/auth/resend-verification/", {
    email,
  });

export const logoutApi = () =>
  apiClient.post<ApiResponse<null>>("/api/v1/auth/logout/");

export const socialAuthApi = (
  provider: SocialProvider,
  code: string,
  redirectUri: string,
) =>
  apiClient.post<ApiResponse<AuthData>>(`/api/v1/auth/social/${provider}/`, {
    code,
    redirect_uri: redirectUri,
  });
