import { type InputHTMLAttributes, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  type?: "text" | "email" | "password" | "number";
  error?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  icon,
  type = "text",
  placeholder,
  error,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  // Show error message as placeholder when there's an error
  const displayPlaceholder = error ? error : placeholder;

  return (
    <div className="w-full max-w-65 border-2 border-black bg-gray-100 rounded-xl flex items-center px-3 sm:px-4 py-2 sm:py-3 my-2 sm:my-4 mx-auto">
      <style>{`
        input[type="password"]::-webkit-credentials-auto-fill-button {
          display: none !important;
        }
        input[type="password"]::-ms-reveal,
        input[type="password"]::-webkit-outer-spin-button,
        input[type="password"]::-webkit-inner-spin-button {
          display: none !important;
        }
      `}</style>
      {icon && <span className="mr-2 sm:mr-3">{icon}</span>}
      <input
        type={inputType}
        placeholder={displayPlaceholder}
        className={`w-full text-sm sm:text-base bg-transparent outline-none ${error ? "placeholder-red-500 text-red-500" : ""}`}
        {...rest}
      />
      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="ml-2 sm:ml-3 cursor-pointer"
        >
          {showPassword ? (
            <AiFillEye size={18} />
          ) : (
            <AiFillEyeInvisible size={18} />
          )}
        </button>
      )}
    </div>
  );
};

export default InputField;
