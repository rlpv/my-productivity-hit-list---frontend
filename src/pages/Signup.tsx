import { useNavigate } from "react-router-dom";
import logomain from "../assets/logomain.png";
import Button from "../components/buttons";
import Concard from "../components/Concard";
import SocialIcons from "../components/SocialIcons";

export default function Signup() {
  const navigate = useNavigate();

  return (
    <div className="bg-secondary flex flex-col items-center relative min-h-screen gap-4 sm:gap-8 px-4">
      {/* Logo */}
      <img
        src={logomain}
        alt="Logo"
        className="w-48 sm:w-65 h-48 sm:h-65 mt-20 sm:mt-30"
      />

      {/* White background rounded container with thick black border and shadow */}
      <Concard>
        <h4 className="text-black text-3xl sm:text-4xl font-indie font-bold">
          Sign Up
        </h4>

        <Button size="md" variant="primary" onClick={() => navigate("/login")}>
          Login
        </Button>

        <Button
          size="md"
          variant="primary"
          onClick={() => navigate("/createaccount")}
        >
          Create Account
        </Button>

        <h4 className="text-black font-indie">
          <span className="block text-center">or</span>
          <span className="block text-center">sign up with</span>
        </h4>
        {/* Social Media Icons */}
        <SocialIcons />
      </Concard>
    </div>
  );
}
