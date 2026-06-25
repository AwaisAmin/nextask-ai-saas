export type AuthMode = "signin" | "signup";

export type AuthFormValues = {
  full_name?: string;
  email: string;
  password: string;
};
