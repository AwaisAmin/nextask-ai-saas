const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export const OAUTH_REDIRECT_URIS = {
  google: `${APP_URL}/callback/google`,
  github: `${APP_URL}/callback/github`,
} as const;

export const getGoogleOAuthUrl = () => {
  const params = new URLSearchParams({
    client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "",
    redirect_uri: OAUTH_REDIRECT_URIS.google,
    response_type: "code",
    scope: "openid email profile",
    access_type: "offline",
    prompt: "select_account",
  });
  return `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
};

export const getGitHubOAuthUrl = () => {
  const params = new URLSearchParams({
    client_id: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID ?? "",
    redirect_uri: OAUTH_REDIRECT_URIS.github,
    scope: "user:email",
  });
  return `https://github.com/login/oauth/authorize?${params}`;
};
