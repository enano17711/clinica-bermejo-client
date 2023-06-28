import { IconFingerprint } from "@tabler/icons-react"
import { NavLink } from "@mantine/core"
import { useLocation } from "react-router-dom"
import NavItemMenuLayout from "./NavItemMenuLayout.jsx"

const NavMenuLayout = () => {
   const location = useLocation()

   return (
      <>
         <NavItemMenuLayout label={"Home"} rute={""} />
         <NavLink
            active={location.pathname === "/unit"}
            label="Inventario"
            icon={<IconFingerprint size={16} stroke={1.5} />}
            childrenOffset={28}
            color="violet"
            variant="light"
            sx={(theme) => ({
               borderRadius: theme.radius.md,
            })}
         >
            <NavItemMenuLayout label={"Unidades"} rute={"unit"} />
            <NavItemMenuLayout label={"Marcas"} rute={"brand"} />
         </NavLink>
      </>
   )
}

export default NavMenuLayout
