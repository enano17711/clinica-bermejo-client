import React, { useState } from "react"
import { useColumnsUnitBase } from "./hooks/useColumnsUnitBase.jsx"
import OptionsTableSection from "../../components/OptionsTableSection.jsx"
import { Link } from "react-router-dom"
import { Breadcrumbs, Card, Kbd } from "@mantine/core"
import DataTable from "react-data-table-component"
import ModalDeleteUnitBase from "./components/ModalDeleteUnitBase.jsx"
import DrawerDetailsUnitBase from "./components/DrawerDetailsUnitBase.jsx"
import ModalCreateUnitBase from "./components/ModalCreateUnitBase.jsx"
import { useGetArrayModel } from "../../hooks/useGetArrayModel.jsx"

const Index = () => {
   const [opened, setOpened] = useState(false)
   const [openDrawerUnitBase, setOpenDrawerUnitBase] = useState(false)
   const [unitBaseForDrawer, setUnitBaseForDrawer] = useState({})
   const [valueSearch, setValueSearch] = useState("")
   const [columnSearch, setColumnSearch] = useState("name")
   const [pageSize, setPageSize] = useState(10)
   const [pageNumber, setPageNumber] = useState(1)
   const [columnVisibleValue, setColumnVisibleValue] = useState([])

   const { modelsData: unitBasesData, headerData } = useGetArrayModel(
      pageNumber,
      pageSize,
      columnSearch,
      valueSearch.length > 2 ? valueSearch : "",
      "UnitBase"
   )
   const { columnsTableUnitBase, columnsForSearchUnitBase } =
      useColumnsUnitBase(columnVisibleValue)

   const handlePageChange = (page) => {
      setPageNumber(page)
   }

   const handlePerRowsChange = async (newPerPage, page) => {
      setPageSize(newPerPage)
      setPageNumber(page)
   }

   const handleRowSelect = ({ selectedRows }) => {
      if (selectedRows.length > 0) {
         setUnitBaseForDrawer(selectedRows[0])
         setOpenDrawerUnitBase(true)
      }
   }

   return (
      <>
         <ModalCreateUnitBase opened={opened} setOpened={setOpened} />
         <ModalDeleteUnitBase />
         <DrawerDetailsUnitBase
            unitBase={unitBaseForDrawer}
            openDrawerUnitBase={openDrawerUnitBase}
            setOpenDrawerUnitBase={setOpenDrawerUnitBase}
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
                  <Link to="/unitBase">
                     <Kbd>Unidades Base</Kbd>
                  </Link>
               </Breadcrumbs>
               <OptionsTableSection
                  setOpened={setOpened}
                  columnSearch={columnSearch}
                  setColumnSearch={setColumnSearch}
                  columnsForSearchData={columnsForSearchUnitBase}
                  columnVisibleValue={columnVisibleValue}
                  setColumnVisibleValue={setColumnVisibleValue}
                  valueSearch={valueSearch}
                  setValueSearch={setValueSearch}
               />
            </Card.Section>
            <Card.Section inheritPadding mih={200}>
               <DataTable
                  data={unitBasesData}
                  columns={columnsTableUnitBase}
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
