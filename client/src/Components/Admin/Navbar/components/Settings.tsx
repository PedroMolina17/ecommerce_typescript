import { Fragment } from "react";

import { Menu, Transition } from "@headlessui/react";
import { FiSettings } from "react-icons/fi";

interface SettingsProps {}

const Settings: React.FC<SettingsProps> = () => {
  return (
    <Menu as="div" className="relative">
      <Menu.Button className="flex outline-none">
        <FiSettings className="text-2xl" />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right bg-secondary border border-slate-700 rounded-md py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Menu.Item>
            <div className="block px-4 py-2 text-sm text-slate-200">
              Settings
            </div>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default Settings;
