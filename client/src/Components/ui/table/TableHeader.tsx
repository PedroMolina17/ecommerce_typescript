import { flexRender } from "@tanstack/react-table";
interface TableHeaderProps {
  headers: any;
  theadClass?: string;
  trClass?: string;
  thClass?: string;
}
const TableHeader = ({
  headers,
  theadClass,
  trClass,
  thClass,
}: TableHeaderProps) => {
  return (
    <thead className={`${theadClass}`}>
      {headers().map((headerGroup: any) => (
        <tr key={headerGroup.id} className={`${trClass}`}>
          {headerGroup.headers.map((header: any) => (
            <th key={header.id} className={`${thClass}`}>
              {flexRender(header.column.columnDef.header, header.getContext())}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
};
export default TableHeader;
