import { FaPencilAlt, FaReply, FaTrashAlt } from "react-icons/fa";

interface TaskModalProps {
  task: {
    _id: string;
    title: string;
    description: string;
    completed: boolean;
    createdAt: string;
  } | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (taskId: string) => void;
  onDelete: (taskId: string) => void;
}

export default function TaskModal({
  task,
  isOpen,
  onClose,
  onEdit,
  onDelete,
}: TaskModalProps) {
  if (!isOpen || !task) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      {/* Main Lavender Container */}
      <div className="bg-[#D6DFFF] border-4 border-black rounded-[40px] w-full max-w-sm flex flex-col shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-h-[90vh]">
        {/* Header - Fixed */}
        <div className="p-6 pb-2 flex items-center justify-between">
          <button
            onClick={onClose}
            className="w-12 h-12 bg-primary rounded-full border-[3px] border-black flex items-center justify-center hover:bg-gray-100 transition-all active:scale-90"
          >
            <span className="transform -scale-x-100">
              <FaReply size={20} />
            </span>
          </button>
          <h2 className="text-2xl font-bold font-indie">Task Details</h2>
          <div className="w-12" /> {/* Spacer for centering */}
        </div>

        {/* Content Area - Scrollable to prevent overlap */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          {/* Title Box */}
          <div className="space-y-1">
            <p className="font-indie font-bold text-lg ml-2">Task title :</p>
            <div className="bg-primary border-[3px] border-black rounded-[20px] p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">
              <h3 className="text-xl font-bold font-indie wrap-break-word leading-tight">
                {task.title}
              </h3>
            </div>
          </div>

          {/* Description Box */}
          {task.description && (
            <div className="space-y-1">
              <p className="font-indie font-bold text-lg ml-2">
                Task description :
              </p>
              <div className="bg-primary border-[3px] border-black rounded-[20px] p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] min-h-30">
                <p className="text-lg font-indie wrap-break-word leading-relaxed whitespace-pre-wrap text-center">
                  {task.description}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions - Fixed */}
        <div className="p-6 pt-2 flex justify-center gap-8">
          <button
            onClick={() => onEdit(task._id)}
            className="w-16 h-16 bg-[#66BB84] rounded-full border-[3px] border-black flex items-center justify-center
             shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none transition-all active:scale-90"
          >
            <FaPencilAlt size={24} />
          </button>

          <button
            onClick={() => onDelete(task._id)}
            className="w-16 h-16 bg-[#FF6B6B] rounded-full border-[3px] border-black flex items-center justify-center
             shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none transition-all active:scale-90"
          >
            <FaTrashAlt size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}
