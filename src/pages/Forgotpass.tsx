import { useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logomain from "../assets/logomain.png";
import Button from "../components/buttons";
import Concard from "../components/Concard";
import InputField from "../components/InputField";

export default function ForgotPass() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) {
      setError("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Email is required");
      return;
    }
    // Navigate to verify code page
    navigate("/verifycode");
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
          Forgot Password
        </h4>

        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center gap-4 sm:gap-6 w-full"
          >
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
              value={email}
              onChange={handleChange}
              error={error}
            />

            {/* Enter Button */}
            <Button type="submit" size="md" variant="primary">
              Enter
            </Button>
          </form>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <p className="text-black font-indie text-center">
              Password reset link has been sent to your email.
            </p>
            <Button
              size="md"
              variant="primary"
              onClick={() => setSubmitted(false)}
            >
              Resend
            </Button>
          </div>
        )}
      </Concard>
    </div>
  );
}
