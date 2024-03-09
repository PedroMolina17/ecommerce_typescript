import { PiList } from "react-icons/pi";
import { IoReorderFourSharp } from "react-icons/io5";
import { LiaGripLinesVerticalSolid } from "react-icons/lia";
import Products from "./Products";
const Filter = () => {
  return (
    <div className="md:ml-4 max-sm:mx-9 max-md:mx-4">
      <div className="flex justify-between pb-4  max-md:hidden ">
        <div>
          <select
            id="frutas"
            name="frutas"
            aria-label="Selecciona una fruta"
            className="px-14 bg-[#ffffff]"
          >
            <option value="seller">Mas vendido</option>
            <option value="vallorer">Mas valorado</option>
          </select>
        </div>
        <div className="flex text-xl gap-2 items-center ">
          <p className="text-slate-500 text-lg">15 vendidos</p>
          <div className="bg-[#139dba] rounded-md p-1">
            <IoReorderFourSharp className="" />
          </div>
          <div className="bg-[#cccccc] rounded-md p-1">
            <LiaGripLinesVerticalSolid className="" />
          </div>
          <div className="bg-[#cccccc] rounded-md p-1">
            <PiList className="rotate-90" />
          </div>
        </div>
      </div>
      <Products></Products>
    </div>
  );
};

export default Filter;
