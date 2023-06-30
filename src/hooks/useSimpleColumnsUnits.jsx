import React, { useMemo } from "react"

export const useSimpleColumnsUnits = () => {
   const columnsTableUnits = useMemo(
      () => [
         {
            name: "Nombre",
            selector: (row) => row.name,
            sortable: true,
         },
         {
            name: "Código",
            selector: (row) => row.shortName,
            sortable: true,
         },
         {
            name: "Unidad Base",
            selector: (row) => row.unitBase.name,
         },
         {
            name: "Operador",
            selector: (row) => row.operation,
         },
         {
            name: "Valor",
            selector: (row) => row.value,
            sortable: true,
         },
      ],
      []
   )

   return { columnsTableUnits }
}
