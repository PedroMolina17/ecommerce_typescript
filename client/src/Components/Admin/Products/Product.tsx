import useProductStore from "./store/ProductStore";
import CreateProduct from "./CreateProduct";
import ProductsTable from "./ProductsTable";
const Product = () => {
  const { operation, setOperation } = useProductStore();
  return (
    <div>
      {operation === "CreateProduct" ? (
        <div>
          <CreateProduct />
        </div>
      ) : operation === "ViewProduct" ? (
        <ProductsTable />
      ) : (
        <div>
          <CreateProduct />
        </div>
      )}
    </div>
  );
};

export default Product;
