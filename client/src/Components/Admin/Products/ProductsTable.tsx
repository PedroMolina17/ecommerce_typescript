import getAllProducts from "../../../api/products";
import {
  PaginationState,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  ColumnSort,
  getFilteredRowModel,
  //Cell,
} from "@tanstack/react-table";
import { useState } from "react";
//import { useForm } from "react-hook-form";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import ResponsivePagination from "react-responsive-pagination";

const ProductsTable = () => {
  const [sorting, setSorting] = useState<ColumnSort[]>([]);
  const [filtering, setFiltering] = useState("");
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
    getSortedRowModel: getSortedRowModel(),
    rowCount: data?.info.count || 0,
    state: {
      pagination,
      sorting: sorting,
      globalFilter: filtering,
    },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
    getFilteredRowModel: getFilteredRowModel(),
    manualPagination: true,
    debugTable: true,
  });
  return (
    <div className=" mx-2">
      <h2 className="text-3xl font-bold text-slate-600">Lista de Productos</h2>
      <input
        type="text"
        placeholder="Buscar Producto"
        value={filtering}
        onChange={(e) => setFiltering(e.target.value)}
      ></input>
      <table className=" w-full">
        <thead className=" text-slate-600  bg-slate-200 ">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="bg-[#455591] text-white">
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="text-center text-sm p-3"
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {header.column.getIsSorted() !== null &&
                  header.column.getIsSorted() !== false
                    ? {
                        asc: " ↓",
                        desc: " ↑",
                      }[header.column.getIsSorted() as "asc" | "desc"]
                    : null}
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
          Mostrando
          {`${table.getFilteredRowModel().rows.length} of ${
            data?.info.count
          }`}{" "}
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
