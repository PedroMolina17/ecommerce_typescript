import { useMutation } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";

import { deleteCategory } from "../../../../api/category";
import { queryClient } from "../../../../main";
import { ICategory } from "../../../../types/category.type";
import { formatDate } from "../../../../utils/fomatDate";
import ButtonsActionTable from "./ButtonsActionTable";

interface ITableCategoryProps {
  data: ICategory[];
}
interface ITableColumns {
  accessorKey: string;
  header: string;
  cell?: any;
}
interface ITableRow extends ICategory {
  action?: string;
  cell?: any;
}

const TableCategory = ({ data }: ITableCategoryProps) => {
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

  const notify = (message: string) => toast(message);

  const mutation = useMutation({
    mutationFn: async (id: number) => await deleteCategory(id),
    onSuccess: (data) => {
      notify(data.message);
      queryClient.refetchQueries({ queryKey: ["categories"] });
    },
  });

  return (
    <div className="w-full overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-base text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="  text-xs border-b border-gray-700 text-gray-700 uppercase dark:text-gray-400 ">
          <tr className="">
            {columns &&
              columns.map((col) => (
                <th
                  key={col.accessorKey}
                  scope="col"
                  className={`${
                    col.accessorKey === "id" && "text-center w-14 text-sm  "
                  } ${col.accessorKey === "name" && "text-sm "} ${
                    col.accessorKey === "createAt" &&
                    "whitespace-nowrap w-72 text-left text-sm   "
                  } ${
                    col.accessorKey === "action" && "w-14 text-center px-4"
                  } py-4  text-white font-medium  leading-4 uppercase shadow-md text-sm  `}
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
                      className={`h-16 ${
                        col.accessorKey === "createAt" &&
                        " whitespace-nowrap px-0 text-left"
                      } ${col.accessorKey === "id" && "text-center "} ${
                        col.accessorKey === "action" && "text-center"
                      } text-left py-4 `}
                    >
                      {col.accessorKey === "action" ? (
                        <ButtonsActionTable cell={row} mutation={mutation} />
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
      <ToastContainer />
    </div>
  );
};
export default TableCategory;
