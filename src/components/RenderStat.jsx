import React from "react"
import { Flex, Group, Text, ThemeIcon, Title } from "@mantine/core"

const RenderStat = ({ icon, value, label }) => (
   <Group>
      <ThemeIcon size="xl">{icon}</ThemeIcon>
      <Flex direction="column">
         <Title order={4} align="center">
            {value}
         </Title>
         <Text>{label}</Text>
      </Flex>
   </Group>
)

export default RenderStat
