import { FaUser } from "react-icons/fa";
import { TbCategoryFilled } from "react-icons/tb";
import { BsArrowLeftShort } from "react-icons/bs";
import { FaDollarSign } from "react-icons/fa6";
import ButonSideBar from "./ButonSideBar";
import { useState } from "react";
import ContainerButton from "./ContainerButton";
import logo from "/images/logo-Celeste.png";
import { useSelectNavStore } from "./store/useSelectNav";
import { IoExit } from "react-icons/io5";
import { SiBrandfolder } from "react-icons/si";
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { setSelectNav } = useSelectNavStore((state) => state);

  return (
    <aside
      className={`${
        isOpen ? "w-80" : "w-16"
      } z-50 p-2 duration-150 fixed h-screen bg-[#fffafa]  shadow-md   rounded-md`}
    >
      <BsArrowLeftShort
        className={`${
          !isOpen && "rotate-180"
        } text-pretty text-[24px] bg-white absolute -right-4 top-3 text-[#139dba] border border-[#139dba] rounded-full cursor-pointer`}
        onClick={() => setIsOpen(!isOpen)}
      />
      <div className=" h-full w-full flex flex-col gap-1">
        <div className="h-12 overflow-hidden flex items-center gap-1">
          <img
            src={logo}
            alt=""
            className=" w-12 h-12 object-contain bg-white "
          />
          <h2 className="text-primary text-lg whitespace-nowrap  text-ellipsis font-medium ">
            Bienvenido a Celeste
          </h2>
        </div>
        <ContainerButton
          title="costo y presupuestos"
          name="Sales"
          onClick={() => setSelectNav("Sales")}
        >
          <ButonSideBar
            icon={<FaDollarSign className="text-primary" />}
            onClick={() => setSelectNav("Sales")}
          />
        </ContainerButton>
        <ContainerButton
          title="Usuarios"
          name="Users"
          onClick={() => setSelectNav("Users")}
        >
          <ButonSideBar
            icon={<FaUser className="text-primary" />}
            onClick={() => setSelectNav("Users")}
          />
        </ContainerButton>
        <ContainerButton
          title="Categorias"
          name="Categories"
          onClick={() => setSelectNav("Categories")}
        >
          <ButonSideBar
            icon={<TbCategoryFilled className="text-primary" />}
            onClick={() => setSelectNav("Categories")}
          />
        </ContainerButton>

        {/* Aqui se ponen los comentarios en React
            Aqui creo un nuevo boton con un nuevo formato de icono
        */}
        <ContainerButton
          title="Brands"
          name="Brands"
          onClick={() => setSelectNav("Brands")}
        >
          <ButonSideBar
            icon={<SiBrandfolder className="text-primary" />}
            onClick={() => setSelectNav("Brands")}
          />
        </ContainerButton>
        <ContainerButton title="salir" name="Exit">
          <ButonSideBar icon={<IoExit className="text-secondary text-2xl" />} />
        </ContainerButton>
      </div>
    </aside>
  );
};
export default Sidebar;
