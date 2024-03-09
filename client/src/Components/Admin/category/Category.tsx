import { useQuery } from "@tanstack/react-query";
import SearchInput from "../SearchInput";
import { useForm } from "react-hook-form";
import TableCategory from "./components/TableCategory";
import ResponsivePagination from "react-responsive-pagination";
import usePagination from "../../../hooks/usePagination";
import { getAllCategory } from "../../../api/category";
import TableSkeleton from "../users/components/TableSkeleton";
import FormCreateCategory from "./components/FormCreateCategory";
import { useOpenFormStore } from "./store/useOpenForm.store";

const Category = () => {
  const { register } = useForm();
  const { pagination, handlePagination } = usePagination();
  const { openForm,setOpenForm } = useOpenFormStore((state) => state);
  const { data } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => await getAllCategory(),
  });
  const paginateData = data?.data?.slice(
    (pagination.pageIndex - 1) * 10,
    pagination.pageIndex * 10
  );

  return (
    <div className="flex flex-col gap-3">
      <h2 className=" font-bold text-white">Categories</h2>
      {
        <div className="bg-bg py-1 px-0 flex justify-between shadow-md rounded-md">
          <SearchInput
            type="search"
            placeholder="Search category..."
            register={register("category")}
          />
          <div></div>
          <button onClick={()=>{setOpenForm("create")}} className="py-1 px-3 rounded-md bg-primary text-white">
            Create new category
          </button>
        </div>
      }
      <div className="flex flex-col    rounded-md shadow-md">
        <div className="  flex flex-col justify-center items-center">
          {paginateData ? (
            <TableCategory data={paginateData} />
          ) : (
            <TableSkeleton />
          )}
          <div className="m-2 w-full flex justify-center">
            <ResponsivePagination
              current={pagination.pageIndex}
              onPageChange={(page) => {
                handlePagination({ ...pagination, pageIndex: page });
              }}
              total={Math.ceil((data?.data?.length || 1) / 10)}
            />
          </div>
        </div>
      </div>
      {openForm.create && <div className="absolute  top-0 left-0 w-full h-screen bg-[#00000080] z-50 flex items-center justify-center">
        <FormCreateCategory />
      </div>}
      
    </div>
  );
};
export default Category;
