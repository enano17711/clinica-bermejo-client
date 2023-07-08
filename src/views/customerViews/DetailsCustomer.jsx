import React from "react"
import { Box, Tabs } from "@mantine/core"
import { IconStethoscope } from "@tabler/icons-react"
import DetailDataCustomerSection from "./components/DetailDataCustomerSection.jsx"
import { useParams } from "react-router-dom"
import { useGetSingleModel } from "../../hooks/useGetSingleModel.jsx"
import { useSimpleColumnsDataTable } from "../../hooks/useSimpleColumnsDataTable.jsx"
import { customerModelSchema } from "../../dataTests/customerModel.js"
import { useSimpleSearchTextTable } from "../../hooks/useSimpleSearchTextTable.jsx"
import TabPanel from "../../components/TabPanel.jsx"

const DetailsCustomer = () => {
   const { id } = useParams()
   const { modelData: customerData } = useGetSingleModel(id, "Customer")
   const { columnsSimpleTable: columnsItemsSimpleTable } =
      useSimpleColumnsDataTable(customerModelSchema.sales[0] || [{}])
   const {
      filterRows: filterRowsItem,
      filterText: filterTextItem,
      setFilterText: setFilterTextItem,
   } = useSimpleSearchTextTable(customerData?.sales || [])
   const tabs = [
      {
         tab: "sales",
         filterRows: filterRowsItem,
         filterText: filterTextItem,
         setFilterText: setFilterTextItem,
         columns: columnsItemsSimpleTable,
      },
   ]
   return (
      <Box>
         <DetailDataCustomerSection id={id} />
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
export default DetailsCustomer
