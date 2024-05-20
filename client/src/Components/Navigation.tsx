import { FaSearch } from "react-icons/fa";
import { CiUser, CiHeart } from "react-icons/ci";
import { PiShoppingCartSimpleLight } from "react-icons/pi";
import { RxLayers } from "react-icons/rx";
import NavBar from "./NavBar";
import { IoMdMenu } from "react-icons/io";
import { useState } from "react";
import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";

import axios, { AxiosError } from "axios";
const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const [selectedMenuItem, setSelectedMenuItem] = useState<string>("Home");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [menuMobile, setMenuMobile] = useState(true);
  const openMenu = (menu: string) => {
    setMenuOpen((prevMenu) => (prevMenu === menu ? null : menu));
  };

  const handleLogin = async (username: string, password: string) => {
    try {
      const response = await axios.post(
        "http://localhost:3500/api/auth/login",
        {
          email: username,
          password,
        },
      );
      console.log("Login successful:", response.data);
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Error during login:", axiosError.message);
      if (axiosError.response) {
        console.error("Response data:", axiosError.response.data);
        console.error("Status code:", axiosError.response.status);
      }

      // Implementar toast para errores para el usuario --Pendiente
    }
  };
  return (
    <>
      <div className="flex bg-[#139dba] p-2 text-white justify-around items-center max-md:hidden">
        <div>
          Tell a friends about Electroshop Electronics & get 30% off your next
          order
        </div>
        <div className="flex justify-between items-center">
          <ul className="flex gap-3">
            <li>Need help?</li>
            <li>Track Order</li>
            <li>USD </li>
            <li>English</li>
          </ul>
        </div>
      </div>
      {/* Nav Desktop */}
      <div className="border-b-2 relative">
        <div className="flex justify-between py-6 items-center  border-[#ededed] mx-28 max-md:hidden relative">
          <Link to={"/"}>
            <img className="h-11" src="/images/logo-Celeste.png" alt="Logo" />
          </Link>
          <div className=" mx-2 flex justify-center items-center border rounded-tl-lg rounded-bl-lg min-w-16 w-96 focus-within:border-[#139dba] rounded-tr-lg rounded-br-lg">
            <input
              className="outline-none p-2 min-w-16 w-96"
              placeholder="Busca tu producto aqui"
            ></input>
            <div className="bg-[#139dba] border border-[#139dba] p-3 text-white text-xl rounded-tr-lg rounded-br-lg">
              <FaSearch />
            </div>
          </div>
          <div className="flex justify-center text-2xl items-center gap-4">
            <CiUser
              onClick={() => {
                openMenu("user");
              }}
            />
            <div className="relative ">
              <RxLayers />
              <p className="absolute bg-[#139dba] flex justify-center items-center  rounded-full bottom-3/4 left-3/4 text-sm w-6 h-6 text-white">
                0
              </p>
            </div>
            <div
              className="relative "
              onClick={() => {
                openMenu("likes");
              }}
            >
              <CiHeart />
              <p className="absolute bg-[#139dba] flex justify-center items-center  rounded-full bottom-3/4 left-3/4 text-sm w-6 h-6 text-white">
                0
              </p>
            </div>
            <div
              className="relative "
              onClick={() => {
                openMenu("shop");
              }}
            >
              <PiShoppingCartSimpleLight />
              <p className="absolute bg-[#139dba] flex justify-center items-center  rounded-full bottom-3/4 left-3/4 text-sm w-6 h-6 text-white">
                0
              </p>
            </div>
          </div>
        </div>
        {/* User Open*/}
        {menuOpen === "user" && (
          <div className="absolute bg-white p-4 rounded-md shadow-md top-full  right-0 mx-2 w-96 border flex flex-col gap-5 justify-center items-center z-10">
            <label className="flex flex-col justify-center items-center gap-2">
              <p className="text-[#139dba] font-bold">Ingrese su Usuario</p>
              <input
                value={username}
                type="text"
                placeholder="Usuario"
                className="w-80 text-center rounded-md border focus:border-[#139dba] focus:border-2 focus:outline-none"
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
            <label className="flex flex-col justify-center items-center gap-2">
              <p className="text-[#139dba] font-bold">Ingrese su password</p>
              <input
                value={password}
                type="password"
                placeholder="*************"
                className="w-80 text-center rounded-md border focus:border-[#139dba] focus:border-2 focus:outline-none"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <button
              className="text-white p-2 bg-[#139dba] rounded-md text-center font-bold w-80  "
              onClick={async () => {
                if (username && password) {
                  try {
                    await handleLogin(username, password);
                  } catch (error) {
                    console.error("Error during login:", error);
                  }
                }
              }}
            >
              Ingresar
            </button>
            <Link
              to={"/signup"}
              className="text-[#139dba] underline rounded-md text-center font-bold w-80  "
            >
              Registrar
            </Link>
          </div>
        )}
        {/* Likes Open*/}
        {menuOpen === "likes" && (
          <div className="absolute bg-white p-4 rounded-md shadow-md top-full  right-0 mx-2 w-96 border flex flex-col gap-5 justify-center items-center z-10">
            <label className="flex flex-col justify-center items-center gap-2">
              <p className="text-[#139dba] font-bold">Likes</p>
            </label>
            <Link
              to={"../Likes"}
              className="text-white p-2 bg-[#139dba] rounded-md text-center font-bold w-80  "
            >
              Ver
            </Link>
          </div>
        )}
        {/* Shop Open*/}
        {menuOpen === "shop" && (
          <div className="absolute bg-white p-4 rounded-md shadow-md top-full  right-0 mx-2 w-96 border flex flex-col gap-5 justify-center items-center z-10">
            <label className="flex flex-col justify-center items-center gap-2">
              <p className="text-[#139dba] font-bold">Comprar</p>
            </label>
            <Link
              to={"../Shop"}
              className="text-white p-2 bg-[#139dba] rounded-md text-center font-bold w-80  "
            >
              Comprar
            </Link>
          </div>
        )}
      </div>
      {/*Nav Mobile */}
      <div className="flex h-12 py-8 md:hidden items-center justify-between px-2 text-[#139dba] fixed right-0 left-0 top-0 w-full bg-white z-10">
        {menuMobile ? (
          <>
            <div className="flex gap-2">
              <IoMdMenu
                className="text-3xl"
                onClick={() => setMenuMobile(false)}
              />{" "}
              <img src="images/logo-Celeste.png" alt="Logo" width={80}></img>{" "}
            </div>
          </>
        ) : (
          <>
            <div className="flex gap-2">
              <IoClose
                className="text-3xl"
                onClick={() => setMenuMobile(true)}
              />{" "}
              <img src="images/logo-Celeste.png" alt="Logo" width={80}></img>{" "}
            </div>
          </>
        )}
        <div className="flex text-3xl gap-2">
          <div className="relative">
            <PiShoppingCartSimpleLight />
            <p className="absolute bottom-2/4 left-3/4 bg-[#139dba] text-sm rounded-full h-5 w-5 flex justify-center items-center opacity-90 text-white">
              0
            </p>
          </div>
          <div>
            <CiUser />
          </div>
        </div>
      </div>
      {!menuMobile && (
        <div className="mt-14 items-center flex flex-col gap-2 fixed bg-white  right-0 left-0 w-full py-4 z-10">
          <Link to={"/electronics"} className="text-[#139dba] block">
            Electronica
          </Link>
          <Link to={"/blogs"} className="text-[#139dba] block">
            Blogs
          </Link>
          <Link to={"/electronics"} className="text-[#139dba] block">
            Electronica
          </Link>
        </div>
      )}
      <NavBar
        selectedMenuItem={selectedMenuItem}
        setSelectedMenuItem={setSelectedMenuItem}
      />
    </>
  );
};

export default Navigation;
