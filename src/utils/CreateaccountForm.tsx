import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import Button from "../components/buttons";
import InputField from "../components/InputField";
import SocialIcons from "../components/SocialIcons";

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
  };
  termsAccepted: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTermsChange: (checked: boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
  onTermsClick: () => void;
}

export default function CreateaccountForm({
  formData,
  errors,
  termsAccepted,
  onChange,
  onTermsChange,
  onSubmit,
  onTermsClick,
}: CreateaccountFormProps) {
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
      <div className="flex items-center gap-2">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            id="terms"
            checked={termsAccepted}
            onChange={(e) => onTermsChange(e.target.checked)}
            className="w-4 h-4 accent-black cursor-pointer"
          />
          <span className="text-black font-indie text-sm">I agree to the </span>
        </label>
        <a
          onClick={onTermsClick}
          className="underline hover:no-underline cursor-pointer text-sm font-indie text-black"
        >
          Terms and Conditions
        </a>
      </div>

      {/* Create Account Button */}
      <Button type="submit" size="md" variant="primary">
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
