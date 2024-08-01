import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { HTMLAttributes, ReactNode } from "react";

export interface TableColumn {
  accessorKey: string;
  header: string;
  cell?: ({ cell }: { cell: any }) => ReactNode;
}
interface TableUserProps extends HTMLAttributes<HTMLTableElement> {
  columns: TableColumn[];
  data: any;
  tableClass: string;
  render: ({ table }: any) => React.ReactNode;
  children?: ReactNode;
}
const Table = ({ columns, data, render, tableClass }: TableUserProps) => {
  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return <table className={`${tableClass} text-md`}>{render({ table })}</table>;
};

export default Table;
