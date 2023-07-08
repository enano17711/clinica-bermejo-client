import { useMemo } from "react"
import { formatModelSchemaForSimpleColumns } from "../utils/index.js"

export const useSimpleColumnsDataTable = (modelSchemaForView) => {
   const columnsSimpleTable = useMemo(
      () => formatModelSchemaForSimpleColumns(modelSchemaForView),
      [modelSchemaForView]
   )

   return { columnsSimpleTable }
}
