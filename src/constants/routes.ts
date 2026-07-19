export const ROUTES = {
  home: "/",
  login: "/login",
  register: "/register",
  verifyEmail: "/verify-email",
  passwordReset: "/password-reset",
  passwordResetConfirm: "/password-reset/confirm",
  authRequired: "/auth-required",
  dashboard: "/dashboard",
  organizations: "/organizations",
} as const;

export const oauthCallbackRoute = (provider: string) => `/callback/${provider}`;
export const orgRoute = (slug: string) => `/${slug}`;
export const inviteRoute = (token: string) =>
  `/organizations/invite?token=${token}`;
