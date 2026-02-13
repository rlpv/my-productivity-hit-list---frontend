import { FaClipboardList } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AddButton from "../components/AddButton";
import AnalyticsBox from "../components/AnalyticsBox";
import Header from "../components/Header";

export default function Homepage() {
  const navigate = useNavigate();

  const handleAddClick = () => {
    navigate("/addtask");
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />

      <h4 className="font-indie flex items-center text-xl mt-3.5">
        <span className="mr-2">
          <FaClipboardList size={24} />
        </span>
        What should we do today?
      </h4>

      <main className="flex-1 bg-primary p-4 relative">
        {/* Analytics Boxes */}
        <div className="flex gap-4 mb-6">
          <AnalyticsBox title="Task To-Do" count={0} />
          <AnalyticsBox title="Accomplished" count={0} />
        </div>

        {/* Add Icon Button - navigates to Addtask page */}
        <AddButton onClick={handleAddClick} />
      </main>
    </div>
  );
}
