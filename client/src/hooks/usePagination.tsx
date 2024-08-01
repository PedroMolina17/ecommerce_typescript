import { PaginationState } from "@tanstack/react-table";
import { useMemo, useState } from "react";

const usePagination = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 1,
    pageSize: 10,
  });
  const handlePagination = useMemo(
    () =>
      ({ pageIndex, pageSize }: PaginationState) => {
        setPagination({
          pageIndex,
          pageSize,
        });
      },
    [setPagination]
  );
  return { pagination, handlePagination, setPagination };
};
export default usePagination;
