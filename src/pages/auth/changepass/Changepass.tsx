import logomain from "@/assets/logomain.png";
import axiosInstance from "@/axios/axios-instance";
import { useToast } from "@/components/general/Toast";
import HamburgerMenu from "@/components/header/HamburgerMenu";
import Concard from "@/components/home/task/Concard";
import InputField from "@/components/input/InputField";
import Button from "@/components/ui/Button";
import { useState, type FormEvent } from "react";
import { FaBars, FaKey, FaLock, FaReply } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function ChangePass() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!currentPassword) {
      showToast("Current password is required", "error");
      return;
    }

    if (!newPassword) {
      showToast("New password is required", "error");
      return;
    }

    if (!confirmPassword) {
      showToast("Please confirm your new password", "error");
      return;
    }

    if (newPassword !== confirmPassword) {
      showToast("New passwords don't match", "error");
      return;
    }

    if (newPassword.length < 6) {
      showToast("New password must be at least 6 characters", "error");
      return;
    }

    if (currentPassword === newPassword) {
      showToast(
        "New password must be different from current password",
        "error",
      );
      return;
    }

    // Make API call to change password
    setIsLoading(true);
    try {
      await axiosInstance.post("/users/change-password", {
        currentPassword,
        newPassword,
      });
      // Show success toast
      showToast("Password changed successfully!", "success");
      navigate("/homepage");
    } catch (err) {
      const axiosError = err as {
        response?: { data?: { message?: string } };
        message?: string;
      };
      const errorMessage =
        axiosError.response?.data?.message ||
        axiosError.message ||
        "Failed to change password";
      showToast(errorMessage, "error");
    } finally {
      setIsLoading(false);
    }
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
            error=""
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
            error=""
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
            error=""
          />

          {/* Submit Button */}
          <Button
            type="submit"
            size="md"
            variant="primary"
            isLoading={isLoading}
          >
            Change Password
          </Button>
        </form>
      </Concard>

      {/* Hamburger Menu */}
      <HamburgerMenu isOpen={isMenuOpen} onClose={handleCloseMenu} />
    </div>
  );
}
