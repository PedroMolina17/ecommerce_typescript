import Input from "../../../ui/Input";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { createCategory } from "../../../../api/category";
import { IResponseCreateCategory } from "../../../../types/category.type";
import { MySwal } from "../../users/components/ButtonsActionTable";
import { queryClient } from "../../../../App";
import ButtonClose from "../../../ui/ButtonClose";
import { useOpenFormStore } from "../store/useOpenForm.store";
interface FormValues {
  name: string;
}
const FormCreateCategory = () => {
  const { setOpenForm,openForm } = useOpenFormStore((state) => state);
  const { register, handleSubmit } = useForm<FormValues>({
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
  console.log("-->",openForm);
  return (
    <div className="w-96 p-4 flex border border-primary flex-col gap-4 shadow-md bg-white rounded-md">
      <ButtonClose
        onClick={() => setOpenForm("create")}
        className="text-white hover:bg-primary shadow-md  p-1.5 rounded-full bg-slate-400 self-end"
      />
      <h2 className="text-3xl pb-1 border-b border-slate-400 font-bold text-slate-600">
        Add New Category
      </h2>
      <form onSubmit={onSubmit}>
        <Input
          type="text"
          placeholder="name category"
          labelText="name"
          labelClass="text-primary"
          className="p-2 border  rounded-md outline-primary"
          register={register("name")}
        />
        <div className="flex gap-2 justify-end mt-4">
          <button
          type="button"
            onClick={() => setOpenForm("create")}
            className="border border-primary text-primary px-6 py-2 rounded-md"
          >
            cancel
          </button>
          <button className="bg-primary text-white px-6 py-2 rounded-md">
            Create
          </button>
        </div>
      </form>
    </div>
  );
};
export default FormCreateCategory;
