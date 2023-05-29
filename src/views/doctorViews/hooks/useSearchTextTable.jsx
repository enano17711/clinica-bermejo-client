import React, { useState } from "react"

export const useSearchTextTable = (data) => {
   const [filterText, setFilterText] = useState("")

   const filterRows = data?.filter(
      (row) =>
         row.patient.name &&
         (`${row.patient.name} ${row.patient.surname}`
            .toLowerCase()
            .includes(filterText.toLowerCase()) ||
            `${row.nurse.name} ${row.nurse.surname}`
               .toLowerCase()
               .includes(filterText.toLowerCase()))
   )
   return { filterText, setFilterText, filterRows }
}
