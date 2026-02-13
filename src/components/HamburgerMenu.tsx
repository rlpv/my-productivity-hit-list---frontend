import { FaLock, FaSignOutAlt, FaTimes, FaUser } from "react-icons/fa";
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
    // Clear any stored tokens/session data
    navigate("/login");
  };

  return (
    // Backdrop
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-40"
      onClick={onClose}
    >
      {/* Modal */}
      <div
        className="fixed right-0 top-0 h-full w-64 bg-secondary z-50 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with close button */}
        <div className="flex items-center justify-between p-4 border-b border-gray-300">
          <div className="flex items-center gap-3">
            <span className="text-2xl">
              <FaUser />
            </span>
            <span className="font-semibold">Menu</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Menu Items */}
        <div className="p-4 flex flex-col gap-4">
          {/* User Icon Display */}
          <div className="flex flex-col items-center gap-2 py-4">
            <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-3xl text-gray-600">
                <FaUser />
              </span>
            </div>
            <span className="text-sm text-gray-600">User</span>
          </div>

          {/* Change Password Button */}
          <button
            onClick={handleChangePassword}
            className="flex items-center gap-3 p-3 hover:bg-gray-200 rounded-lg transition-colors w-full text-left"
          >
            <span className="text-lg">
              <FaLock />
            </span>
            <span>Change Password</span>
          </button>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 p-3 hover:bg-gray-200 rounded-lg transition-colors w-full text-left text-red-600"
          >
            <span className="text-lg">
              <FaSignOutAlt />
            </span>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HamburgerMenu;
