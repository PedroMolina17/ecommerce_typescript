import { useQuery } from "@tanstack/react-query";
import { getAllCategory } from "../../../../api/category";
import Table from "../../../ui/table/Table";
import TableSkeleton from "../../users/components/TableSkeleton";
import TableHeader from "../../../ui/table/TableHeader";
import TableBody from "../../../ui/table/TableBody";
import ButtonsActionTable from "../../users/components/ButtonsActionTable";

const TableCategory = () => {
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
      accessorKey: "action",
      header: "Action",
      cell: ({ cell }: any) => <ButtonsActionTable cell={cell} />,
    },
  ];
  const { data } = useQuery({
    queryKey: ["category"],
    queryFn: async () => await getAllCategory(),
  });

  return (
    <div>
      {data ? (
        <Table
          tableClass="min-w-72"
          columns={columns}
          data={data.data}
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
      ) : (
        <TableSkeleton />
      )}
    </div>
  );
};
export default TableCategory;
