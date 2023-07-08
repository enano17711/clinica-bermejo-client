import React from "react"
import { Box, Tabs } from "@mantine/core"
import { IconStethoscope } from "@tabler/icons-react"
import DetailDataCategoryItemSection from "./components/detailCategoryItemComponents/DetailDataCategoryItemSection.jsx"
import ItemsTabDetailCategoryItem from "./components/detailCategoryItemComponents/ItemsTabDetailCategoryItem.jsx"
import { useParams } from "react-router-dom"

const DetailsCategoryItem = () => {
   const { id } = useParams()
   return (
      <Box>
         <DetailDataCategoryItemSection id={id} />

         <Tabs variant="pills" radius="md" defaultValue="items">
            <Tabs.List grow px={20} bg="white" pb={20}>
               <Tabs.Tab value="items" icon={<IconStethoscope size="1rem" />}>
                  Items
               </Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="items">
               <ItemsTabDetailCategoryItem id={id} />
            </Tabs.Panel>
         </Tabs>
      </Box>
   )
}

export default DetailsCategoryItem
