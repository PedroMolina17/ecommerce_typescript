// componente Brands
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getBrands } from "../../../api/brands";

// retorna el brands
const Brands = () => {
  const { data } = useQuery({
    queryKey: ["brands"],
    queryFn: async () => {
      // funcion que va a ejecutar la query
      return await getBrands();
    },
    placeholderData: keepPreviousData,
  });

  console.log(data);

  return (
    <div>
      <h3>New Brands</h3>
    </div>
  );
};

export default Brands;
