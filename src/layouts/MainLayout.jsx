import { useState } from "react"
import {
   AppShell,
   Navbar,
   Header,
   MediaQuery,
   Burger,
   useMantineTheme,
   Center,
   Button,
   Box,
} from "@mantine/core"
import BrandLayout from "./BrandLayout.jsx"
import NavMenuLayout from "./NavMenuLayout.jsx"
import ShortsHeaderLayout from "./ShortsHeaderLayout.jsx"
import { IconSearch } from "@tabler/icons-react"

export default function MainLayout({ children }) {
   const theme = useMantineTheme()
   const [opened, setOpened] = useState(false)
   return (
      <AppShell
         layout="alt"
         styles={{
            main: {
               background:
                  theme.colorScheme === "dark"
                     ? theme.colors.dark[8]
                     : theme.colors.gray[0],
            },
         }}
         navbarOffsetBreakpoint="sm"
         navbar={
            <Navbar
               p="md"
               hiddenBreakpoint="sm"
               hidden={!opened}
               width={{ sm: 250 }}
            >
               <Navbar.Section>
                  <Center inline>
                     <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                        <Burger
                           opened={opened}
                           onClick={() => setOpened((o) => !o)}
                           size="sm"
                           color={theme.colors.gray[6]}
                           mr="xl"
                        />
                     </MediaQuery>
                     <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                        <BrandLayout />
                     </MediaQuery>
                  </Center>
               </Navbar.Section>
               <Navbar.Section grow pt="md">
                  <NavMenuLayout />
               </Navbar.Section>
            </Navbar>
         }
         header={
            <Header height={70} p="md">
               <div
                  style={{
                     display: "flex",
                     alignItems: "center",
                     justifyContent: "space-between",
                     height: "100%",
                  }}
               >
                  <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                     <Burger
                        opened={opened}
                        onClick={() => setOpened((o) => !o)}
                        size="sm"
                        color={theme.colors.gray[6]}
                        mr="xl"
                     />
                  </MediaQuery>

                  <Button
                     leftIcon={<IconSearch />}
                     variant="subtle"
                     color="dark.3"
                  >
                     Buscar en la app
                  </Button>
                  <ShortsHeaderLayout />
               </div>
            </Header>
         }
      >
         <Box pos="relative">{children}</Box>
      </AppShell>
   )
}
