export const getExpiryDays = (expiresAt?: string): number => {
  if (!expiresAt) return 7;
  return Math.max(
    1,
    Math.ceil((new Date(expiresAt).getTime() - Date.now()) / 86_400_000),
  );
};
