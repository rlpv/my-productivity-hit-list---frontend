import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { HiOutlineHandRaised } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

interface LogoutModalProps {
  isOpen: boolean;
  onConfirm: () => void;
}

export default function LogoutModal({ isOpen, onConfirm }: LogoutModalProps) {
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onConfirm();
        navigate("/login");
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [isOpen, onConfirm, navigate]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-100 p-4"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg-[#D9D9FB] border-4 border-black rounded-[40px] w-full max-w-xs p-12 flex flex-col items-center shadow-2xl"
          >
            <motion.div
              animate={{ rotate: [0, 20, -15, 0] }}
              transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
              style={{ transformOrigin: "bottom center" }}
              className="mb-12"
            >
              <HiOutlineHandRaised size={120} color="black" />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl font-bold font-indie text-black"
            >
              Bye!!
            </motion.h2>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
