import Categories from "./Categories";
import { useState } from "react";
import Products from "./Products";
import Brands from "./Brands";
import Suppliers from "./Suppliers";
import Sales from "./Sales";
import Users from "./Users";
import { FaDollarSign } from "react-icons/fa6";

import { TbCategoryFilled } from "react-icons/tb";
import { FaUser } from "react-icons/fa";
const Sidebar = () => {
  const [selectedNav, setSelectedNav] = useState("Sales");
  const renderContent = () => {
    switch (selectedNav) {
      case "Categories":
        return <Categories />;
      case "Sales":
        return <Sales />;
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
    <div className="grid grid-cols-9  h-screen gap-5  bg-[#eff3fc]">
      <div className="col-span-2 h-screen">
        <ul className="flex flex-col col bg-[#455591] text-white  py-8 h-screen w-96 fixed">
          <p className="text-xl font-bold text-center">Dashboard</p>
          <p className="mx-8 font-bold text-xl py-4">Menu</p>
          <button
            onClick={() => setSelectedNav("Sales")}
            className={`flex gap-2 items-center mx-8 px-2 py-4 rounded-md mt-2 ${
              selectedNav === "Sales" ? " bg-[#5b6aa1]" : ""
            }`}
          >
            <FaDollarSign />
            <p>Costos y presupuestos</p>
          </button>
          <button
            onClick={() => setSelectedNav("Users")}
            className={`flex gap-2 items-center mx-8 px-2 py-4 rounded-md ${
              selectedNav === "Users" ? " bg-[#5b6aa1]" : ""
            }`}
          >
            <FaUser />
            <p>Users</p>
          </button>
          <button
            onClick={() => setSelectedNav("Categories")}
            className={`flex gap-2 items-center mx-8 px-2 py-4 rounded-md ${
              selectedNav === "Categories" ? " bg-[#5b6aa1]" : ""
            }`}
          >
            <TbCategoryFilled />
            <p>Categorias</p>
          </button>
          <button
            onClick={() => setSelectedNav("Products")}
            className={`flex gap-2 items-center mx-8 px-2 py-4 rounded-md ${
              selectedNav === "Products" ? " bg-[#5b6aa1] " : ""
            }`}
          >
            <p> Productos </p>
          </button>
          <button
            onClick={() => setSelectedNav("Brands")}
            className={`flex gap-2 items-center mx-8 px-2 py-4 rounded-md ${
              selectedNav === "Brands" ? " bg-[#5b6aa1] text-white" : ""
            }`}
          >
            Marcas
          </button>
          <button
            onClick={() => setSelectedNav("Suppliers")}
            className={`flex gap-2 items-center mx-8 px-2 py-4 rounded-md ${
              selectedNav === "Suppliers" ? " bg-[#5b6aa1] text-white" : ""
            }`}
          >
            Proveedor
          </button>
        </ul>
      </div>
      <div className="col-span-7 justify-around "> {renderContent()}</div>
    </div>
  );
};

export default Sidebar;
