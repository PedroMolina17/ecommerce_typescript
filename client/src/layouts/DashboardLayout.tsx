import { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { Navigate, Outlet } from "react-router-dom";

import Footer from "../Components/Admin/Footer";
import NavBar from "../Components/Admin/Navbar/NavBar";
import Sidebar from "../Components/Admin/sideBar/Sidebar";
import Loader from "../Components/Loader";
import { checkAuth } from "../api/auth";
import { useJwtDecodeStore } from "./store/useJwtDecodeStore";

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const { isLoading, isError, data } = useQuery({
    queryKey: ["authenticate"],
    queryFn: async () => await checkAuth(),
    retry: 0,
  });

  useEffect(() => {
    if (data) {
      const imageUrl = data.user.image;
      useJwtDecodeStore.setState({ imageUrl });
    }
  }, [data]);

  if (isLoading) return <Loader />;
  if (isError) return <Navigate to={"/admin-login"} replace />;
  const authenticate = data?.authenticate;

  return (
    <>
      {authenticate ? (
        <div className="relative grid grid-cols grid-rows-12 w-full bg-bg">
          <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
          <NavBar />
          <main
            className={`${
              isOpen ? "ml-64" : "ml-16"
            } duration-150 relative col-span-12 mt-16 row-span-12`}
          >
            <Outlet />
          </main>
          <Footer isOpen={isOpen} />
        </div>
      ) : (
        <Navigate to="/admin-login" replace />
      )}
    </>
  );
};

export default DashboardLayout;
