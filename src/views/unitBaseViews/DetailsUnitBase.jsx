import React from "react"
import { Box, Tabs } from "@mantine/core"
import { IconStethoscope } from "@tabler/icons-react"
import DetailDataUnitBaseSection from "./components/detailUnitBaseComponents/DetailDataUnitBaseSection.jsx"
import UnitsTabDetailUnitBase from "./components/detailUnitBaseComponents/UnitsTabDetailUnitBase.jsx"
import { useParams } from "react-router-dom"

const DetailsUnitBase = () => {
   const { id } = useParams()
   return (
      <Box>
         <DetailDataUnitBaseSection id={id} />

         <Tabs variant="pills" radius="md" defaultValue="units">
            <Tabs.List grow px={20} bg="white" pb={20}>
               <Tabs.Tab value="units" icon={<IconStethoscope size="1rem" />}>
                  Units
               </Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="units">
               <UnitsTabDetailUnitBase id={id} />
            </Tabs.Panel>
         </Tabs>
      </Box>
   )
}

export default DetailsUnitBase
