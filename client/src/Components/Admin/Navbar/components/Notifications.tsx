import { Fragment } from "react";

import { Menu, Transition } from "@headlessui/react";
import { IoIosNotificationsOutline } from "react-icons/io";

// type NotificationType = {
//   id: number;
//   userId: number;
//   message: string;
//   read: boolean;
//   createAt: string;
// };

interface NavBarProps {
  notification: any;
  setNotification: any;
}

const Notifications: React.FC<NavBarProps> = ({
  notification,
  setNotification,
}) => {
  return (
    <Menu as="div" className="relative">
      {({ open }) => (
        <>
          <div className="flex">
            <Menu.Button className="inline-block relative outline-none">
              <IoIosNotificationsOutline className="text-3xl" />
              {notification.length != 0 && (
                <span className="animate-ping absolute top-1 right-0.5 block h-1 w-1 rounded-full ring-2 ring-red-400 bg-red-600"></span>
              )}
            </Menu.Button>
          </div>

          {open && (
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 max-h-80 w-72 origin-top-right bg-secondary border border-slate-600 rounded-md py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Menu.Item>
                  <div className="max-h-80 w-full flex flex-col">
                    <div className="border-b border-slate-600 px-2 py-1 flex justify-between items-center">
                      <h4 className="font-medium">Notifications</h4>
                      <h4
                        className="text-xs text-blue-400 hover:text-blue-500 hover:underline transition-all"
                        onClick={() => {
                          setNotification([]);
                        }}
                      >
                        Mark all as read
                      </h4>
                    </div>

                    <div className="flex-1 w-full overflow-y-auto">
                      {notification.length != 0 &&
                        notification.map((notif: any) => (
                          <div key={notif.id} className="hover:bg-[#222834]">
                            {notif.message}
                          </div>
                        ))}
                    </div>
                    <div className="border-t border-slate-600 px-2 py-1">
                      <h5 className="text-xs text-center">
                        Notification history
                      </h5>
                    </div>
                  </div>
                </Menu.Item>
              </Menu.Items>
            </Transition>
          )}
        </>
      )}
    </Menu>
  );
};

export default Notifications;
