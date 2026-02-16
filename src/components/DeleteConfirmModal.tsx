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
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center z-50 p-4">
      {/* Main Container - Lavender card with thick black border */}
      <div className="bg-[#D6DFFF] border-[5px] border-black rounded-[40px] w-full max-w-xs p-8 flex flex-col items-center shadow-lg">
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
          <button
            onClick={onConfirm}
            className="w-16 h-16 bg-[#66BB84] border-[3px] border-black rounded-full flex items-center justify-center 
              shadow-[0px_4px_0px_0px_rgba(0,0,0,0.3)] hover:translate-y-0.5 hover:shadow-none transition-all active:scale-90"
          >
            <span className="text-black">
              <FaCheck size={28} />
            </span>
          </button>

          {/* Cancel Button - Red Circle */}
          <button
            onClick={onClose}
            className="w-16 h-16 bg-[#FF6B6B] border-[3px] border-black rounded-full flex items-center justify-center 
              shadow-[0px_4px_0px_0px_rgba(0,0,0,0.3)] hover:translate-y-0.5 hover:shadow-none transition-all active:scale-90"
          >
            <span className="text-black">
              <FaTimes size={28} />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
