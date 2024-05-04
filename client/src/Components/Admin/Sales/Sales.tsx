import GraphArea from "./GraphArea";
import { FaSearch, FaDollarSign, FaPercentage } from "react-icons/fa";
import { FaMoon, FaCartShopping } from "react-icons/fa6";
import { IoIosNotifications } from "react-icons/io";
import { IoExit } from "react-icons/io5";
import Circle from "./Circle";
const Sales = () => {
  return (
    <div className=" w-full text-darkSecondary">
      <div className="flex p-8 items-center text-xl gap-10  ">
        <label className="flex bg-darkThird rounded-md items-center gap-1  py-1 focus-within:border-[#f97f63] w-full px-4">
          <input
            type="text "
            className="p-2 outline-none w-full bg-darkThird"
            placeholder="Buscar"
          />
          <FaSearch />
        </label>
        <div className="flex items-center justify-end gap-5 ">
          <div className="bg-darkThird p-4 rounded-md">
            <FaMoon />
          </div>{" "}
          <div className="bg-darkThird p-4 rounded-md">
            <IoIosNotifications />
          </div>
          <div className="flex items-center p-4 bg-darkThird rounded-md w-72 justify-center  gap-2">
            <IoExit className="rounded-md" /> Salir
          </div>
        </div>
      </div>
      <div className="grid w-full ">
        <div className="grid grid-cols-4 gap-4 px-8">
          <div className="col-span-1 bg-gradient-to-r from-[#ef6e94] via-[#f789a4] to-[#fda0b2] rounded-md flex p-4  justify-around h-32">
            <div className="flex flex-col justify-end ">
              <p className="text-md">Productos Totales</p>
              <p className="text-2xl font-bold">$278</p>
              <p className="text-md">+ 50% nuevos productos</p>
            </div>
            <FaPercentage className="text-2xl text-darkSecondary" />
          </div>
          <div className="col-span-1 bg-gradient-to-r from-[#a77ded] via-[#b791f4] to-[#caa4fd] rounded-md flex p-4  justify-around h-32">
            <div className="flex flex-col justify-end ">
              <p className="text-md">Productos Totales</p>
              <p className="text-2xl font-bold">$278</p>{" "}
              <p className="text-md">+ 50% nuevos productos</p>
            </div>
            <FaMoon className="text-2xl text-darkSecondary" />
          </div>
          <div className="col-span-1 bg-gradient-to-r from-[#39c39f] via-[#69dba8] to-[#98f0ae] rounded-md flex p-4  justify-around h-32">
            <div className="flex flex-col justify-end ">
              <p className="text-md">Productos Totales</p>
              <p className="text-2xl font-bold">$278</p>{" "}
              <p className="text-md">+ 50% nuevos productos</p>
            </div>
            <FaDollarSign className="text-2xl text-darkSecondary" />
          </div>
          <div className="col-span-1 bg-gradient-to-r from-[#e9bb53] via-[#e9bb53] to-[#f0d584] rounded-md flex p-4  justify-around h-32">
            <div className="flex flex-col justify-end ">
              <p className="text-md">Productos Totales</p>
              <p className="text-2xl font-bold">$278</p>
              <p className="text-md">+ 50% nuevos productos</p>
            </div>
            <FaCartShopping className="text-2xl text-darkSecondary" />
          </div>
        </div>

        <div className="grid grid-cols-4 justify-between py-8 mx-8 gap-4">
          <div className="col-span-3">
            <GraphArea />
          </div>
          <div className="bg-darkThird rounded-md col-span-1 relative">
            <div className="rounded-full h-40 w-40 blur-2xl  opacity-20 bg-blue-300 absolute"></div>
            <Circle />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sales;
