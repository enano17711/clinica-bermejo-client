import { Avatar, Box, Card, Group, Stack, Title } from "@mantine/core"
import { IconCheckbox } from "@tabler/icons-react"
import CustomBreadcrumbs from "../../../components/CustomBreadCrumbs.jsx"
import HeaderListDetailSection from "../../../components/HeaderListDetailSection.jsx"
import { useGetSingleModel } from "../../../hooks/useGetSingleModel.jsx"
import RenderStat from "../../../components/RenderStat.jsx"

const DetailDataCustomerSection = ({ id }) => {
   const { modelData: customerData } = useGetSingleModel(id, "Customer")

   const routes = [
      { path: "/", title: "Inicio" },
      { path: "/customer", title: "Clientes" },
      { path: `/customer/${id}`, title: customerData?.name },
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
                  <Title>{customerData?.name}</Title>
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
                     id: customerData?.id,
                     name: customerData?.name,
                     surname: customerData?.surname,
                     ci: customerData?.ci,
                     email: customerData?.email,
                     phoneNumber: customerData?.phoneNumber,
                     date: customerData?.date,
                     address: customerData?.address,
                     nit: customerData?.nit,
                  }}
               />
            </Group>
         </Card.Section>
      </Card>
   )
}

export default DetailDataCustomerSection
