export const AUTH_CONTENT = {
  signin: {
    title: "Welcome back",
    subtitle: "Sign in to your NexTask workspace.",
    submit: "Sign in",
    switchText: "New to NexTask?",
    switchLink: "Create an account",
    switchHref: "/register",
  },
  signup: {
    title: "Create your workspace",
    subtitle: "Start free — no credit card required.",
    submit: "Create account",
    switchText: "Already have an account?",
    switchLink: "Sign in",
    switchHref: "/login",
  },
} as const;

export const VERIFY_EMAIL_CONTENT = {
  noToken: {
    title: "Check your inbox",
    subtitle:
      "We sent a verification link to your email. Click it to activate your account.",
    back: "Back to sign in",
  },
  loading: {
    title: "Verifying your email…",
  },
  success: {
    title: "Email verified!",
    subtitle: "Your account is ready. Sign in to get started.",
    cta: "Sign in",
  },
  error: {
    title: "Verification failed",
    subtitle: "The link may have expired or already been used.",
    back: "Back to register",
  },
} as const;

export const PASSWORD_RESET_CONTENT = {
  request: {
    title: "Forgot your password?",
    subtitle: "Enter your work email and we'll send you a reset link.",
    submit: "Send reset link",
    back: "Back to sign in",
  },
  requestSent: {
    title: "Check your inbox",
    subtitle:
      "We sent a password reset link to {email}. It expires in 24 hours.",
    back: "Back to sign in",
  },
  confirm: {
    title: "Set new password",
    subtitle: "Must be at least 8 characters.",
    submit: "Update password",
  },
} as const;
