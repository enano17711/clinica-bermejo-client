import React from "react"
import { Box, Tabs } from "@mantine/core"
import { IconStethoscope } from "@tabler/icons-react"
import DetailDataItemSection from "./components/DetailDataItemSection.jsx"
import { useParams } from "react-router-dom"
import { useGetSingleModel } from "../../hooks/useGetSingleModel.jsx"
import { useSimpleColumnsDataTable } from "../../hooks/useSimpleColumnsDataTable.jsx"
import { itemModelSchema } from "../../dataTests/itemModel.js"
import { useSimpleSearchTextTable } from "../../hooks/useSimpleSearchTextTable.jsx"
import TabPanel from "../../components/TabPanel.jsx"

const DetailsItem = () => {
   const { id } = useParams()
   const { modelData: itemData } = useGetSingleModel(id, "Item")

   const { columnsSimpleTable: columnsCategoryItemsSimpleTable } =
      useSimpleColumnsDataTable(itemModelSchema.categoryItems[0] || [{}])
   const { columnsSimpleTable: columnsUnitsSimpleTable } =
      useSimpleColumnsDataTable(itemModelSchema.units[0] || [{}])

   const {
      filterRows: filterRowsCategoryItem,
      filterText: filterTextCategoryItem,
      setFilterText: setFilterTextCategoryItem,
   } = useSimpleSearchTextTable(itemData?.categoryItems || [])

   const {
      filterRows: filterRowsUnit,
      filterText: filterTextUnit,
      setFilterText: setFilterTextUnit,
   } = useSimpleSearchTextTable(itemData?.units || [])

   const tabs = [
      {
         tab: "categoryItems",
         filterRows: filterRowsCategoryItem,
         filterText: filterTextCategoryItem,
         setFilterText: setFilterTextCategoryItem,
         columns: columnsCategoryItemsSimpleTable,
      },
      {
         tab: "units",
         filterRows: filterRowsUnit,
         filterText: filterTextUnit,
         setFilterText: setFilterTextUnit,
         columns: columnsUnitsSimpleTable,
      },
   ]
   return (
      <Box>
         <DetailDataItemSection id={id} />
         <Tabs variant="pills" radius="md" defaultValue="sales">
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
export default DetailsItem
