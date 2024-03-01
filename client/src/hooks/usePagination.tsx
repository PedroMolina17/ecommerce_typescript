import { PaginationState } from "@tanstack/react-table"
import { useState } from "react"

const usePagination = () => {
  const [pagination,setPagination]=useState<PaginationState>({
      pageIndex: 1,
      pageSize: 10
  })
  const handlePagination=({pageIndex,pageSize}:PaginationState)=>{
    setPagination({
        pageIndex,
        pageSize
    })
  }

  return {pagination,handlePagination}
}
export default usePagination