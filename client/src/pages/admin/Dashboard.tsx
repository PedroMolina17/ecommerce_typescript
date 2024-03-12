import Brands from "../../Components/Admin/brand/Brands"; // ruta a mi componente brand

import Sales from "../../Components/Admin/Sales";
import Suppliers from "../../Components/Admin/Suppliers";
import { useSelectNavStore } from "../../Components/Admin/sideBar/store/useSelectNav";
import Users from "../../Components/Admin/users/Users";
import Products from "../../Components/Admin/Products/Products";
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
    <section className="container mx-auto  flex w-full relative min-h-screen">
      <div className=" w-full mx-8">{renderContent(selectNav)}</div>
    </section>
  );
};
export default Dashboard;
