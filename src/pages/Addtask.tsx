import { useState } from "react";
import { FaPen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import TaskForm from "../components/TaskForm";

interface AddtaskProps {
  onTaskSubmit?: (task: { title: string; description: string }) => void;
}

export default function Addtask({ onTaskSubmit }: AddtaskProps) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSubmit = (task: { title: string; description: string }) => {
    if (onTaskSubmit) {
      onTaskSubmit(task);
    }
    // Navigate to Homepage after task submission
    navigate("/homepage");
  };

  return (
    <div className="flex flex-col h-screen">
      <Header onMenuClick={() => setMenuOpen(!menuOpen)} />

      <main className="flex-1 bg-primary p-4 relative">
        {/* Add Task Header */}
        <div className="flex gap-4 mb-6 items-center">
          <h4 className="font-indie flex items-center text-xl">
            <span className="mr-2">
              <FaPen size={24} />
            </span>
            Add Task
          </h4>
        </div>

        {/* Form for task title and description */}
        <TaskForm onSubmit={handleSubmit} />
      </main>
    </div>
  );
}
