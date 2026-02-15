import { FaPen, FaTrash } from "react-icons/fa";

interface TaskItemProps {
  task: {
    _id: string;
    title: string;
    description: string;
    completed: boolean;
    createdAt: string;
  };
  onClick: () => void;
  onToggleComplete: () => void;
  onDelete: () => void;
}

export default function TaskItem({
  task,
  onClick,
  onToggleComplete,
  onDelete,
}: TaskItemProps) {
  return (
    <div
      className={`bg-white border-2 border-black rounded-xl p-3 cursor-pointer hover:bg-gray-50 ${
        task.completed ? "opacity-60" : ""
      }`}
    >
      <div className="flex items-center justify-between">
        <div 
          className="flex items-center gap-2 flex-1"
          onClick={onClick}
        >
          <input
            type="checkbox"
            checked={task.completed}
            onChange={(e) => {
              e.stopPropagation();
              onToggleComplete();
            }}
            className="w-5 h-5 accent-black cursor-pointer"
          />
          <span
            className={`font-indie text-lg ${
              task.completed ? "line-through text-gray-500" : ""
            }`}
          >
            {task.title}
          </span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="p-2 text-red-600 hover:bg-red-100 rounded-lg"
          title="Delete Task"
        >
          <FaTrash size={16} />
        </button>
      </div>
    </div>
  );
}
