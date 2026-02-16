import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastProvider } from "./components/Toast";
import Addtask from "./pages/Addtask";
import Changepass from "./pages/Changepass";
import ChangepassVerify from "./pages/ChangepassVerify";
import createaccount from "./pages/Createaccount";
import Edittask from "./pages/Edittask";
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
    // Public Routes - No authentication required
    {
      path: "/",
      Component: Landingpage,
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
      path: "/forgotpass",
      Component: ForgotPass,
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
      path: "/termscond",
      Component: TermsCond,
    },
    {
      path: "/createaccount",
      Component: createaccount,
    },
    {
      path: "/changepassverify",
      Component: ChangepassVerify,
    },

    // Protected Routes - Require authentication
    {
      path: "/homepage",
      Component: () => (
        <ProtectedRoute>
          <Homepage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/addtask",
      Component: () => (
        <ProtectedRoute>
          <Addtask />
        </ProtectedRoute>
      ),
    },
    {
      path: "/edittask/:id",
      Component: () => (
        <ProtectedRoute>
          <Edittask />
        </ProtectedRoute>
      ),
    },
    {
      path: "/changepass",
      Component: () => (
        <ProtectedRoute>
          <Changepass />
        </ProtectedRoute>
      ),
    },
  ]);
  return (
    <ToastProvider>
      <div>
        <RouterProvider router={router} />
      </div>
    </ToastProvider>
  );
}

export default App;
