import Product from "../../Components/Admin/Products/Product";
import Sales from "../../Components/Admin/Sales/Sales";
import Suppliers from "../../Components/Admin/Suppliers";
import Brands from "../../Components/Admin/brand/Brands";
import Category from "../../Components/Admin/category/Category";
import { useSelectNavStore } from "../../Components/Admin/sideBar/store/useSelectNav";
import Users from "../../Components/Admin/users/Users";
const Dashboard = () => {
  const { selectNav } = useSelectNavStore((state) => state);

  const renderContent = (value: string) => {
    switch (value) {
      case "Categories":
        return <Category />;
      case "Sales":
        return <Sales />;
      case "Products":
        return <Product />;
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
    <section className="flex w-full  bg-darkPrimary">
      <div className="w-full px-8 py-4">{renderContent(selectNav)}</div>
    </section>
  );
};
export default Dashboard;
