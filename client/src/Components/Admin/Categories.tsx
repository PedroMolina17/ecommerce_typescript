import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
type FormValues = {
  name: string;
};

const Categories: React.FC = () => {
  const { handleSubmit, register, reset } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:3500/api/category/create-category",
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
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col p-5 gap-6">
          <label>
            Nombre de la categoria:
            <input
              type="text"
              {...register("name")}
              className="border border-[#139dba] mx-4 rounded-md"
            />
          </label>
          <button type="submit" className="p-4 bg-[#139dba] w-40 rounded-md">
            Agregar
          </button>
          <ToastContainer />
        </div>
      </form>
    </div>
  );
};

export default Categories;
