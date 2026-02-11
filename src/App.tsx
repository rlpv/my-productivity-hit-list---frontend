import { createBrowserRouter, RouterProvider } from "react-router";
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
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
