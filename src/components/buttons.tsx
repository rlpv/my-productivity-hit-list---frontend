import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary";
  type?: "button" | "submit" | "reset";
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  size = "md",
  variant = "primary",
  type = "button",
  isLoading = false,
  disabled,
  ...props
}) => {
  const sizeClasses = {
    sm: "w-32 sm:w-40 h-9 sm:h-10 text-sm",
    md: "w-44 sm:w-55 h-11 sm:h-12.5 text-base sm:text-xl",
    lg: "w-48 sm:w-60 h-12 sm:h-14 text-lg sm:text-2xl",
  };

  const variantClasses = {
    primary:
      "bg-white border-2 border-black shadow-lg shadow-black/10 hover:shadow-xl hover:bg-gray-50",
    secondary:
      "bg-secondary border-2 border-black shadow-md shadow-black/5 hover:shadow-lg hover:bg-gray-200",
  };

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={`rounded-full font-indie transition-all ${sizeClasses[size]} ${variantClasses[variant]} ${className} ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
