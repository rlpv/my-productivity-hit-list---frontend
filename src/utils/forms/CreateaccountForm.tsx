import InputField from "@/components/input/InputField";
import SocialIcons from "@/components/social/SocialIcons";
import Button from "@/components/ui/Button";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";

interface CreateaccountFormProps {
  formData: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
  errors: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    terms: string;
  };
  termsAccepted: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTermsChange: (checked: boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
  onTermsClick: () => void;
  isLoading?: boolean;
}

// Password strength calculation function
const getPasswordStrength = (
  password: string,
): { score: number; label: string; color: string } => {
  let score = 0;

  if (password.length >= 6) score++; // Score 1: At least 6 characters
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++; // Score 2: Uppercase + Lowercase
  if (/\d/.test(password)) score++; // Score 3: Numbers
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++; // Score 4: Special characters

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

export default function CreateaccountForm({
  formData,
  errors,
  termsAccepted,
  onChange,
  onTermsChange,
  onSubmit,
  onTermsClick,
  isLoading = false,
}: CreateaccountFormProps) {
  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <form onSubmit={onSubmit} className="flex flex-col items-center gap-6">
      {/* Username Field */}
      <InputField
        icon={
          <span className="text-gray-600">
            <FaUser />
          </span>
        }
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={onChange}
        error={errors.username}
      />

      {/* Email Field */}
      <InputField
        icon={
          <span className="text-gray-600">
            <FaEnvelope />
          </span>
        }
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={onChange}
        error={errors.email}
      />

      {/* Password Field */}
      <div className="w-full">
        <InputField
          icon={
            <span className="text-gray-600">
              <FaLock />
            </span>
          }
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={onChange}
          error={errors.password}
        />
        {/* Password Strength Indicator */}
        {formData.password && (
          <div className="mt-2 space-y-1">
            <div className="flex gap-1">
              {[1, 2, 3, 4].map((level) => (
                <div
                  key={level}
                  className={`h-1.5 flex-1 rounded-full ${
                    passwordStrength.score >= level
                      ? passwordStrength.color
                      : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
            <p
              className={`text-xs font-indie ${passwordStrength.color.replace("bg-", "text-")}`}
            >
              {passwordStrength.label}
            </p>
          </div>
        )}
      </div>

      {/* Confirm Password Field */}
      <InputField
        icon={
          <span className="text-gray-600">
            <FaLock />
          </span>
        }
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChange={onChange}
        error={errors.confirmPassword}
      />

      {/* Terms and Conditions */}
      <div className="flex flex-col items-center gap-1">
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              id="terms"
              checked={termsAccepted}
              onChange={(e) => onTermsChange(e.target.checked)}
              className="w-4 h-4 accent-black cursor-pointer"
              disabled
            />
            <span className="text-black font-indie text-sm">
              I agree to the{" "}
            </span>
          </label>
          <a
            onClick={onTermsClick}
            className="underline hover:no-underline cursor-pointer text-sm font-indie text-black"
          >
            Terms and Conditions
          </a>
        </div>
      </div>

      {/* Create Account Button */}
      <Button type="submit" size="md" variant="primary" isLoading={isLoading}>
        Enter
      </Button>

      <h4 className="text-black font-indie">
        <span className="block text-center">or</span>
        <span className="block text-center">continue with</span>
      </h4>
      {/* Social Media Icons */}
      <SocialIcons />
    </form>
  );
}
