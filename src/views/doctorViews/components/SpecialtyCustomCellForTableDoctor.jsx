import React from "react"
import { Badge } from "@mantine/core"
import { specialTyTypes } from "../../../utils/index.js"

const SpecialtyCustomCellForTableDoctor = ({ row }) => {
   return <Badge variant="outline">{specialTyTypes[row.specialty]}</Badge>
}

export default SpecialtyCustomCellForTableDoctor
