import { useState, useEffect } from "react";
import { FaClipboardList } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AddButton from "../components/AddButton";
import AnalyticsBox from "../components/AnalyticsBox";
import Header from "../components/Header";
import TaskList from "../components/TaskList";
import TaskModal from "../components/TaskModal";
import axiosInstance from "../axios/axios-instance";

interface Task {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
}

export default function Homepage() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch tasks on component mount
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

  // Event handlers
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
    if (!confirm("Are you sure you want to delete this task?")) return;

    try {
      await axiosInstance.delete(`/tasks/${taskId}`);
      setTasks(tasks.filter((task) => task._id !== taskId));
      handleCloseModal();
    } catch (err) {
      const axiosError = err as {
        response?: { data?: { message?: string } };
        message?: string;
      };
      setError(
        axiosError.response?.data?.message ||
          axiosError.message ||
          "Failed to delete task",
      );
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
      if (selectedTask?._id === task._id) {
        setSelectedTask({ ...selectedTask, completed: !selectedTask.completed });
      }
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

  // Computed values
  const todoCount = tasks.filter((task) => !task.completed).length;
  const accomplishedCount = tasks.filter((task) => task.completed).length;

  return (
    <div className="flex flex-col h-screen">
      <Header />

      <h4 className="font-indie flex items-center text-xl mt-3.5">
        <span className="mr-2">
          <FaClipboardList size={24} />
        </span>
        What should we do today?
      </h4>

      <main className="flex-1 bg-primary p-4 relative overflow-auto">
        {/* Analytics Boxes */}
        <div className="flex gap-4 mb-6">
          <AnalyticsBox title="Task To-Do" count={todoCount} />
          <AnalyticsBox title="Accomplished" count={accomplishedCount} />
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {/* Tasks List */}
        <TaskList
          tasks={tasks}
          isLoading={isLoading}
          onTaskClick={handleTaskClick}
          onToggleComplete={handleToggleComplete}
          onDeleteTask={handleDeleteTask}
        />

        {/* Add Button */}
        <AddButton onClick={handleAddClick} />
      </main>

      {/* Task Modal */}
      <TaskModal
        task={selectedTask}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onEdit={handleEditClick}
        onDelete={handleDeleteTask}
      />
    </div>
  );
}
