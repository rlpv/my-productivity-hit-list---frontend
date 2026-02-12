import { FaFacebook, FaGoogle, FaInstagram } from "react-icons/fa";
import logomain from "../assets/logomain.png";

export default function signup() {
  return (
    <div className="bg-secondary flex flex-col items-center relative h-screen gap-8">
      {/* Logo */}
      <img src={logomain} alt="Logo" className="w-65 h-65 mt-30" />

      {/* White background rounded container with thick black border and shadow */}
      <div className="bg-white rounded-3xl border border-black p-10 flex flex-col items-center gap-6 shadow-xl shadow-black/20">
        <h4 className="text-black text-4xl font-indie font-bold">Sign Up</h4>

        <button
          className="bg-white border border-black w-55 h-12.5 rounded-full font-indie text-xl
         shadow-lg shadow-black/10 hover:shadow-xl transition-shadow"
        >
          Login
        </button>

        <button
          className="bg-white border border-black w-55 h-12.5 rounded-full font-indie text-xl
         shadow-lg shadow-black/10 hover:shadow-xl transition-shadow"
        >
          Create Account
        </button>

        <h4 className="text-black font-indie">or sign up with</h4>

        {/* Social Media Icons - Fixed with wrapper spans */}
        <div className="flex items-center gap-4">
          <div
            className="w-12 h-12 rounded-full border-2 border-black bg-secondary flex items-center justify-center
           hover:bg-gray-200 transition-all shadow-md shadow-black/5 hover:shadow-lg"
          >
            <span className="text-2xl text-gray-700">
              <FaGoogle />
            </span>
          </div>

          <div
            className="w-12 h-12 rounded-full border-2 border-black bg-secondary flex items-center justify-center
           hover:bg-gray-200 transition-all shadow-md shadow-black/5 hover:shadow-lg"
          >
            <span className="text-2xl text-gray-700">
              <FaInstagram />
            </span>
          </div>

          <div
            className="w-12 h-12 rounded-full border-2 border-black bg-secondary flex items-center justify-center
           hover:bg-gray-200 transition-all shadow-md shadow-black/5 hover:shadow-lg"
          >
            <span className="text-2xl text-gray-700">
              <FaFacebook />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
