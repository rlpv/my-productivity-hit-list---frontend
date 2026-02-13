import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logomain from "../assets/logomain.png";
import axiosInstance from "../axios/axios-instance";
import Concard from "../components/Concard";
import CreateaccountForm from "../utils/CreateaccountForm";

export default function CreateAccount() {
  const navigate = useNavigate();
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
  const [apiError, setApiError] = useState("");

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
    setApiError("");

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

        // Redirect to login page after successful registration
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

        setApiError(errorMessage);
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

        {/* API Error Message */}
        {apiError && (
          <p className="text-red-500 text-sm mb-4 text-center">{apiError}</p>
        )}

        <CreateaccountForm
          formData={formData}
          errors={errors}
          termsAccepted={termsAccepted}
          onChange={handleChange}
          onTermsChange={handleTermsChange}
          onSubmit={handleSubmit}
          onTermsClick={handleTermsClick}
        />

        {/* Loading indicator */}
        {isLoading && (
          <p className="text-black text-sm mt-4 text-center">
            Creating account...
          </p>
        )}
      </Concard>
    </div>
  );
}
