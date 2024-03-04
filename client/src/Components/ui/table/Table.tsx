import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { HTMLAttributes, ReactNode, TableHTMLAttributes } from "react";
import { Users } from "../../../types/user.type";

export interface TableColumn {
  accessorKey: string;
  header: string;
  cell?: ({ cell }: { cell: any }) => ReactNode;
}
interface TableUserProps extends HTMLAttributes<HTMLTableElement> {
  columns: TableColumn[];
  data: Users;
  tableClass: string;
  render: ({ table }: any) => React.ReactNode;
  children?: ReactNode;
}
const Table = ({
  columns,
  data,
  render,
  tableClass,
  children,
}: TableUserProps) => {
  const table = useReactTable({
    data: data.results,
    columns,
    getCoreRowModel: getCoreRowModel(),
   
   
  });
  return (
    <table className={`${tableClass}`}>
      {render({ table })}
           
    </table>
  );
};

export default Table;
