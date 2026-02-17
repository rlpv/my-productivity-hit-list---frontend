import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Concard: React.FC<CardProps> = ({ children, className = "" }) => {
  return (
    <div
      className={`bg-white rounded-3xl border-2 border-black p-6 sm:p-10 flex flex-col items-center gap-4 sm:gap-6 shadow-xl shadow-black/20 w-11/12 max-w-xs sm:max-w-sm ${className}`}
    >
      {children}
    </div>
  );
};

export default Concard;
