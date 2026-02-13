import { useState, type FormEvent } from "react";
import axiosInstance from "../axios/axios-instance";
import Button from "./buttons";

interface TaskFormProps {
  onSubmit?: (task: { title: string; description: string }) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit }) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Token is sent automatically via axios interceptor
      await axiosInstance.post("/tasks", {
        title: taskTitle,
        description: taskDescription,
      });

      if (onSubmit) {
        onSubmit({ title: taskTitle, description: taskDescription });
      }
      console.log("Task Submitted:", { taskTitle, taskDescription });

      // Clear form
      setTaskTitle("");
      setTaskDescription("");
    } catch (err: unknown) {
      const axiosError = err as {
        response?: { data?: { message?: string } };
        message?: string;
      };
      setError(
        axiosError.response?.data?.message ||
          axiosError.message ||
          "Failed to create task",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
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

      {/* Error Message */}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* Add Task Button */}
      <Button type="submit" size="md" variant="primary" disabled={isLoading}>
        {isLoading ? "Adding..." : "Add Task"}
      </Button>
    </form>
  );
};

export default TaskForm;
