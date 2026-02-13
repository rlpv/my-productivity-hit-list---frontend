import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import logomain from "../assets/logomain.png";
import Button from "../components/buttons";
import Concard from "../components/Concard";

export default function SetNewPass() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!password) {
      setError("New password is required");
      return;
    }

    if (!confirmPassword) {
      setError("Please confirm your password");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    console.log("New Password:", password);
    // Navigate to login after successful password reset
    navigate("/login");
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
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              className="w-full px-4 py-3 text-base sm:text-lg font-indie border-2 border-black bg-gray-100 rounded-xl outline-none focus:border-black focus:ring-2 focus:ring-black/20 transition-all"
            />
          </div>

          {/* Confirm Password Input */}
          <div className="w-full">
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setError("");
              }}
              className="w-full px-4 py-3 text-base sm:text-lg font-indie border-2 border-black bg-gray-100 rounded-xl outline-none focus:border-black focus:ring-2 focus:ring-black/20 transition-all"
            />
          </div>

          {error && <p className="text-red-500 font-indie text-sm">{error}</p>}

          {/* Submit Button */}
          <Button type="submit" size="md" variant="primary">
            Reset Password
          </Button>
        </form>
      </Concard>
    </div>
  );
}
