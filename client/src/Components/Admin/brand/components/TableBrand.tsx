import { IBrand } from "../../../../types/brands.type";
import { formatDate } from "../../../../utils/fomatDate";
import ButtonsActionTable from "./ButtonsActionTable";
interface ITableBrandsProps {
  data: IBrand[];
}
interface ITableColumns {
  accessorKey: string;
  header: string;
  cell?: any;
}
interface ITableRow extends IBrand {
  action?: string;
  cell?: any;
}
const TableBrands = ({ data }: ITableBrandsProps) => {
  const columns: ITableColumns[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "createAt",
      header: "Created At",
      cell: (cell: ITableRow) => {
        return <span>{formatDate(cell.createAt)}</span>;
      },
    },
    {
      accessorKey: "action",
      header: "Action",
    },
  ];
  return (
    <div className="w-full overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="  text-xs border-b border-gray-700 text-gray-700 uppercase dark:text-gray-400">
          <tr className="">
            {columns &&
              columns.map((col) => (
                <th
                  key={col.accessorKey}
                  scope="col"
                  className={`${
                    col.accessorKey === "id" && "text-center w-14  "
                  } ${col.accessorKey === "name" && " "} ${
                    col.accessorKey === "createAt" &&
                    "whitespace-nowrap w-72 text-left  "
                  } ${
                    col.accessorKey === "action" && "w-14 text-center px-4"
                  } py-4  text-white font-medium  leading-4 uppercase shadow-md `}
                >
                  {col.header}
                </th>
              ))}
          </tr>
        </thead>
        <tbody className="table-body">
          {data &&
            data.map((row: ITableRow) => (
              <tr key={row.id} className="">
                {columns &&
                  columns.map((col: ITableColumns) => (
                    <td
                      key={col.accessorKey}
                      className={` ${
                        col.accessorKey === "createAt" &&
                        " whitespace-nowrap px-0 text-left"
                      } ${col.accessorKey === "id" && "text-center "} ${
                        col.accessorKey === "action" && "text-center"
                      } text-left py-4 `}
                    >
                      {col.accessorKey === "action" ? (
                        <ButtonsActionTable />
                      ) : "cell" in col ? (
                        col.cell(row)
                      ) : (
                        row[col.accessorKey as keyof ITableRow]
                      )}
                    </td>
                  ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
export default TableBrands;
