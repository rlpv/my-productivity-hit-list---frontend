import { useState } from "react";
import { FaLock, FaUser } from "react-icons/fa";
import logomain from "../assets/logomain.png";
import InputField from "../components/InputField";

export default function login() {
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
    }
  };

  const handleForgotPassword = () => {
    console.log("Forgot password for username:", formData.username);
  };

  return (
    <div className="bg-secondary flex flex-col items-center relative min-h-screen gap-8 py-8">
      {/* Logo */}
      <img src={logomain} alt="Logo" className="w-65 h-65 mt-30" />

      {/* White background rounded container - EXACT same as Login component */}
      <div className="bg-white rounded-3xl border border-black p-10 flex flex-col items-center gap-6 shadow-xl shadow-black/20">
        <h4 className="text-black text-4xl font-indie font-bold">Login</h4>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-6"
        >
          {/* Username Field - Fixed icon */}
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

          {/* Password Field - Fixed icon */}
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

          {/* Enter Button - matches button styling from Login component */}
          <button
            type="submit"
            className="bg-white border border-black w-55 h-12.5 rounded-full 
              font-indie text-xl shadow-lg shadow-black/10 hover:shadow-xl 
              transition-all hover:bg-gray-50"
          >
            Enter
          </button>

          {/* Forget Password - styled as a button to match the layout */}
          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-black font-indie text-lg underline hover:no-underline 
              hover:text-gray-700 transition-colors"
          >
            Forgot Password?
          </button>
        </form>
      </div>
    </div>
  );
}
