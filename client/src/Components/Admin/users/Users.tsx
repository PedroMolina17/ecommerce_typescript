import { keepPreviousData, useQuery } from "@tanstack/react-query";
import getAllUsers from "../../../api/user";
import TableUser from "./components/TableUser";
import UserSearchInput from "./components/UserSearchInput";
import ResponsivePagination from "react-responsive-pagination";
import usePagination from "../../../hooks/usePagination";
import PageSizeInput from "./components/PageSizeInput";
import RowSelector from "./components/RowSelector";
const Users = () => {
  const { handlePagination, pagination } = usePagination();
  const { data } = useQuery({
    queryKey: ["users", pagination],
    queryFn: async () =>
      await getAllUsers(pagination.pageIndex, pagination.pageSize),
    placeholderData: keepPreviousData,
  });

  return (
    <div className="py-3 px-3 flex flex-col gap-2">
      <h2 className="text-3xl font-bold text-slate-600">List of users</h2>
      <UserSearchInput />
      <div className=" w-full mt-1 flex flex-col gap-2">
        {data ? <TableUser data={data} /> : <p>cargando...</p>}
        <div className="flex items-center justify-between gap-1">
          <div className=" ">
            <RowSelector
              pagination={pagination}
              handlePagination={handlePagination}
            />
          </div>

          <div className="flex  items-center gap-1">
            <span className="text-sm text-slate-500">
              showing {`${data?.info.totalItems} of ${data?.info.count}`} users
            </span>
            <ResponsivePagination
              current={pagination.pageIndex}
              total={Math.ceil(data?.info.count! / pagination.pageSize)}
              onPageChange={(page) =>
                handlePagination({
                  ...pagination,
                  pageIndex: page,
                })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
