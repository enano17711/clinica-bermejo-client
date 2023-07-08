import { Avatar, Box, Card, Group, Stack, Title } from "@mantine/core"
import { IconCheckbox } from "@tabler/icons-react"
import CustomBreadcrumbs from "../../../components/CustomBreadCrumbs.jsx"
import HeaderListDetailSection from "../../../components/HeaderListDetailSection.jsx"
import { useGetSingleModel } from "../../../hooks/useGetSingleModel.jsx"
import RenderStat from "../../../components/RenderStat.jsx"

const DetailDataUnitSection = ({ id }) => {
   const { modelData: unitData } = useGetSingleModel(id, "Unit")

   const routes = [
      { path: "/", title: "Inicio" },
      { path: "/unit", title: "Unidades" },
      { path: `/unit/${id}`, title: unitData?.name },
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
                  <Title>{unitData?.name}</Title>
                  <Group>
                     <RenderStat
                        icon={<IconCheckbox />}
                        value={301}
                        label="Citas"
                     />
                     <RenderStat
                        icon={<IconCheckbox />}
                        value={301}
                        label="Citas"
                     />
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
