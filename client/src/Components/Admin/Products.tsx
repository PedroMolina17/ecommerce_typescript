import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";

interface FormularioProductoProps {
  name: string;
  categoryId: number;
  price: number;
  category: string;
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

interface FormularioProductoState {
  name: string;
  categoryId: number;
  price: number;
  category: string;
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
  const { handleSubmit, register, reset } = useForm<FormularioProductoProps>();
  const [state, setState] = useState<FormularioProductoState>({
    name: "",
    categoryId: 0,
    price: 0,
    category: "",
    image: null,
    categories: [],
    description: "",
    stock: 0,
    status: false,
    promotion: false,
    promotionPrice: 0,
    promotionDescription: "",
    brandId: 0,
    brands: [],
  });

  const onSubmit: SubmitHandler<FormularioProductoState> = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:3500/api/product/create-product",
        data
      );
      console.log("Server response:", response.data);
      toast.success("Categoria añadida");
      reset();
    } catch (error) {
      console.error("Se produjo un error. Inténtalo de nuevo más tarde.");
      toast.error("ERROR");
    }
  };

  useEffect(() => {
    const obtenerCategorias = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3500/api/category/categories"
        );

        if (response.data && Array.isArray(response.data.data)) {
          setState((prevState) => ({
            ...prevState,
            categories: response.data.data,
          }));
        } else {
          console.error(
            "La respuesta del servidor no es un array:",
            response.data
          );
        }
      } catch (error) {
        console.error("Error al obtener las categorías:", error);
      }
    };

    const obtenerMarcas = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3500/api/brand/brands"
        );

        if (response.data && Array.isArray(response.data.data)) {
          setState((prevState) => ({
            ...prevState,
            brands: response.data.data,
          }));
        } else {
          console.error(
            "La respuesta del servidor no es un array:",
            response.data
          );
        }
      } catch (error) {
        console.error("Error al obtener las marcas:", error);
      }
    };

    obtenerCategorias();
    obtenerMarcas();
  }, []);
  return (
    <div className="m-8">
      <form onSubmit={handleSubmit(onSubmit)}>
        {" "}
        <div className="flex flex-col p-5 gap-6">
          <label>
            Nombre del Producto:
            <input
              type="text"
              {...register("name", { required: "Campo obligatorio" })}
              className="border border-[#139dba] mx-4 rounded-md"
            />
          </label>
          <label>
            Descripción:
            <input
              type="text"
              {...register("description", { required: "Campo obligatorio" })}
              className="border border-[#139dba] mx-4 rounded-md"
            />
          </label>
          <label>
            Precio:
            <input
              type="number"
              {...register("price", { required: "Campo obligatorio" })}
              className="border border-[#139dba] mx-4 rounded-md"
            />
          </label>

          <label>
            Stock:
            <input
              type="number"
              {...register("stock", { required: "Campo obligatorio" })}
              className="border border-[#139dba] mx-4 rounded-md"
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
                className="border border-[#139dba] mx-4 rounded-md"
              />
            </label>
            <label>
              Descripción de la Promoción:
              <input
                type="text"
                {...register("promotionDescription")}
                className="border border-[#139dba] mx-4 rounded-md"
              />
            </label>
          </div>

          <label>
            Imagen:
            <input
              type="file"
              {...register("image")}
              className="border border-[#139dba] mx-4 rounded-md"
            />
          </label>
          <label>
            Marca ID:
            <select
              {...register("brandId", { required: "Campo obligatorio" })}
              className="border border-[#139dba] mx-4 rounded-md"
            >
              <option value="">Seleccione una marca</option>
              {state.brands.map((brand) => (
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
              className="border border-[#139dba] mx-4 rounded-md"
            >
              <option value="">Seleccione una categoría</option>
              {state.categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>
          <button type="submit" className="p-4 bg-[#139dba] w-40 rounded-md">
            Agregar Producto
          </button>
        </div>
        <ToastContainer />
      </form>
    </div>
  );
};

export default Products;
