import { useMemo } from "react"
import {
   formatModelSchemaForColumns,
   formatModelSchemaForSearch,
} from "../utils/index.js"

export const useColumnsMainDataTable = (
   modelSchemaForView,
   columnVisibleValue
) => {
   const columnsTableModel = useMemo(
      () => formatModelSchemaForColumns(modelSchemaForView, columnVisibleValue),
      [columnVisibleValue]
   )

   const columnsForSearchModel = useMemo(
      () => formatModelSchemaForSearch(modelSchemaForView),
      []
   )
   return { columnsTableModel, columnsForSearchModel }
}
