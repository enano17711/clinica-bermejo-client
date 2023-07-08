import React, { useState } from "react"
import OptionsTableSection from "../../components/OptionsTableSection.jsx"
import { Card } from "@mantine/core"
import DataTable from "react-data-table-component"
import ModalDeleteSupplier from "./components/ModalDeleteSuplier.jsx"
import DrawerDetailsSupplier from "./components/DrawerDetailsSupplier.jsx"
import ModalCreateSupplier from "./components/ModalCreateSupplier.jsx"
import { useGetArrayModels } from "../../hooks/useGetArrayModels.jsx"
import { usePagination } from "../../hooks/usePagination.jsx"
import CustomBreadcrumbs from "../../components/CustomBreadCrumbs.jsx"
import { useColumnsMainDataTable } from "../../hooks/useColumnsMainDataTable.jsx"
import { supplierModelSchemaForView } from "../../dataTests/supplierModel.js"

const routes = [
   { path: "/", title: "Inicio" },
   { path: "/supplier", title: "Proveedores" },
]
const Index = () => {
   const [opened, setOpened] = useState(false)
   const [openDrawerSupplier, setOpenDrawerSupplier] = useState(false)
   const [supplierForDrawer, setSupplierForDrawer] = useState({})
   const [valueSearch, setValueSearch] = useState("")
   const [columnSearch, setColumnSearch] = useState("name")
   const [columnVisibleValue, setColumnVisibleValue] = useState([])

   const { pageSize, pageNumber, handlePageChange, handlePerRowsChange } =
      usePagination(10, 1)

   const { modelsData: suppliersData, headerData } = useGetArrayModels(
      pageNumber,
      pageSize,
      columnSearch,
      valueSearch.length > 2 ? valueSearch : "",
      "Supplier"
   )
   const { columnsTableModel, columnsForSearchModel } = useColumnsMainDataTable(
      supplierModelSchemaForView,
      columnVisibleValue
   )

   const handleRowSelect = ({ selectedRows }) => {
      if (selectedRows.length > 0) {
         setSupplierForDrawer(selectedRows[0])
         setOpenDrawerSupplier(true)
      }
   }

   return (
      <>
         <ModalCreateSupplier opened={opened} setOpened={setOpened} />
         <ModalDeleteSupplier />
         <DrawerDetailsSupplier
            supplier={supplierForDrawer}
            openDrawerSupplier={openDrawerSupplier}
            setOpenDrawerSupplier={setOpenDrawerSupplier}
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
                  data={suppliersData}
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
