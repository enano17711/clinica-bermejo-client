import React from "react"
import {
   Avatar,
   Flex,
   Group,
   Stack,
   Text,
   ThemeIcon,
   Title,
} from "@mantine/core"
import { IconCheckbox } from "@tabler/icons-react"

const HeaderDetailSection = ({ data }) => {
   return (
      <Stack align="center" pt={20} pb={30}>
         <Avatar size="xl" />
         <Title>{data?.name}</Title>
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
   )
}

export default HeaderDetailSection
