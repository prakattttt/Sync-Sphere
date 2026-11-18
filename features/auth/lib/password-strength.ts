export type PasswordStrength = {
  /** 0 = empty, 1 = weak … 4 = strong */
  score: 0 | 1 | 2 | 3 | 4;
  label: "" | "Weak" | "Fair" | "Good" | "Strong";
  /** The most useful next improvement, or null when already strong. */
  hint: string | null;
};

const LABELS = ["", "Weak", "Fair", "Good", "Strong"] as const;

/** Lightweight, dependency-free strength estimate for UI feedback only. */
export function getPasswordStrength(password: string): PasswordStrength {
  if (!password) return { score: 0, label: "", hint: null };

  const checks = {
    length: password.length >= 8,
    longer: password.length >= 12,
    mixedCase: /[a-z]/.test(password) && /[A-Z]/.test(password),
    number: /\d/.test(password),
    symbol: /[^A-Za-z0-9]/.test(password),
  };

  const passed = Object.values(checks).filter(Boolean).length;

  let score: PasswordStrength["score"] =
    passed <= 1 ? 1 : passed === 2 ? 2 : passed === 3 ? 3 : 4;
  if (!checks.length) score = 1;

  const hint = !checks.length
    ? "Use at least 8 characters"
    : !checks.mixedCase
      ? "Mix upper and lower case letters"
      : !checks.number
        ? "Add a number"
        : !checks.symbol
          ? "Add a symbol for extra strength"
          : !checks.longer
            ? "Make it 12 or more characters"
            : null;

  return { score, label: LABELS[score], hint: score === 4 ? null : hint };
}
