import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { MdPersonSearch } from "react-icons/md";
import getAllUsers from "../../../api/user";
import ResponsivePagination from "react-responsive-pagination";
import {
  PaginationState,
  useReactTable,
  getCoreRowModel,
  flexRender,
  Cell,
} from "@tanstack/react-table";
import { useState } from "react";

const Users = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 1,
    pageSize: 10,
  });

  const { register } = useForm();
  const columns = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "userName",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },

    {
      accessorKey: "googleId",
      header: "Google Id",
      cell: ({ cell }: any) => (
        <span>
          {!cell.getValue() ? (
            <span className="text-red-400">SIN ESPECIFICAR</span>
          ) : (
            cell.getValue()
          )}
        </span>
      ),
    },
    {
      accessorKey: "role",
      header: "Role",
    },
    {
      accessorKey: "phone",
      header: "Phone",
      cell: ({ cell }: any) => (
        <span>
          {!cell.getValue() ? (
            <span className="text-red-400">SIN ESPECIFICAR</span>
          ) : (
            cell.getValue()
          )}
        </span>
      ),
    },
    {
      accessorKey: "address",
      header: "Address",
      cell: ({ cell }: any) => (
        <span>
          {!cell.getValue() ? (
            <span className="text-red-400">SIN ESPECIFICAR</span>
          ) : (
            cell.getValue()
          )}
        </span>
      ),
    },
  ];

  const { data } = useQuery({
    queryKey: ["users", pagination],
    queryFn: async () =>
      await getAllUsers(pagination.pageIndex, pagination.pageSize),
    placeholderData: keepPreviousData,
  });
  const table = useReactTable({
    data: data?.results || ([] as unknown[]),
    columns,
    getCoreRowModel: getCoreRowModel(),
    rowCount: data?.info.count || 0,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    manualPagination: true,
    debugTable: true,
  });
  return (
    <div className="mx-auto">
      <div className="relative w-fit h-fit ">
        <input
          type="search"
          placeholder="Search for user name..."
          {...register("search")}
          className="px-9 py-1 rounded-md  w-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        />
        <span className="absolute top-1/2 left-2 transform -translate-y-1/2">
          <MdPersonSearch className="text-2xl text-[#3293c0]" />
        </span>
      </div>

      <div className="w-full ">
        <h2 className="text-3xl font-bold text-slate-600">List of users</h2>
        <table className=" w-full">
          <thead className=" text-slate-600  bg-slate-200 ">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="">
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="text-center text-sm p-3">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="table-body text-slate-700 font-normal text-sm">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="text-center p-3">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between items-center w-full mt-1">
          <span className="text-sm text-slate-500">
            showing{" "}
            {`${table.getFilteredRowModel().rows.length} of ${
              data?.info.count
            }`}{" "}
            users
          </span>
          <ResponsivePagination
            current={pagination.pageIndex}
            total={Math.ceil(data?.info.count! / pagination.pageSize)}
            onPageChange={(e) => {
              table.setPageIndex(e);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Users;
