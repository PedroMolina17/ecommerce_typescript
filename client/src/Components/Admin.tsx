import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import axios from "axios";

interface FormularioProductoProps {}

interface FormularioProductoState {
  name: string;
  price: string;
  category: string;
  image: File | null;
  categories: string[];
  description: string;
  technicalDescription: string;
  stock: string;
  status: boolean;
  promotion: boolean;
  promotionPrice: string;
  promotionDescription?: string;
  brandId: string;
  brands: { id: string; name: string }[];
}

const FormularioProducto: React.FC<FormularioProductoProps> = () => {
  const [state, setState] = useState<FormularioProductoState>({
    name: "",
    price: "",
    category: "",
    image: null,
    categories: [],
    description: "",
    technicalDescription: "",
    stock: "",
    status: false,
    promotion: false,
    promotionPrice: "",
    promotionDescription: "",
    brandId: "",
    brands: [], // Nuevo arreglo para almacenar las marcas
  });

  useEffect(() => {
    const obtenerCategorias = async () => {
      try {
        const response = await axios.get("http://localhost:3500/categorias");
        setState((prevState) => ({
          ...prevState,
          categories: response.data,
        }));
      } catch (error) {
        console.error("Error al obtener las categorías:", error);
      }
    };

    const obtenerMarcas = async () => {
      try {
        const response = await axios.get("http://localhost:3500/marcas");
        setState((prevState) => ({
          ...prevState,
          brands: response.data,
        }));
      } catch (error) {
        console.error("Error al obtener las marcas:", error);
      }
    };

    obtenerCategorias();
    obtenerMarcas();
  }, []);

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    inputType: string
  ) => {
    const { name, value } = event.target;

    setState((prevState) => ({
      ...prevState,
      [name]:
        inputType === "file"
          ? (event.target as HTMLInputElement).files?.[0]
          : value,
    }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const {
      name,
      price,
      category,
      image,
      description,
      technicalDescription,
      stock,
      status,
      promotion,
      promotionPrice,
      promotionDescription,
      brandId,
    } = state;

    // Resto del código de manejo de la subida del producto
    console.log("Datos del producto:", {
      name,
      price,
      category,
      image,
      description,
      technicalDescription,
      stock,
      status,
      promotion,
      promotionPrice,
      promotionDescription,
      brandId,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col bg-[#f7f7f7] p-5 gap-6">
        <label>
          Nombre del Producto:
          <input
            type="text"
            name="name"
            value={state.name}
            onChange={(e) => handleInputChange(e, "text")}
            className="border border-[#139dba] mx-4 rounded-md"
          />
        </label>
        <label>
          Descripción:
          <input
            type="text"
            name="description"
            value={state.description}
            onChange={(e) => handleInputChange(e, "text")}
            className="border border-[#139dba] mx-4 rounded-md"
          />
        </label>
        <label>
          Precio:
          <input
            type="number"
            name="price"
            value={state.price}
            onChange={(e) => handleInputChange(e, "text")}
            className="border border-[#139dba] mx-4 rounded-md"
          />
        </label>
        <label>
          Categoría:
          <select
            name="category"
            value={state.category}
            onChange={(e) => handleInputChange(e, "text")}
            className="border border-[#139dba] mx-4 rounded-md"
          >
            <option value="">Seleccione una categoría</option>
            {state.categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </label>
        <label>
          Descripción Técnica:
          <input
            type="text"
            name="technicalDescription"
            value={state.technicalDescription}
            onChange={(e) => handleInputChange(e, "text")}
            className="border border-[#139dba] mx-4 rounded-md"
          />
        </label>
        <label>
          Stock:
          <input
            type="number"
            name="stock"
            value={state.stock}
            onChange={(e) => handleInputChange(e, "text")}
            className="border border-[#139dba] mx-4 rounded-md"
          />
        </label>
        <label>
          Estado:
          <input
            type="checkbox"
            name="status"
            checked={state.status}
            onChange={(e) => setState({ ...state, status: e.target.checked })}
            className="mx-4"
          />
        </label>
        <label>
          Promoción:
          <input
            type="checkbox"
            name="promotion"
            checked={state.promotion}
            onChange={(e) =>
              setState({ ...state, promotion: e.target.checked })
            }
            className="mx-4"
          />
        </label>
        {state.promotion && (
          <div>
            <label>
              Precio en Promoción:
              <input
                type="number"
                name="promotionPrice"
                value={state.promotionPrice}
                onChange={(e) => handleInputChange(e, "text")}
                className="border border-[#139dba] mx-4 rounded-md"
              />
            </label>
            <label>
              Descripción de la Promoción:
              <input
                type="text"
                name="promotionDescription"
                value={state.promotionDescription}
                onChange={(e) => handleInputChange(e, "text")}
                className="border border-[#139dba] mx-4 rounded-md"
              />
            </label>
          </div>
        )}
        <label>
          Marca ID:
          <select
            name="brandId"
            value={state.brandId}
            onChange={(e) => handleInputChange(e, "text")}
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
        <button type="submit" className="p-4 bg-[#139dba] w-40 rounded-md">
          Agregar Producto
        </button>
      </div>
    </form>
  );
};

export default FormularioProducto;
