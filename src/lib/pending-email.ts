const KEY = "nx_pending_email";

export const setPendingEmail = (email: string) =>
  sessionStorage.setItem(KEY, email);

export const getPendingEmail = (): string | null => sessionStorage.getItem(KEY);

export const clearPendingEmail = () => sessionStorage.removeItem(KEY);
