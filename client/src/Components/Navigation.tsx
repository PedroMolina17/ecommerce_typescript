import { FaSearch } from "react-icons/fa";
import { CiUser, CiHeart } from "react-icons/ci";
import { PiShoppingCartSimpleLight } from "react-icons/pi";
import { RxLayers } from "react-icons/rx";
import NavBar from "./NavBar";
import { IoMdMenu } from "react-icons/io";

const Navigation = () => {
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
      <div className="flex justify-between py-6 items-center border-b-2 border-[#ededed] mx-28 max-md:hidden">
        <div>
          <img className="h-11" src="/images/logo-Celeste.png" alt="Logo" />
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
      {/*Nav Mobile */}
      <div className="flex h-12 py-8 md:hidden  items-center justify-between mx-2 text-[#0097a6]">
        <div className="flex gap-2">
          <IoMdMenu className="text-3xl" />
          <img src="images/logo-Celeste.png" alt="Logo" width={80}></img>
        </div>
        <div className="flex text-3xl gap-2">
          <div className="relative">
            <PiShoppingCartSimpleLight />{" "}
            <p className="absolute bottom-2/4 left-3/4 bg-[#0097a6] text-sm rounded-full h-5 w-5 flex justify-center items-center opacity-90 text-white">
              0
            </p>
          </div>
          <CiUser />
        </div>
      </div>
      <NavBar></NavBar>
    </>
  );
};

export default Navigation;
