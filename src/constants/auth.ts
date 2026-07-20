export const AUTH_FORM = {
  fields: {
    name: { label: "Full name", placeholder: "Your name" },
    email: { label: "Work email", placeholder: "you@company.com" },
    password: { label: "Password", placeholder: "••••••••" },
  },
  oauth: {
    google: "Continue with Google",
    github: "Continue with GitHub",
    divider: "or with email",
  },
  forgotPassword: { label: "Forgot password?", href: "/password-reset" },
} as const;

export const AUTH_REQUIRED_CONTENT = {
  unauthorized: {
    heading: "Not authorized",
    body: "You don't have permission to access this page.",
  },
  unauthenticated: {
    heading: "Sign in to continue",
    body: "You need to be signed in to access this page.",
    cta: "Sign in",
  },
} as const;

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
    subtitle:
      "Hang tight while we confirm your address. This only takes a moment.",
  },
  success: {
    title: "Email verified",
    cta: "Continue to NexTask",
  },
  error: {
    title: "This link has expired",
    subtitle:
      "Verification links are valid for 24 hours. No problem — we can send you a fresh one.",
    back: "Back to sign in",
  },
} as const;

export const AUTH_LEFT_TAG = {
  forgotPassword: {
    label: "Account security",
    quote:
      "Forgot it? Happens to the best of us. We'll get you back into your workspace in under a minute.",
  },
  resetPassword: {
    label: "Choose a strong password",
    quote:
      "A few seconds now keeps your team's work safe. Pick something only you would know.",
  },
} as const;

export const AUTH_LABELS = {
  logout: "Log out",
  loggingOut: "Signing out…",
} as const;

export const AUTH_TOASTS = {
  unverifiedEmail: {
    message: "Please verify your email before signing in.",
    description: (email: string) =>
      `We sent a link to ${email}. Check your inbox.`,
  },
  passwordUpdated: "Password updated! Please sign in.",
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
