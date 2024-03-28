import { BsArrowLeftShort } from "react-icons/bs";
import { FaGithub, FaUser } from "react-icons/fa";
import { FaCartShopping, FaDollarSign } from "react-icons/fa6";
import { SiBrandfolder } from "react-icons/si";
import { TbCategoryFilled } from "react-icons/tb";

import ButonSideBar from "./ButonSideBar";
import ContainerButton from "./ContainerButton";
import { useSelectNavStore } from "./store/useSelectNav";
import logo from "/images/logo-Celeste.png";

const Sidebar = ({ isOpen, setIsOpen }: any) => {
  const { setSelectNav } = useSelectNavStore((state) => state);

  return (
    <aside
      className={`${
        isOpen ? "w-64" : "w-16"
      } duration-150 fixed z-40 bg-secondary col-span-2 text-white row-span-12 left-0 top-0  min-h-screen border-r border-gray-700`}
    >
      <BsArrowLeftShort
        className={`${
          !isOpen && "rotate-180"
        } text-pretty text-[24px] bg-white absolute -right-3 top-5 text-[#139dba] border border-[#139dba] rounded-full cursor-pointer`}
        onClick={() => setIsOpen(!isOpen)}
      />
      <div className=" h-full w-full flex flex-col gap-1">
        <div className="h-12 overflow-hidden flex items-center gap-1 mb-6">
          <img
            src={logo}
            className={`w-16 h-12 object-contain bg-white`}
            alt="logo"
          />
          <h2 className="text-primary text-lg whitespace-nowrap  text-ellipsis font-medium ">
            Bienvenido a Celeste
          </h2>
        </div>

        <ContainerButton
          title="costo y presupuestos"
          name="Sales"
          isOpen={isOpen}
          onClick={() => setSelectNav("Sales")}
        >
          <ButonSideBar icon={<FaDollarSign className="text-primary" />} />
        </ContainerButton>
        <ContainerButton
          title="Customers"
          name="Users"
          isOpen={isOpen}
          onClick={() => setSelectNav("Users")}
        >
          <ButonSideBar icon={<FaUser className="text-primary" />} />
        </ContainerButton>
        <ContainerButton
          title="Categories"
          name="Categories"
          isOpen={isOpen}
          onClick={() => setSelectNav("Categories")}
        >
          <ButonSideBar icon={<TbCategoryFilled className="text-primary" />} />
        </ContainerButton>
        <ContainerButton
          title="Products"
          name="Products"
          isOpen={isOpen}
          onClick={() => setSelectNav("Products")}
        >
          <ButonSideBar icon={<FaCartShopping className="text-primary" />} />
        </ContainerButton>

        <ContainerButton
          title="Brands"
          name="Brands"
          isOpen={isOpen}
          onClick={() => setSelectNav("Brands")}
        >
          <ButonSideBar icon={<SiBrandfolder className="text-primary" />} />
        </ContainerButton>

        <a
          href="https://github.com/santiagoweb212/e_commerce"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="hover:bg-bgHover overflow-hidden flex items-center gap-1 cursor-pointer absolute bottom-0 h-16 w-full border-t border-gray-700 outline-none">
            <div className="w-12">
              <ButonSideBar icon={<FaGithub className="text-2xl" />} />
            </div>
            <h2 className={`${!isOpen && "hidden"} text-sm truncate`}>
              Repository
            </h2>
          </div>
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;
