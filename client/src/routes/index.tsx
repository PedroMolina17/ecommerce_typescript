import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import Login from "../Components/Admin/login/Login";
import Dashboard from "../pages/admin/Dashboard";
import { PageNotFound, PageNotFoundAdmin } from "../pages/admin/PageNotFound";

import EcommerceLayout from "@/layouts/EcommerceLayout";
import Slider from "@/Components/Slider";
import SingUp from "@/Components/SingUp";
import Blogs from "@/Components/Blogs";
import Acessories from "@/Components/Acessories";
import Deals from "@/Components/Deals";
import Electronic from "@/Components/Electronic";
import Cellphones from "@/Components/Cellphones";
import ElectronicDetails from "@/Components/ElectronicDetails";
const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <PageNotFound />,
    element: <EcommerceLayout />,
    children: [
      { index: true, element: <Slider /> },
      { path: "signup", element: <SingUp /> },
      { path: "blogs", element: <Blogs /> },
      { path: "accesories", element: <Acessories /> },
      { path: "deals", element: <Deals /> },
      { path: "electronics", element: <Electronic /> },
      { path: "cellphones", element: <Cellphones /> },
      { path: "electronics", element: <Electronic /> },
      { path: "electronics/:id", element: <ElectronicDetails /> },
    ],
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
