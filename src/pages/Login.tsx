import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logomain from "../assets/logomain.png";
import Concard from "./Concard";
import LoginForm from "./LoginForm";

export default function login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = {
      username: formData.username ? "" : "Username is required",
      password: formData.password ? "" : "Password is required",
    };
    setErrors(newErrors);
    if (!newErrors.username && !newErrors.password) {
      console.log("Login attempt:", formData);
      // Navigate to homepage on successful login
      navigate("/homepage");
    }
  };

  const handleForgotPassword = () => {
    navigate("/forgotpass");
  };

  return (
    <div className="bg-secondary flex flex-col items-center relative min-h-screen gap-4 sm:gap-8 px-4">
      {/* Logo */}
      <img src={logomain} alt="Logo" className="w-48 sm:w-65 h-48 sm:h-65 mt-20 sm:mt-30" />

      {/* White background rounded container - using Concard and LoginForm components */}
      <Concard>
        <h4 className="text-black text-3xl sm:text-4xl font-indie font-bold">Login</h4>
        
        <LoginForm 
          formData={formData}
          errors={errors}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onForgotPassword={handleForgotPassword}
        />
      </Concard>
    </div>
  );
}
