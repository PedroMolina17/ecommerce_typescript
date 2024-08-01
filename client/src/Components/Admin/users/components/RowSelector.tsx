import { PaginationState } from "@tanstack/react-table";
import React from "react";
interface RowSelectorProps {
  pagination: PaginationState;
  handlePagination: (pagination: PaginationState) => void;
}
const RowSelector = ({ handlePagination, pagination }: RowSelectorProps) => {
  const options = [
    { value: 10, label: "10 Rows" },
    { value: 20, label: "20 Rows" },
    { value: 50, label: "50 Rows" },
    { value: 100, label: "100 Rows" },
    { value: "all", label: "All Rows" },
  ];

  return (
    <select
      className="p-2 bg-white rounded-md text-slate-600"
      onChange={(e) =>
        handlePagination({ ...pagination, pageSize: Number(e.target.value) })
      }
    >
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          className="text-sm text-slate-600"
        >
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default RowSelector;
