import getAllProducts from "../../../api/products";
import {
  PaginationState,
  useReactTable,
  getCoreRowModel,
  flexRender,
  //Cell,
} from "@tanstack/react-table";
import { useState } from "react";
//import { useForm } from "react-hook-form";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import ResponsivePagination from "react-responsive-pagination";

const ProductsTable = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 1,
    pageSize: 10,
  });

  //const { register } = useForm();
  const columns = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "stock",
      header: "Stock",
    },
  ];
  const { data } = useQuery({
    queryKey: ["product", pagination],
    queryFn: async () =>
      await getAllProducts(pagination.pageIndex, pagination.pageSize),
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
    <div className="w-full ">
      <h2 className="text-3xl font-bold text-slate-600">Lista de Productos</h2>
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
          {`${table.getFilteredRowModel().rows.length} of ${data?.info.count}`}{" "}
          users
        </span>
        <ResponsivePagination
          current={pagination.pageIndex}
          total={Math.ceil((data?.info.count ?? 0) / pagination.pageSize)}
          onPageChange={(e) => {
            table.setPageIndex(e);
          }}
        />
      </div>
    </div>
  );
};

export default ProductsTable;
