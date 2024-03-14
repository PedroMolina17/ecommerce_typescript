import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../Components/Admin/sideBar/Sidebar";
import { checkAuth } from "../api/auth";

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const { isLoading, isError, data } = useQuery({
    queryKey: ["authenticate"],
    queryFn: async () => await checkAuth(),
    retry: 0,
  });
  
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <Navigate to={"/admin-login"} replace />;
  const authenticate = data?.authenticate;

  return (
    <>
      {authenticate ? (
        <div className="relative grid grid-cols-12 grid-rows-12  w-full  bg-bg ">
          <nav className="col-span-12 bg-bg row-span-1  fixed w-[calc(100%-64px)] ml-16 h-16 z-30 top-0 border-b border-gray-800  "></nav>
          <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
          <main
            className={`${
              isOpen ? "ml-64" : "ml-12"
            } duration-150 relative  col-span-12   mt-16 row-span-12  `}
          >
            <Outlet />
          </main>
        </div>
      ) : (
        <Navigate to="/admin-login" replace />
      )}
    </>
  );
};
export default DashboardLayout;
