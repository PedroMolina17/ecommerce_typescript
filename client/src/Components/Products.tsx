import { IoIosStar } from "react-icons/io";
import { IoIosStarHalf } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../hooks/useProducts";
import { useEffect, useState } from "react";
import { useCart } from "@/hooks/useCart";
interface Product {
  id: number;
  nombre: string;
  imagen: string;
  price: number;
  descripcion: string;
  rating: number;
}

const Products = () => {
  const { useGetAllProducts } = useProduct();
  const [products, setProducts] = useState([]);
  const { data: dataProducts, isLoading: isLoadingProducts } =
    useGetAllProducts();
  const { addCartMutation } = useCart();
  useEffect(() => {
    if (!isLoadingProducts && dataProducts) {
      setProducts(dataProducts.results);
    }
  }, [isLoadingProducts, dataProducts]);
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<IoIosStar key={i} className="text-yellow-500" />);
      } else if (hasHalfStar && i === fullStars + 1) {
        stars.push(<IoIosStarHalf key={i} className="text-yellow-500" />);
      } else {
        stars.push(<IoIosStar key={i} className="text-gray-400" />);
      }
    }

    return stars;
  };
  const navigate = useNavigate();
  const handleAddToCart = (product: Product) => {
    const cartItemData = {
      cartId: 1,
      productId: product.id,
      quantity: 1,
      unitPrice: product.salePrice,
      totalItemPrice: product.salePrice * 1,
    };
    console.log(cartItemData);
    addCartMutation.mutate(cartItemData, {
      onSuccess: () => {
        console.log(cartItemData);
      },
      onError: (error) => {
        console.error("Error adding product to cart:", error);
        alert("Failed to add product to cart.");
      },
    });
  };

  const navigateToProductDetails = (productId: number) => {
    navigate(`/electronics/${productId.toString()}`);
  };

  return (
    products && (
      <div className="grid grid-cols-4 max-md:grid-cols-2 max-sm:grid-cols-1 gap-2 mt-16">
        {products.map((product) => (
          <div key={product.id} className="col-span-1 border rounded-md">
            <div className="border-b-4">
              <img
                src={
                  product.ProductCoverImage?.imageProduct ||
                  "fallback-image-url"
                }
                alt={product.name}
                className="rounded-md"
              />
            </div>
            <div className="flex flex-col gap-2 pt-2">
              <div className="flex gap-1 items-center ">
                {renderStars(product.rating)}
              </div>
              <p className="text-slate-500">{product.name}</p>
              <p className="text-[#139dba] font-bold">${product.salePrice}</p>
              <button
                className="py-2 text-center bg-[#cccccc] rounded-md min-w-8"
                onClick={() => navigateToProductDetails(product.id)}
              >
                Ver Mas
              </button>
              <button
                className="py-2 text-center bg-[#139dba] rounded-md min-w-8 "
                onClick={() => handleAddToCart(product)}
              >
                Add Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    )
  );
};

export default Products;
