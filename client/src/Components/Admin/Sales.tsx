import GraphArea from "./GraphArea";
import { FaSearch, FaDollarSign, FaPercentage } from "react-icons/fa";
import { FaMoon, FaCartShopping } from "react-icons/fa6";
import { IoIosNotifications } from "react-icons/io";
import { IoExit } from "react-icons/io5";

const Sales = () => {
  return (
    <div className=" w-full">
      <div className="flex p-8 items-center text-xl gap-10 text-darkTertiary">
        <div className="flex bg-darkSecondary rounded-md items-center gap-1 py-1 focus-within:border-darbg-darkSecondary w-full px-4 ">
          <input
            type="text "
            className="p-2 outline-none w-full bg-darkSecondary"
            placeholder="Buscar"
          />
          <FaSearch />
        </div>
        <div className="flex items-center justify-end gap-5 ">
          <div className="bg-darkSecondary p-4 rounded-md">
            <FaMoon />
          </div>{" "}
          <div className="bg-darkSecondary p-4 rounded-md">
            <IoIosNotifications />
          </div>
          <div className="flex items-center p-4 bg-darkSecondary rounded-md w-72 justify-center  gap-2">
            <IoExit className=" rounded-md" /> Salir
          </div>
        </div>
      </div>
      <div className="grid grid-cols-7 w-full text-darkTertiary">
        <div className="col-span-5">
          <div className="grid grid-cols-5 gap-4 mx-8">
            <div className="col-span-1 bg-darkSecondary rounded-md flex flex-col py-4 items-center justify-around h-64 ">
              <div className="rounded-full bg-[#455692] flex items-center justify-center p-4">
                <FaDollarSign className="text-2xl " />
              </div>
              <div className="text-center">
                <p className="text-xl">Ventas Totales</p>
                <p className="text-slate-400">+50% ingresos</p>
              </div>
              <p className="text-darbg-darkSecondary text-2xl font-bold">
                $278m
              </p>
            </div>
            <div className="col-span-1 bg-darkSecondary rounded-md flex flex-col py-4 items-center justify-around h-64">
              <div className="rounded-full bg-[#455692] flex items-center justify-center p-4">
                <FaPercentage className="text-2xl text-darbg-[darkSecondary]" />
              </div>
              <div className="text-center">
                <p className="text-xl">Ingresos Diarios</p>
                <p className="text-slate-400">+50% ingresos</p>
              </div>
              <p className=" text-2xl font-bold">$278m</p>
            </div>{" "}
            <div className="col-span-1 bg-darkSecondary rounded-md flex flex-col py-4 items-center justify-around h-64">
              <div className="rounded-full bg-[#455692] flex items-center justify-center p-4">
                <FaDollarSign className="text-2xl " />
              </div>
              <div>
                <p className="text-xl">Ventas Totales</p>
                <p className="text-slate-400">+50% ingresos</p>
              </div>
              <p className="text-darbg-darkSecondary text-2xl font-bold">
                $278m
              </p>
            </div>{" "}
            <div className="col-span-1 bg-darkSecondary rounded-md flex flex-col py-4 items-center justify-around h-64">
              <div className="rounded-full bg-[#455692] flex items-center justify-center p-4">
                <FaDollarSign className="text-2xl " />
              </div>
              <div>
                <p className="text-xl">Ventas Totales</p>
                <p className="text-slate-400">+50% ingresos</p>
              </div>
              <p className="text-darbg-darkSecondary text-2xl font-bold">
                $278m
              </p>
            </div>{" "}
            <div className="col-span-1 bg-darkSecondary rounded-md flex flex-col py-4 items-center justify-around h-64">
              <div className="rounded-full bg-[#455692] flex items-center justify-center p-4">
                <FaCartShopping className="text-2xl " />
              </div>
              <div className="text-center">
                <p className="text-xl">Productos Totales</p>
                <p className="text-slate-400">+50% nuevos productos</p>
              </div>
              <p className=" text-2xl font-bold">278</p>
            </div>
          </div>
          <GraphArea />
        </div>
        <div className="col-span-2">
          <div className="bg-gradient-to-tr from-[#f27295] via-[#f07797] to-[#d1a3b5]  rounded-md mx-4 p-4 text-darbg-[darkSecondary]">
            <p className="text-xl">$9.40</p>
            <p className="text-[#fed8cf]">Balance activo</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sales;
