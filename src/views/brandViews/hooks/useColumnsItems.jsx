import { useMemo } from "react"

export const useColumnsItems = () => {
   const columnsTableItems = useMemo(
      () => [
         {
            name: "Nombre",
            selector: (row) => row.name,
            sortable: true,
         },
         {
            name: "Descripción",
            selector: (row) => row.description,
            sortable: true,
         },
      ],
      []
   )

   return { columnsTableItems }
}
