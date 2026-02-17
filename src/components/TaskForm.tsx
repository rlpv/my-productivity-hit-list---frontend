import { useState, type FormEvent } from "react";
import axiosInstance from "../axios/axios-instance";
import Button from "./buttons";
import { useToast } from "./Toast";

interface TaskFormProps {
  onSubmit?: (task: { title: string; description: string }) => void;
  initialValues?: { title: string; description: string };
  isEdit?: boolean;
  taskId?: string;
}

const TaskForm: React.FC<TaskFormProps> = ({
  onSubmit,
  initialValues,
  isEdit,
  taskId,
}) => {
  const { showToast } = useToast();
  const [taskTitle, setTaskTitle] = useState(initialValues?.title || "");
  const [taskDescription, setTaskDescription] = useState(
    initialValues?.description || "",
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (isEdit && taskId) {
        await axiosInstance.put(`/tasks/${taskId}`, {
          title: taskTitle,
          description: taskDescription,
        });
      } else {
        await axiosInstance.post("/tasks", {
          title: taskTitle,
          description: taskDescription,
        });
      }

      if (onSubmit) {
        onSubmit({ title: taskTitle, description: taskDescription });
      }

      showToast(
        isEdit ? "Task updated successfully!" : "Task added successfully!",
        "success",
      );

      if (!isEdit) {
        setTaskTitle("");
        setTaskDescription("");
      }
    } catch (err: unknown) {
      const error = err as {
        response?: { data?: { message?: string } };
        message?: string;
      };
      setError(
        error.response?.data?.message ||
          error.message ||
          (isEdit ? "Failed to update task" : "Failed to create task"),
      );
      showToast(
        isEdit ? "Failed to update task" : "Failed to create task",
        "error",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto p-4">
      {/* Task Title Section */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="taskTitle"
          className="font-indie text-2xl font-bold text-black"
        >
          Tasks title :
        </label>
        {/* Outer Lavender Box */}
        <div className="bg-[#D6DFFF] border-2 border-black rounded-[20px] p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          {/* Inner White Box Wrapper */}
          <div className="bg-white border-2 border-black rounded-[15px] overflow-hidden">
            <input
              type="text"
              id="taskTitle"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              className="w-full p-3 font-indie text-lg focus:outline-none bg-transparent"
              placeholder="Finish my homework."
              required
            />
          </div>
        </div>
      </div>

      {/* Task Description Section */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="taskDescription"
          className="font-indie text-2xl font-bold text-black"
        >
          Tasks description :
        </label>
        {/* Outer Lavender Box */}
        <div className="bg-[#D6DFFF] border-2 border-black rounded-[20px] p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          {/* Inner White Box Wrapper */}
          <div className="bg-white border-2 border-black rounded-[15px] overflow-hidden">
            <textarea
              id="taskDescription"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              className="w-full p-4 font-indie text-lg focus:outline-none bg-transparent min-h-37.5 text-center"
              placeholder="Do my homework in the physics, algebra and philosophy."
              rows={4}
              required
            />
          </div>
        </div>
      </div>

      {error && (
        <p className="text-red-500 font-indie font-bold text-center">{error}</p>
      )}

      <div className="flex justify-center pt-4">
        <Button
          type="submit"
          isLoading={isLoading}
          className="font-indie text-xl px-8 py-2 border-2 border-black rounded-full bg-[#D6DFFF]
           shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none transition-all"
        >
          {isEdit ? "Edit Task" : "Add Task"}
        </Button>
      </div>
    </form>
  );
};

export default TaskForm;
