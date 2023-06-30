import React from "react"
import { useGetSingleModel } from "../../../../hooks/useGetSingleModel.jsx"
import { useSimpleColumnsUnits } from "../../../../hooks/useSimpleColumnsUnits.jsx"
import { useSimpleSearchTextTable } from "../../../../hooks/useSimpleSearchTextTable.jsx"
import { Card, TextInput } from "@mantine/core"
import { IconSearch } from "@tabler/icons-react"
import DataTable from "react-data-table-component"

const UnitsTabDetailUnitBase = ({ id }) => {
   const { modelData: unitBaseData } = useGetSingleModel(id, "UnitBase")
   const { columnsTableUnits } = useSimpleColumnsUnits()

   const { filterRows, filterText, setFilterText } = useSimpleSearchTextTable(
      unitBaseData?.units || []
   )

   return (
      <Card px={40}>
         <Card.Section>
            <TextInput
               value={filterText}
               onChange={(e) => setFilterText(e.target.value)}
               placeholder="Buscar Marca"
               icon={<IconSearch />}
            />
            <DataTable
               columns={columnsTableUnits}
               data={filterRows}
               responsive
               pagination
            />
         </Card.Section>
      </Card>
   )
}

export default UnitsTabDetailUnitBase
