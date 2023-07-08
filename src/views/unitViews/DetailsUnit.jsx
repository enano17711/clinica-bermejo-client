import React from "react"
import { Box, Tabs } from "@mantine/core"
import { IconStethoscope } from "@tabler/icons-react"
import DetailDataUnitSection from "./components/DetailDataUnitSection.jsx"
import { useParams } from "react-router-dom"
import { useGetSingleModel } from "../../hooks/useGetSingleModel.jsx"
import { useSimpleColumnsDataTable } from "../../hooks/useSimpleColumnsDataTable.jsx"
import { unitModelSchema } from "../../dataTests/unitModel.js"
import { useSimpleSearchTextTable } from "../../hooks/useSimpleSearchTextTable.jsx"
import TabPanel from "../../components/TabPanel.jsx"

const DetailsUnit = () => {
   const { id } = useParams()
   const { modelData: unitData } = useGetSingleModel(id, "Unit")
   const { columnsSimpleTable: columnsItemsSimpleTable } =
      useSimpleColumnsDataTable(unitModelSchema.items[0])
   const {
      filterRows: filterRowsItem,
      filterText: filterTextItem,
      setFilterText: setFilterTextItem,
   } = useSimpleSearchTextTable(unitData?.items || [])
   const tabs = [
      {
         tab: "items",
         filterRows: filterRowsItem,
         filterText: filterTextItem,
         setFilterText: setFilterTextItem,
         columns: columnsItemsSimpleTable,
      },
   ]
   return (
      <Box>
         <DetailDataUnitSection id={id} />
         <Tabs variant="pills" radius="md" defaultValue="items">
            <Tabs.List grow px={20} bg="white" pb={20}>
               {tabs.map((tab) => (
                  <Tabs.Tab
                     key={tab.tab}
                     value={tab.tab}
                     icon={<IconStethoscope size="1rem" />}
                  >
                     {tab.tab}
                  </Tabs.Tab>
               ))}
            </Tabs.List>
            {tabs.map((tab) => (
               <TabPanel key={tab.tab} {...tab} />
            ))}
         </Tabs>
      </Box>
   )
}
export default DetailsUnit
