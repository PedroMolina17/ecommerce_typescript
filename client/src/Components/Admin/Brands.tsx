import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
type FormValues = {
  name: string;
};

const Brands: React.FC = () => {
  const { handleSubmit, register, reset } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:3500/api/brand/create-brand",
        data,
      );
      console.log(response);
      toast.success("Producto añadido!");
      reset();
    } catch (error) {
      console.error("Se produjo un error. Inténtalo de nuevo más tarde.");
      toast.error("ERROR");
    }
  };
  return (
    <div className="m-8">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col p-5 gap-6">
          <label>
            Nombre de la marca:
            <input
              type="text"
              {...register("name")}
              className="border border-[#455591] mx-4 rounded-md p-2  "
            />
          </label>{" "}
          <button
            type="submit"
            className="p-3 bg-[#455591] w-40 rounded-md text-white font-bold  text-lg "
          >
            Agregar
          </button>
          <ToastContainer />
        </div>
      </form>
    </div>
  );
};

export default Brands;
