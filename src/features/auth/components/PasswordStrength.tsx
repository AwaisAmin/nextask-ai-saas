import { CheckIcon } from "@/icons";
import {
  getPasswordScore,
  PASSWORD_REQUIREMENTS,
  STRENGTH_COLORS,
  STRENGTH_LABELS,
} from "../utils/password";

export const PasswordStrength = ({ password }: { password: string }) => {
  const { checks, score } = getPasswordScore(password);
  const hasInput = password.length > 0;

  return (
    <>
      <div className="strength">
        {Array.from({ length: 4 }, (_, i) => (
          <i
            key={i}
            style={{
              background:
                hasInput && i < score ? STRENGTH_COLORS[score] : "var(--bg-4)",
            }}
          />
        ))}
      </div>
      <div
        className="strength-label"
        style={{ color: hasInput ? STRENGTH_COLORS[score] : "var(--text-2)" }}
      >
        {hasInput
          ? STRENGTH_LABELS[score]
          : "Use 8+ characters with a mix of letters, numbers & symbols."}
      </div>
      <ul className="req-list">
        {PASSWORD_REQUIREMENTS.map(({ key, label }) => (
          <li key={key} className={checks[key] ? "met" : ""}>
            <span className="rc">
              <CheckIcon size={10} strokeWidth={3.2} />
            </span>
            {label}
          </li>
        ))}
      </ul>
    </>
  );
};
