import logomain from "@/assets/logomain.png";
import SuccessModal from "@/components/general/modals/SuccessModal";
import Concard from "@/components/home/task/Concard";
import Button from "@/components/ui/Button";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

export default function ChangepassVerify() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Focus on first input on mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index: number, value: string) => {
    if (value && isNaN(Number(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError("");

    // Move to next input if value is entered
    if (value !== "" && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    // Move to previous input on backspace if current is empty
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join("");

    if (otpCode.length !== 4) {
      setError("Please enter all 4 digits");
      return;
    }

    // Show success modal after successful verification
    setShowSuccessModal(true);
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
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
          Verify Code
        </h4>

        <p className="text-black font-indie text-center">
          Enter the 4-digit code sent to your email to confirm password change
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-4 sm:gap-6"
        >
          {/* OTP Input Boxes */}
          <div className="flex items-center gap-2 sm:gap-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-10 sm:w-14 h-10 sm:h-14 text-center text-xl sm:text-2xl font-indie border-2 border-black bg-gray-100 rounded-xl outline-none focus:border-black focus:ring-2 focus:ring-black/20 transition-all"
              />
            ))}
          </div>

          {error && <p className="text-red-500 font-indie text-sm">{error}</p>}

          {/* Enter Button */}
          <Button type="submit" size="md" variant="primary">
            Verify
          </Button>
        </form>
      </Concard>

      {/* Success Modal for successful password change */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleModalClose}
        title="Password Changed!"
        message="Your password has been changed successfully."
      />
    </div>
  );
}
