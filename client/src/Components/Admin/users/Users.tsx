import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import ResponsivePagination from "react-responsive-pagination";

import { getAllUsers, getUserByName } from "../../../api/user";
import { useDebounce } from "../../../hooks/useDebounce";
import usePagination from "../../../hooks/usePagination";
import SearchInput from "../SearchInput";
import FormUpdateUser from "./components/FormUpdateUser";
import RowSelector from "./components/RowSelector";
import TableSkeleton from "./components/TableSkeleton";
import TableUser from "./components/TableUser";
import { useOpenFormStore } from "./store/useOpenForm.store";

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
      <div className="w-full bg-primary px-4 py-2 rounded-md">
        <div className="flex flex-col w-full sticky top-16 ">
          <div className="flex items-center justify-between bg-primary w-full h-20 ">
            <h2 className="font-semibold text-white text-2xl">List of users</h2>
            <SearchInput
              register={register("search")}
              placeholder="Search user..."
            />
          </div>
        </div>

        <section className=" w-full bg-primary flex-col gap-2 ">
          {data ? <TableUser data={data} /> : <TableSkeleton />}

          <div className="flex items-center justify-between gap-1 mb-7">
            <div>
              <RowSelector
                pagination={pagination}
                handlePagination={handlePagination}
              />
            </div>

            {data && (
              <div className="flex items-center gap-1">
                <span className="text-sm text-slate-500">
                  showing {`${data.info.totalItems} of ${data.info.count}`}{" "}
                  users
                </span>
                <ResponsivePagination
                  className="flex bg-[#111827]"
                  activeItemClassName="bg-[#272743]"
                  current={pagination.pageIndex}
                  total={Math.ceil(data.info.count! / pagination.pageSize)}
                  onPageChange={(page) => {
                    handlePagination({
                      ...pagination,
                      pageIndex: page,
                    });
                  }}
                />
              </div>
            )}
          </div>
        </section>
      </div>

      {openForm && (
        <div className="absolute  top-0 left-0 w-full h-screen bg-[#00000080] z-50 flex items-center justify-center">
          <FormUpdateUser />
        </div>
      )}
    </>
  );
};

export default Users;
