import { useState } from "react"

export const usePagination = (initialPageSize, initialPageNumber) => {
   const [pageSize, setPageSize] = useState(initialPageSize)
   const [pageNumber, setPageNumber] = useState(initialPageNumber)
   const handlePageChange = (page) => {
      setPageNumber(page)
   }
   const handlePerRowsChange = async (newPerPage, page) => {
      setPageSize(newPerPage)
      setPageNumber(page)
   }
   return {
      pageSize,
      pageNumber,
      handlePageChange,
      handlePerRowsChange,
   }
}
