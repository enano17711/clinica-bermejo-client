import React from "react"
import { Breadcrumbs, Kbd } from "@mantine/core"
import { Link } from "react-router-dom"

const CustomBreadcrumbs = ({ routes }) => (
   <Breadcrumbs>
      {routes.map((route) => (
         <Link to={route.path} key={route.path}>
            <Kbd>{route.title}</Kbd>
         </Link>
      ))}
   </Breadcrumbs>
)
export default CustomBreadcrumbs
