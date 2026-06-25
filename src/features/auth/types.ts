import type { User } from "@/types/user";
import type { PasswordResetConfirmInput } from "./schemas";

export type AuthData = {
  user: User;
  tokens: {
    access_token: string;
  };
};

export type BadgeVariant = "ok" | "warn" | "ai";

export type PasswordChecks = {
  len: boolean;
  case: boolean;
  num: boolean;
  sym: boolean;
};

export type PasswordScore = {
  checks: PasswordChecks;
  score: number;
};

export type PasswordRequirement = {
  key: keyof PasswordChecks;
  label: string;
};

export type PasswordResetFormValues = Omit<PasswordResetConfirmInput, "token">;
