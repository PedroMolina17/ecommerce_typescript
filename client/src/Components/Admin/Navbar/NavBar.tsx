import { Notifications, Settings, UserProfile } from "./components";

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = () => {
  return (
    <nav className="bg-secondary fixed h-16 z-30 top-0 right-0 left-0 border-b border-gray-700 text-white flex items-center justify-end pr-10 space-x-4">
      <Notifications />
      <Settings />
      <UserProfile />
    </nav>
  );
};

export default NavBar;
