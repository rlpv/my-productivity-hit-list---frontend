import axiosInstance from "@/axios/axios-instance";
import Header from "@/components/header/Header";
import TaskForm from "@/components/home/task/TaskForm";
import { useEffect, useState } from "react";
import { FaClipboardList, FaPen, FaReply } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

interface EdittaskProps {
  onTaskSubmit?: (task: { title: string; description: string }) => void;
}

export default function Edittask({ onTaskSubmit }: EdittaskProps) {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fetchTask = async () => {
      if (!id) {
        setError("Task ID not found");
        setIsFetching(false);
        return;
      }

      try {
        const response = await axiosInstance.get(`/tasks/${id}`);
        const task = response.data.data;
        setTaskTitle(task.title);
        setTaskDescription(task.description || "");
      } catch (err) {
        const axiosError = err as {
          response?: { status?: number; data?: { message?: string } };
          message?: string;
        };
        const status = axiosError.response?.status;
        const message =
          axiosError.response?.data?.message || axiosError.message;

        console.error("Error fetching task:", {
          status,
          message,
          fullError: axiosError,
        });

        if (status === 401) {
          // Token expired or invalid - redirect to login
          localStorage.removeItem("token");
          navigate("/login");
        } else if (status === 404) {
          setError(message || "Task not found. It may have been deleted.");
        } else {
          setError(message || "Failed to fetch task");
        }
      } finally {
        setIsFetching(false);
      }
    };

    fetchTask();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleSubmit = (task: { title: string; description: string }) => {
    if (onTaskSubmit) {
      onTaskSubmit(task);
    }
    console.log("Task Updated:", task);
    // Navigate back to Homepage after task update
    navigate("/homepage");
  };

  if (isFetching) {
    return (
      <div className="flex flex-col h-screen">
        <Header onMenuClick={() => setMenuOpen(!menuOpen)} />
        <main className="flex-1 bg-[#D6DFFF] p-4">
          <p className="text-center">Loading task...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <Header onMenuClick={() => setMenuOpen(!menuOpen)} />

      <main className="flex-1 bg-[#D6DFFF] p-4 relative">
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
              Edit Task
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

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {/* Form for task title and description - Using TaskForm for uniform design */}
        <TaskForm
          onSubmit={handleSubmit}
          initialValues={{ title: taskTitle, description: taskDescription }}
          isEdit={true}
          taskId={id}
        />
      </main>
    </div>
  );
}
