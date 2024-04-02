import { FiSettings } from "react-icons/fi";
import { IoIosNotificationsOutline } from "react-icons/io";
// import { useForm } from "react-hook-form";
// import { CiSearch } from "react-icons/ci";

import { useJwtDecodeStore } from "../../../layouts/store/useJwtDecodeStore";
import { Notifications, Settings } from "./components";
import { useOpenItemStorNavBar } from "./store/useOpenItemStorNavBar";

interface NavBarProps {
  isOpen: boolean;
}

const NavBar: React.FC<NavBarProps> = ({ isOpen }) => {
  const imageUrl = useJwtDecodeStore((state) => state.imageUrl);
  const { openItem, setOpenItem } = useOpenItemStorNavBar((state) => state);

  // const { register } = useForm({ defaultValues: { search: "" } });

  return (

    <nav className=" bg-darkPrimary fixed top-0 right-0  left-0 h-16 z-30  border-b border-gray-800 text-white ">

      <div
        className={`${
          isOpen ? "ml-0" : "ml-12"
        } duration-150 flex h-full w-full items-center pr-16`}
      >
        {/* <div className="relative w-[27em] h-fit">
          <input
            {...register}
            placeholder="Search here..."
            className="block w-full focus:outline-none border-0 rounded-3xl  placeholder-gray-500 text-sm px-2.5 py-2.5 shadow-sm bg-gray-900 text-white ring-1 ring-inset ring-gray-700 focus:ring-2 ps-9 pe-9"
          />
          <span className="absolute top-1/2 left-2 transform -translate-y-1/2">
            <CiSearch className="text-xl" />
          </span>
        </div> */}

        <div className="flex flex-1 justify-end items-center space-x-4">
          <button
            className="inline-block relative outline-none"
            onClick={() => setOpenItem("notifications")}
          >
            <IoIosNotificationsOutline className="text-3xl" />
            <span className="animate-ping absolute top-1 right-0.5 block h-1 w-1 rounded-full ring-2 ring-red-400 bg-red-600"></span>
          </button>

          <button
            className="outline-none"
            onClick={() => setOpenItem("settings")}
          >
            <FiSettings className="text-2xl" />
          </button>

          {imageUrl && (
            <button className="outline-none">
              <img src={imageUrl} className="w-8 rounded-full" alt="img-user" />
            </button>
          )}
        </div>

        {openItem.notifications && (
          <div className="absolute white right-36 top-14 h-80 w-60 rounded-md bg-bg text-white border border-slate-600">
            <Notifications />
          </div>
        )}

        {openItem.settings && (
          <div className="absolute white right-14 top-14 h-40 w-60 rounded-md text-bg bg-white">
            <Settings />
          </div>
        )}
      </div>
    </nav>
  );
};
export default NavBar;
