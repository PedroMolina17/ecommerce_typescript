import { useMutation } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deleteUserById } from "../../../../api/user";
import { Users } from "../../../../types/user.type";
import Table, { TableColumn } from "../../../ui/table/Table";
import TableBody from "../../../ui/table/TableBody";
import TableHeader from "../../../ui/table/TableHeader";

import ButtonsActionTable from "./ButtonsActionTable";
import { queryClient } from "../../../../App";

interface TableUserProps {
  data: Users;
}
const TableUser = ({ data }: TableUserProps) => {
  const notify = (message: string) => toast(message);

  const mutation = useMutation({
    mutationFn: async (id: number) => await deleteUserById(id),
    onSuccess: (data) => {
      console.log("data-->", data);
      notify(data.message);
      queryClient.refetchQueries( { queryKey: ["users"] } );
    },
  });
  const columns: TableColumn[] = [
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
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ cell }: any) => (
        <ButtonsActionTable cell={cell} mutation={mutation} />
      ),
    },
  ];
  return (
    <>
      <Table
        tableClass="w-full rounded-md bg-white shadow-md"
        columns={columns}
        data={data}
        render={({ table }) => (
          <>
            <TableHeader
              headers={table.getHeaderGroups}
              theadClass="w-full bg-primary text-white text-center text-slate-600 "
              thClass="py-1 px-2"
            />
            <TableBody
              rows={table.getRowModel}
              tbodyClass="table-body text-center text-slate-500 text-sm "
              tdClass="py-2 px-2"
            />
          </>
        )}
      ></Table>
      <ToastContainer />
    </>
  );
};
export default TableUser;
