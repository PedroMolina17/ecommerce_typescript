import { Fragment } from "react";

import { Menu, Transition } from "@headlessui/react";
import { IoIosNotificationsOutline } from "react-icons/io";

interface NavBarProps {}

const Notifications: React.FC<NavBarProps> = () => {
  return (
    <Menu as="div" className="relative">
      <div className="flex">
        <Menu.Button className="inline-block relative outline-none">
          <IoIosNotificationsOutline className="text-3xl" />
          <span className="animate-ping absolute top-1 right-0.5 block h-1 w-1 rounded-full ring-2 ring-red-400 bg-red-600"></span>
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 h-80 w-60 origin-top-right bg-secondary border border-slate-600 rounded-md py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Menu.Item>
            <div className="h-full flex flex-col">
              <div className="border-b border-slate-600 px-2 py-1">
                <h4 className="font-medium">Notifications</h4>
              </div>
              <div className="flex-1 overflow-y-auto scroll">
                <div className="bg-red-100 h-14"></div>
                <div className="bg-red-200 h-14"></div>
                <div className="bg-red-300 h-14"></div>
                <div className="bg-red-400 h-14"></div>
                <div className="bg-red-500 h-14"></div>
                <div className="bg-red-600 h-14"></div>
                <div className="bg-red-700 h-14"></div>
              </div>
              <div className="border-t border-slate-600 px-2 py-1">
                <h5 className="text-xs text-center">Notification history</h5>
              </div>
            </div>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default Notifications;
