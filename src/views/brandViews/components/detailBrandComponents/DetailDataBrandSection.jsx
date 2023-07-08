import { Avatar, Box, Card, Stack, Text, Title } from "@mantine/core"
import React from "react"
import { useGetSingleModel } from "../../../../hooks/useGetSingleModel.jsx"
import CustomBreadcrumbs from "../../../../components/CustomBreadCrumbs.jsx"

const DetailDataBrandSection = ({ id }) => {
   const { modelData: brandData } = useGetSingleModel(id, "Brand")
   const routes = [
      { path: "/", title: "Inicio" },
      { path: "/brand", title: "Marcas" },
      { path: `/brand/${id}`, title: `${brandData?.name}` },
   ]

   return (
      <Card>
         <Card.Section>
            <Box
               p={20}
               sx={{ display: "flex", justifyContent: "space-between" }}
            >
               <CustomBreadcrumbs routes={routes} />
            </Box>
            <Stack align="center" pt={50} pb={30}>
               <Avatar size="xl" />
               <Title>{brandData?.name}</Title>
               <Text>{brandData?.description}</Text>
            </Stack>
         </Card.Section>
      </Card>
   )
}

export default DetailDataBrandSection
