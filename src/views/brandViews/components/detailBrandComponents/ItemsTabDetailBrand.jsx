import React from "react"
import { Card, TextInput } from "@mantine/core"
import DataTable from "react-data-table-component"
import { useSimpleColumnsItems } from "../../../../hooks/useSimpleColumnsItems.jsx"
import { useSimpleSearchTextTable } from "../../../../hooks/useSimpleSearchTextTable.jsx"
import { IconSearch } from "@tabler/icons-react"
import { useGetSingleModel } from "../../../../hooks/useGetSingleModel.jsx"

const ItemsTabDetailBrand = ({ id }) => {
   const { modelData: brandData } = useGetSingleModel(id, "Brand")
   const { columnsTableItems } = useSimpleColumnsItems()

   const { filterRows, filterText, setFilterText } = useSimpleSearchTextTable(
      brandData?.items || []
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

export default ItemsTabDetailBrand
