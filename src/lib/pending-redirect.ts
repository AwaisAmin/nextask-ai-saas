const KEY = "nx_pending_redirect";

export const setPendingRedirect = (url: string) =>
  sessionStorage.setItem(KEY, url);

export const getPendingRedirect = () => sessionStorage.getItem(KEY);

export const clearPendingRedirect = () => sessionStorage.removeItem(KEY);
