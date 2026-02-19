import logomain from "@/assets/logomain.png";
import Concard from "@/components/home/task/Concard";
import SocialIcons from "@/components/social/SocialIcons";
import Button from "@/components/ui/Button";
import { useNavigate } from "react-router-dom";

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
          Let's get to work
        </h4>

        <Button
          size="md"
          variant="primary"
          onClick={() => navigate("/createaccount")}
        >
          Create Account
        </Button>

        <Button size="md" variant="primary" onClick={() => navigate("/login")}>
          Login
        </Button>

        <h4 className="text-black font-indie">
          <span className="block text-center">or</span>
          <span className="block text-center text-lg">sign up with</span>
        </h4>
        {/* Social Media Icons */}
        <SocialIcons />
      </Concard>
    </div>
  );
}
