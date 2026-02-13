import { createBrowserRouter, RouterProvider } from "react-router-dom";
import createaccount from "./pages/Createaccount";
import Landingpage from "./pages/Landingpage";
import login from "./pages/Login";
import signup from "./pages/Signup";
import ForgotPass from "./pages/Forgotpass";
import VerifyCode from "./pages/Verifycode";
import TermsCond from "./pages/Termscond";
import Homepage from "./pages/Homepage";

function App() {
  const router = createBrowserRouter([
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
