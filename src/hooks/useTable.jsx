import { useState } from "react"

export const useTable = (data) => {
   const [filterText, setFilterText] = useState("")

   const filterRows = data.filter(
      (row) =>
         row.name && row.name.toLowerCase().includes(filterText.toLowerCase())
   )
   return { filterText, setFilterText, filterRows }
}
