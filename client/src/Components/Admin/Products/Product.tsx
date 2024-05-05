import useProductStore from "./store/ProductStore";
import CreateProduct from "./CreateProduct";
import ProductsTable from "./ProductsTable";
import UpdateProduct from "./UpdateProduct";
const Product = () => {
  const { operation, productId } = useProductStore();

  return (
    <div>
      {operation === "CreateProduct" ? (
        <div>
          <CreateProduct />
        </div>
      ) : operation === "ViewProduct" ? (
        <ProductsTable />
      ) : operation === "UpdateProduct" ? (
        <UpdateProduct productId={productId} />
      ) : (
        <div>
          <CreateProduct />
        </div>
      )}
    </div>
  );
};

export default Product;
