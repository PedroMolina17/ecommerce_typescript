import { flexRender } from "@tanstack/react-table";

interface TableBodyProps {
  rows: any;
  tbodyClass?: string;
  trClass?: string;
  tdClass?: string;
}
const TableBody = ({ rows, tbodyClass, trClass, tdClass }: TableBodyProps) => {
  return (
    <tbody className={`${tbodyClass} text-lg`}>
      {rows().rows.map((row: any) => (
        <tr key={row.id} className={`${trClass} h-16 text-center`}>
          {row.getVisibleCells().map((cell: any) => (
            <td key={cell.id} className={`${tdClass}`}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};
export default TableBody;
