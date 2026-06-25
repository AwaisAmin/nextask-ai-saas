const KEY = "nx_pending_email";

export const setPendingEmail = (email: string) =>
  sessionStorage.setItem(KEY, email);

export const getPendingEmail = (): string | null => {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(KEY);
};

export const clearPendingEmail = () => sessionStorage.removeItem(KEY);
