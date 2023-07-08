import React, { useState } from "react"
import OptionsTableSection from "../../components/OptionsTableSection.jsx"
import { Card } from "@mantine/core"
import DataTable from "react-data-table-component"
import ModalDeleteUnit from "./components/ModalDeleteUnit.jsx"
import DrawerDetailsUnit from "./components/DrawerDetailsUnit.jsx"
import ModalCreateUnit from "./components/ModalCreateUnits.jsx"
import { useGetArrayModels } from "../../hooks/useGetArrayModels.jsx"
import { usePagination } from "../../hooks/usePagination.jsx"
import CustomBreadcrumbs from "../../components/CustomBreadCrumbs.jsx"
import { useColumnsMainDataTable } from "../../hooks/useColumnsMainDataTable.jsx"
import { unitModelSchemaForView } from "../../dataTests/unitModel.js"

const routes = [
   { path: "/", title: "Inicio" },
   { path: "/unit", title: "Unidades" },
]
const Index = () => {
   const [opened, setOpened] = useState(false)
   const [openDrawerUnit, setOpenDrawerUnit] = useState(false)
   const [unitForDrawer, setUnitForDrawer] = useState({})
   const [valueSearch, setValueSearch] = useState("")
   const [columnSearch, setColumnSearch] = useState("name")
   const [columnVisibleValue, setColumnVisibleValue] = useState([])

   const { pageSize, pageNumber, handlePageChange, handlePerRowsChange } =
      usePagination(10, 1)

   const { modelsData: unitsData, headerData } = useGetArrayModels(
      pageNumber,
      pageSize,
      columnSearch,
      valueSearch.length > 2 ? valueSearch : "",
      "Unit"
   )
   const { columnsTableModel, columnsForSearchModel } = useColumnsMainDataTable(
      unitModelSchemaForView,
      columnVisibleValue
   )

   const handleRowSelect = ({ selectedRows }) => {
      if (selectedRows.length > 0) {
         setUnitForDrawer(selectedRows[0])
         setOpenDrawerUnit(true)
      }
   }

   return (
      <>
         <ModalCreateUnit opened={opened} setOpened={setOpened} />
         <ModalDeleteUnit />
         <DrawerDetailsUnit
            unit={unitForDrawer}
            openDrawerUnit={openDrawerUnit}
            setOpenDrawerUnit={setOpenDrawerUnit}
         />
         <Card>
            <Card.Section
               inheritPadding
               py="sm"
               withBorder
               sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "20px",
               }}
            >
               <CustomBreadcrumbs routes={routes} />
               <OptionsTableSection
                  setOpened={setOpened}
                  columnSearch={columnSearch}
                  setColumnSearch={setColumnSearch}
                  columnsForSearchData={columnsForSearchModel}
                  columnVisibleValue={columnVisibleValue}
                  setColumnVisibleValue={setColumnVisibleValue}
                  valueSearch={valueSearch}
                  setValueSearch={setValueSearch}
               />
            </Card.Section>
            <Card.Section inheritPadding mih={200}>
               <DataTable
                  data={unitsData}
                  columns={columnsTableModel}
                  responsive
                  pagination
                  paginationPerPage={5}
                  paginationRowsPerPageOptions={[5, 10, 25, 50]}
                  paginationTotalRows={headerData.TotalCount}
                  paginationServer
                  onChangeRowsPerPage={handlePerRowsChange}
                  onChangePage={handlePageChange}
                  selectableRows
                  selectableRowsNoSelectAll
                  selectableRowsSingle
                  onSelectedRowsChange={handleRowSelect}
                  fixedHeader
                  fixedHeaderScrollHeight={"100vh"}
               />
            </Card.Section>
         </Card>
      </>
   )
}

export default Index
