// ============================================================================
// PASSWORD UTILITY FUNCTIONS
// ============================================================================

// Calculate password strength score (0-4) based on criteria
export const getPasswordStrength = (
  password: string,
): { score: number; label: string; color: string } => {
  let score = 0;

  if (password.length >= 6) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;

  const strengthConfig = {
    0: { label: "Very Weak", color: "bg-red-500" },
    1: { label: "Weak", color: "bg-red-400" },
    2: { label: "Fair", color: "bg-yellow-400" },
    3: { label: "Good", color: "bg-blue-400" },
    4: { label: "Strong", color: "bg-green-500" },
  };

  const config =
    strengthConfig[score as keyof typeof strengthConfig] || strengthConfig[0];
  return { score, ...config };
};
