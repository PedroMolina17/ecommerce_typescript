import { useEffect } from "react";

import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { login } from "@/api/auth";
import Logo from "@/assets/logo.jpeg";
import Input from "@ui/Input";

interface FormValue {
  email: string;
  password: string;
}

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm<FormValue>({
    defaultValues: { email: "admin@example.com", password: "password" },
  });

  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: (data: FormValue) => login(data),
    onSuccess: () => {
      navigate("/dashboard");
    },
    onError: (error) => {
      toast.error("Please, check your email and password and try again.", {
        position: "top-center",
        autoClose: 2000,
        theme: "light",
      });
      console.error(error);
    },
  });

  const onSubmit = handleSubmit((values) => {
    loginMutation.mutate(values);
  });

  useEffect(() => {
    setFocus("email");
  }, [setFocus]);

  return (
    <>
      <section className="bg-bg min-h-screen flex items-center justify-center w-full">
        <div className="bg-[#455591] flex rounded-2xl shadow-lg items-center overflow-hidden">
          <div className="md:w-1/2 px-16 mr-4">
            <h2 className="text-white text-3xl text-center font-bold">
              Sign In
            </h2>

            <p className="text-sm mt-4 text-white text-center">
              Get access to your account
            </p>

            <form onSubmit={onSubmit} className="flex flex-col mt-5">
              <Input
                type="email"
                className={`bg-gray-50 border border-gray-400 rounded-md block w-full py-1 px-2 outline-none focus:ring-2 ${
                  errors?.password
                    ? "focus:border-red-300 focus:ring-red-300"
                    : "focus:ring-blue-300 focus:border-blue-300"
                }`}
                labelText="Email"
                labelClass="text-white text-sm"
                placeholder="Email"
                register={register("email", {
                  required: {
                    value: true,
                    message: "Please fill out this field",
                  },
                })}
              />
              {errors.email && (
                <span className="text-white">{errors.email.message}</span>
              )}

              <Input
                type="password"
                className={`bg-gray-50 border border-gray-400 rounded-md block w-full py-1 px-2 outline-none focus:ring-2 ${
                  errors?.password
                    ? "focus:border-red-300 focus:ring-red-300"
                    : "focus:ring-blue-300 focus:border-blue-300"
                }`}
                labelText="Password"
                labelClass="text-white text-sm mt-4"
                register={register("password", {
                  required: {
                    value: true,
                    message: "Please fill out this field",
                  },
                })}
              />
              {errors.password && (
                <span className="text-white">{errors.password.message}</span>
              )}

              <button
                className="bg-[#f97f63] rounded-md text-white py-1.5 font-semibold mt-10 hover:bg-[#e6917e] hover:scale-105 duration-300"
                type="submit"
              >
                Sign In
              </button>
            </form>
          </div>
          <div className="md:block hidden ">
            <img src={Logo} className="rounded-l-[150px]" alt="logo" />
          </div>
        </div>
      </section>

      <ToastContainer />
    </>
  );
};

export default Login;
