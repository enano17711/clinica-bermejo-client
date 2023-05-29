import React from "react"
import { Card, TextInput } from "@mantine/core"
import DataTable from "react-data-table-component"
import { useColumnsCitas } from "./useColumnsCitas.jsx"
import { useDoctor } from "../../hooks/useDoctor.jsx"
import { useSearchTextTable } from "../../hooks/useSearchTextTable.jsx"
import { IconSearch } from "@tabler/icons-react"

const CitasTabDetailDoctor = ({}) => {
   const { doctorData } = useDoctor("79deab8d-0256-4a83-5f5a-08db4fe01d07")
   const { columnsTableCitas } = useColumnsCitas()

   const { filterRows, filterText, setFilterText } = useSearchTextTable(
      doctorData?.appointments
   )
   return (
      <Card>
         <Card.Section>
            <TextInput
               value={filterText}
               onChange={(e) => setFilterText(e.target.value)}
               placeholder="Buscar Departamento"
               icon={<IconSearch />}
            />
            <DataTable
               columns={columnsTableCitas}
               data={filterRows}
               responsive
               pagination
            />
         </Card.Section>
      </Card>
   )
}

export default CitasTabDetailDoctor
