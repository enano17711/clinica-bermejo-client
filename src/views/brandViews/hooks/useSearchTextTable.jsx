import React, { useState } from "react"

export const useSearchTextTable = (data) => {
   const [filterText, setFilterText] = useState("")

   const filterRows = data?.filter(
      (row) =>
         row.item.name &&
         `${row.item.name}`.toLowerCase().includes(filterText.toLowerCase())
   )
   return { filterText, setFilterText, filterRows }
}
