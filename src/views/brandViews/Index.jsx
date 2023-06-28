import React, { useState } from "react"
import { Breadcrumbs, Card, Kbd } from "@mantine/core"
import { useColumnsBrand } from "./hooks/useColumnsBrand.jsx"
import DataTable from "react-data-table-component"
import ModalCreateBrand from "./components/ModalCreateBrand.jsx"
import ModalDeleteBrand from "./components/ModalDeleteBrand.jsx"
import DrawerDetailsBrand from "./components/DrawerDetailsBrand.jsx"
import OptionsTableSection from "../../components/OptionsTableSection.jsx"
import { Link } from "react-router-dom"
import { useGetArrayModel } from "../../hooks/useGetArrayModel.jsx"

const Index = () => {
   const [opened, setOpened] = useState(false)
   const [openDrawerBrand, setOpenDrawerBrand] = useState(false)
   const [brandForDrawer, setBrandForDrawer] = useState({})
   const [valueSearch, setValueSearch] = useState("")
   const [columnSearch, setColumnSearch] = useState("name")
   const [pageSize, setPageSize] = useState(10)
   const [pageNumber, setPageNumber] = useState(1)
   const [columnVisibleValue, setColumnVisibleValue] = useState([])

   const { modelsData: brandsData, headerData } = useGetArrayModel(
      pageNumber,
      pageSize,
      columnSearch,
      valueSearch.length > 2 ? valueSearch : "",
      "Brand"
   )
   const { columnsTableBrand, columnsForSearchBrand } =
      useColumnsBrand(columnVisibleValue)

   const handlePageChange = (page) => {
      setPageNumber(page)
   }

   const handlePerRowsChange = async (newPerPage, page) => {
      setPageSize(newPerPage)
      setPageNumber(page)
   }

   const handleRowSelect = ({ selectedRows }) => {
      if (selectedRows.length > 0) {
         setBrandForDrawer(selectedRows[0])
         setOpenDrawerBrand(true)
      }
   }

   return (
      <>
         <ModalCreateBrand opened={opened} setOpened={setOpened} />
         <ModalDeleteBrand />
         <DrawerDetailsBrand
            brand={brandForDrawer}
            openDrawerBrand={openDrawerBrand}
            setOpenDrawerBrand={setOpenDrawerBrand}
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
                  <Link to="/brand">
                     <Kbd>Marcas</Kbd>
                  </Link>
               </Breadcrumbs>
               <OptionsTableSection
                  setOpened={setOpened}
                  columnSearch={columnSearch}
                  setColumnSearch={setColumnSearch}
                  columnsForSearchData={columnsForSearchBrand}
                  columnVisibleValue={columnVisibleValue}
                  setColumnVisibleValue={setColumnVisibleValue}
                  valueSearch={valueSearch}
                  setValueSearch={setValueSearch}
               />
            </Card.Section>
            <Card.Section inheritPadding mih={200}>
               <DataTable
                  data={brandsData}
                  columns={columnsTableBrand}
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
