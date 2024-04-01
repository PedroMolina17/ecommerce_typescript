import { useForm, SubmitHandler } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getAllCategory } from "../../../api/category";
import { getAllBrands } from "../../../api/brands";
import { createProduct } from "../../../api/products";

import { useOpenFormStoreProduct } from "./store/ActionStore";

interface FormularioProductoProps {
  name: string;
  categoryId: number;
  price: number;
  image: string | null;
  categories: { id: number; name: string }[];
  description: string;
  stock: number;
  status: boolean;
  promotion: boolean;
  promotionPrice: number;
  promotionDescription?: string;
  brandId: number;
  brands: { id: number; name: string }[];
}

const Products = () => {
  const { handleSubmit, register, reset, watch } =
    useForm<FormularioProductoProps>();
  const { setOpenForm } = useOpenFormStoreProduct();
  const queryClient = useQueryClient();

  // Obtener Data de Categories
  const { data: categoriesData } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => await getAllCategory(),
  });
  const categories = categoriesData?.data || [];

  // Obtener Data de Brands
  const { data: brandsData } = useQuery({
    queryKey: ["brands"],
    queryFn: async () => await getAllBrands(),
  });
  const brands = brandsData?.data || [];

  //Registrar Productos
  const createProductMutation = useMutation({
    mutationFn: async (data) => await createProduct(data),
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries("product"); // Invalidar la consulta existente
    },
  });
  console.log(watch("image"));
  const onSubmit: SubmitHandler<FormularioProductoProps> = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("categoryId", data.categoryId.toString());
    formData.append("price", data.price.toString());

    if (data.image) {
      for (let i = 0; i < data.image.length; i++) {
        formData.append("image", data.image[i]);
      }
    }
    formData.append("description", data.description);
    formData.append("stock", data.stock.toString());
    formData.append("status", data.status.toString());
    formData.append("promotion", data.promotion.toString());
    formData.append("promotionPrice", data.promotionPrice.toString());
    formData.append("promotionDescription", data.promotionDescription || "");
    formData.append("brandId", data.brandId.toString());
    createProductMutation.mutate(formData);
    setOpenForm("create");
  };

  return (
    <div className="m-8">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col p-5 gap-6">
          <label>
            Nombre del Producto:
            <input
              type="text"
              {...register("name", { required: "Campo obligatorio" })}
              className="border border-[#455591] mx-4 rounded-md"
            />
          </label>
          <label>
            Descripción:
            <input
              type="text"
              {...register("description", { required: "Campo obligatorio" })}
              className="border border-[#455591] mx-4 rounded-md"
            />
          </label>
          <label>
            Precio:
            <input
              type="number"
              {...register("price", { required: "Campo obligatorio" })}
              className="border border-[#455591] mx-4 rounded-md"
            />
          </label>

          <label>
            Stock:
            <input
              type="number"
              {...register("stock", { required: "Campo obligatorio" })}
              className="border border-[#455591] mx-4 rounded-md"
            />
          </label>
          <label>
            Estado:
            <input type="checkbox" {...register("status")} className="mx-4" />
          </label>
          <label>
            Promoción:
            <input
              type="checkbox"
              {...register("promotion")}
              className="mx-4"
            />
          </label>

          <div>
            <label>
              Precio en Promoción:
              <input
                type="number"
                {...register("promotionPrice", {
                  required: "Campo obligatorio",
                })}
                className="border border-[#455591] mx-4 rounded-md"
              />
            </label>
            <label>
              Descripción de la Promoción:
              <input
                type="text"
                {...register("promotionDescription")}
                className="border border-[#455591] mx-4 rounded-md"
              />
            </label>
          </div>

          <label>
            Imagen:
            <input
              type="file"
              multiple
              {...register("image")}
              className="border border-[#455591] mx-4 rounded-md"
            />
          </label>
          <label>
            Marca ID:
            <select
              {...register("brandId", { required: "Campo obligatorio" })}
              className="border border-[#455591] mx-4 rounded-md"
            >
              <option value="">Seleccione una marca</option>
              {brands.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Categoría ID:
            <select
              {...register("categoryId", { required: "Campo obligatorio" })}
              className="border border-[#455591] mx-4 rounded-md"
            >
              <option value="">Seleccione una categoría</option>
              {categories.map((categories) => (
                <option key={categories.id} value={categories.id}>
                  {categories.name}
                </option>
              ))}
            </select>
          </label>
          <button
            type="submit"
            className="p-3 bg-[#455591] w-40 rounded-md text-white font-bold  text-lg"
          >
            Agregar
          </button>
          <button
            onClick={() => setOpenForm("create")}
            className="p-3 bg-[#455591] w-40 rounded-md text-white font-bold  text-lg"
          >
            Cancelar
          </button>
        </div>
        <ToastContainer />
      </form>
    </div>
  );
};

export default Products;
