import logomain from "@/assets/logomain.png";
import axiosInstance from "@/axios/axios-instance";
import { useToast } from "@/components/general/Toast";
import Concard from "@/components/home/task/Concard";
import LoginForm from "@/utils/forms/LoginForm";
import { useState } from "react";
import { FaReply } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

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

    if (!newErrors.email && !newErrors.password) {
      setIsLoading(true);
      try {
        const response = await axiosInstance.post("/users/login", {
          email: formData.email,
          password: formData.password,
        });
        // Store user info and token in localStorage (also in HttpOnly cookie)
        localStorage.setItem("user", JSON.stringify(response.data.data));
        localStorage.setItem("token", response.data.data.token);
        // Show success toast
        showToast("Login successful!", "success");
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

        showToast(errorMessage, "error");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <div className="bg-secondary flex flex-col items-center relative min-h-screen gap-4 sm:gap-8 px-4">
      {/* Back Button */}
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

      {/* White background rounded container - using Concard and LoginForm components */}
      <Concard>
        <h4 className="text-black text-3xl sm:text-4xl font-indie font-bold">
          Login
        </h4>

        <LoginForm
          formData={formData}
          errors={errors}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onForgotPassword={handleForgotPassword}
          isLoading={isLoading}
        />
      </Concard>
    </div>
  );
}
