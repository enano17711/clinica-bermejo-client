import React from "react"
import { NavLink as NavRouterLink } from "react-router-dom"
import { NavLink } from "@mantine/core"

const NavItemMenuLayout = ({ rute, label }) => {
   return (
      <NavRouterLink to={`/${rute}`} style={{ textDecoration: "none" }}>
         {({ isActive, isPending }) => (
            <NavLink
               active={isActive}
               label={label}
               component="a"
               variant="filled"
               color="violet"
               sx={(theme) => ({
                  borderRadius: theme.radius.md,
               })}
            />
         )}
      </NavRouterLink>
   )
}

export default NavItemMenuLayout
