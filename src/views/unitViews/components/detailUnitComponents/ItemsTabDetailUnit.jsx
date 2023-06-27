import React from "react"
import { Card, TextInput } from "@mantine/core"
import DataTable from "react-data-table-component"
import { useUnit } from "../../hooks/useUnit.jsx"
import { IconSearch } from "@tabler/icons-react"
import { useSimpleSearchTextTable } from "../../../../hooks/useSimpleSearchTextTable.jsx"
import { useSimpleColumnsItems } from "../../../../hooks/useSimpleColumnsItems.jsx"

const ItemsTabDetailUnit = ({ id }) => {
   const { unitData } = useUnit(id)
   const { columnsTableItems } = useSimpleColumnsItems()

   const { filterRows, filterText, setFilterText } = useSimpleSearchTextTable(
      unitData?.items || []
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
               columns={columnsTableItems}
               data={filterRows}
               responsive
               pagination
            />
         </Card.Section>
      </Card>
   )
}

export default ItemsTabDetailUnit
