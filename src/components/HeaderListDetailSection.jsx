import React from "react"
import { Group, List, Stack, Text, ThemeIcon, Title } from "@mantine/core"
import { IconCheck } from "@tabler/icons-react"

const HeaderListDetailSection = ({ data }) => {
   const renderListItems = (start, end) => {
      return Object.keys(data || {})
         .filter((item) => item !== "description")
         .slice(start, end)
         .map((key, index) => (
            <List.Item key={index}>
               <Title order={4}>
                  {key}:{" "}
                  <Text span fw={500}>
                     {data[key]}
                  </Text>
               </Title>
            </List.Item>
         ))
   }

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
               {renderListItems(1, 6)}
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
               {renderListItems(6)}
               {data?.description && (
                  <List.Item>
                     <Title
                        order={4}
                        maw={400}
                        sx={{ display: "flex", flexWrap: "wrap" }}
                     >
                        Descripción:{" "}
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
