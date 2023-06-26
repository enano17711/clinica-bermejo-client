import React, { useState } from "react"
import { useColumnsUnit } from "./hooks/useColumnsUnit.jsx"
import { useUnits } from "./hooks/useUnits.jsx"
import OptionsTableSection from "../../components/OptionsTableSection.jsx"
import { Link } from "react-router-dom"
import { Breadcrumbs, Card, Kbd } from "@mantine/core"
import DataTable from "react-data-table-component"
import ModalDeleteUnit from "./components/ModalDeleteUnit.jsx"
import DrawerDetailsUnit from "./components/DrawerDetailsUnit.jsx"
import ModalCreateUnit from "./components/ModalCreateUnits.jsx"

const Index = () => {
   const [opened, setOpened] = useState(false)
   const [openDrawerUnit, setOpenDrawerUnit] = useState(false)
   const [unitForDrawer, setUnitForDrawer] = useState({})
   const [valueSearch, setValueSearch] = useState("")
   const [columnSearch, setColumnSearch] = useState("name")
   const [pageSize, setPageSize] = useState(10)
   const [pageNumber, setPageNumber] = useState(1)
   const [columnVisibleValue, setColumnVisibleValue] = useState([])

   const { unitsData, headerData } = useUnits(
      pageNumber,
      pageSize,
      columnSearch,
      valueSearch.length > 2 ? valueSearch : ""
   )
   const { columnsTableUnit, columnsForSearchUnit } =
      useColumnsUnit(columnVisibleValue)

   const handlePageChange = (page) => {
      setPageNumber(page)
   }

   const handlePerRowsChange = async (newPerPage, page) => {
      setPageSize(newPerPage)
      setPageNumber(page)
   }

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
               <Breadcrumbs>
                  <Link to="/">
                     <Kbd>Inicio</Kbd>
                  </Link>
                  <Link to="/unit">
                     <Kbd>Unidades</Kbd>
                  </Link>
               </Breadcrumbs>
               <OptionsTableSection
                  setOpened={setOpened}
                  columnSearch={columnSearch}
                  setColumnSearch={setColumnSearch}
                  columnsForSearchData={columnsForSearchUnit}
                  columnVisibleValue={columnVisibleValue}
                  setColumnVisibleValue={setColumnVisibleValue}
                  valueSearch={valueSearch}
                  setValueSearch={setValueSearch}
               />
            </Card.Section>
            <Card.Section inheritPadding mih={200}>
               <DataTable
                  data={unitsData}
                  columns={columnsTableUnit}
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
