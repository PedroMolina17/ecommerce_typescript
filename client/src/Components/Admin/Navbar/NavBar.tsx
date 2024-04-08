import { useEffect } from "react";

import io from "socket.io-client";
import { Notifications, Settings, UserProfile } from "./components";

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = () => {
  // const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socket = io("http://localhost:3500");

    socket.on("connect", () => {
      console.log("Connection established.");
    });

    socket.on("message", (data) => {
      console.log("Message:", data);
    });

    socket.on("disconnect", () => {
      console.log("Closed connection.");
    });
  }, []);

  return (
    <nav className="bg-secondary fixed h-16 z-30 top-0 right-0 left-0 border-b border-gray-700 text-white flex items-center justify-end pr-10 space-x-4">
      <Notifications />
      <Settings />
      <UserProfile />
    </nav>
  );
};

export default NavBar;
