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

        isOpen ? "w-64" : "w-12"
      } duration-150 fixed z-40 bg-primary col-span-2 text-white row-span-12   left-0 top-0  min-h-screen  border-r border-gray-800 py-8 pl-4 font-bold`}

    >
      <BsArrowLeftShort
        className={`${
          !isOpen && "rotate-180"
        } text-pretty text-[24px] bg-white absolute -right-3 top-5  border border-primary rounded-full cursor-pointer  `}
        onClick={() => setIsOpen(!isOpen)}
      />
      <div className=" h-full w-full flex flex-col gap-1">

        <div className="h-12 overflow-hidden flex items-center gap-1 justify-center my-4">
          <h2 className=" text-lg whitespace-nowrap  text-ellipsis font-medium ">

            Bienvenido a Celeste
          </h2>
        </div>

        <ContainerButton
          title="Costo y presupuestos"
          name="Sales"
          isOpen={isOpen}
          onClick={() => setSelectNav("Sales")}
        >

          <ButonSideBar
            icon={<FaDollarSign />}
            onClick={() => setSelectNav("Sales")}
          />

        </ContainerButton>
        <ContainerButton
          title="Customers"
          name="Users"
          isOpen={isOpen}
          onClick={() => setSelectNav("Users")}
        >

          <ButonSideBar
            icon={<FaUser />}
            onClick={() => setSelectNav("Users")}
          />

        </ContainerButton>
        <ContainerButton
          title="Categories"
          name="Categories"
          isOpen={isOpen}
          onClick={() => setSelectNav("Categories")}
        >

          <ButonSideBar
            icon={<TbCategoryFilled />}
            onClick={() => setSelectNav("Categories")}
          />

        </ContainerButton>
        <ContainerButton
          title="Products"
          name="Products"
          isOpen={isOpen}
          onClick={() => setSelectNav("Products")}
        >

          <ButonSideBar
            icon={<FaCartShopping />}
            onClick={() => setSelectNav("Products")}
          />

        </ContainerButton>

        <ContainerButton
          title="Brands"
          name="Brands"
          isOpen={isOpen}
          onClick={() => setSelectNav("Brands")}
        >

          <ButonSideBar
            icon={<SiBrandfolder />}
            onClick={() => setSelectNav("Brands")}
          />

        </ContainerButton>

        <a
          href="https://github.com/santiagoweb212/e_commerce"
          target="_blank"
          rel="noopener noreferrer"
        >

          <ButonSideBar icon={<IoExit className=" text-2xl" />} />
        </ContainerButton>

      </div>
    </aside>
  );
};

export default Sidebar;