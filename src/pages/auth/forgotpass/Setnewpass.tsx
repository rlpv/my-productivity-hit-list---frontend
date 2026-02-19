import logomain from "@/assets/logomain.png";
import axiosInstance from "@/axios/axios-instance";
import { useToast } from "@/components/general/Toast";
import Concard from "@/components/home/task/Concard";
import InputField from "@/components/input/InputField";
import Button from "@/components/ui/Button";
import { PasswordStrengthIndicator } from "@/utils/password";
import { useState, type FormEvent } from "react";
import { FaLock, FaReply } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function SetNewPass() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!password) {
      showToast("New password is required", "error");
      return;
    }

    if (!confirmPassword) {
      showToast("Please confirm your password", "error");
      return;
    }

    if (password !== confirmPassword) {
      showToast("Passwords don't match", "error");
      return;
    }

    if (password.length < 6) {
      showToast("Password must be at least 6 characters", "error");
      return;
    }

    // Get reset token from localStorage
    const resetToken = localStorage.getItem("resetToken");

    if (!resetToken) {
      showToast("Session expired. Please start over.", "error");
      navigate("/forgot-password");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axiosInstance.post("/users/reset-password", {
        resetToken,
        newPassword: password,
      });

      if (response.data.success) {
        // Clear stored data
        localStorage.removeItem("resetToken");
        localStorage.removeItem("forgotPasswordEmail");

        showToast("Password reset successfully! Please log in.", "success");
        navigate("/login");
      }
    } catch (err: unknown) {
      const errorObj = err as { response?: { data?: { message?: string } } };
      const message =
        errorObj.response?.data?.message || "Failed to reset password";
      showToast(message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-secondary flex flex-col items-center relative min-h-screen gap-4 sm:gap-8 px-4">
      {/* Back Button */}
      <button
        onClick={() => navigate("/verify-code")}
        className="absolute top-4 right-4 w-12 h-12 bg-secondary rounded-full border-[3px] border-black flex items-center justify-center hover:bg-gray-100 transition-all active:scale-90"
      >
        <span className="transform -scale-x-100">
          <FaReply size={20} />
        </span>
      </button>

      {/* Logo */}
      <img
        src={logomain}
        alt="Logo"
        className="w-48 sm:w-65 h-48 sm:h-65 mt-45 sm:mt-30"
      />

      {/* White background rounded container */}
      <Concard>
        <h4 className="text-black text-3xl sm:text-4xl font-indie font-bold">
          Set New Password
        </h4>

        <p className="text-black font-indie text-center">
          Enter your new password below
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-4 sm:gap-6"
        >
          {/* New Password Input */}
          <InputField
            icon={
              <span className="text-gray-600">
                <FaLock />
              </span>
            }
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Password Strength Indicator */}
          <div className="w-full max-w-xs sm:max-w-sm">
            <PasswordStrengthIndicator password={password} />
          </div>

          {/* Confirm Password Input */}
          <InputField
            icon={
              <span className="text-gray-600">
                <FaLock />
              </span>
            }
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            size="md"
            variant="primary"
            disabled={isLoading}
          >
            {isLoading ? "Resetting..." : "Reset Password"}
          </Button>
        </form>
      </Concard>
    </div>
  );
}
