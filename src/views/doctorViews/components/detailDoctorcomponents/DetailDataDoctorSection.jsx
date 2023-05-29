import React from "react"
import {
   Avatar,
   Badge,
   Card,
   Flex,
   Group,
   List,
   Stack,
   Text,
   ThemeIcon,
   Title,
} from "@mantine/core"
import {
   IconCalendar,
   IconCheckbox,
   IconLetterC,
   IconLetterM,
   IconMail,
   IconMap,
   IconPhoneCheck,
} from "@tabler/icons-react"

const DetailDataDoctorSection = () => {
   return (
      <Card>
         <Card.Section>
            <Stack align="center" pt={50}>
               <Avatar size="xl" />
               <Title>Juan Perez</Title>
               <Badge size="lg" radius="xs">
                  Ginecologo
               </Badge>
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
         </Card.Section>
         <Stack>
            <Title order={3}>Detalles</Title>
            <List spacing="xs" size="sm" center>
               <List.Item
                  icon={
                     <ThemeIcon color="blue" size={24} radius="xl">
                        <IconLetterC size="1rem" />
                     </ThemeIcon>
                  }
               >
                  <Title order={4}>
                     C. I. :{" "}
                     <Text span fw={500}>
                        7206525
                     </Text>
                  </Title>
               </List.Item>
               <List.Item
                  icon={
                     <ThemeIcon color="blue" size={24} radius="xl">
                        <IconLetterM size="1rem" />
                     </ThemeIcon>
                  }
               >
                  <Title order={4}>
                     Matricula :{" "}
                     <Text span fw={500}>
                        12345678912
                     </Text>
                  </Title>
               </List.Item>
               <List.Item
                  icon={
                     <ThemeIcon color="blue" size={24} radius="xl">
                        <IconPhoneCheck size="1rem" />
                     </ThemeIcon>
                  }
               >
                  <Title order={4}>
                     Tel/Cel :{" "}
                     <Text span fw={500}>
                        68193206
                     </Text>
                  </Title>
               </List.Item>
               <List.Item
                  icon={
                     <ThemeIcon color="blue" size={24} radius="xl">
                        <IconMail size="1rem" />
                     </ThemeIcon>
                  }
               >
                  <Title order={4}>
                     Email :{" "}
                     <Text span fw={500}>
                        email@gmail.com
                     </Text>
                  </Title>
               </List.Item>
               <List.Item
                  icon={
                     <ThemeIcon color="blue" size={24} radius="xl">
                        <IconMap size="1rem" />
                     </ThemeIcon>
                  }
               >
                  <Title order={4}>
                     Dirección :{" "}
                     <Text span fw={500}>
                        dirección larga aqui
                     </Text>
                  </Title>
               </List.Item>
               <List.Item
                  icon={
                     <ThemeIcon color="blue" size={24} radius="xl">
                        <IconCalendar size="1rem" />
                     </ThemeIcon>
                  }
               >
                  <Title order={4}>
                     Fecha Nacimiento :{" "}
                     <Text span fw={500}>
                        22 de noviembre del 2022
                     </Text>
                  </Title>
               </List.Item>
            </List>
         </Stack>
      </Card>
   )
}

export default DetailDataDoctorSection
