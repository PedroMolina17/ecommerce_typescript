import GraphArea from "./GraphArea";
import { FaSearch, FaDollarSign, FaPercentage } from "react-icons/fa";
import { FaMoon, FaCartShopping } from "react-icons/fa6";
import { IoIosNotifications } from "react-icons/io";
import { IoExit } from "react-icons/io5";

const Sales = () => {
  return (
    <>
      <div className="flex m-8 items-center justify-end text-xl gap-10 ">
        <div className="flex bg-white rounded-md items-center gap-1 border py-1 focus-within:border-[#f97f63] w-full px-4">
          <input type="text " className="p-2 outline-none w-full " />
          <FaSearch />
        </div>
        <div className="flex items-center justify-end gap-5 ">
          <div className="bg-white p-4 rounded-md">
            <FaMoon />
          </div>{" "}
          <div className="bg-white p-4 rounded-md">
            <IoIosNotifications />
          </div>
          <div className="flex items-center p-4 bg-white rounded-md w-72 justify-center ">
            <IoExit className="text-[#f97f63] rounded-md" /> Salir
          </div>
        </div>
      </div>
      <div className="grid grid-cols-7 w-full">
        <div className="col-span-5">
          <div className="grid grid-cols-5 gap-4">
            <div className="col-span-1 bg-white rounded-md flex flex-col py-4 items-center justify-around h-64">
              <div className="rounded-full bg-[#f97f63] flex items-center justify-center p-4">
                <FaDollarSign className="text-4xl text-white" />
              </div>
              <div className="text-center">
                <p className="text-xl">Ventas Totales</p>
                <p className="text-slate-400">+50% ingresos</p>
              </div>
              <p className="text-[#f97f63] text-4xl font-bold">$278m</p>
            </div>
            <div className="col-span-1 bg-white rounded-md flex flex-col py-4 items-center justify-around h-64">
              <div className="rounded-full bg-[#39a1ea] flex items-center justify-center p-4">
                <FaPercentage className="text-4xl text-white" />
              </div>
              <div className="text-center">
                <p className="text-xl">Ingresos Diarios</p>
                <p className="text-slate-400">+50% ingresos</p>
              </div>
              <p className="text-[#39a1ea] text-4xl font-bold">$278m</p>
            </div>{" "}
            <div className="col-span-1 bg-white rounded-md flex flex-col py-4 items-center justify-around h-64">
              <div className="rounded-full bg-[#f97f63] flex items-center justify-center p-4">
                <FaDollarSign className="text-4xl text-white" />
              </div>
              <div>
                <p className="text-xl">Ventas Totales</p>
                <p className="text-slate-400">+50% ingresos</p>
              </div>
              <p className="text-[#f97f63] text-4xl font-bold">$278m</p>
            </div>{" "}
            <div className="col-span-1 bg-white rounded-md flex flex-col py-4 items-center justify-around h-64">
              <div className="rounded-full bg-[#f97f63] flex items-center justify-center p-4">
                <FaDollarSign className="text-4xl text-white" />
              </div>
              <div>
                <p className="text-xl">Ventas Totales</p>
                <p className="text-slate-400">+50% ingresos</p>
              </div>
              <p className="text-[#f97f63] text-4xl font-bold">$278m</p>
            </div>{" "}
            <div className="col-span-1 bg-white rounded-md flex flex-col py-4 items-center justify-around h-64">
              <div className="rounded-full bg-[#455692] flex items-center justify-center p-4">
                <FaCartShopping className="text-4xl text-white" />
              </div>
              <div className="text-center">
                <p className="text-xl">Productos Totales</p>
                <p className="text-slate-400">+50% nuevos productos</p>
              </div>
              <p className="text-[#455692] text-4xl font-bold">278</p>
            </div>
          </div>
          <GraphArea />
        </div>
        <div className="col-span-2">
          <div className="bg-[#f97f63] rounded-md mx-4 p-4 text-white">
            <p className="text-xl">$9.40</p>
            <p className="text-[#fed8cf]">Balance activo</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sales;
