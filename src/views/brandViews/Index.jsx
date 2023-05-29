import React, { useState } from "react"
import { useBrands } from "./hooks/useBrands.jsx"
import { Card } from "@mantine/core"
import { useColumnsBrand } from "./hooks/useColumnsBrand.jsx"
import DataTable from "react-data-table-component"
import ModalCreateBrand from "./components/ModalCreateBrand.jsx"
import ModalDeleteBrand from "./components/ModalDeleteBrand.jsx"
import DrawerDetailsBrand from "./components/DrawerDetailsBrand.jsx"
import OptionsTableSection from "../../components/OptionsTableSection.jsx"

const Index = () => {
   const [opened, setOpened] = useState(false)
   const [openDrawerBrand, setOpenDrawerBrand] = useState(false)
   const [brandForDrawer, setBrandForDrawer] = useState({})
   const [valueSearch, setValueSearch] = useState("")
   const [columnSearch, setColumnSearch] = useState("name")
   const [pageSize, setPageSize] = useState(10)
   const [pageNumber, setPageNumber] = useState(1)
   const [columnVisibleValue, setColumnVisibleValue] = useState([])

   const { brandsData, headerData } = useBrands(
      pageNumber,
      pageSize,
      columnSearch,
      valueSearch.length > 2 ? valueSearch : ""
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

   const handleRowSelect = ({ allSelected, selectedCount, selectedRows }) => {
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
            <Card.Section inheritPadding py="sm" withBorder>
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
