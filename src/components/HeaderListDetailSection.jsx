import React from "react"
import { Group, List, Stack, Text, ThemeIcon, Title } from "@mantine/core"
import { IconCheck } from "@tabler/icons-react"

const HeaderListDetailSection = ({ data }) => {
   return (
      <Group align="start" spacing="xl">
         <Stack>
            <List
               spacing="xs"
               size="sm"
               center
               icon={
                  <ThemeIcon color="blue" size={24} radius="xl">
                     <IconCheck size="1rem" />
                  </ThemeIcon>
               }
            >
               {Object.keys(data || {})
                  .filter((item) => item !== "description")
                  .slice(1, 6)
                  .map((key, index) => (
                     <List.Item key={index}>
                        <Title order={4}>
                           {key} :{" "}
                           <Text span fw={500}>
                              {data[key]}
                           </Text>
                        </Title>
                     </List.Item>
                  ))}
            </List>
         </Stack>
         <Stack>
            <List
               spacing="xs"
               size="sm"
               icon={
                  <ThemeIcon color="blue" size={24} radius="xl">
                     <IconCheck size="1rem" />
                  </ThemeIcon>
               }
            >
               {Object.keys(data || {})
                  .filter((item) => item !== "description")
                  .slice(6)
                  .map((key, index) => (
                     <List.Item key={index}>
                        <Title order={4}>
                           {key} :{" "}
                           <Text span fw={500}>
                              {data[key]}
                           </Text>
                        </Title>
                     </List.Item>
                  ))}
               {data?.description && (
                  <List.Item>
                     <Title
                        order={4}
                        maw={400}
                        sx={{ display: "flex", flexWrap: "wrap" }}
                     >
                        Descripción :{" "}
                        <Text span fw={500} lineClamp={5}>
                           {data?.description}
                        </Text>
                     </Title>
                  </List.Item>
               )}
            </List>
         </Stack>
      </Group>
   )
}

export default HeaderListDetailSection
