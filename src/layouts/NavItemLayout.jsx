import { useEffect, useState } from "react"
import { IconFingerprint } from "@tabler/icons-react"
import { NavLink } from "@mantine/core"

const NavItemLayout = ({ arrayMenus }) => {
   // state
   const [mainActive, setMainActive] = useState(false)
   const [childActive, setChildActive] = useState(null)

   const [mainMenu] = arrayMenus
   const childMenus = arrayMenus.filter((am) => am !== mainMenu)

   return (
      <NavLink
         label={mainMenu}
         icon={<IconFingerprint size={16} stroke={1.5} />}
         childrenOffset={28}
         active={mainActive}
         onClick={() => setMainActive(!mainActive)}
         opened={mainActive}
         color="violet"
         variant="light"
         sx={(theme) => ({
            borderRadius: theme.radius.md,
         })}
      >
         {childMenus.map((cm, ind) => (
            <NavLink
               component="a"
               href="#"
               key={ind}
               label={cm}
               variant="filled"
               active={ind === childActive}
               color="violet"
               onClick={() => setChildActive(ind)}
               sx={(theme) => ({
                  borderRadius: theme.radius.md,
               })}
            />
         ))}
      </NavLink>
   )
}

export default NavItemLayout
