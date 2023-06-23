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
import { useBrand } from "../../hooks/useBrand.jsx"
import { Link } from "react-router-dom"
import React from "react"

const DetailDataBrandSection = ({ id }) => {
   const { brandData } = useBrand(id)

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
