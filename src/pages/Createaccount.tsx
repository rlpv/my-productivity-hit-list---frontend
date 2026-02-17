import { useState } from "react";
import { FaReply } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logomain from "../assets/logomain.png";
import axiosInstance from "../axios/axios-instance";
import Concard from "../components/Concard";
import { useToast } from "../components/Toast";
import CreateaccountForm from "../utils/CreateaccountForm";

export default function CreateAccount() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleTermsChange = (checked: boolean) => {
    setTermsAccepted(checked);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const newErrors = {
      username: formData.username ? "" : "Username is required",
      email: !formData.email
        ? "Email is required"
        : !emailRegex.test(formData.email)
          ? "Please enter a valid email address"
          : "",
      password: formData.password ? "" : "Password is required",
      confirmPassword: !formData.confirmPassword
        ? "Please confirm your password"
        : formData.password !== formData.confirmPassword
          ? "Passwords don't match"
          : "",
    };

    setErrors(newErrors);

    // If no errors, proceed with account creation
    if (
      !newErrors.username &&
      !newErrors.email &&
      !newErrors.password &&
      !newErrors.confirmPassword &&
      termsAccepted
    ) {
      setIsLoading(true);
      try {
        await axiosInstance.post("/users/register", {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        });

        // Show success toast
        showToast("Account created successfully! Please log in.", "success");
        navigate("/login");
      } catch (error) {
        // Type guard to check if it's an Axios error with response data
        const axiosError = error as {
          response?: { data?: { message?: string } };
          request?: object;
          message?: string;
        };

        // Check for different error scenarios
        let errorMessage = "Registration failed. Please try again.";

        if (axiosError.response?.data?.message) {
          // Server responded with an error message
          errorMessage = axiosError.response.data.message;
        } else if (axiosError.message) {
          // Network error or other error with a message
          errorMessage = axiosError.message;
        } else if (axiosError.request) {
          // Request was made but no response received
          errorMessage =
            "Unable to connect to server. Please check if the backend is running.";
        }

        showToast(errorMessage, "error");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleTermsClick = () => {
    navigate("/termscond");
  };

  return (
    <div className="bg-secondary flex flex-col items-center relative min-h-screen gap-4 sm:gap-8 px-4">
      <button
        onClick={() => navigate("/signup")}
        className="absolute top-4 right-4 w-12 h-12 bg-secondary
               rounded-full border-[3px] border-black flex items-center justify-center
                hover:bg-gray-100 transition-all active:scale-90"
      >
        <span className="transform -scale-x-100">
          <FaReply size={20} />
        </span>
      </button>

      {/* Logo */}
      <img
        src={logomain}
        alt="Logo"
        className="w-48 sm:w-65 h-48 sm:h-65 mt-20 sm:mt-30"
      />

      {/* White background rounded container - using Concard and CreateaccountForm components */}
      <Concard>
        <h4 className="text-black text-3xl sm:text-4xl font-indie font-bold">
          Create Account
        </h4>

        <CreateaccountForm
          formData={formData}
          errors={errors}
          termsAccepted={termsAccepted}
          onChange={handleChange}
          onTermsChange={handleTermsChange}
          onSubmit={handleSubmit}
          onTermsClick={handleTermsClick}
          isLoading={isLoading}
        />
      </Concard>
    </div>
  );
}
