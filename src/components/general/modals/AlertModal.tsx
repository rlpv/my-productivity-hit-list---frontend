import { AnimatePresence, motion } from "framer-motion";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  type?: "success" | "error" | "info";
}

export default function AlertModal({
  isOpen,
  onClose,
  message,
}: AlertModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          {/* Main Container - Matches the lavender sketched card style */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg- bg-secondary border-4 border-black rounded-[40px] w-full max-w-xs p-10 flex flex-col items-center shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Message Text - Using font-indie for the handwritten look */}
            <div className="flex-1 flex flex-col justify-center text-center mb-8">
              <p className="text-2xl font-bold font-indie leading-tight text-black">
                {message}
              </p>
            </div>

            {/* OK Button - Styled as the green pill from your reference */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="bg-[#66BB84] border-2 border-black rounded-2xl px-10 py-1.5 text-lg font-bold font-indie
               shadow-[0px_4px_0px_0px_rgba(0,0,0,0.3)] hover:translate-y-0.5 hover:shadow-none transition-all active:scale-95"
            >
              ok
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
