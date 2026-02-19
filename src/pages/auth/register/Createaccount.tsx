import logomain from "@/assets/logomain.png";
import axiosInstance from "@/axios/axios-instance";
import CreateaccountForm from "@/components/form/CreateaccountForm";
import { useToast } from "@/components/general/Toast";
import Concard from "@/components/home/task/Concard";
import { useAuthStore } from "@/store/authStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateAccount() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { login } = useAuthStore();
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
    terms: "",
  });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Check localStorage for terms acceptance and form data on mount
  useEffect(() => {
    const termsAcceptedFromStorage = localStorage.getItem("termsAccepted");
    if (termsAcceptedFromStorage === "true") {
      setTermsAccepted(true);
      // Clear the flag so user has to accept again on next visit
      localStorage.removeItem("termsAccepted");
    }

    // Load saved form data
    const savedFormData = localStorage.getItem("createAccountFormData");
    if (savedFormData) {
      const parsed = JSON.parse(savedFormData);
      setFormData(parsed);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      // Save to localStorage
      localStorage.setItem("createAccountFormData", JSON.stringify(updated));
      return updated;
    });
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleTermsChange = (checked: boolean) => {
    setTermsAccepted(checked);
    // Clear the localStorage flag if user unchecks
    if (!checked) {
      localStorage.removeItem("termsAccepted");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prevent multiple submissions
    if (isLoading) return;

    // Check terms acceptance first - show toast if not accepted
    if (!termsAccepted) {
      showToast("Please read and accept the Terms and Conditions", "error");
      return;
    }

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
      terms: "",
    };

    setErrors(newErrors);

    // If no errors, proceed with account creation
    if (
      !newErrors.username &&
      !newErrors.email &&
      !newErrors.password &&
      !newErrors.confirmPassword
    ) {
      setIsLoading(true);
      try {
        const response = await axiosInstance.post("/users/register", {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        });

        // Use store action to set auth state (also handles localStorage)
        if (response.data.data && response.data.data.token) {
          login(response.data.data, response.data.data.token);
          showToast("Account created successfully!", "success");
          // Clear form data from localStorage
          localStorage.removeItem("createAccountFormData");
          navigate("/homepage");
        } else {
          // If no token, redirect to login
          showToast("Account created successfully! Please log in.", "success");
          localStorage.removeItem("createAccountFormData");
          navigate("/login");
        }
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
    navigate("/terms");
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
