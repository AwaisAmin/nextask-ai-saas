const COOKIE = "nx_session";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export const setSessionCookie = () => {
  document.cookie = `${COOKIE}=1; path=/; SameSite=Lax; max-age=${MAX_AGE}`;
};

export const clearSessionCookie = () => {
  document.cookie = `${COOKIE}=; path=/; max-age=0`;
};
