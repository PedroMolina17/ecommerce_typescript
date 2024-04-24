import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import { queryClient } from "@/main";
import Input from "@ui/Input";
import { createBrand } from "../../../../api/brands";
import { IResponseCreateBrand } from "../../../../types/brands.type";
import ButtonClose from "../../../ui/ButtonClose";
import { useOpenFormStoreCategory } from "../../category/store/useOpenForm.store";
import { MySwal } from "../../users/components/ButtonsActionTable";

interface FormValues {
  name: string;
}

const FormCreateBrand = () => {
  const { setOpenForm } = useOpenFormStoreCategory((state) => state);
  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      name: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: FormValues) => await createBrand(data),
    onSuccess: (data: IResponseCreateBrand) => {
      MySwal.fire({
        title: "Success!",
        text: data.message,
        icon: "success",
        confirmButtonText: "OK",
      });
      setOpenForm("create");
      queryClient.refetchQueries({ queryKey: ["brands"] });
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
        <h2 className="  font-bold text-white ">New Brand</h2>
        <p className="text-gray-400 text-sm mt-1">
          Add a new brand to your database
        </p>
      </div>

      <form onSubmit={onSubmit}>
        <Input
          type="text"
          placeholder="name brand"
          labelText="Name brand"
          labelClass="text-white"
          className="relative block w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0 form-input rounded-md placeholder-gray-400 dark:placeholder-gray-500 text-sm px-2.5 py-1.5 shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 "
          register={register("name")}
        />
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

export default FormCreateBrand;
