import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import Login from "../Components/Admin/login/Login";
import Dashboard from "../pages/admin/Dashboard";
import Slider from "../Components/Slider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Slider/>,
  },
  { path: "/admin-login", element: <Login /> },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <Dashboard /> },

      { path: "users", element: <h1>users</h1> },
    ],
  },
]);
export default router;
