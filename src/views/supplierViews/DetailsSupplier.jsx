import React from "react"
import { Box, Tabs } from "@mantine/core"
import { IconStethoscope } from "@tabler/icons-react"
import DetailDataSupplierSection from "./components/DetailDataSupplierSection.jsx"
import { useParams } from "react-router-dom"
import { useGetSingleModel } from "../../hooks/useGetSingleModel.jsx"
import { useSimpleColumnsDataTable } from "../../hooks/useSimpleColumnsDataTable.jsx"
import { supplierModelSchema } from "../../dataTests/supplierModel.js"
import { useSimpleSearchTextTable } from "../../hooks/useSimpleSearchTextTable.jsx"
import TabPanel from "../../components/TabPanel.jsx"

const DetailsSupplier = () => {
   const { id } = useParams()
   const { modelData: supplierData } = useGetSingleModel(id, "Supplier")
   const { columnsSimpleTable: columnsItemsSimpleTable } =
      useSimpleColumnsDataTable(supplierModelSchema.orders[0] || [{}])
   const {
      filterRows: filterRowsItem,
      filterText: filterTextItem,
      setFilterText: setFilterTextItem,
   } = useSimpleSearchTextTable(supplierData?.orders || [])
   const tabs = [
      {
         tab: "orders",
         filterRows: filterRowsItem,
         filterText: filterTextItem,
         setFilterText: setFilterTextItem,
         columns: columnsItemsSimpleTable,
      },
   ]
   return (
      <Box>
         <DetailDataSupplierSection id={id} />
         <Tabs variant="pills" radius="md" defaultValue="orders">
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
export default DetailsSupplier
