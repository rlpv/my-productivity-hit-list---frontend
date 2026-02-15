import { useState, useEffect } from "react";
import { FaPen } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import axiosInstance from "../axios/axios-instance";
import Button from "../components/buttons";

interface EdittaskProps {
  onTaskSubmit?: (task: { title: string; description: string }) => void;
}

export default function Edittask({ onTaskSubmit }: EdittaskProps) {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState("");

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
          response?: { data?: { message?: string } };
          message?: string;
        };
        setError(
          axiosError.response?.data?.message ||
            axiosError.message ||
            "Failed to fetch task",
        );
      } finally {
        setIsFetching(false);
      }
    };

    fetchTask();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await axiosInstance.put(`/tasks/${id}`, {
        title: taskTitle,
        description: taskDescription,
      });

      if (onTaskSubmit) {
        onTaskSubmit({ title: taskTitle, description: taskDescription });
      }
      console.log("Task Updated:", { taskTitle, taskDescription });

      // Navigate back to Homepage after task update
      navigate("/homepage");
    } catch (err: unknown) {
      const axiosError = err as {
        response?: { data?: { message?: string } };
        message?: string;
      };
      setError(
        axiosError.response?.data?.message ||
          axiosError.message ||
          "Failed to update task",
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="flex flex-col h-screen">
        <Header />
        <main className="flex-1 bg-primary p-4">
          <p className="text-center">Loading task...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <Header />

      <main className="flex-1 bg-primary p-4 relative">
        {/* Edit Task Header */}
        <div className="flex gap-4 mb-6 items-center">
          <h4 className="font-indie flex items-center text-xl">
            <span className="mr-2">
              <FaPen size={24} />
            </span>
            Edit Task
          </h4>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {/* Form for task title and description */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Task Title Input */}
          <div>
            <label
              htmlFor="taskTitle"
              className="block text-lg font-medium text-gray-700"
            >
              Task Title
            </label>
            <input
              type="text"
              id="taskTitle"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              className="w-full mt-2 p-3 border-2 border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter task title"
              required
            />
          </div>

          {/* Task Description Input */}
          <div>
            <label
              htmlFor="taskDescription"
              className="block text-lg font-medium text-gray-700"
            >
              Task Description
            </label>
            <textarea
              id="taskDescription"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              className="w-full mt-2 p-3 border-2 border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter task description"
              rows={4}
              required
            />
          </div>

          {/* Edit Task Button */}
          <Button type="submit" size="md" variant="primary" disabled={isLoading}>
            {isLoading ? "Editing..." : "Edit Task"}
          </Button>
        </form>
      </main>
    </div>
  );
}
