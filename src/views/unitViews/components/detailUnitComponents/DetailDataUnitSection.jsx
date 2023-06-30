import {
   Avatar,
   Box,
   Breadcrumbs,
   Card,
   Flex,
   Group,
   Kbd,
   Stack,
   Text,
   ThemeIcon,
   Title,
} from "@mantine/core"
import { Link } from "react-router-dom"
import React from "react"
import { useGetSingleModel } from "../../../../hooks/useGetSingleModel.jsx"
import HeaderListDetailSection from "../../../../components/HeaderListDetailSection.jsx"
import { IconCheckbox } from "@tabler/icons-react"

const DetailDataUnitSection = ({ id }) => {
   const { modelData: unitData } = useGetSingleModel(id, "Unit")

   return (
      <Card>
         <Card.Section px={20}>
            <Box
               p={20}
               sx={{ display: "flex", justifyContent: "space-between" }}
            >
               <Breadcrumbs>
                  <Link to="/">
                     <Kbd>Inicio</Kbd>
                  </Link>
                  <Link to="/unit">
                     <Kbd>Unidades</Kbd>
                  </Link>
                  <Link to={`/unit/${id}`}>
                     <Kbd>{unitData?.name}</Kbd>
                  </Link>
               </Breadcrumbs>
            </Box>
            <Group spacing="xl">
               <Stack align="center" pt={20} pb={30}>
                  <Avatar size="xl" />
                  <Title>{unitData?.name}</Title>
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
                     id: unitData?.id,
                     name: unitData?.name,
                     description: unitData?.description,
                     shortName: unitData?.shortName,
                     value: unitData?.value,
                     operation: unitData?.operation,
                     unitBase: unitData?.unitBase?.name,
                  }}
               />
            </Group>
         </Card.Section>
      </Card>
   )
}

export default DetailDataUnitSection
