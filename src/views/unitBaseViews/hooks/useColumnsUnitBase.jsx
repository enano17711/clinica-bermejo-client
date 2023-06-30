import { useMemo } from "react"

export const useColumnsUnitBase = (columnVisibleValue) => {
   const columnsTableUnitBase = useMemo(
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
            name: "Código",
            selector: (row) => row.shortName,
            sortable: true,
            omit: columnVisibleValue.includes("shortName"),
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

   const columnsForSearchUnitBase = useMemo(
      () => [
         { value: "id", label: "Id" },
         { value: "name", label: "Nombre" },
         { value: "shortName", label: "Código" },
         { value: "description", label: "Descripción" },
      ],
      []
   )
   return { columnsTableUnitBase, columnsForSearchUnitBase }
}
