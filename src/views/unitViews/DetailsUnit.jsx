import React from "react"
import { Box, Tabs } from "@mantine/core"
import { IconStethoscope } from "@tabler/icons-react"
import DetailDataUnitSection from "./components/detailUnitComponents/DetailDataUnitSection.jsx"
import ItemsTabDetailUnit from "./components/detailUnitComponents/ItemsTabDetailUnit.jsx"
import { useParams } from "react-router-dom"

const DetailsUnit = () => {
   const { id } = useParams()
   return (
      <Box>
         <DetailDataUnitSection id={id} />

         <Tabs variant="pills" radius="md" defaultValue="items">
            <Tabs.List grow px={20} bg="white" pb={20}>
               <Tabs.Tab value="items" icon={<IconStethoscope size="1rem" />}>
                  Items
               </Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="items">
               <ItemsTabDetailUnit id={id} />
            </Tabs.Panel>
         </Tabs>
      </Box>
   )
}

export default DetailsUnit
