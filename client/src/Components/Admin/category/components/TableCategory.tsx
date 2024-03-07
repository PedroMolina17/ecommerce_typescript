import { useMutation } from "@tanstack/react-query";
import { deleteCategory } from "../../../../api/category";
import Table from "../../../ui/table/Table";
import TableHeader from "../../../ui/table/TableHeader";
import TableBody from "../../../ui/table/TableBody";
import { ToastContainer, toast } from "react-toastify";

import { formatDate } from "../../../../utils/fomatDate";
import {
  ICategory,
  IDeletecategory,
  IResponseDeleteCategory,
} from "../../../../types/category.type";
import ButtonsActionTable from "./ButtonsActionTable";
import { queryClient } from "../../../../App";
interface ITableCategoryProps {
  data: ICategory[];
}
const TableCategory = ({ data }: ITableCategoryProps) => {
  const notify = (message: string) => toast(message);
  const mutation = useMutation({
    mutationFn: async (data: IDeletecategory) => await deleteCategory(data),
    onSuccess: (data: IResponseDeleteCategory) => {
      notify(data.message);
      queryClient.refetchQueries({ queryKey: ["categories"] });
    },
  });
  const columns = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ cell }: any) => {
        return <span className="">{cell.getValue()}</span>;
      },
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ cell }: any) => {
        return <span className="">{cell.getValue()}</span>;
      },
    },
    {
      accessorKey: "createAt",
      header: "Created At",
      cell: ({ cell }: any) => (
        <span className="">{formatDate(cell.getValue())}</span>
      ),
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ cell }: any) => (
        <ButtonsActionTable cell={cell} mutation={mutation} />
      ),
    },
  ];

  return (
    <div className=" w-full">
      <Table
        tableClass="  shadow-md rounded-md "
        columns={columns}
        data={data}
        render={({ table }) => (
          <>
            <TableHeader
              headers={table.getHeaderGroups}
              theadClass="bg-primary  text-white text-center text-slate-600 "
              thClass="py-1 "
            />
            <TableBody
              rows={table.getRowModel}
              trClass=""
              tbodyClass="table-body text-center  text-sm tracking-widest text-slate-600 "
              tdClass="py-2 text-left border border-slate-300 "
            />
          </>
        )}
      ></Table>
      <ToastContainer />
    </div>
  );
};
export default TableCategory;
