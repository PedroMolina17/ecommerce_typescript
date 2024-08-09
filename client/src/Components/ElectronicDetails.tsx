import { useParams } from "react-router-dom";
import { getProductById } from "@/api/products";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

const ElectronicDetails = () => {
  const { id } = useParams();

  const { data: productById, isLoading } = useQuery({
    queryKey: ["productById"],
    queryFn: () => getProductById(id),
  });

  return (
    <div className="grid grid-cols-2 max-md:grid-cols-1 h-screen p-24">
      <div className="grid col-span-1 ">
        <img
          src={productById?.product?.ProductCoverImage?.imageProduct}
          alt={productById?.product?.name}
        ></img>
      </div>
      <div className="grid col-span-1 ">
        <div className="flex flex-col gap-8">
          <h2 className="text-4xl font-bold">{productById?.product?.name}</h2>
          <span className="text-lg">{productById?.product?.description}</span>
          <span className="text-2xl text-[#139dba] font-bold">
            $/{productById?.product?.salePrice}
          </span>
          <button className="bg-[#139dba] text-white px-4 py-2 rounded-md w-40">
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ElectronicDetails;
