import { useState } from "react";
import { FaBars } from "react-icons/fa";
import logomain from "../assets/logomain.png";
import HamburgerMenu from "./HamburgerMenu";

interface HeaderProps {
  onMenuClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setIsMenuOpen(true);
    if (onMenuClick) {
      onMenuClick();
    }
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="bg-secondary border-b-2 border-black px-6 py-5 flex items-center justify-between">
        {/* Mini Logo */}
        <img src={logomain} alt="Logo" className="w-14 h-14" />

        {/* Hamburger Menu */}
        <button
          onClick={handleMenuClick}
          className="p-3 hover:bg-gray-200 rounded-lg transition-colors"
        >
          <FaBars size={32} />
        </button>
      </header>

      {/* Hamburger Menu Modal */}
      <HamburgerMenu isOpen={isMenuOpen} onClose={handleCloseMenu} />
    </>
  );
};

export default Header;
