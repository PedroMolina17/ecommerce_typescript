import { useQuery } from "@tanstack/react-query";
import SearchInput from "../SearchInput";
import { useForm } from "react-hook-form";
import TableCategory from "./components/TableCategory";

const Category = () => {
  const { register } = useForm();
  const { data } = useQuery({
    queryKey: ["category"],
    queryFn: () => {
      return;
    },
  });
  return (
    <div>
      <h2 className="text-3xl font-bold text-slate-600">Categories</h2>
      <div className="bg-white p-4 shadow-md rounded-md">
        <SearchInput
        type="search"
          placeholder="Search category..."
          register={register("category")}
        />
      </div>
      <div>
        
        <TableCategory/>
      </div>
    </div>
  );
};
export default Category;
