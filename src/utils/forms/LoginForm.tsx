import InputField from "@/components/input/InputField";
import SocialIcons from "@/components/social/SocialIcons";
import Button from "@/components/ui/Button";
import { FaEnvelope, FaLock } from "react-icons/fa";

interface LoginFormProps {
  formData: {
    email: string;
    password: string;
  };
  errors: {
    email: string;
    password: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onForgotPassword: () => void;
  isLoading?: boolean;
}

export default function LoginForm({
  formData,
  errors,
  onChange,
  onSubmit,
  onForgotPassword,
  isLoading = false,
}: LoginFormProps) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col items-center gap-6">
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

      {/* Enter Button */}
      <Button type="submit" size="md" variant="primary" isLoading={isLoading}>
        Enter
      </Button>

      {/* Forget Password */}
      <button
        type="button"
        onClick={onForgotPassword}
        className="text-black font-indie text-lg underline hover:no-underline 
          hover:text-gray-700 transition-colors"
      >
        Forgot Password?
      </button>

      <h4 className="text-black font-indie">or continue with</h4>

      {/* Social Media Icons */}
      <SocialIcons />
    </form>
  );
}
