import Brands from "../../Components/Admin/brand/Brands"; // ruta a mi componente brand

import Sales from "../../Components/Admin/Sales";
import Suppliers from "../../Components/Admin/Suppliers";
import Sidebar from "../../Components/Admin/sideBar/Sidebar";
import { useSelectNavStore } from "../../Components/Admin/sideBar/store/useSelectNav";
import Users from "../../Components/Admin/users/Users";
import ProductsTable from "../../Components/Admin/Products/ProductsTable";
import Category from "../../Components/Admin/category/Category";

const Dashboard = () => {
  const { selectNav } = useSelectNavStore((state) => state);
  console.log("selectNav-->", selectNav);
  console.log("hola");
  const renderContent = (value: string) => {
    switch (value) {
      case "Categories":
        return <Category />;
      case "Sales":
        return <Sales />;
      case "Products":
        return <ProductsTable />;
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
    <section className="container mx-auto bg-[#f9f9f9] p-2 flex w-full relative h-screen">
      <Sidebar />
      <div className="ml-24 mr-8 mt-3 flex-1">{renderContent(selectNav)}</div>
    </section>
  );
};
export default Dashboard;
