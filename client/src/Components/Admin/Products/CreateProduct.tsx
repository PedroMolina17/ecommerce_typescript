import { FaImage } from "react-icons/fa";
import {
  MdOutlineAttachMoney,
  MdOutlineProductionQuantityLimits,
  MdLocalOffer,
  MdOutlineLocalOffer,
} from "react-icons/md";
import { useRef, useState } from "react";
import { getAllCategory } from "../../../api/category";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  IResponseCreateProduct,
  IcreateProduct,
} from "../../../types/products.type";
import { createProduct } from "../../../api/products";
import { getAllBrands } from "../../../api/brands";
import { useOpenFormStoreProduct } from "./store/ActionStore";
import useProductStore from "./store/ProductStore";
const CreateProduct = () => {
  const { handleSubmit, register, reset } = useForm<FormularioProductoProps>();
  const { setOpenForm } = useOpenFormStoreProduct();
  const queryClient = useQueryClient();
  const { operation, setOperation } = useProductStore();

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

  //Crear Categoria
  const createProductMutation = useMutation({
    mutationFn: async (data) => await createProduct(data),
    onSuccess: (data) => console.log(data),
  });
  //Obtener Categoria
  const { data: categoriesData } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => await getAllCategory(),
  });
  const categories = categoriesData?.data || [];

  //Obtener Marcas
  const { data: brandsData } = useQuery({
    queryKey: ["brands"],
    queryFn: async () => await getAllBrands(),
  });
  const brands = brandsData?.data || [];

  //Leer y Mostar imagen
  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  //Cambiar vista
  const toggleView = (operation: string) => {
    setOperation(operation);
  };
  //Enviar Datos
  const onSubmit: SubmitHandler<FormularioProductoProps> = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("categoryId", data.categoryId.toString());
    formData.append("price", data.price.toString());
    if (data.image) {
      formData.append("image", data.image[0]);
    }
    formData.append("description", data.description);
    formData.append("stock", data.stock.toString());
    formData.append("promotionPrice", data.promotionPrice.toString());
    formData.append("promotionDescription", data.promotionDescription || "");
    formData.append("brandId", data.brandId.toString());
    // Llamar a la función de creación de producto usando la mutación de React Query
    createProductMutation.mutate(formData);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex text-darkSecondary flex-col">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl block my-4">Add Product</h1>
          <div className="flex gap-4 items-center justify-center font-bold">
            <button
              className="bg-blue-600 p-6  h-8 rounded-md flex items-center "
              type="submit"
              onClick={() => setOpenForm("create")}
            >
              Agregar
            </button>
            <button
              className="bg-red-600 p-6 h-8 rounded-md flex items-center"
              onClick={() => toggleView("ViewProduct")}
            >
              Cancelar
            </button>
          </div>
        </div>

        <div className="w-full grid grid-cols-12 gap-8">
          <div className="grid col-span-8">
            <div className="flex flex-col gap-8">
              <label className="flex flex-col gap-2">
                <p className="text-xl">Producto</p>
                <input
                  type="text"
                  {...register("name", { required: "Campo obligatorio" })}
                  className=" bg-darkSecondary rounded-sm h-8 text-darkPrimary p-1"
                />
              </label>
              <label className="flex flex-col gap-2">
                <p className="text-xl">Descripcion</p>
                <textarea
                  {...register("description", {
                    required: "Campo obligatorio",
                  })}
                  className=" bg-darkSecondary rounded-sm h-48 text-darkPrimary p-1"
                />
              </label>
              <div className="flex flex-col gap-2">
                <p className="text-xl">Inventario</p>
                <div className="border p-4 flex flex-col gap-4 text-lg">
                  <label className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MdOutlineAttachMoney /> Precio
                    </div>
                    <input
                      {...register("price", { required: "Campo obligatorio" })}
                      type="number"
                      className="w-96 rounded-sm text-black p-1"
                      placeholder="$0.00"
                    />
                  </label>
                  <label className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MdOutlineProductionQuantityLimits /> Cantidad
                    </div>
                    <input
                      {...register("stock", { required: "Campo obligatorio" })}
                      type="number"
                      className="w-96 rounded-sm text-black p-1"
                      placeholder="0"
                    />
                  </label>
                  <label className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MdLocalOffer /> Precio en promocion
                    </div>
                    <input
                      type="number"
                      {...register("promotionPrice", {
                        required: "Campo obligatorio",
                      })}
                      placeholder="$0.00"
                      className="w-96 rounded-sm text-black p-1"
                    />
                  </label>
                  <label className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MdOutlineLocalOffer /> Descripcion en promocion
                    </div>
                    <input
                      type="text"
                      {...register("promotionDescription", {
                        required: "Campo obligatorio",
                      })}
                      placeholder="Descripcion"
                      className="w-96 rounded-sm text-black p-1"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className=" col-span-4 flex flex-col gap-8">
            <div className="bg-darkThird p-4 rounded-md">
              <h2 className="text-3xl mb-4">Organizar</h2>
              <div className="flex flex-col gap-8 my-8">
                <label className="flex flex-col gap-2">
                  Categoria
                  <select
                    {...register("categoryId", {
                      required: "Campo obligatorio",
                    })}
                    className="h-8 text-darkPrimary"
                    defaultValue=""
                  >
                    <option value="">Seleccione una categoría</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="flex flex-col gap-2">
                  Marca
                  <select
                    {...register("brandId", { required: "Campo obligatorio" })}
                    className="h-8 text-darkPrimary"
                  >
                    <option value="">Seleccione una marca</option>
                    {brands.map((brand) => (
                      <option key={brand.id} value={brand.id}>
                        {brand.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="flex flex-col gap-2">
                  Etiquetas
                  <select className="h-8 text-darkPrimary">
                    <option>Valor 1</option>
                    <option>Valor 2</option>
                  </select>
                </label>
              </div>{" "}
            </div>
            <div className="bg-darkThird p-4 rounded-md">
              <h2 className="text-3xl mb-4">Imagenes</h2>
              <div className="flex flex-col gap-8 my-8">
                <label className="flex flex-col gap-2">
                  Imagen de Portada
                  <button
                    className="text-darkPrimary flex text-4xl justify-center items-center border h-24 border-darkPrimary"
                    onClick={handleButtonClick}
                  >
                    {previewImage ? (
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="h-24 border border-darkPrimary"
                      />
                    ) : (
                      <FaImage />
                    )}
                    <input
                      {...register("image")}
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      onChange={handleFileChange}
                    ></input>
                  </button>
                </label>
                <label className="flex flex-col gap-2">
                  Imagen de Exibhicion
                  <button
                    className="text-darkPrimary flex text-4xl justify-center items-center border h-24 border-darkPrimary"
                    onClick={handleButtonClick}
                  >
                    {previewImage ? (
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="h-24 border border-darkPrimary"
                      />
                    ) : (
                      <FaImage />
                    )}
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      onChange={handleFileChange}
                    ></input>
                  </button>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreateProduct;
