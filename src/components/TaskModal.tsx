import { FaTimes, FaPen, FaTrash } from "react-icons/fa";

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white border-2 border-black rounded-xl p-6 w-full max-w-md mx-4 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <FaTimes size={20} />
        </button>

        {/* Task Details */}
        <div className="mb-6">
          <h3
            className={`font-indie text-2xl ${
              task.completed ? "line-through text-gray-500" : ""
            }`}
          >
            {task.title}
          </h3>

          {task.description && (
            <p className="text-gray-600 mt-3 whitespace-pre-wrap">
              {task.description}
            </p>
          )}

          <p className="text-gray-400 text-sm mt-4">
            Created: {new Date(task.createdAt).toLocaleDateString()}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => onEdit(task._id)}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
          >
            <FaPen size={16} />
            Edit
          </button>
          <button
            onClick={() => onDelete(task._id)}
            className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 flex items-center justify-center gap-2"
          >
            <FaTrash size={16} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
