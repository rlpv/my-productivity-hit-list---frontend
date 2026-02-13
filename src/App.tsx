import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Addtask from "./pages/Addtask";
import createaccount from "./pages/Createaccount";
import ForgotPass from "./pages/Forgotpass";
import Homepage from "./pages/Homepage";
import Landingpage from "./pages/Landingpage";
import login from "./pages/Login";
import SetNewPass from "./pages/Setnewpass";
import signup from "./pages/Signup";
import TermsCond from "./pages/Termscond";
import VerifyCode from "./pages/Verifycode";

function App() {
  const router = createBrowserRouter([
    {
      path: "/addtask",
      Component: Addtask,
    },
    {
      path: "/homepage",
      Component: Homepage,
    },
    {
      path: "/termscond",
      Component: TermsCond,
    },
    {
      path: "/verifycode",
      Component: VerifyCode,
    },
    {
      path: "/setnewpass",
      Component: SetNewPass,
    },
    {
      path: "/forgotpass",
      Component: ForgotPass,
    },
    {
      path: "/createaccount",
      Component: createaccount,
    },
    {
      path: "/login",
      Component: login,
    },
    {
      path: "/signup",
      Component: signup,
    },
    {
      path: "/",
      Component: Landingpage,
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
