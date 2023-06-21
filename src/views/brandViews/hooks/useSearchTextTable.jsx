import React, { useState } from "react"

export const useSearchTextTable = (data) => {
   const [filterText, setFilterText] = useState("")

   const filterRows = data.filter((row) => {
      return (
         row.name &&
         `${row.name}`.toLowerCase().includes(filterText.toLowerCase())
      )
   })

   return { filterText, setFilterText, filterRows }
}
