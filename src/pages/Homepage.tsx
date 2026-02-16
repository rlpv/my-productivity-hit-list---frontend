import { useEffect, useState } from "react";
import { FaClipboardList } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axios/axios-instance";
import AddButton from "../components/AddButton";
import AnalyticsBox from "../components/AnalyticsBox";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
import Header from "../components/Header";
import TaskList from "../components/TaskList";
import TaskModal from "../components/TaskModal";
import { useToast } from "../components/Toast";

interface Task {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
}

export default function Homepage() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axiosInstance.get("/tasks");
      setTasks(response.data.data);
    } catch (err) {
      const axiosError = err as {
        response?: { data?: { message?: string } };
        message?: string;
      };
      setError(
        axiosError.response?.data?.message ||
          axiosError.message ||
          "Failed to fetch tasks",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddClick = () => navigate("/addtask");

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  const handleEditClick = (taskId: string) => {
    setIsModalOpen(false);
    navigate(`/edittask/${taskId}`);
  };

  const handleDeleteTask = async (taskId: string) => {
    setTaskToDelete(taskId);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!taskToDelete) return;
    try {
      await axiosInstance.delete(`/tasks/${taskToDelete}`);
      setTasks(tasks.filter((task) => task._id !== taskToDelete));
      showToast("Task deleted successfully!", "success");
      handleCloseModal();
    } catch (err) {
      const axiosError = err as {
        response?: { data?: { message?: string } };
        message?: string;
      };
      showToast(
        axiosError.response?.data?.message ||
          axiosError.message ||
          "Failed to delete task",
        "error",
      );
    } finally {
      setDeleteModalOpen(false);
      setTaskToDelete(null);
    }
  };

  const handleToggleComplete = async (task: Task) => {
    try {
      await axiosInstance.put(`/tasks/${task._id}`, {
        completed: !task.completed,
      });
      setTasks(
        tasks.map((t) =>
          t._id === task._id ? { ...t, completed: !t.completed } : t,
        ),
      );
    } catch (err) {
      const axiosError = err as {
        response?: { data?: { message?: string } };
        message?: string;
      };
      setError(
        axiosError.response?.data?.message ||
          axiosError.message ||
          "Failed to update task",
      );
    }
  };

  const todoCount = tasks.filter((task) => !task.completed).length;
  const accomplishedCount = tasks.filter((task) => task.completed).length;

  return (
    <div className="flex flex-col h-screen bg-white overflow-hidden">
      <Header />

      {/* 2. Scrollable Content */}
      <main className="flex-1 px-4 pb-24 overflow-y-auto">
        <div className="flex items-center gap-4 px-6 mt-6 mb-4 shrink-0">
          <div className="relative shrink-0 rotate-[-4deg]">
            <div className="w-14 h-16 border-[3px] border-black rounded-xl bg-white flex flex-col items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] relative">
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-7 h-3 border-[2.5px] border-black rounded-t-md bg-white shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]" />

              <div className="relative pt-0.5">
                <div className="text-black">
                  <FaClipboardList size={28} />
                </div>
                <span className="absolute inset-0 flex items-center justify-center pt-1.5 pl-0.5 font-bold text-black text-sm">
                  ✓
                </span>
              </div>
            </div>
          </div>

          <h1 className="font-indie text-3xl font-bold text-black leading-tight tracking-tight">
            What should we do today?
          </h1>
        </div>

        {/* Analytics Section */}
        <div className="flex gap-4 mb-8">
          <AnalyticsBox title="Task to-do" count={todoCount} />
          <AnalyticsBox title="Accomplished" count={accomplishedCount} />
        </div>

        <div className="flex items-center gap-3 mb-6 px-2">
          <div className="bg-white border-2 border-black rounded-xl p-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center justify-center min-w-12.5 rotate-2">
            <span className="font-indie font-bold text-[10px] leading-none border-b-2 border-black w-full text-center pb-0.5">
              0-0
            </span>
            <span className="font-indie font-bold text-lg leading-none pt-0.5">
              7
            </span>
          </div>
          <h2 className="font-indie text-3xl font-bold text-black">My task</h2>
        </div>

        {/* Task List */}
        <TaskList
          tasks={tasks}
          isLoading={isLoading}
          onTaskClick={handleTaskClick}
          onToggleComplete={handleToggleComplete}
        />

        {error && (
          <p className="text-red-600 font-indie font-bold text-center mt-6 p-2 border-2 border-black rounded-xl">
            {error}
          </p>
        )}
      </main>

      {/* 3. Global Floating Add Button */}
      <div className="fixed bottom-8 right-6 z-10 scale-110">
        <AddButton onClick={handleAddClick} />
      </div>

      <TaskModal
        task={selectedTask}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onEdit={handleEditClick}
        onDelete={handleDeleteTask}
      />

      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
