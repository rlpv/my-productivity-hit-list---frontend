import { FaPlus } from "react-icons/fa";

interface AddButtonProps {
  onClick?: () => void;
}

const AddButton: React.FC<AddButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="absolute bottom-10 right-10 w-16 h-16 bg-white border-2 border-black rounded-full 
        flex items-center justify-center shadow-lg shadow-black/20 hover:shadow-xl 
        hover:scale-105 transition-all"
    >
      <FaPlus size={28} />
    </button>
  );
};

export default AddButton;
