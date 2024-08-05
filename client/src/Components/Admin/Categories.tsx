import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

import { useEffect, useState } from "react";

type FormValues = {
  name: string;
};

type Category = {
  id: number;
  name: string;
};

const Categories: React.FC = () => {
  const { handleSubmit, register, reset } = useForm<FormValues>();
  const [categories, setCategories] = useState<Category[]>([]);
  const url = import.meta.env.VITE_URL_FRONTEND;

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    axios
      .get(`${url}/api/category/categories`)
      .then((response) => {
        const responseData = response.data;
        const sortedCategories = responseData.data.sort(
          (a: Category, b: Category) => a.id - b.id
        );
        setCategories(sortedCategories);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const response = await axios.post(
        `${url}/api/category/create-category`,
        data
      );
      console.log("Server response:", response.data);
      toast.success("Categoria añadida");
      fetchCategories();

      reset();
    } catch (error) {
      console.error("Se produjo un error. Inténtalo de nuevo más tarde.");
      toast.error("ERROR");
    }
  };

  const handleDelete = async (categoryId: number) => {
    try {
      await axios.delete(`${url}/api/category/delete-category/${categoryId}`);
      toast.success("Categoria eliminada");
      fetchCategories();
    } catch (error) {
      console.error("Se produjo un error al eliminar la categoría:", error);
      toast.error("Error al eliminar la categoría");
    }
  };

  return (
    <div className="m-8">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col p-5 gap-6 ">
          <label>
            Nombre de la categoria:
            <input
              type="text"
              {...register("name")}
              className="border border-[#455591] mx-4 rounded-md p-2"
            />
          </label>
          <button
            type="submit"
            className="p-3 bg-[#455591] w-40 rounded-md text-white font-bold  text-lg"
          >
            Agregar
          </button>
          <ToastContainer />
        </div>
      </form>
      <div className="rounded-tr-md text-black">
        <h2>Lista de Categorías</h2>
        <table className="w-full text-xl border">
          <thead className="bg-[#455591] h-16 mr-9 text-white">
            <tr>
              <th className="text-center ">ID</th>
              <th className="text-center">Nombre</th>
              <th className="text-center ">Accion</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr
                key={category.id}
                className={`h-12 ${index % 2 === 0 ? "bg-[#e4ebf5]" : ""}`}
              >
                <td className="text-center">{category.id}</td>
                <td className="text-center">{category.name}</td>
                <td className="flex items-center justify-end h-12 mr-4 ">
                  <div className="flex gap-4 text-white ">
                    <button className="flex items-center  bg-yellow-500 rounded-md px-2 py-1 gap-1">
                      <MdEdit />
                      Editar
                    </button>

                    <button
                      className="flex items-center bg-red-500 rounded-md px-2 py-1 justify-end gap-1"
                      onClick={() => handleDelete(category.id)}
                    >
                      <FaTrashAlt /> Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Categories;
