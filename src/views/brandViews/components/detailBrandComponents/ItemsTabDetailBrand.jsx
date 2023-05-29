import React from "react"
import { Card, TextInput } from "@mantine/core"
import DataTable from "react-data-table-component"
import { useColumnsItems } from "../../hooks/useColumnsItems.jsx"
import { useBrand } from "../../hooks/useBrand.jsx"
import { useSearchTextTable } from "../../hooks/useSearchTextTable.jsx"
import { IconSearch } from "@tabler/icons-react"
import { useParams } from "react-router-dom"

const ItemsTabDetailBrand = ({}) => {
   const { id } = useParams()
   const { brandData } = useBrand(id)
   const { columnsTableItems } = useColumnsItems()

   const { filterRows, filterText, setFilterText } = useSearchTextTable(
      brandData?.items
   )
   return (
      <Card>
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
