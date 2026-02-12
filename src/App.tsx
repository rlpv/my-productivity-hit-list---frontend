import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../pages/Login";
import Landingpage from "../pages/Landingpage";
function Home() {
  return (
    <div>
      <h1>React Router DOM Setup</h1>
      {/* comment */}
    </div>
  );
}
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      Component: Home,
    },
    {
      path: "/login",
      Component: Login,
    },
    {
      path: "/landing",
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
