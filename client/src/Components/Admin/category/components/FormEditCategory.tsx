import React from "react";

import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { IoMdClose } from "react-icons/io";

import { updateCategory } from "../../../../api/category";
import { queryClient } from "../../../../main";
import Input from "../../../ui/Input";
import { useOpenFormStoreCategory } from "../store/useOpenForm.store";
import { useRowValueStore } from "../store/useRowValue.store";
import { MySwal } from "./ButtonsActionTable";

interface FormValue {
  name: string;
}

const FormEditCategory = () => {
  const { setOpenForm } = useOpenFormStoreCategory((state) => state);
  const { rowValue } = useRowValueStore((state) => state);

  const { register, handleSubmit, setFocus } = useForm<FormValue>({
    defaultValues: { name: rowValue.name },
  });

  const mutation = useMutation({
    mutationFn: async (data: { id: number; name: FormValue }) => {
      return await updateCategory(data.id, data.name);
    },
    onSuccess: (data) => {
      MySwal.fire({
        title: "Success!",
        text: data.message,
        icon: "success",
        confirmButtonText: "OK",
      });
      setOpenForm("edit");
      queryClient.refetchQueries({ queryKey: ["categories"] });
    },
  });

  const onSubmit = handleSubmit((name) => {
    mutation.mutate({ id: rowValue.id, name });
  });

  React.useEffect(() => {
    setFocus("name");
  }, [setFocus]);

  return (
    <div className="w-96 p-4 flex flex-col gap-4 shadow-md rounded-md bg-white">
      <div className="flex items-center">
        <h2 className="text-2xl font-semibold flex-1">Edit Category</h2>
        <button
          onClick={() => setOpenForm("edit")}
          className="text-white shadow-md p-1.5 rounded-full bg-slate-400"
        >
          <IoMdClose />
        </button>
      </div>

      <form onSubmit={onSubmit} className="gap-11 flex flex-col">
        <Input
          type="text"
          className="bg-gray-50 border border-gray-400 rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-300 block w-full py-1 px-2 outline-none"
          labelText="Name"
          labelClass="text-slate-600 text-sm"
          register={register("name")}
        />

        <div className="flex gap-2 justify-center">
          <button
            onClick={() => setOpenForm("edit")}
            className="px-6 py-1  rounded-md border border-red-400 text-red-400 hover:border-red-500 hover:text-red-500"
          >
            Cancel
          </button>

          <button className="px-6 py-1 rounded-md bg-green-600 hover:bg-green-700 text-white">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};
export default FormEditCategory;
