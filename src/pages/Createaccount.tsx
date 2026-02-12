import { useState } from "react";
import { FaLock, FaUser } from "react-icons/fa";
import logomain from "../assets/logomain.png";
import InputField from "../components/InputField";

export default function CreateAccount() {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
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
      !newErrors.confirmPassword
    ) {
      console.log("Account creation attempt:", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      // Add your account creation logic here
    }
  };

  return (
    <div className="bg-secondary flex flex-col items-center relative min-h-screen gap-8 py-8">
      {/* Logo */}
      <img src={logomain} alt="Logo" className="w-65 h-65 mt-30" />

      {/* White background rounded container - EXACT same as Login component */}
      <div className="bg-white rounded-3xl border border-black p-10 flex flex-col items-center gap-6 shadow-xl shadow-black/20">
        <h4 className="text-black text-4xl font-indie font-bold">
          Create Account
        </h4>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-6"
        >
          {/* Username Field */}
          <InputField
            icon={
              <span className="text-gray-600">
                <FaUser />
              </span>
            }
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            error={errors.username}
          />

          {/* Password Field */}
          <InputField
            icon={
              <span className="text-gray-600">
                <FaLock />
              </span>
            }
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />

          {/* Confirm Password Field */}
          <InputField
            icon={
              <span className="text-gray-600">
                <FaLock />
              </span>
            }
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
          />

          {/* Create Account Button - matches button styling from Login component */}
          <button
            type="submit"
            className="bg-white border border-black w-55 h-12.5 rounded-full 
              font-indie text-xl shadow-lg shadow-black/10 hover:shadow-xl 
              transition-all hover:bg-gray-50"
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  );
}
