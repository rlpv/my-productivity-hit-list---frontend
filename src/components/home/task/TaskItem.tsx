import type { Task } from "@/types";

interface TaskItemProps {
  task: Task;
  onClick: () => void;
  onToggleComplete: () => void;
}

export default function TaskItem({
  task,
  onClick,
  onToggleComplete,
}: TaskItemProps) {
  // Logic to limit title to 23 characters including spaces
  const truncatedTitle =
    task.title.length > 23 ? task.title.substring(0, 23) + "...." : task.title;

  return (
    <div
      className={`relative flex items-center gap-3 bg-[#D6DFFF] border-2 border-black rounded-[25px] p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-4 ${
        task.completed ? "opacity-70" : ""
      }`}
    >
      {/* 1. The Checkbox Container */}
      <div className="flex items-center justify-center pl-1">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={(e) => {
            e.stopPropagation();
            onToggleComplete();
          }}
          className="w-6 h-6 border-2 border-black rounded cursor-pointer accent-blue-600"
        />
      </div>

      {/* 2. The Inner White Text Box */}
      <div
        onClick={() => !task.completed && onClick()} // Only trigger onClick if NOT completed
        className={`flex-1 bg-white border-2 border-black rounded-[18px] px-5 py-2 flex items-center min-h-12.5 overflow-hidden transition-transform 
          ${
            task.completed
              ? "cursor-default pointer-events-none" // Disable interaction when checked
              : "cursor-pointer hover:bg-gray-50 active:scale-[0.98]"
          }`}
      >
        <span
          className={`font-indie text-xl text-black leading-tight ${
            task.completed ? "line-through text-gray-400" : ""
          }`}
        >
          {truncatedTitle}
        </span>
      </div>
    </div>
  );
}
