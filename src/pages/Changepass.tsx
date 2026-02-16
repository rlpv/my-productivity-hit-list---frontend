import { useState, type FormEvent } from "react";
import { FaBars, FaKey, FaLock, FaReply } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logomain from "../assets/logomain.png";
import axiosInstance from "../axios/axios-instance";
import Button from "../components/buttons";
import Concard from "../components/Concard";
import HamburgerMenu from "../components/HamburgerMenu";
import InputField from "../components/InputField";
import SuccessModal from "../components/SuccessModal";

export default function ChangePass() {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string,
  ) => {
    const value = e.target.value;
    switch (field) {
      case "current":
        setCurrentPassword(value);
        break;
      case "new":
        setNewPassword(value);
        break;
      case "confirm":
        setConfirmPassword(value);
        break;
    }
    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!currentPassword) {
      setError("Current password is required");
      return;
    }

    if (!newPassword) {
      setError("New password is required");
      return;
    }

    if (!confirmPassword) {
      setError("Please confirm your new password");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New passwords don't match");
      return;
    }

    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters");
      return;
    }

    if (currentPassword === newPassword) {
      setError("New password must be different from current password");
      return;
    }

    // Make API call to change password
    setIsLoading(true);
    try {
      await axiosInstance.post("/users/change-password", {
        currentPassword,
        newPassword,
      });
      // Show success modal
      setShowSuccessModal(true);
    } catch (err) {
      const axiosError = err as {
        response?: { data?: { message?: string } };
        message?: string;
      };
      const errorMessage =
        axiosError.response?.data?.message ||
        axiosError.message ||
        "Failed to change password";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
    navigate("/login");
  };

  const handleOpenMenu = () => {
    setIsMenuOpen(true);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="bg-secondary flex flex-col items-center relative min-h-screen gap-4 sm:gap-8 px-4">
      {/* Hamburger Menu Button */}
      <button
        onClick={handleOpenMenu}
        className="absolute top-4 left-4 p-2 hover:bg-gray-200 rounded-lg"
      >
        <FaBars size={24} />
      </button>

      {/* Back Button */}
      <button
        onClick={() => navigate("/homepage")}
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
          Change Password
        </h4>

        <p className="text-black font-indie text-center">
          Enter your current password and choose a new one
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-4 sm:gap-6 w-full"
        >
          {/* Current Password Input */}
          <InputField
            icon={
              <span className="text-gray-600">
                <FaLock />
              </span>
            }
            type="password"
            name="currentPassword"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => handleChange(e, "current")}
            error={error && !currentPassword ? error : ""}
          />

          {/* New Password Input */}
          <InputField
            icon={
              <span className="text-gray-600">
                <FaKey />
              </span>
            }
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => handleChange(e, "new")}
            error={error && !newPassword ? error : ""}
          />

          {/* Confirm Password Input */}
          <InputField
            icon={
              <span className="text-gray-600">
                <FaKey />
              </span>
            }
            type="password"
            name="confirmPassword"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => handleChange(e, "confirm")}
            error={error && !confirmPassword ? error : ""}
          />

          {error && currentPassword && newPassword && confirmPassword && (
            <p className="text-red-500 font-indie text-sm text-center">
              {error}
            </p>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            size="md"
            variant="primary"
            disabled={isLoading}
          >
            {isLoading ? "Changing..." : "Change Password"}
          </Button>
        </form>
      </Concard>

      {/* Success Modal for password change */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleModalClose}
        title="Password Changed!"
        message="Your password has been changed successfully."
      />

      {/* Hamburger Menu */}
      <HamburgerMenu isOpen={isMenuOpen} onClose={handleCloseMenu} />
    </div>
  );
}
