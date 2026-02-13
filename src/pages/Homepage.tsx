import { useState } from "react";
import { FaBars, FaPlus } from "react-icons/fa";
import logomain from "../assets/logomain.png";

interface AnalyticsBoxProps {
  title: string;
  count: number;
}

function AnalyticsBox({ title, count }: AnalyticsBoxProps) {
  return (
    <div className="flex-1 bg-white border-2 border-black rounded-xl p-4 shadow-md shadow-black/10">
      <h3 className="text-black font-indie text-lg font-bold mb-2">{title}</h3>
      <p className="text-4xl font-indie font-bold">{count}</p>
    </div>
  );
}

export default function Homepage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen">
      {/* Header - bg-secondary */}
      <header className="bg-secondary border-b-2 border-black px-6 py-5 flex items-center justify-between">
        {/* Left - Mini Logo */}
        <img src={logomain} alt="Logo" className="w-14 h-14" />

        {/* Right - Hamburger Menu */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-3 hover:bg-gray-200 rounded-lg transition-colors"
        >
          <FaBars size={32} />
        </button>
      </header>

      {/* Body - bg-primary */}
      <main className="flex-1 bg-primary p-4 relative">
        {/* Upper Part - Analytics Boxes */}
        <div className="flex gap-4 mb-6">
          <AnalyticsBox title="Task To-Do" count={0} />
          <AnalyticsBox title="Accomplished" count={0} />
        </div>

        {/* Lower Right - Add Icon Button */}
        <button
          className="absolute bottom-10 right-10 w-16 h-16 bg-white border-2 border-black rounded-full 
            flex items-center justify-center shadow-lg shadow-black/20 hover:shadow-xl 
            hover:scale-105 transition-all"
        >
          <FaPlus size={28} />
        </button>
      </main>
    </div>
  );
}
