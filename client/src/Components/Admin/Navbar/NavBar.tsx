
import { useEffect, useState } from "react";

import { MdLightMode } from "react-icons/md";
import io from "socket.io-client";
import { Notifications, Settings, UserProfile } from "./components";
import { MdLightMode } from "react-icons/md";


interface NavBarProps {}

type Notification = {
  id: number;
  userId: number;
  message: string;
  read: boolean;
  createAt: string;
};

const NavBar: React.FC<NavBarProps> = () => {
  const [notification, setNotification] = useState<Notification[]>([]);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    const socket = io("http://localhost:3500");

    socket.on("connect", () => {
      console.log("Connection established.");
    });

    socket.on("message", (data) => {
      console.log("Message:", data);
    });

    socket.on("notification", (data) => {
      setNotification((prev) => {
        const isDuplicate = prev.some(
          (notif) => JSON.stringify(notif) === JSON.stringify(data)
        );
        if (!isDuplicate) {
          return [data, ...prev];
        }
        return prev;
      });
    });

    // socket.on("disconnect", () => {
    //   console.log("Closed connection.");
    // });
  }, []);

  return (

    <nav className="bg-darkPrimary fixed h-16 z-30 top-0 right-0 left-0 border-b border-gray-700 text-white flex items-center justify-end pr-10 space-x-4">
      <MdLightMode className="text-3xl" onClick={toggleDarkMode} />

      <Notifications
        notification={notification}
        setNotification={setNotification}
      />
      <Settings />
      <UserProfile />

   
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
            aria-label="Abrir notificaciones"
          >
            <IoIosNotificationsOutline className="text-3xl" />
            <span className="animate-ping absolute top-1 right-0.5 block h-1 w-1 rounded-full ring-2 ring-red-400 bg-red-600"></span>
          </button>

          <label
            className="outline-none"
            onClick={() => setOpenItem("settings")}
          >
            <FiSettings className="text-2xl" />
          </label>

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
