import React from "react"
import { Card, Tabs, TextInput } from "@mantine/core"
import { IconSearch } from "@tabler/icons-react"
import DataTable from "react-data-table-component"

const TabPanel = ({ tab, filterRows, filterText, setFilterText, columns }) => (
   <Tabs.Panel value={tab}>
      <Card px={40}>
         <Card.Section>
            <TextInput
               value={filterText}
               onChange={(e) => setFilterText(e.target.value)}
               placeholder="Buscar..."
               icon={<IconSearch />}
            />
            <DataTable
               columns={columns}
               data={filterRows}
               responsive
               pagination
            />
         </Card.Section>
      </Card>
   </Tabs.Panel>
)

export default TabPanel
