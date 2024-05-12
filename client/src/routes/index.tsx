import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import Login from "../Components/Admin/login/Login";
import Dashboard from "../pages/admin/Dashboard";
import { PageNotFound, PageNotFoundAdmin } from "../pages/admin/PageNotFound";
import EcommerceLayout from "@/layouts/EcommerceLayout";
import Slider from "@/Components/Slider";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <PageNotFound />,
    element: <EcommerceLayout />,
    children: [{ index: true, element: <Slider /> }],
  },
  { path: "/admin-login", element: <Login /> },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    errorElement: <PageNotFoundAdmin />,

    children: [
      { index: true, element: <Dashboard /> },

      { path: "users", element: <h1>users</h1> },
    ],
  },
]);
export default router;
