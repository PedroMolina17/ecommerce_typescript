import { Users } from "../../../../types/user.type";
import Table, { TableColumn } from "../../../ui/table/Table";
import TableBody from "../../../ui/table/TableBody";
import TableHeader from "../../../ui/table/TableHeader";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import ResponsivePagination from "react-responsive-pagination";
interface TableUserProps {
  data: Users;
}
const TableUser = ({ data }: TableUserProps) => {
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
        <div className="flex gap-2 items-center justify-center ">
          <button>
            <CiEdit className="text-lg text-green-600" />
          </button>
          <button>
            <MdDeleteOutline className="text-lg text-red-600" />
          </button>
        </div>
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
              theadClass="w-full bg-[#455591] text-white text-center text-slate-600 "
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
    </>
  );
};
export default TableUser;
