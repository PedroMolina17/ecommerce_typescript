import { FaSearch } from "react-icons/fa";
import { CiUser, CiHeart } from "react-icons/ci";
import { PiShoppingCartSimpleLight } from "react-icons/pi";
import { RxLayers } from "react-icons/rx";
import NavBar from "./NavBar";
const Navigation = () => {
  return (
    <>
      <div className="flex bg-[#139dba] p-2 text-white justify-around items-center">
        <div className="">
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
      <div className="flex justify-between py-6 items-center border-b-2 border-[#ededed] mx-28">
        <div>
          <img
            className="h-11"
            src="../../public/images/logo-Celeste.png"
            alt="Logo"
          />
        </div>
        <div className="flex  justify-center items-center ">
          <input
            className="border-2 border-[#0097a6] p-2 w-96 rounded-tl-lg rounded-bl-lg"
            placeholder="Busca tu producto aqui"
          ></input>
          <div className="bg-[#0097a6] border border-[#0097a6] p-3 text-white text-xl rounded-tr-lg rounded-br-lg">
            <FaSearch />
          </div>
        </div>
        <div className="flex justify-center text-2xl items-center gap-4">
          <CiUser />
          <div className="relative ">
            <RxLayers />
            <p className="absolute bg-[#0097a6] flex justify-center items-center  rounded-full bottom-3/4 left-3/4 text-sm w-6 h-6 text-white">
              0
            </p>
          </div>
          <div className="relative ">
            <CiHeart />
            <p className="absolute bg-[#0097a6] flex justify-center items-center  rounded-full bottom-3/4 left-3/4 text-sm w-6 h-6 text-white">
              0
            </p>
          </div>
          <div className="relative ">
            <PiShoppingCartSimpleLight />
            <p className="absolute bg-[#0097a6] flex justify-center items-center  rounded-full bottom-3/4 left-3/4 text-sm w-6 h-6 text-white">
              0
            </p>
          </div>
        </div>
      </div>
      <NavBar></NavBar>
    </>
  );
};

export default Navigation;
