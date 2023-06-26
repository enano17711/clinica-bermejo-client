import { useMemo } from "react"

export const useColumnsUnit = (columnVisibleValue) => {
   const columnsTableUnit = useMemo(
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
            name: "Unidad Base",
            selector: (row) => row.unitBase.name,
         },
         {
            name: "Operador",
            selector: (row) => row.operation,
            omit: columnVisibleValue.includes("operation"),
         },
         {
            name: "Valor",
            selector: (row) => row.value,
            omit: columnVisibleValue.includes("value"),
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

   const columnsForSearchUnit = useMemo(
      () => [
         { value: "id", label: "Id" },
         { value: "name", label: "Nombre" },
         { value: "shortName", label: "Código" },
         { value: "operation", label: "Operador" },
         { value: "value", label: "Valor" },
         { value: "description", label: "Descripción" },
      ],
      []
   )
   return { columnsTableUnit, columnsForSearchUnit }
}
