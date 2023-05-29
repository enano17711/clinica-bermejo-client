import React from "react"
import { Box, Tabs } from "@mantine/core"
import { IconStethoscope } from "@tabler/icons-react"
import DetailDataBrandSection from "./components/detailBrandComponents/DetailDataBrandSection.jsx"
import ItemsTabDetailBrand from "./components/detailBrandComponents/ItemsTabDetailBrand.jsx"

const DetailsBrand = () => {
   return (
      <Box>
         <DetailDataBrandSection />

         <Tabs variant="pills" radius="md" defaultValue="items">
            <Tabs.List grow mb="md">
               <Tabs.Tab value="items" icon={<IconStethoscope size="1rem" />}>
                  Items
               </Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="items">
               <ItemsTabDetailBrand />
            </Tabs.Panel>
         </Tabs>
      </Box>
   )
}

export default DetailsBrand
