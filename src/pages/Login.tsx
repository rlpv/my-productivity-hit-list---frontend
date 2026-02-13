import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logomain from "../assets/logomain.png";
import axiosInstance from "../axios/axios-instance";
import Concard from "../components/Concard";
import LoginForm from "../utils/LoginForm";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = {
      email: formData.email ? "" : "Email is required",
      password: formData.password ? "" : "Password is required",
    };
    setErrors(newErrors);
    setApiError("");

    if (!newErrors.email && !newErrors.password) {
      setIsLoading(true);
      try {
        const response = await axiosInstance.post("/users/login", {
          email: formData.email,
          password: formData.password,
        });
        // Store user info and token in localStorage
        localStorage.setItem("user", JSON.stringify(response.data.data));
        localStorage.setItem("token", response.data.data.token);
        // Navigate to homepage on successful login
        navigate("/homepage");
      } catch (error) {
        // Type guard to check if it's an Axios error with response data
        const axiosError = error as {
          response?: { data?: { message?: string } };
          request?: object;
          message?: string;
        };

        // Check for different error scenarios
        let errorMessage = "Login failed. Please try again.";

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

  const handleForgotPassword = () => {
    navigate("/forgotpass");
  };

  return (
    <div className="bg-secondary flex flex-col items-center relative min-h-screen gap-4 sm:gap-8 px-4">
      {/* Logo */}
      <img
        src={logomain}
        alt="Logo"
        className="w-48 sm:w-65 h-48 sm:h-65 mt-20 sm:mt-30"
      />

      {/* White background rounded container - using Concard and LoginForm components */}
      <Concard>
        <h4 className="text-black text-3xl sm:text-4xl font-indie font-bold">
          Login
        </h4>

        {/* API Error Message */}
        {apiError && (
          <p className="text-red-500 text-sm mb-4 text-center">{apiError}</p>
        )}

        <LoginForm
          formData={formData}
          errors={errors}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onForgotPassword={handleForgotPassword}
        />

        {/* Loading indicator */}
        {isLoading && (
          <p className="text-black text-sm mt-4 text-center">Logging in...</p>
        )}
      </Concard>
    </div>
  );
}
