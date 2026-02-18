import Header from "@/components/header/Header";
import TaskForm from "@/components/home/task/TaskForm";
import { useState } from "react";
import { FaClipboardList, FaPen, FaReply } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

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
    navigate("/homepage");
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <Header onMenuClick={() => setMenuOpen(!menuOpen)} />

      <main className="flex-1 bg-white p-4 relative overflow-y-auto">
        {/* COMPACT SKETCHED HEADER */}
        <div className="flex justify-between items-center gap-4 mb-6 mt-2">
          <div className="flex items-center gap-4">
            <div className="relative shrink-0 rotate-[-4deg]">
              {/* Scaled Down Clipboard */}
              <div className="w-12 h-14 border-[2.5px] border-black rounded-lg bg-white flex flex-col items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] relative">
                {/* Scaled Top Clip Detail */}
                <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-6 h-2 border-2 border-black rounded-t-md bg-white shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]" />

                {/* Scaled Icon Content */}
                <div className="relative pt-0.5 flex items-center justify-center">
                  <span className="text-black">
                    <FaClipboardList size={28} />
                  </span>
                  <span className="absolute inset-0 flex items-center justify-center pt-1 pl-0.5 text-black">
                    <FaPen size={12} />
                  </span>
                </div>
              </div>
            </div>

            {/* Reduced Header Text */}
            <h1 className="font-indie text-2xl font-bold text-black leading-tight tracking-tight">
              Add Task
            </h1>
          </div>

          {/* Scaled Back Button */}
          <button
            onClick={() => navigate("/homepage")}
            className="w-10 h-10 bg-secondary
              rounded-full border-[2.5px] border-black flex items-center justify-center
              shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-0.5 hover:shadow-none transition-all active:scale-90"
          >
            <span className="transform -scale-x-100">
              <FaReply size={18} />
            </span>
          </button>
        </div>

        {/* Task Form */}
        <div className="mt-2">
          <TaskForm onSubmit={handleSubmit} />
        </div>
      </main>
    </div>
  );
}
