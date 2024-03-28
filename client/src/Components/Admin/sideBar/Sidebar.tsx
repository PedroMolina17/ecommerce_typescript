import { useMutation } from "@tanstack/react-query";
import { BsArrowLeftShort } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { FaCartShopping, FaDollarSign } from "react-icons/fa6";
import { IoExit } from "react-icons/io5";
import { SiBrandfolder } from "react-icons/si";
import { TbCategoryFilled } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

import { logout } from "../../../api/auth";
import ButonSideBar from "./ButonSideBar";
import ContainerButton from "./ContainerButton";
import { useSelectNavStore } from "./store/useSelectNav";
import logo from "/images/logo-Celeste.png";

const Sidebar = ({ isOpen, setIsOpen }: any) => {
  const { setSelectNav } = useSelectNavStore((state) => state);
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationKey: ["logout"],
    mutationFn: async () => await logout(),
    onSuccess: () => {
      navigate("/admin-login");
    },
    retry: 1,
  });
  return (
    <aside
      className={`${
        isOpen ? "w-64" : "w-12"
      } duration-150 fixed z-40 bg-bg col-span-2 text-white row-span-12   left-0 top-0  min-h-screen  border-r border-gray-800`}
    >
      <BsArrowLeftShort
        className={`${
          !isOpen && "rotate-180"
        } text-pretty text-[24px] bg-white absolute -right-3 top-5 text-[#139dba] border border-[#139dba] rounded-full cursor-pointer`}
        onClick={() => setIsOpen(!isOpen)}
      />
      <div className=" h-full w-full flex flex-col gap-1">
        <div className="h-12 overflow-hidden flex items-center gap-1">
          <img
            src={logo}
            alt=""
            className={`w-12 h-12 object-contain bg-white`}
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
          title="Customers"
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
        <ContainerButton
          title="Products"
          name="Products"
          onClick={() => setSelectNav("Products")}
        >
          <ButonSideBar
            icon={<FaCartShopping className="text-primary" />}
            onClick={() => setSelectNav("Products")}
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
        <ContainerButton
          title="salir"
          name="Exit"
          onClick={() => mutation.mutate()}
        >
          <ButonSideBar icon={<IoExit className="text-secondary text-2xl" />} />
        </ContainerButton>
      </div>
    </aside>
  );
};
export default Sidebar;
