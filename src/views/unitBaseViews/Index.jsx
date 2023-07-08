import React, { useState } from "react"
import OptionsTableSection from "../../components/OptionsTableSection.jsx"
import { Card } from "@mantine/core"
import DataTable from "react-data-table-component"
import ModalDeleteUnitBase from "./components/ModalDeleteUnitBase.jsx"
import DrawerDetailsUnitBase from "./components/DrawerDetailsUnitBase.jsx"
import ModalCreateUnitBase from "./components/ModalCreateUnitBase.jsx"
import { useGetArrayModels } from "../../hooks/useGetArrayModels.jsx"
import { usePagination } from "../../hooks/usePagination.jsx"
import CustomBreadcrumbs from "../../components/CustomBreadCrumbs.jsx"
import { useColumnsMainDataTable } from "../../hooks/useColumnsMainDataTable.jsx"
import { unitBaseModelSchemaForView } from "../../dataTests/unitBaseModel.js"

const routes = [
   { path: "/", title: "Inicio" },
   { path: "/unitBase", title: "Unidades Base" },
]
const Index = () => {
   const [opened, setOpened] = useState(false)
   const [openDrawerUnitBase, setOpenDrawerUnitBase] = useState(false)
   const [unitBaseForDrawer, setUnitBaseForDrawer] = useState({})
   const [valueSearch, setValueSearch] = useState("")
   const [columnSearch, setColumnSearch] = useState("name")
   const [columnVisibleValue, setColumnVisibleValue] = useState([])

   const { pageSize, pageNumber, handlePageChange, handlePerRowsChange } =
      usePagination(10, 1)

   const { modelsData: unitBasesData, headerData } = useGetArrayModels(
      pageNumber,
      pageSize,
      columnSearch,
      valueSearch.length > 2 ? valueSearch : "",
      "UnitBase"
   )
   const { columnsTableModel, columnsForSearchModel } = useColumnsMainDataTable(
      unitBaseModelSchemaForView,
      columnVisibleValue
   )

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
                  data={unitBasesData}
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
