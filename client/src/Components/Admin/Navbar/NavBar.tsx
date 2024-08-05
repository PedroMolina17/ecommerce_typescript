import { useEffect, useState } from "react";

import { MdLightMode } from "react-icons/md";
import io from "socket.io-client";
import { Notifications, Settings, UserProfile } from "./components";

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
  const url = import.meta.env.VITE_URL_FRONTEND;

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    const socket = io(`${url}`);

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
    </nav>
  );
};

export default NavBar;
