import TaskItem from "./TaskItem";

interface Task {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
}

interface TaskListProps {
  tasks: Task[];
  isLoading: boolean;
  onTaskClick: (task: Task) => void;
  onToggleComplete: (task: Task) => void;
}

export default function TaskList({
  tasks,
  isLoading,
  onTaskClick,
  onToggleComplete,
}: TaskListProps) {
  if (isLoading) {
    return <p className="text-center">Loading tasks...</p>;
  }

  if (tasks.length === 0) {
    return <p className="text-center text-gray-500">No tasks yet. Add one!</p>;
  }

  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onClick={() => onTaskClick(task)}
          onToggleComplete={() => onToggleComplete(task)}
        />
      ))}
    </div>
  );
}
