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
            active={
               location.pathname === "/unit" ||
               location.pathname === "/brand" ||
               location.pathname === "/categoryItem" ||
               location.pathname === "/item"
            }
            label="Inventario"
            icon={<IconFingerprint size={16} stroke={1.5} />}
            childrenOffset={28}
            color="violet"
            variant="light"
            sx={(theme) => ({
               borderRadius: theme.radius.md,
            })}
         >
            <NavItemMenuLayout label={"Items"} rute={"item"} />
            <NavItemMenuLayout label={"Unidades"} rute={"unit"} />
            <NavItemMenuLayout label={"Unidades Base"} rute={"unitBase"} />
            <NavItemMenuLayout label={"Marcas"} rute={"brand"} />
            <NavItemMenuLayout
               label={"Categoría de Items"}
               rute={"categoryItem"}
            />
         </NavLink>
         <NavLink
            active={location.pathname === "/order"}
            label="Compras"
            icon={<IconFingerprint size={16} stroke={1.5} />}
            childrenOffset={28}
            color="violet"
            variant="light"
            sx={(theme) => ({
               borderRadius: theme.radius.md,
            })}
         >
            <NavItemMenuLayout label={"Compras"} rute={"order"} />
         </NavLink>
         <NavLink
            active={
               location.pathname === "/customer" ||
               location.pathname === "/supplier"
            }
            label="Personas"
            icon={<IconFingerprint size={16} stroke={1.5} />}
            childrenOffset={28}
            color="violet"
            variant="light"
            sx={(theme) => ({
               borderRadius: theme.radius.md,
            })}
         >
            <NavItemMenuLayout label={"Clientes"} rute={"customer"} />
            <NavItemMenuLayout label={"Proveedores"} rute={"supplier"} />
         </NavLink>
      </>
   )
}

export default NavMenuLayout
