import { z } from "zod";

export const loginSchema = z.object({
  email: z.email({ error: "Enter a valid email." }),
  password: z.string().min(1, "Password is required."),
});

export const registerSchema = z
  .object({
    full_name: z.string().min(2, "Name must be at least 2 characters."),
    email: z.email({ error: "Enter a valid email." }),
    password: z.string().min(8, "Password must be at least 8 characters."),
    confirm_password: z.string().min(1, "Please confirm your password."),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match.",
    path: ["confirm_password"],
  });

export const passwordResetRequestSchema = z.object({
  email: z.email({ error: "Enter a valid email." }),
});

export const passwordResetConfirmSchema = z
  .object({
    new_password: z.string().min(8, "Password must be at least 8 characters."),
    confirm_password: z.string().min(1, "Please confirm your password."),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "Passwords do not match.",
    path: ["confirm_password"],
  });

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type PasswordResetRequestInput = z.infer<
  typeof passwordResetRequestSchema
>;
export type PasswordResetConfirmInput = z.infer<
  typeof passwordResetConfirmSchema
> & { token: string };
