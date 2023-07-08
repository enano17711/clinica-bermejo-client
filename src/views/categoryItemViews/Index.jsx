import React, { useState } from "react"
import OptionsTableSection from "../../components/OptionsTableSection.jsx"
import { Card } from "@mantine/core"
import DataTable from "react-data-table-component"
import ModalDeleteCategoryItem from "./components/ModalDeleteCategoryItem.jsx"
import DrawerDetailsCategoryItem from "./components/DrawerDetailsCategoryItem.jsx"
import ModalCreateCategoryItem from "./components/ModalCreateCategoryItems.jsx"
import { useGetArrayModels } from "../../hooks/useGetArrayModels.jsx"
import { usePagination } from "../../hooks/usePagination.jsx"
import CustomBreadcrumbs from "../../components/CustomBreadCrumbs.jsx"
import { useColumnsMainDataTable } from "../../hooks/useColumnsMainDataTable.jsx"
import { categoryItemModelSchemaForView } from "../../dataTests/categoryItemModel.js"

const routes = [
   { path: "/", title: "Inicio" },
   { path: "/categoryItem", title: "Categorías" },
]

const Index = () => {
   const [opened, setOpened] = useState(false)
   const [openDrawerCategoryItem, setOpenDrawerCategoryItem] = useState(false)
   const [categoryItemForDrawer, setCategoryItemForDrawer] = useState({})
   const [valueSearch, setValueSearch] = useState("")
   const [columnSearch, setColumnSearch] = useState("name")
   const [columnVisibleValue, setColumnVisibleValue] = useState([])
   const { pageSize, pageNumber, handlePageChange, handlePerRowsChange } =
      usePagination(10, 1)

   const { modelsData: categoryItemsData, headerData } = useGetArrayModels(
      pageNumber,
      pageSize,
      columnSearch,
      valueSearch.length > 2 ? valueSearch : "",
      "CategoryItem"
   )
   const {
      columnsTableModel: columnsTableCategoryItem,
      columnsForSearchModel: columnsForSearchCategoryItem,
   } = useColumnsMainDataTable(
      categoryItemModelSchemaForView,
      columnVisibleValue
   )

   const handleRowSelect = ({ selectedRows }) => {
      if (selectedRows.length > 0) {
         setCategoryItemForDrawer(selectedRows[0])
         setOpenDrawerCategoryItem(true)
      }
   }

   return (
      <>
         <ModalCreateCategoryItem opened={opened} setOpened={setOpened} />
         <ModalDeleteCategoryItem />
         <DrawerDetailsCategoryItem
            categoryItem={categoryItemForDrawer}
            openDrawerCategoryItem={openDrawerCategoryItem}
            setOpenDrawerCategoryItem={setOpenDrawerCategoryItem}
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
                  columnsForSearchData={columnsForSearchCategoryItem}
                  columnVisibleValue={columnVisibleValue}
                  setColumnVisibleValue={setColumnVisibleValue}
                  valueSearch={valueSearch}
                  setValueSearch={setValueSearch}
               />
            </Card.Section>
            <Card.Section inheritPadding mih={200}>
               <DataTable
                  data={categoryItemsData}
                  columns={columnsTableCategoryItem}
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
