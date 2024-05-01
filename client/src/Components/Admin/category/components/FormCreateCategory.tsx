import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import { createCategory } from "@/api/category";
import { queryClient } from "@/main";
import { IResponseCreateCategory } from "@/types/category.type";
import ButtonClose from "@ui/ButtonClose";
import Input from "@ui/Input";
import { MySwal } from "../../users/components/ButtonsActionTable";
import { useOpenFormStoreCategory } from "../store/useOpenForm.store";

interface FormValues {
  name: string;
}

const FormCreateCategory = () => {
  const { setOpenForm } = useOpenFormStoreCategory((state) => state);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: FormValues) => await createCategory(data),
    onSuccess: (data: IResponseCreateCategory) => {
      MySwal.fire({
        title: "Success!",
        text: data.message,
        icon: "success",
        confirmButtonText: "OK",
      });
      setOpenForm("create");
      queryClient.refetchQueries({ queryKey: ["categories"] });
    },
  });

  const onSubmit = handleSubmit((data: FormValues) => {
    mutation.mutate(data);
  });

  return (
    <div className="w-96 p-4 flex flex-col gap-4 shadow-md bg-bg rounded-md">
      <ButtonClose
        onClick={() => setOpenForm("create")}
        className="focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 font-medium rounded-md text-sm gap-x-1.5 p-1.5 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 inline-flex items-center self-end"
      />
      <div>
        <h2 className="  font-bold text-white ">New Category</h2>
        <p className="text-gray-400 text-sm mt-1">
          Add a new category to your database
        </p>
      </div>

      <form onSubmit={onSubmit}>
        <Input
          type="text"
          placeholder="name category"
          labelText="Name category"
          labelClass="text-white"
          className={`relative block w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0 form-input rounded-md placeholder-gray-400 dark:placeholder-gray-500 text-sm px-2.5 py-1.5 shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 ${
            errors.name
              ? "focus:border-red-300 focus:ring-red-300"
              : "focus:ring-blue-300 focus:border-blue-300"
          }`}
          register={register("name", {
            required: {
              value: true,
              message: "Please fill out this field",
            },
          })}
        />
        {errors.name && (
          <span className="text-white">{errors.name.message}</span>
        )}

        <div className="flex gap-2 justify-end mt-4">
          <button
            type="button"
            onClick={() => setOpenForm("create")}
            className="focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 font-medium rounded-md text-sm gap-x-1.5 px-2.5 py-1.5 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 inline-flex items-center"
          >
            cancel
          </button>
          <button className="focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 font-medium rounded-md text-sm gap-x-1.5 px-2.5 py-1.5 shadow-sm text-white dark:text-gray-900 bg-gray-900 hover:bg-gray-800 disabled:bg-gray-900 dark:bg-white dark:hover:bg-gray-100 dark:disabled:bg-white focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 inline-flex items-center">
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormCreateCategory;
