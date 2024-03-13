import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuthenticateStore } from "../Components/Admin/login/store/useAuthenticate.store";
import Sidebar from "../Components/Admin/sideBar/Sidebar";
import { checkAuth } from "../api/auth";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const { authenticate, setAuthenticate } = useAuthenticateStore(
    (state) => state
  );
  const { data, error } = useQuery({
    queryKey: ["authenticate"],
    queryFn: async () => await checkAuth(),
    retry: 0,
  });

  useEffect(() => {
    if (error) {
      navigate("/admin-login");
    }

    if (data) {
      setAuthenticate(data.authenticate);
      if (authenticate === false) {
        navigate("/admin-login");
      }
    }
  }, [data, setAuthenticate, navigate, authenticate, error]);
  return (
    <>
      {authenticate && (
        <div className="relative grid grid-cols-12 grid-rows-12  w-full  bg-bg ">
          <nav className="col-span-12 bg-bg row-span-1  fixed w-[calc(100%-64px)] ml-16 h-16 z-30 top-0 border-b border-gray-800  "></nav>
          <Sidebar isOpen={isOpen} setIsOpen={setIsOpen}/>
          <main className={`${isOpen?"ml-64":"ml-12"} duration-150 relative  col-span-12   mt-16 row-span-12  `}>
            <Outlet />
          </main>
        </div>
      )}
    </>
  );
};
export default DashboardLayout;
