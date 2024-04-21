import Input from "../../../ui/Input";
import { IoMdClose } from "react-icons/io";
import { useOpenFormStore } from "../store/useOpenForm.store";
import { useMutation } from "@tanstack/react-query";
import { updateUserById } from "../../../../api/user";
import { useForm } from "react-hook-form";
import { useRowValueStore } from "../store/useRowValue.store";
import { MySwal } from "./ButtonsActionTable";
import { queryClient } from "../../../../main";
interface FormValues {
  userName: string;
  email: string;
  role: string;
}
const FormUpdateUser = () => {
  const role = ["admin", "user"];
  const { setOpenForm } = useOpenFormStore((state) => state);
  const { rowValue } = useRowValueStore((state) => state);
  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: { userName: "", email: "", role: "" },
  });
  const mutation = useMutation({
    mutationFn: async (data: { id: number; data: FormValues }) => {
      return await updateUserById(data.id, data.data);
    },
    onSuccess: (data) => {
      MySwal.fire({
        title: "Success!",
        text: data.message,
        icon: "success",
        confirmButtonText: "OK",
      });
      setOpenForm(false);
      queryClient.refetchQueries({ queryKey: ["users"] });
    },
  });
  const onSubmit = handleSubmit((data: FormValues) => {
    mutation.mutate({ id: rowValue.id, data });
  });

  return (
    <div className="absolute p-5 shadow-lg min-w-80 flex mt-3 mx-3 flex-col right-0 top-0 rounded-md bg-white">
      <button
        onClick={() => setOpenForm(false)}
        className="text-white  shadow-md  p-1.5 rounded-full bg-slate-400 self-end"
      >
        <IoMdClose />
      </button>
      <h2 className="text-2xl font-bold mb-1 text-slate-600">
        {rowValue.userName}
      </h2>
      <form action="" onSubmit={onSubmit} className="gap-4 flex flex-col">
        <Input
          type="text"
          className="border rounded-md py-1 px-2 w-full"
          labelText="Name"
          labelClass="text-slate-600 text-sm"
          register={register("userName")}
        />

        <Input
          type="text"
          className="border rounded-md py-1 px-2 w-full"
          labelText="Email"
          labelClass="text-slate-600 text-sm"
          register={register("email")}
        />
        <div>
          <label htmlFor="" className="text-slate-600 text-sm">
            Role
          </label>
          <select
            id=""
            {...register("role")}
            className="w-full border bg-white text-sm text-slate-600 rounded-md py-2 px-2"
          >
            <option value="" disabled key="placeholder">
              select role
            </option>
            {role.map((role) => (
              <option value={role} key={role}>
                {role}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-2 justify-end">
          <button
            onClick={() => setOpenForm(false)}
            className="px-6 py-1  rounded-md border border-red-400 text-red-400 "
          >
            cancel
          </button>
          <button className="px-6 py-1 rounded-md  bg-red-400 hover:bg-red-500 text-white">
            {" "}
            update
          </button>
        </div>
      </form>
    </div>
  );
};
export default FormUpdateUser;
