import axios from "axios";
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import logomain from "../assets/logomain.png";
import Button from "../components/buttons";
import Concard from "../components/Concard";
import { useToast } from "../components/Toast";

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
      navigate("/forgotpass");
      return;
    }

    setIsLoading(true);
    try {
      console.log("=== SETNEWPASS DEBUG ===");
      console.log("Token from localStorage:", resetToken);
      console.log(
        "Making request to:",
        "http://localhost:5000/api/users/reset-password",
      );
      console.log("Request body:", { resetToken, newPassword: password });

      const response = await axios.post(
        "http://localhost:5000/api/users/reset-password",
        { resetToken, newPassword: password },
      );

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
          <div className="w-full">
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 text-base sm:text-lg font-indie border-2 border-black bg-gray-100 rounded-xl outline-none focus:border-black focus:ring-2 focus:ring-black/20 transition-all"
            />
          </div>

          {/* Confirm Password Input */}
          <div className="w-full">
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 text-base sm:text-lg font-indie border-2 border-black bg-gray-100 rounded-xl outline-none focus:border-black focus:ring-2 focus:ring-black/20 transition-all"
            />
          </div>

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
