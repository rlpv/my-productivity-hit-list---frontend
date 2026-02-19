import InputField from "@/components/input/InputField";
import SocialIcons from "@/components/social/SocialIcons";
import Button from "@/components/ui/Button";
import { getPasswordStrength } from "@/utils/password.utils";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <form onSubmit={onSubmit} className="flex flex-col items-center gap-1">
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
              className="w-4 h-4 cursor-pointer accent-[#0a0a0a] border border-[#1a1a1a] rounded-sm"
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

      {/* Link to Login */}
      <button
        type="button"
        onClick={() => navigate("/login")}
        className="text-red-600 font-indie text-base underline hover:no-underline 
          hover:text-red-700 transition-colors"
      >
        Go to login?
      </button>
    </form>
  );
}
