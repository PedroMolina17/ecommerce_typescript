import { useMutation } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deleteUserById } from "../../../../api/user";
import { Users } from "../../../../types/user.type";
import Table, { TableColumn } from "../../../ui/table/Table";
import TableBody from "../../../ui/table/TableBody";
import TableHeader from "../../../ui/table/TableHeader";

import ButtonsActionTable from "./ButtonsActionTable";
import { queryClient } from "../../../../main";
import { formatDate } from "../../../../utils/fomatDate";

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
      queryClient.refetchQueries({ queryKey: ["users"] });
    },
  });

  const columns: TableColumn[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "userName",
      header: "NAME",
      cell: ({ cell }: any) => {
        return (
          <div className="flex items-center gap-2">
            <img
              src={cell.row.original.image}
              className="w-10 h-10 rounded-full"
              alt="img-user"
            />
            <span>{cell.getValue()}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "email",
      header: "EMAIL",
    },

    {
      accessorKey: "phone",
      header: "PHONE",
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
      header: "ADDRESS",
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
      accessorKey: "createAt",
      header: "CREATED AT",
      cell: (cell: any) => {
        return <span>{formatDate(cell.getValue())}</span>;
      },
    },
    {
      accessorKey: "action",
      header: "ACTION",
      cell: ({ cell }: any) => (
        <ButtonsActionTable cell={cell} mutation={mutation} />
      ),
    },
  ];

  return (
    <>
      <div className="flex flex-col sticky top-32 z-40">
        <div className="table-header bg-bg text-white text-left text-xs ">
          <Table
            tableClass="w-full rounded-md"
            columns={columns}
            data={data.results}
            render={({ table }) => (
              <>
                <TableHeader
                  headers={table.getHeaderGroups}
                  theadClass=""
                  thClass="py-4 px-2"
                  trClass=""
                />
              </>
            )}
          ></Table>
        </div>
      </div>
      <div className="overflow-auto">
        <Table
          tableClass="w-full rounded-md"
          columns={columns}
          data={data.results}
          render={({ table }) => (
            <>
              <TableBody
                rows={table.getRowModel}
                tbodyClass="table-body text-gray-500 text-sm"
                tdClass="py-4 px-2"
              />
            </>
          )}
        ></Table>
      </div>
      <ToastContainer />
    </>
  );
};
export default TableUser;
