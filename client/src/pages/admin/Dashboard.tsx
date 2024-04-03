import Brands from "../../Components/Admin/brand/Brands";

import Sales from "../../Components/Admin/Sales/Sales";
import Suppliers from "../../Components/Admin/Suppliers";
import { useSelectNavStore } from "../../Components/Admin/sideBar/store/useSelectNav";
import Users from "../../Components/Admin/users/Users";
import ProductsTable from "../../Components/Admin/Products/ProductsTable";
import Category from "../../Components/Admin/category/Category";

const Dashboard = () => {
  const { selectNav } = useSelectNavStore((state) => state);
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
    <section className="flex w-full  h-screen overflow-hidden  bg-darkPrimary">
      <div className="w-full px-8">{renderContent(selectNav)}</div>
    </section>
  );
};
export default Dashboard;
