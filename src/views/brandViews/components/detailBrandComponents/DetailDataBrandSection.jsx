import {
   Avatar,
   Box,
   Breadcrumbs,
   Card,
   Kbd,
   Stack,
   Text,
   Title,
} from "@mantine/core"
import { Link } from "react-router-dom"
import React from "react"
import { useGetSingleModel } from "../../../../hooks/useGetSingleModel.jsx"

const DetailDataBrandSection = ({ id }) => {
   const { modelData: brandData } = useGetSingleModel(id, "Brand")

   return (
      <Card>
         <Card.Section>
            <Box
               p={20}
               sx={{ display: "flex", justifyContent: "space-between" }}
            >
               <Breadcrumbs>
                  <Link to="/">
                     <Kbd>Inicio</Kbd>
                  </Link>
                  <Link to="/brand">
                     <Kbd>Marcas</Kbd>
                  </Link>
                  <Link to={`/brand/${id}`}>
                     <Kbd>{brandData?.name}</Kbd>
                  </Link>
               </Breadcrumbs>
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
