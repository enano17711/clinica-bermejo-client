import { Avatar, Box, Card, Group, Stack, Title } from "@mantine/core"
import { IconCheckbox } from "@tabler/icons-react"
import CustomBreadcrumbs from "../../../components/CustomBreadCrumbs.jsx"
import HeaderListDetailSection from "../../../components/HeaderListDetailSection.jsx"
import { useGetSingleModel } from "../../../hooks/useGetSingleModel.jsx"
import RenderStat from "../../../components/RenderStat.jsx"

const DetailDataItemSection = ({ id }) => {
   const { modelData: itemData } = useGetSingleModel(id, "Item")

   const routes = [
      { path: "/", title: "Inicio" },
      { path: "/item", title: "Items" },
      { path: `/item/${id}`, title: itemData?.name },
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
                  <Title>{itemData?.name}</Title>
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
                     id: itemData?.id,
                     name: itemData?.name,
                     code: itemData?.code,
                     description: itemData?.description,
                     brand: itemData?.brand?.name,
                  }}
               />
            </Group>
         </Card.Section>
      </Card>
   )
}

export default DetailDataItemSection
