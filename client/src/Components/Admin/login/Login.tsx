import React, { useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import Logo from "@/assets/logo.jpeg";
import { Input } from "./Input";
import { ILogin } from "@/types/auth.type";
import { login } from "@/api/auth";

const Login = () => {
  const [valueForm, setValueForm] = useState<ILogin>({
    email: "admin@example.com",
    password: "password",
  });

  const navigate = useNavigate();

  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { value, name } = e.currentTarget;

    setValueForm({
      ...valueForm,
      [name]: value,
    });
  };

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (valueForm.email.length == 0) {
        toast.error("Escriba un correo", {
          position: "top-center",
        });
      }
      if (valueForm.password.length == 0) {
        toast.error("Escriba una contraseña", {
          position: "top-center",
        });
      }

      const response = await login(valueForm);
      console.log(response);

      if (response.status == 200 && response.statusText == "OK") {
        toast.success("Iniciando sesión con éxito!", {
          position: "top-center",
        });
        navigate("/dashboard");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="bg-gray-50 min-h-screen flex items-center justify-center w-full ">
      <ToastContainer />
      <div className="bg-[#455591] flex rounded-[50px] shadow-lg p-5 items-center">
        <div className="md:w-1/2 px-16 mr-2 -mt-12">
          <h2 className="text-white text-3xl">Iniciar Sesión</h2>
          <p className="text-sm mt-4 text-white">
            Si eres administrador, porfavor inicie sesión
          </p>
          <form onSubmit={handleOnSubmit} className="flex flex-col gap-4 mt-14">
            <Input
              placeholder="Escriba su correo"
              type="email"
              name="email"
              onChange={handleOnChange}
              value={valueForm.email}
            />
            <Input
              placeholder="Escriba su contraseña"
              type="password"
              name="password"
              onChange={handleOnChange}
              value={valueForm.password}
            />
            <button
              className="bg-[#f97f63] rounded-3xl text-white py-2 mt-10 hover:bg-[#e6917e] hover:scale-105 duration-300"
              type="submit"
            >
              Iniciar
            </button>
          </form>
        </div>
        <div className="md:block w-96 hidden rounded-3xl">
          <img src={Logo} alt="" className="rounded-2xl" />
        </div>
      </div>
    </section>
  );
};

export default Login;
