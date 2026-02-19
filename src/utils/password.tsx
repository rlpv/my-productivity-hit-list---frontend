// ============================================================================
// PASSWORD STRENGTH COMPONENT
// ============================================================================

import { getPasswordStrength } from "./password.utils";

// Props interface for PasswordStrengthIndicator component
export interface PasswordStrengthIndicatorProps {
  password: string;
  showLabel?: boolean;
}

// Visual indicator showing password strength as a colored bar
export function PasswordStrengthIndicator({
  password,
  showLabel = true,
}: PasswordStrengthIndicatorProps) {
  const { score, label, color } = getPasswordStrength(password);

  // Don't show anything if password is empty
  if (!password) {
    return null;
  }

  return (
    <div className="w-full mt-1">
      {/* Strength bar */}
      <div className="flex gap-1">
        {[0, 1, 2, 3].map((index) => (
          <div
            key={index}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              index < score ? color : "bg-gray-200"
            }`}
          />
        ))}
      </div>

      {/* Label */}
      {showLabel && password && (
        <p
          className={`text-xs mt-1 font-indie ${color.replace("bg-", "text-")}`}
        >
          {label}
        </p>
      )}
    </div>
  );
}
