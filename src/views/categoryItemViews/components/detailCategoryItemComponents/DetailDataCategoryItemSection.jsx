import {
   Avatar,
   Box,
   Card,
   Flex,
   Group,
   Stack,
   Text,
   ThemeIcon,
   Title,
} from "@mantine/core"
import React from "react"
import { useGetSingleModel } from "../../../../hooks/useGetSingleModel.jsx"
import HeaderListDetailSection from "../../../../components/HeaderListDetailSection.jsx"
import { IconCheckbox } from "@tabler/icons-react"
import CustomBreadcrumbs from "../../../../components/CustomBreadCrumbs.jsx"

const DetailDataCategoryItemSection = ({ id }) => {
   const { modelData: categoryItemData } = useGetSingleModel(id, "CategoryItem")
   const routes = [
      { path: "/", title: "Inicio" },
      { path: "/categoryItem", title: "Categorías" },
      { path: `/categoryItem/${id}`, title: `${categoryItemData?.name}` },
   ]

   return (
      <Card>
         <Card.Section px={20}>
            <Box
               p={20}
               sx={{ display: "flex", justifyContent: "space-between" }}
            >
               <CustomBreadcrumbs routes={routes} />
            </Box>
            <Group spacing="xl">
               <Stack align="center" pt={20} pb={30}>
                  <Avatar size="xl" />
                  <Title>{categoryItemData?.name}</Title>
                  <Group>
                     <Group>
                        <ThemeIcon size="xl">
                           <IconCheckbox />
                        </ThemeIcon>
                        <Flex direction="column">
                           <Title order={4} align="center">
                              301
                           </Title>
                           <Text>Citas</Text>
                        </Flex>
                     </Group>
                     <Group>
                        <ThemeIcon size="xl">
                           <IconCheckbox />
                        </ThemeIcon>
                        <Flex direction="column">
                           <Title order={4} align="center">
                              301
                           </Title>
                           <Text>Citas</Text>
                        </Flex>
                     </Group>
                  </Group>
               </Stack>
               <HeaderListDetailSection
                  data={{
                     id: categoryItemData?.id,
                     name: categoryItemData?.name,
                     description: categoryItemData?.description,
                  }}
               />
            </Group>
         </Card.Section>
      </Card>
   )
}

export default DetailDataCategoryItemSection
