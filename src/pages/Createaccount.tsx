import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logomain from "../assets/logomain.png";
import Concard from "./Concard";
import CreateaccountForm from "./CreateaccountForm";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    const newErrors = {
      username: formData.username ? "" : "Username is required",
      email: formData.email ? "" : "Email is required",
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
      console.log("Account creation attempt:", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      // Add your account creation logic here
    }
  };

  const handleTermsClick = () => {
    navigate("/termscond");
  };

  return (
    <div className="bg-secondary flex flex-col items-center relative min-h-screen gap-4 sm:gap-8 px-4">
      {/* Logo */}
      <img src={logomain} alt="Logo" className="w-48 sm:w-65 h-48 sm:h-65 mt-20 sm:mt-30" />

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
        />
      </Concard>
    </div>
  );
}
