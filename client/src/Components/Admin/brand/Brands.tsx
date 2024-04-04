import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import ResponsivePagination from "react-responsive-pagination";

import { getAllBrands } from "../../../api/brands";
import { useDebounce } from "../../../hooks/useDebounce";
import usePagination from "../../../hooks/usePagination";
import { filterBrandByName } from "../../../utils/filterBrands";
import SearchInput from "../SearchInput";
import { useOpenFormStoreCategory } from "../category/store/useOpenForm.store";
import TableSkeleton from "../users/components/TableSkeleton";
import FormCreateBrand from "./components/FormCreateBrand";
import TableBrands from "./components/TableBrand";

const Brand = () => {
  const { register, watch } = useForm();
  const { pagination, handlePagination } = usePagination();
  const { openForm, setOpenForm } = useOpenFormStoreCategory((state) => state);

  const { data } = useQuery({
    queryKey: ["brands"],
    queryFn: async () => await getAllBrands(),
  });

  const searchTerms = useDebounce(watch("brand"), 500);
  const filterData =
    data && searchTerms && searchTerms.length > 0
      ? filterBrandByName(data?.data, searchTerms)
      : data?.data;

  const paginateData =
    filterData &&
    filterData.slice(
      (pagination.pageIndex - 1) * 10,
      pagination.pageIndex * 10
    );

  return (
    <div className="relative flex flex-col gap-3">
      <div className="sticky top-16 bg-bg z-20">
        <h2 className="font-semibold text-white text-2xl mt-3">Brands</h2>

        <div className="bg-bg py-1 px-0 flex justify-between shadow-md rounded-md">
          <SearchInput
            type="search"
            placeholder="Search brand..."
            register={register("brand")}
          />
          <button
            onClick={() => {
              setOpenForm("create");
            }}
            className="py-1 px-3 rounded-md bg-primary text-white"
          >
            Create new brand
          </button>
        </div>
      </div>

      <div className="flex flex-col    rounded-md shadow-md">
        <div className="  flex flex-col justify-center items-center">
          {paginateData ? (
            <TableBrands data={paginateData} />
          ) : (
            <TableSkeleton />
          )}
          <div className="m-2 w-full flex justify-center mt-4 mb-10">
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
        <div className="fixed inset-0   flex justify-center items-center left-0 top-0 z-50 transition-opacity duration-300 bg-gray-200/75 dark:bg-gray-800/75">
          <FormCreateBrand />
        </div>
      )}
    </div>
  );
};
export default Brand;
