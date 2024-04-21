import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { CiCirclePlus } from "react-icons/ci";
import ResponsivePagination from "react-responsive-pagination";

import { getAllCategory } from "../../../api/category";
import { useDebounce } from "../../../hooks/useDebounce";
import usePagination from "../../../hooks/usePagination";
import { filterCategoriesByName } from "../../../utils/filterCategories";
import SearchInput from "../SearchInput";
import TableSkeleton from "../users/components/TableSkeleton";
import FormCreateCategory from "./components/FormCreateCategory";
import FormEditCategory from "./components/FormEditCategory";
import TableCategory from "./components/TableCategory";
import { useOpenFormStoreCategory } from "./store/useOpenForm.store";

const Category = () => {
  const { register, watch } = useForm();
  const { pagination, handlePagination } = usePagination();
  const { openForm, setOpenForm } = useOpenFormStoreCategory((state) => state);

  const { data } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => await getAllCategory(),
  });

  const searchTerms = useDebounce(watch("category"), 500);

  const filterData =
    data && searchTerms && searchTerms.length > 0
      ? filterCategoriesByName(data?.data, searchTerms)
      : data?.data;

  const paginateData =
    filterData &&
    filterData.slice(
      (pagination.pageIndex - 1) * 10,
      pagination.pageIndex * 10,
    );

  return (
    <div className="relative flex flex-col gap-3">
      <div className="sticky top-16 bg-bg z-20">
        <h2 className=" font-semibold text-white text-2xl mb-2 mt-3">
          Categories
        </h2>

        <div className="bg-bg py-1 px-0 flex justify-between shadow-md rounded-md">
          <SearchInput
            type="search"
            placeholder="Search category..."
            register={register("category")}
          />
          <button
            onClick={() => {
              setOpenForm("create");
            }}
            className="py-1 px-3 rounded-md bg-primary text-white flex items-center space-x-1"
          >
            <CiCirclePlus className="text-xl" />
            <span>Create Category</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col rounded-md shadow-md">
        <div className="flex flex-col justify-center items-center">
          {paginateData ? (
            <TableCategory data={paginateData} />
          ) : (
            <TableSkeleton />
          )}
          <div className="mt-4 w-full flex justify-center mb-10">
            {paginateData && (
              <ResponsivePagination
                current={pagination.pageIndex}
                onPageChange={(page) => {
                  handlePagination({ ...pagination, pageIndex: page });
                }}
                total={Math.ceil((filterData.length || 1) / 10)}
              />
            )}
          </div>
        </div>
      </div>

      {openForm.create && (
        <div className="fixed inset-0 flex justify-center items-center left-0 top-0 z-50 transition-opacity duration-300 bg-gray-200/75 dark:bg-gray-800/75">
          <FormCreateCategory />
        </div>
      )}

      {openForm.edit && (
        <div className="fixed inset-0 flex justify-center items-center left-0 top-0 z-50 transition-opacity duration-300 bg-gray-200/75 dark:bg-gray-800/75">
          <FormEditCategory />
        </div>
      )}
    </div>
  );
};
export default Category;
