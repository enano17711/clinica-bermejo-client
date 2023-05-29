import React, { useMemo } from "react"

export const useColumnsBrand = (columnVisibleValue) => {
   const columnsTableBrand = useMemo(
      () => [
         {
            name: "Id",
            selector: (row) => row.id,
            sortable: true,
            omit: columnVisibleValue.includes("id"),
         },
         {
            name: "Nombre",
            selector: (row) => row.name,
            sortable: true,
            omit: columnVisibleValue.includes("name"),
         },
         {
            name: "Descripción",
            selector: (row) => row.description,
            sortable: true,
            omit: columnVisibleValue.includes("description"),
         },
      ],
      [columnVisibleValue]
   )

   const columnsForSearchBrand = useMemo(
      () => [
         { value: "id", label: "Id" },
         { value: "name", label: "Nombre" },
         { value: "description", label: "Descripción" },
      ],
      []
   )
   return { columnsTableBrand, columnsForSearchBrand }
}
