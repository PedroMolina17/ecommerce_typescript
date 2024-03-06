import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getAllUsers, getUserByName } from "../../../api/user";
import TableUser from "./components/TableUser";
import SearchInput from "../SearchInput";
import ResponsivePagination from "react-responsive-pagination";
import usePagination from "../../../hooks/usePagination";
import RowSelector from "./components/RowSelector";
import { useForm } from "react-hook-form";
import { useDebounce } from "../../../hooks/useDebounce";
import FormUpdateUser from "./components/FormUpdateUser";
import { useOpenFormStore } from "./store/useOpenForm.store";
import TableSkeleton from "./components/TableSkeleton";

const Users = () => {
  const { handlePagination, pagination } = usePagination();
  const { openForm } = useOpenFormStore((state) => state);
  const { watch, register } = useForm({ defaultValues: { search: "" } });
  const watchSearch = useDebounce(watch("search"), 500);

  const { data } = useQuery({
    queryKey: ["users", pagination, watchSearch],
    queryFn: async () => {
      if (watchSearch !== "") {
        handlePagination({ pageIndex: 1, pageSize: 10 });

        return await getUserByName(
          pagination.pageIndex,
          pagination.pageSize,
          watchSearch
        );
      }
      if (watchSearch === "") {
        return await getAllUsers(pagination.pageIndex, pagination.pageSize);
      }
    },
    placeholderData: keepPreviousData,
  });

  return (
    <>
      <div className="relative flex w-full flex-col gap-2">
        <h2 className="text-3xl font-bold text-slate-600">List of users</h2>
        <SearchInput register={register("search")} />
        <section className=" w-full mt-1 flex flex-col gap-2">
          {data ? (
            <TableUser data={data} />
          ) : (
            <TableSkeleton/>
          )}

          <div className="flex items-center justify-between gap-1">
            <div className=" ">
              <RowSelector
                pagination={pagination}
                handlePagination={handlePagination}
              />
            </div>

            <div className="flex  items-center gap-1">
              <span className="text-sm text-slate-500">
                showing {`${data?.info.totalItems} of ${data?.info.count}`}{" "}
                users
              </span>
              <ResponsivePagination
                current={pagination.pageIndex}
                total={Math.ceil(data?.info.count! / pagination.pageSize)}
                onPageChange={(page) => {
                  handlePagination({
                    ...pagination,
                    pageIndex: page,
                  });
                }}
              />
            </div>
          </div>
        </section>
      </div>
      {openForm && (
        <div className="absolute top-0 left-0 w-full h-screen bg-[#00000080] z-50 flex items-center justify-center">
          <FormUpdateUser />
        </div>
      )}
    </>
  );
};

export default Users;
