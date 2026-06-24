import apiClient from "@/lib/api/client";
import type { ApiResponse } from "@/types/api";
import type { User } from "@/types/user";
import type { LoginInput, RegisterInput } from "../schemas";

export interface AuthData {
  user: User;
  access: string;
}

export const loginApi = (data: LoginInput) =>
  apiClient.post<ApiResponse<AuthData>>("/api/v1/auth/login/", data);

export const registerApi = (data: RegisterInput) =>
  apiClient.post<ApiResponse<{ user: User }>>("/api/v1/auth/register/", data);
