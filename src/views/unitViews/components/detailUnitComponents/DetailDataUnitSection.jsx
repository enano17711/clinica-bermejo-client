import { Box, Breadcrumbs, Card, Group, Kbd } from "@mantine/core"
import { useUnit } from "../../hooks/useUnit.jsx"
import { Link } from "react-router-dom"
import React from "react"
import HeaderDetailSection from "./HeaderDetailSection.jsx"
import HeaderListDetailSection from "./HeaderListDetailSection.jsx"

const DetailDataUnitSection = ({ id }) => {
   const { unitData } = useUnit(id)

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
               <HeaderDetailSection data={unitData} />
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
