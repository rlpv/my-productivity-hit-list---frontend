import { AnimatePresence, motion } from "framer-motion";
import { FaCheck, FaTimes } from "react-icons/fa";
import { PiWarningBold } from "react-icons/pi";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  taskTitle?: string;
}

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
}: DeleteConfirmModalProps) {
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
          {/* Main Container - Lavender card with thick black border */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg-[#D6DFFF] border-[5px] border-black rounded-[40px] w-full max-w-xs p-8 flex flex-col items-center shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Warning Icon - Large and Bold */}
            <div className="mb-6">
              <span className="text-black">
                <PiWarningBold size={120} />
              </span>
            </div>

            {/* Message Text - Centered font-indie */}
            <div className="text-center mb-8 px-2">
              <p className="text-2xl font-bold font-indie leading-tight text-black">
                Are you sure you want to remove this task?
              </p>
            </div>

            {/* Circular Action Buttons */}
            <div className="flex gap-10">
              {/* Confirm Button - Green Circle */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onConfirm}
                className="w-16 h-16 bg-[#66BB84] border-[3px] border-black rounded-full flex items-center justify-center 
                  shadow-[0px_4px_0px_0px_rgba(0,0,0,0.3)] hover:translate-y-0.5 hover:shadow-none transition-all active:scale-90"
              >
                <span className="text-black">
                  <FaCheck size={28} />
                </span>
              </motion.button>

              {/* Cancel Button - Red Circle */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="w-16 h-16 bg-[#FF6B6B] border-[3px] border-black rounded-full flex items-center justify-center 
                  shadow-[0px_4px_0px_0px_rgba(0,0,0,0.3)] hover:translate-y-0.5 hover:shadow-none transition-all active:scale-90"
              >
                <span className="text-black">
                  <FaTimes size={28} />
                </span>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
