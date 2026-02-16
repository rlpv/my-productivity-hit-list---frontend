import { useEffect } from "react";
import { HiOutlineHandRaised } from "react-icons/hi2";
import { useNavigate } from "react-router-dom"; // Add this

interface LogoutModalProps {
  isOpen: boolean;
  onConfirm: () => void;
}

export default function LogoutModal({ isOpen, onConfirm }: LogoutModalProps) {
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onConfirm(); // 1. Clear session/token
        navigate("/login"); // 2. Physically change the page to login
      }, 2500); // Slightly shorter time for a snappier feel

      return () => clearTimeout(timer);
    }
  }, [isOpen, onConfirm, navigate]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-100 p-4">
      <style>
        {`
          @keyframes wave {
            0%, 100% { transform: rotate(0deg); }
            25% { transform: rotate(20deg); }
            75% { transform: rotate(-15deg); }
          }
          .animate-wave {
            animation: wave 1s ease-in-out infinite;
            transform-origin: bottom center;
          }
        `}
      </style>

      <div className="bg-[#D9D9FB] border-4 border-black rounded-[40px] w-full max-w-xs p-12 flex flex-col items-center shadow-2xl scale-90 animate-in fade-in zoom-in duration-300">
        <div className="animate-wave mb-12">
          <HiOutlineHandRaised size={120} color="black" />
        </div>
        <h2 className="text-5xl font-bold font-indie text-black">Bye!!</h2>
      </div>
    </div>
  );
}
