import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastProvider } from "./components/general/Toast";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import Changepass from "./pages/auth/changepass/Changepass";
import ChangepassVerify from "./pages/auth/changepass/ChangepassVerify";
import VerifyCode from "./pages/auth/changepass/Verifycode";
import ForgotPass from "./pages/auth/forgotpass/Forgotpass";
import Login from "./pages/auth/login/Login";
import Createaccount from "./pages/auth/register/Createaccount";
import SetNewPass from "./pages/auth/setnewpass/Setnewpass";
import Landingpage from "./pages/general/Landingpage";
import Signup from "./pages/general/Signup";
import TermsCond from "./pages/general/Termscond";
import Addtask from "./pages/home/Addtask";
import Edittask from "./pages/home/Edittask";
import Homepage from "./pages/home/Homepage";

function App() {
  const router = createBrowserRouter([
    // Public Routes - No authentication required
    {
      path: "/",
      element: <Landingpage />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/createaccount",
      element: <Createaccount />,
    },
    {
      path: "/terms",
      element: <TermsCond />,
    },
    {
      path: "/forgot-password",
      element: <ForgotPass />,
    },
    {
      path: "/verify-code",
      element: <VerifyCode />,
    },
    {
      path: "/set-new-password",
      element: <SetNewPass />,
    },
    // Protected Routes - Authentication required
    {
      path: "/homepage",
      element: (
        <ProtectedRoute>
          <Homepage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/add-task",
      element: (
        <ProtectedRoute>
          <Addtask />
        </ProtectedRoute>
      ),
    },
    {
      path: "/edittask/:id",
      element: (
        <ProtectedRoute>
          <Edittask />
        </ProtectedRoute>
      ),
    },
    {
      path: "/change-password",
      element: (
        <ProtectedRoute>
          <Changepass />
        </ProtectedRoute>
      ),
    },
    {
      path: "/change-password-verify",
      element: (
        <ProtectedRoute>
          <ChangepassVerify />
        </ProtectedRoute>
      ),
    },
  ]);

  return (
    <ToastProvider>
      <RouterProvider router={router} />
    </ToastProvider>
  );
}

export default App;
