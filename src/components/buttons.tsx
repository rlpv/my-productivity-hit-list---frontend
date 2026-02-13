import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary";
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  className = "", 
  size = "md",
  variant = "primary",
  type = "button",
  ...props 
}) => {
  const sizeClasses = {
    sm: "w-32 sm:w-40 h-9 sm:h-10 text-sm",
    md: "w-44 sm:w-55 h-11 sm:h-12.5 text-base sm:text-xl",
    lg: "w-48 sm:w-60 h-12 sm:h-14 text-lg sm:text-2xl"
  };

  const variantClasses = {
    primary: "bg-white border border-black shadow-lg shadow-black/10 hover:shadow-xl hover:bg-gray-50",
    secondary: "bg-secondary border-2 border-black shadow-md shadow-black/5 hover:shadow-lg hover:bg-gray-200"
  };

  return (
    <button
      type={type}
      className={`rounded-full font-indie transition-all ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
