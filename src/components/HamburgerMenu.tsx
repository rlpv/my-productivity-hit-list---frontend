import { FaLock, FaSignOutAlt, FaTimes, FaUserCircle } from "react-icons/fa"; // Changed to FaUserCircle for a closer match
import { useNavigate } from "react-router-dom";

interface HamburgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleChangePassword = () => {
    onClose();
    navigate("/forgotpass");
  };

  const handleLogout = () => {
    onClose();
    navigate("/login");
  };

  return (
    // Backdrop - Always full screen
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center md:block"
      onClick={onClose}
    >
      {/* Modal / Sidebar Container */}
      <div
        className={`
          relative z-50 shadow-2xl transition-all duration-300
          /* Mobile View: Centered Card */
          w-[90%] max-w-[400px] aspect-square bg-[#D9D9FB] rounded-[40px] border-[6px] border-black flex flex-col items-center justify-between p-10
          /* Big Screen: Right Sidebar Drawer */
          md:fixed md:right-0 md:top-0 md:h-full md:w-64 md:bg-secondary md:rounded-none md:border-0 md:flex-col md:justify-start md:p-4
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - Hidden on mobile card, shown on sidebar */}
        <div className="hidden md:flex items-center justify-between w-full p-4 border-b border-gray-300 mb-4">
          <div className="flex items-center gap-3">
             <FaUserCircle className="text-2xl" />
            <span className="font-semibold text-black">Menu</span>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-lg">
            <FaTimes size={20} />
          </button>
        </div>

        {/* Profile Icon - Large on mobile, standard on sidebar */}
        <div className="flex flex-col items-center justify-center flex-grow md:flex-grow-0">
          <FaUserCircle className="text-[150px] md:text-6xl text-black" />
        </div>

        {/* Buttons Container */}
        <div className="flex flex-row justify-center gap-4 w-full md:flex-col md:mt-8">
          
          {/* Change Password Button */}
          <button
            onClick={handleChangePassword}
            className="
              bg-[#4FA3FF] border-2 border-black rounded-2xl px-4 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]
              text-black font-bold text-center leading-tight transition-transform active:translate-y-1
              md:bg-transparent md:border-0 md:shadow-none md:flex md:items-center md:gap-3 md:text-left md:font-normal
            "
          >
            <span className="md:hidden">Change<br/>Password</span>
            <span className="hidden md:flex items-center gap-3">
               <FaLock /> Change Password
            </span>
          </button>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="
              bg-[#FF6B6B] border-2 border-black rounded-2xl px-8 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]
              text-black font-bold transition-transform active:translate-y-1
              md:bg-transparent md:border-0 md:shadow-none md:flex md:items-center md:gap-3 md:text-left md:font-normal md:text-red-600
            "
          >
            <span className="md:hidden text-lg">Logout</span>
            <span className="hidden md:flex items-center gap-3">
               <FaSignOutAlt /> Logout
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HamburgerMenu;