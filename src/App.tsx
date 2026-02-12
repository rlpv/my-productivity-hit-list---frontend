import { createBrowserRouter, RouterProvider } from "react-router-dom";
import createaccount from "./pages/Createaccount";
import Landingpage from "./pages/Landingpage";
import login from "./pages/Login";
import signup from "./pages/Signup";

function App() {
  const router = createBrowserRouter([
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
