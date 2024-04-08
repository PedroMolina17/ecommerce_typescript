import ProductsTable from "../../Components/Admin/Products/ProductsTable";
import Sales from "../../Components/Admin/Sales/Sales";
import Suppliers from "../../Components/Admin/Suppliers";
import Brands from "../../Components/Admin/brand/Brands";
import Category from "../../Components/Admin/category/Category";
import { useSelectNavStore } from "../../Components/Admin/sideBar/store/useSelectNav";
import Users from "../../Components/Admin/users/Users";
import CreateProduct from "../../Components/Admin/Products/CreateProduct";
const Dashboard = () => {
  const { selectNav } = useSelectNavStore((state) => state);
  console.log("selectNav-->", selectNav);

  const renderContent = (value: string) => {
    switch (value) {
      case "Categories":
        return <Category />;
      case "Sales":
        return <Sales />;
      case "Products":
        return <CreateProduct />;
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
