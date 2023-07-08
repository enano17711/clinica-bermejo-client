import React, { useState } from "react"
import { Card } from "@mantine/core"
import DataTable from "react-data-table-component"
import ModalCreateBrand from "./components/ModalCreateBrand.jsx"
import ModalDeleteBrand from "./components/ModalDeleteBrand.jsx"
import DrawerDetailsBrand from "./components/DrawerDetailsBrand.jsx"
import OptionsTableSection from "../../components/OptionsTableSection.jsx"
import { useGetArrayModels } from "../../hooks/useGetArrayModels.jsx"
import { usePagination } from "../../hooks/usePagination.jsx"
import CustomBreadCrumbs from "../../components/CustomBreadCrumbs.jsx"
import { useColumnsMainDataTable } from "../../hooks/useColumnsMainDataTable.jsx"
import { brandModelSchemaForView } from "../../dataTests/brandModel.js"

const routes = [
   { path: "/", title: "Inicio" },
   { path: "/brand", title: "Marcas" },
]

const Index = () => {
   const [opened, setOpened] = useState(false)
   const [openDrawerBrand, setOpenDrawerBrand] = useState(false)
   const [brandForDrawer, setBrandForDrawer] = useState({})
   const [valueSearch, setValueSearch] = useState("")
   const [columnSearch, setColumnSearch] = useState("name")
   const [columnVisibleValue, setColumnVisibleValue] = useState([])

   const { pageSize, pageNumber, handlePageChange, handlePerRowsChange } =
      usePagination(10, 1)

   const { modelsData: brandsData, headerData } = useGetArrayModels(
      pageNumber,
      pageSize,
      columnSearch,
      valueSearch.length > 2 ? valueSearch : "",
      "Brand"
   )
   const {
      columnsTableModel: columnsTableBrand,
      columnsForSearchModel: columnsForSearchBrand,
   } = useColumnsMainDataTable(brandModelSchemaForView, columnVisibleValue)

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
               <CustomBreadCrumbs routes={routes} />
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
