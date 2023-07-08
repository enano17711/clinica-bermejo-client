import { Avatar, Box, Card, Group, Stack, Title } from "@mantine/core"
import { IconCheckbox } from "@tabler/icons-react"
import CustomBreadcrumbs from "../../../components/CustomBreadCrumbs.jsx"
import HeaderListDetailSection from "../../../components/HeaderListDetailSection.jsx"
import { useGetSingleModel } from "../../../hooks/useGetSingleModel.jsx"
import RenderStat from "../../../components/RenderStat.jsx"

const DetailDataSupplierSection = ({ id }) => {
   const { modelData: supplierData } = useGetSingleModel(id, "Supplier")

   const routes = [
      { path: "/", title: "Inicio" },
      { path: "/supplier", title: "Proveedores" },
      { path: `/supplier/${id}`, title: supplierData?.name },
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
                  <Title>{supplierData?.name}</Title>
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
                     id: supplierData?.id,
                     name: supplierData?.name,
                     surname: supplierData?.surname,
                     ci: supplierData?.ci,
                     email: supplierData?.email,
                     phoneNumber: supplierData?.phoneNumber,
                     date: supplierData?.date,
                     address: supplierData?.address,
                     nit: supplierData?.nit,
                  }}
               />
            </Group>
         </Card.Section>
      </Card>
   )
}

export default DetailDataSupplierSection
