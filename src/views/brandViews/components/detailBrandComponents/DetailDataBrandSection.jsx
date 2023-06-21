import { Avatar, Card, Stack, Text, Title } from "@mantine/core"
import { useBrand } from "../../hooks/useBrand.jsx"

const DetailDataBrandSection = ({ id }) => {
   const {} = useBrand()
   return (
      <Card>
         <Card.Section>
            <Stack align="center" pt={50}>
               <Avatar size="xl" />
               <Title>Nombre Marca</Title>
               <Text>Descripcion Marca</Text>
            </Stack>
         </Card.Section>
      </Card>
   )
}

export default DetailDataBrandSection
