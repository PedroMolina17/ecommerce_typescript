import {
  FaUser,
  FaKey,
  FaMapMarkerAlt,
  FaFacebook,
  FaGoogle,
  FaTwitter,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { MdSmartphone } from "react-icons/md";
import axios from "axios";
import { useForm } from "react-hook-form";
const SingUp = () => {
  interface FormData {
    userName: string;
    email: string;
    password: string;
    direction: string;
    cellphone: string;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  console.log(errors);

  const onSubmit = async (data: FormData) => {
    console.log(data);
    try {
      const response = await axios.post(
        "http://localhost:3500/api/auth/register",
        {
          userName: data.userName,
          email: data.email,
          password: data.password,
        },
      );

      console.log("Registro exitoso:", response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error al registrar:", error.response?.data);
      } else {
        console.error("Error inesperado al registrar:", error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-center">
        <div className="mx-4 w-5/6 min-w-96   my-12 rounded-xl max-md:mx-0 shadow-2xl  shadow-[#0097a6] ">
          <div className="grid  grid-cols-2 items-center max-md:grid-cols-1 rounded-tl-xl rounded-bl-xl  max-md:py-8">
            <div className="flex justify-center items-center py-8  ">
              <div className="col col-span-1 flex  flex-col gap-4  y-16 justify-center items-center  mx-4 min-w-8 w-96">
                <p className="font-bold text-2xl">Registro de Usuario</p>
                <div className="flex flex-col w-full  mx-4">
                  <div className="group focus-within:border-2 focus-within:border-[#0097a6]   flex items-center rounded-md border-2   min-w-32 w-full">
                    <div className="p-2 text-[#0097a6] ">
                      <FaUser />
                    </div>
                    <input
                      placeholder="User Name"
                      className=" p-2 focus:outline-none w-full rounded-md  "
                      type="text"
                      id="userName"
                      {...register("userName", {
                        required: {
                          value: true,
                          message: "Nombre es requerido",
                        },
                        minLength: {
                          value: 2,
                          message: "Nombre debe tener al menos 2 caracteres",
                        },
                        maxLength: {
                          value: 20,
                          message: "Nombre debe tener menos de 20 caracteres",
                        },
                      })}
                    />
                  </div>
                  {errors.userName?.type && (
                    <span className="text-red-500 text-sm">
                      {errors.userName.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col w-full  mx-4">
                  <div className="group focus-within:border-2 focus-within:border-[#0097a6] min-w-32 w-full flex items-center rounded-md  border-2 ">
                    <div className="p-2 text-[#0097a6] ">
                      <MdEmail />
                    </div>
                    <input
                      placeholder="Email"
                      className=" p-2 focus:outline-none w-full rounded-md "
                      id="email"
                      type="text"
                      {...register("email", {
                        required: {
                          value: true,
                          message: "Email es requerido",
                        },
                        pattern: {
                          value:
                            /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                          message: "Email no valido",
                        },
                      })}
                    />
                  </div>{" "}
                  {errors.email?.type && (
                    <span className="text-red-500 text-sm">
                      {errors.email.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col w-full  mx-4">
                  <div className="group focus-within:border-2 focus-within:border-[#0097a6] min-w-32 w-full flex items-center rounded-md  border-2 ">
                    <div className="p-2 text-[#0097a6] ">
                      <FaKey />
                    </div>
                    <input
                      id="password"
                      placeholder="Password"
                      type="password"
                      className=" p-2 focus:outline-none w-full rounded-md "
                      {...register("password", {
                        required: {
                          value: true,
                          message: "Password es requerido",
                        },
                      })}
                    />
                  </div>
                  {errors.password?.type && (
                    <span className="text-red-500 text-sm">
                      {errors.password.message}
                    </span>
                  )}
                </div>{" "}
                <div className="flex flex-col w-full  mx-4">
                  <div className="group focus-within:border-2 focus-within:border-[#0097a6] min-w-32 w-full flex items-center rounded-md    border-2 ">
                    <div className="p-2 text-[#0097a6] ">
                      <FaMapMarkerAlt />
                    </div>
                    <input
                      id="direction"
                      placeholder="Direccion"
                      type="text"
                      className=" p-2 focus:outline-none w-full rounded-md "
                      {...register("direction", {
                        required: {
                          value: true,
                          message: "Direccion es requerido",
                        },
                      })}
                    />
                  </div>{" "}
                  {errors.direction?.type && (
                    <span className="text-red-500 text-sm">
                      {errors.direction.message}
                    </span>
                  )}
                </div>{" "}
                <div className="flex flex-col w-full  mx-4">
                  <div className="group focus-within:border-2 focus-within:border-[#0097a6] min-w-32 w-full flex items-center rounded-md  border-2 ">
                    <div className="p-2 text-[#0097a6] ">
                      <MdSmartphone />
                    </div>
                    <input
                      id="cellphone"
                      placeholder="N° Celular"
                      type="text"
                      className=" p-2 focus:outline-none w-full rounded-md "
                      {...register("cellphone", {
                        required: {
                          value: true,
                          message: "Cellphone es requerido",
                        },
                      })}
                    />
                  </div>{" "}
                  {errors.cellphone?.type && (
                    <span className="text-red-500 text-sm">
                      {errors.cellphone.message}
                    </span>
                  )}
                </div>
                <button
                  className="p-2 bg-gradient-to-tr from-[#139dba] to-[#68baca] rounded-md min-w-32 w-full "
                  type="submit"
                >
                  Crear Cuenta
                </button>
                <div className="flex gap-4 items-center">
                  <input type="checkbox" placeholder="Acepto" />
                  Acepto los terminos
                </div>
                Ya tienes una cuenta? Login
              </div>
            </div>
            <div className=" py-8 bg-gradient-to-tr from-[#139dba] to-[#68baca] text-white h-full flex justify-center items-center rounded-tr-xl rounded-br-xl max-md:mx-7 max-md:rounded-tl-xl max-md:rounded-bl-xl">
              <div className="flex flex-col gap-8 min-w-28 w-96 mx-4">
                <p className="text-2xl text-center">Iniciar Sesion con:</p>
                <div className="bg-[#3b5999] text-xl  flex items-center gap-3 px-2 rounded-md h-12 justify-center max-md:text-lg">
                  <FaFacebook />
                  Acceder con Facebook
                </div>
                <div className="bg-[#d64840] text-xl  flex items-center gap-3 px-2  rounded-md h-12 justify-center">
                  <FaGoogle />
                  Acceder con Google
                </div>
                <div className="bg-[#55acef] text-xl  flex items-center gap-3 px-2 rounded-md h-12 justify-center">
                  <FaTwitter />
                  Acceder con Twitter
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SingUp;
