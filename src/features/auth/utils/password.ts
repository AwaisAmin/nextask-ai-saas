export type PasswordChecks = {
  len: boolean;
  case: boolean;
  num: boolean;
  sym: boolean;
};

export type PasswordScore = {
  checks: PasswordChecks;
  score: number;
};

export type PasswordRequirement = {
  key: keyof PasswordChecks;
  label: string;
};

export const PASSWORD_REQUIREMENTS: PasswordRequirement[] = [
  { key: "len", label: "8+ characters" },
  { key: "case", label: "Upper & lowercase" },
  { key: "num", label: "A number" },
  { key: "sym", label: "A symbol" },
];

export const STRENGTH_LABELS: string[] = [
  "",
  "Weak password",
  "Fair password",
  "Good password",
  "Strong password",
];

export const STRENGTH_COLORS: string[] = [
  "",
  "var(--danger)",
  "var(--warn)",
  "var(--info)",
  "var(--ok)",
];

export const getPasswordScore = (v: string): PasswordScore => {
  const checks: PasswordChecks = {
    len: v.length >= 8,
    case: /[a-z]/.test(v) && /[A-Z]/.test(v),
    num: /\d/.test(v),
    sym: /[^A-Za-z0-9]/.test(v),
  };
  return { checks, score: Object.values(checks).filter(Boolean).length };
};
