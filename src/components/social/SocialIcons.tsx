import { FaGoogle, FaInstagram, FaFacebook } from "react-icons/fa";

export default function SocialIcons() {
  return (
    <div className="flex items-center gap-3 sm:gap-4">
      <div
        className="w-10 sm:w-12 h-10 sm:h-12 rounded-full border-2 border-black bg-secondary flex items-center justify-center
       hover:bg-gray-200 transition-all shadow-md shadow-black/5 hover:shadow-lg"
      >
        <span className="text-lg sm:text-2xl text-gray-700">
          <FaGoogle />
        </span>
      </div>

      <div
        className="w-10 sm:w-12 h-10 sm:h-12 rounded-full border-2 border-black bg-secondary flex items-center justify-center
       hover:bg-gray-200 transition-all shadow-md shadow-black/5 hover:shadow-lg"
      >
        <span className="text-lg sm:text-2xl text-gray-700">
          <FaInstagram />
        </span>
      </div>

      <div
        className="w-10 sm:w-12 h-10 sm:h-12 rounded-full border-2 border-black bg-secondary flex items-center justify-center
       hover:bg-gray-200 transition-all shadow-md shadow-black/5 hover:shadow-lg"
      >
        <span className="text-lg sm:text-2xl text-gray-700">
          <FaFacebook />
        </span>
      </div>
    </div>
  );
}
