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
import { IconCheckbox } from "@tabler/icons-react"
import HeaderListDetailSection from "../../../../components/HeaderListDetailSection.jsx"
import CustomBreadcrumbs from "../../../../components/CustomBreadCrumbs.jsx"

const DetailDataUnitBaseSection = ({ id }) => {
   const { modelData: unitBaseData } = useGetSingleModel(id, "UnitBase")
   const routes = [
      { path: "/", title: "Inicio" },
      { path: "/unitBase", title: "Unidades Base" },
      { path: `/unitBase/${id}`, title: `${unitBaseData?.name}` },
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
                  <Title>{unitBaseData?.name}</Title>
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
                     id: unitBaseData?.id,
                     name: unitBaseData?.name,
                     description: unitBaseData?.description,
                     shortName: unitBaseData?.shortName,
                  }}
               />
            </Group>
         </Card.Section>
      </Card>
   )
}

export default DetailDataUnitBaseSection
