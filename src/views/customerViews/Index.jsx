import React, { useState } from "react"
import OptionsTableSection from "../../components/OptionsTableSection.jsx"
import { Card } from "@mantine/core"
import DataTable from "react-data-table-component"
import ModalDeleteCustomer from "./components/ModalDeleteCustomer.jsx"
import DrawerDetailsCustomer from "./components/DrawerDetailsCustomer.jsx"
import ModalCreateCustomer from "./components/ModalCreateCustomer.jsx"
import { useGetArrayModels } from "../../hooks/useGetArrayModels.jsx"
import { usePagination } from "../../hooks/usePagination.jsx"
import CustomBreadcrumbs from "../../components/CustomBreadCrumbs.jsx"
import { useColumnsMainDataTable } from "../../hooks/useColumnsMainDataTable.jsx"
import { customerModelSchemaForView } from "../../dataTests/customerModel.js"

const routes = [
   { path: "/", title: "Inicio" },
   { path: "/customer", title: "Clientes" },
]
const Index = () => {
   const [opened, setOpened] = useState(false)
   const [openDrawerCustomer, setOpenDrawerCustomer] = useState(false)
   const [customerForDrawer, setCustomerForDrawer] = useState({})
   const [valueSearch, setValueSearch] = useState("")
   const [columnSearch, setColumnSearch] = useState("name")
   const [columnVisibleValue, setColumnVisibleValue] = useState([])

   const { pageSize, pageNumber, handlePageChange, handlePerRowsChange } =
      usePagination(10, 1)

   const { modelsData: customersData, headerData } = useGetArrayModels(
      pageNumber,
      pageSize,
      columnSearch,
      valueSearch.length > 2 ? valueSearch : "",
      "Customer"
   )
   const { columnsTableModel, columnsForSearchModel } = useColumnsMainDataTable(
      customerModelSchemaForView,
      columnVisibleValue
   )

   const handleRowSelect = ({ selectedRows }) => {
      if (selectedRows.length > 0) {
         setCustomerForDrawer(selectedRows[0])
         setOpenDrawerCustomer(true)
      }
   }

   return (
      <>
         <ModalCreateCustomer opened={opened} setOpened={setOpened} />
         <ModalDeleteCustomer />
         <DrawerDetailsCustomer
            customer={customerForDrawer}
            openDrawerCustomer={openDrawerCustomer}
            setOpenDrawerCustomer={setOpenDrawerCustomer}
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
                  data={customersData}
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
