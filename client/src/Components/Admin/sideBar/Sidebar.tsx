import { BsArrowLeftShort } from "react-icons/bs";
import { FaGithub, FaUser } from "react-icons/fa";
import { FaCartShopping, FaDollarSign } from "react-icons/fa6";
import { SiBrandfolder } from "react-icons/si";
import { TbCategoryFilled } from "react-icons/tb";
import ButonSideBar from "./ButonSideBar";
import ContainerButton from "./ContainerButton";
import { useSelectNavStore } from "./store/useSelectNav";

const Sidebar = ({ isOpen, setIsOpen }: any) => {
  const { setSelectNav } = useSelectNavStore((state) => state);

  return (
    <aside
      className={`${
        isOpen ? "w-80" : "w-12"
      } duration-150 fixed z-40 bg-primary col-span-2 text-darkText row-span-12 rounded-tr-3xl rounded-br-3xl   left-0 top-0  min-h-screen  py-8 pl-4 font-bold`}
    >
      <BsArrowLeftShort
        className={`${
          !isOpen && "rotate-180"
        } text-pretty text-[24px] bg-darkPrimary absolute -right-3 top-5   rounded-full cursor-pointer  `}
        onClick={() => setIsOpen(!isOpen)}
      />
      <div className=" h-full w-full flex flex-col gap-1">
        <div className="h-12 overflow-hidden flex items-center gap-1 mb-6">
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
          <ButonSideBar icon={<FaDollarSign className="text-darkText" />} />
        </ContainerButton>
        <ContainerButton
          title="Customers"
          name="Users"
          isOpen={isOpen}
          onClick={() => setSelectNav("Users")}
        >
          <ButonSideBar icon={<FaUser className="text-darkText" />} />
        </ContainerButton>
        <ContainerButton
          title="Categories"
          name="Categories"
          isOpen={isOpen}
          onClick={() => setSelectNav("Categories")}
        >
          <ButonSideBar icon={<TbCategoryFilled className="text-darkText" />} />
        </ContainerButton>
        <ContainerButton
          title="Products"
          name="Products"
          isOpen={isOpen}
          onClick={() => setSelectNav("Products")}
        >
          <ButonSideBar icon={<FaCartShopping className="text-darkText" />} />
        </ContainerButton>

        <ContainerButton
          title="Brands"
          name="Brands"
          isOpen={isOpen}
          onClick={() => setSelectNav("Brands")}
        >
          <ButonSideBar icon={<SiBrandfolder className="text-darkText" />} />
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
