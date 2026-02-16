import { useState } from "react";
import { FaEnvelope, FaReply } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logomain from "../assets/logomain.png";
import AlertModal from "../components/AlertModal";
import Button from "../components/buttons";
import Concard from "../components/Concard";
import InputField from "../components/InputField";

export default function ForgotPass() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

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
    // Show modal with verification code message
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    // Navigate to verify code page after closing modal
    navigate("/verifycode");
  };

  return (
    <div className="bg-secondary flex flex-col items-center relative min-h-screen gap-4 sm:gap-8 px-4">
      {/* Back Button */}
      <button
        onClick={() => navigate("/login")}
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
          Forgot Password
        </h4>

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
      </Concard>

      {/* Alert Modal for OTP Message */}
      <AlertModal
        isOpen={showModal}
        onClose={handleModalClose}
        message="Your verification code has been sent to your email."
        type="success"
      />
    </div>
  );
}
