import { FaLock, FaUser } from "react-icons/fa";
import InputField from "../components/InputField";
import Button from "../components/buttons";
import SocialIcons from "../components/SocialIcons";

interface LoginFormProps {
  formData: {
    username: string;
    password: string;
  };
  errors: {
    username: string;
    password: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onForgotPassword: () => void;
}

export default function LoginForm({ formData, errors, onChange, onSubmit, onForgotPassword }: LoginFormProps) {
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
      <Button type="submit" size="md" variant="primary">
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
