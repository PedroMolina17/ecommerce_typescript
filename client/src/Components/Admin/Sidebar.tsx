import Categories from "./Categories";
import { useState } from "react";
import Products from "./Products";
import Brands from "./Brands";
import Suppliers from "./Suppliers";
import SalesPanel from "./SalesPanel";
import Users from "./Users";
import { FaDollarSign } from "react-icons/fa6";

import { TbCategoryFilled } from "react-icons/tb";
import { FaUser } from "react-icons/fa";
const Sidebar = () => {
  const [selectedNav, setSelectedNav] = useState("Categories");
  const renderContent = () => {
    switch (selectedNav) {
      case "Categories":
        return <Categories />;
      case "SalesPanel":
        return <SalesPanel />;
      case "Products":
        return <Products />;
      case "Brands":
        return <Brands />;
      case "Users":
        return <Users />;
      case "Suppliers":
        return <Suppliers />;
      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-9  gap-2">
      <div className="col-span-2 ">
        <ul className="flex flex-col bg-[#f7f7f7] justify-around py-8">
          <p className="text-xl font-bold text-center">Dashboard</p>
          <button
            onClick={() => setSelectedNav("Sales")}
            className={`flex gap-2 items-center mx-8 px-2 py-4 rounded-md mt-2 ${
              selectedNav === "Sales" ? " bg-[#139dba] text-white" : ""
            }`}
          >
            <FaDollarSign />
            <p>Costos y presupuestos</p>
          </button>
          <button
            onClick={() => setSelectedNav("Users")}
            className={`flex gap-2 items-center mx-8 px-2 py-4 rounded-md ${
              selectedNav === "Users" ? " bg-[#139dba] text-white" : ""
            }`}
          >
            <FaUser />
            <p>Users</p>
          </button>
          <button
            onClick={() => setSelectedNav("Categories")}
            className={`flex gap-2 items-center mx-8 px-2 py-4 rounded-md ${
              selectedNav === "Categories" ? " bg-[#139dba] text-white" : ""
            }`}
          >
            <TbCategoryFilled />
            <p>Categorias</p>
          </button>
          <button
            onClick={() => setSelectedNav("Products")}
            className={`flex gap-2 items-center mx-8 px-2 py-4 rounded-md ${
              selectedNav === "Products" ? " bg-[#139dba] text-white" : ""
            }`}
          >
            <p> Productos </p>
          </button>
          <button
            onClick={() => setSelectedNav("Brands")}
            className={`flex gap-2 items-center mx-8 px-2 py-4 rounded-md ${
              selectedNav === "Brands" ? " bg-[#139dba] text-white" : ""
            }`}
          >
            Marcas
          </button>
          <button
            onClick={() => setSelectedNav("Suppliers")}
            className={`flex gap-2 items-center mx-8 px-2 py-4 rounded-md ${
              selectedNav === "Suppliers" ? " bg-[#139dba] text-white" : ""
            }`}
          >
            Proveedor
          </button>
        </ul>
      </div>
      <div className="col-span-7 justify-around p-8 bg-[#f7f7f7] ">
        {" "}
        {renderContent()}
      </div>
    </div>
  );
};

export default Sidebar;
