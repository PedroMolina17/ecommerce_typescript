import { Fragment, useEffect, useState } from "react";

import { Menu, Transition } from "@headlessui/react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { IoMdClose } from "react-icons/io";
import { LiaUserEditSolid } from "react-icons/lia";
import { PiSignOut } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

import { logout } from "@/api/auth";
import { updateAdmin } from "@/api/user";
import { useJwtDecodeStore } from "@/layouts/store/useJwtDecodeStore";
import Input from "@ui/Input";
import { MySwal } from "../../users/components/ButtonsActionTable";

interface UserProfileProps {}

// interface FormValue {
//   name: string;
// }

const UserProfile: React.FC<UserProfileProps> = () => {
  const [showModal, setShowModal] = useState(false);
  const imageUrl = useJwtDecodeStore((state) => state.imageUrl);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setFocus,
    setValue,
    formState: { isValid, isDirty },
  } = useForm({
    defaultValues: {
      username: "Admin",
      email: "admin@example.com",
      photo: "https://randomuser.me/api/portraits/lego/2.jpg",
    },
  });

  const logoutMutation = useMutation({
    mutationKey: ["logout"],
    mutationFn: async () => await logout(),
    onSuccess: () => {
      navigate("/admin-login");
    },
  });

  const updateAdminMutation = useMutation({
    mutationFn: updateAdmin,
    onSuccess: () => {
      MySwal.fire({
        title: "Success!",
        icon: "success",
        confirmButtonText: "OK",
      });
      setShowModal(!showModal);
    },
  });

  const onSubmit = handleSubmit((userData) => {
    useJwtDecodeStore.setState({ imageUrl: userData.photo });
    const userId = 1;
    updateAdminMutation.mutate({ userId, userData });
  });

  // All code related to this function is temporary
  const randomUSer = () => {
    const idImage = Math.floor(Math.random() * 9) + 1;
    const url = `https://randomuser.me/api/portraits/lego/${idImage}.jpg`;
    setValue("photo", url, { shouldDirty: true });
  };

  useEffect(() => {
    setFocus("username");
  }, [setFocus, showModal]);

  return (
    <>
      {imageUrl && (
        <Menu as="div" className="relative">
          <Menu.Button className="flex rounded-full text-sm focus:outline-none">
            <img
              className="h-8 w-8 rounded-full"
              src={imageUrl}
              alt="img-user"
            />
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
            <Menu.Items className="absolute right-0 z-30 mt-2 w-72 origin-top-right bg-secondary border border-slate-600 rounded-md py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                <div className="block px-4 py-2 text-sm text-slate-200">
                  Your Profile
                </div>
              </Menu.Item>
              <Menu.Item>
                <div
                  className="flex items-center px-4 py-2 text-sm text-slate-200 hover:bg-[#222834] space-x-2"
                  onClick={() => setShowModal(!showModal)}
                >
                  <LiaUserEditSolid size="1.4em" />
                  <span>Edit Profile</span>
                </div>
              </Menu.Item>
              <Menu.Item>
                <div className="block px-4 py-2 text-sm text-slate-200 border-t border-gray-700">
                  <button
                    className="bg-bg w-full flex items-center justify-center py-2 mt-3 space-x-1 border border-gray-700 rounded-md hover:bg-[#222834]"
                    onClick={() => logoutMutation.mutate()}
                  >
                    <PiSignOut className="text-xl" />
                    <span className="text-xs">Sign Out</span>
                  </button>
                </div>
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      )}

      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center left-0 top-0 z-50 transition-opacity duration-300">
          <div className="w-96 p-4 flex flex-col gap-4 shadow-md rounded-md bg-white text-black">
            <div className="flex items-center">
              <h2 className="text-2xl font-semibold flex-1">Edit Profile</h2>
              <button
                onClick={() => setShowModal(!showModal)}
                className="text-white shadow-md p-1.5 rounded-full bg-slate-400"
              >
                <IoMdClose />
              </button>
            </div>
            <form className="g gap-2" onSubmit={onSubmit}>
              <Input
                type="text"
                className="bg-gray-50 border border-gray-400 rounded-md block w-full py-1 px-2 outline-none focus:ring-2"
                labelText="Username"
                labelClass="text-slate-600 text-sm"
                register={register("username")}
              />

              <Input
                type="email"
                className="bg-gray-50 border border-gray-400 rounded-md block w-full py-1 px-2 outline-none focus:ring-2"
                labelText="Email"
                labelClass="text-slate-600 text-sm"
                register={register("email")}
              />

              {/* <Input
                type="password"
                className="bg-gray-50 border border-gray-400 rounded-md block w-full py-1 px-2 outline-none focus:ring-2"
                labelText="Password"
                labelClass="text-slate-600 text-sm"
                register={register("password")}
              /> */}

              {/* Temporary code */}
              <div className="flex items-end w-full">
                <Input
                  type="url"
                  className="bg-gray-50 border border-gray-400 rounded-md w-72 h-[38px] py-1 px-2 outline-none focus:ring-2 text-xs"
                  labelText="Image"
                  labelClass="text-slate-600 text-sm"
                  register={register("photo")}
                  required
                  pattern="https://randomuser.me/api/portraits/lego/.*"
                />
                <button
                  type="button"
                  className="bg-blue-500 w-20 h-[38px] rounded-md text-white text-sm"
                  onClick={randomUSer}
                >
                  Random
                </button>
              </div>
              {/* end temporary code */}

              <div className="flex gap-2 justify-center mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(!showModal)}
                  className="px-6 py-1 rounded-md border border-gray-500 text-gray-500 hover:border-gray-700 hover:text-gray-700"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-6 py-1 rounded-md bg-green-600 hover:bg-green-700 text-white disabled:cursor-not-allowed"
                  disabled={!isValid || !isDirty}
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfile;
