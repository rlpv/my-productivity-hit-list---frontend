import { ApiError, authApi } from "@/api";
import logomain from "@/assets/logomain.png";
import LoginForm from "@/components/form/LoginForm";
import { useToast } from "@/components/general/Toast";
import Concard from "@/components/home/task/Concard";
import { useAuthStore } from "@/store/authStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { login } = useAuthStore();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  // Clear forgot password tokens and create account data when user navigates to login
  useEffect(() => {
    localStorage.removeItem("resetToken");
    localStorage.removeItem("forgotPasswordEmail");
    localStorage.removeItem("createAccountFormData");
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prevent multiple submissions
    if (isLoading) return;

    const newErrors = {
      email: formData.email ? "" : "Email is required",
      password: formData.password ? "" : "Password is required",
    };
    setErrors(newErrors);

    if (!newErrors.email && !newErrors.password) {
      setIsLoading(true);
      try {
        const response = await authApi.login(formData.email, formData.password);
        // Backend returns { _id, username, email, token } in response.data.data
        const { _id, username, email, token } = response.data.data;
        // Use store action to set auth state (also handles localStorage)
        login({ _id, username, email }, token);
        // Show success toast
        showToast("Login successful!", "success");
        // Navigate to homepage on successful login
        navigate("/homepage");
      } catch (error) {
        const errorMessage =
          error instanceof ApiError
            ? error.message
            : "Login failed. Please try again.";
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
