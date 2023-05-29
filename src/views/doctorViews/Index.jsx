import React, { useState } from "react"
import { useDoctors } from "./hooks/useDoctors.jsx"
import {
   ActionIcon,
   Button,
   Card,
   Group,
   MultiSelect,
   NativeSelect,
   Popover,
   TextInput,
} from "@mantine/core"
import { IconFileDownload, IconPlus, IconSearch } from "@tabler/icons-react"
import { useColumnsDoctor } from "./hooks/useColumnsDoctor.jsx"
import DataTable from "react-data-table-component"
import ModalCreateDoctor from "./components/ModalCreateDoctor.jsx"
import ModalUpdateDoctor from "./components/ModalUpdateDoctor.jsx"
import ModalDeleteDoctor from "./components/ModalDeleteDoctor.jsx"
import DrawerDetailsDoctor from "./components/DrawerDetailsDoctor.jsx"
import { useAtom, useAtomValue } from "jotai"
import {
   buttonCompactAtom,
   iconSizeButtonsAtom,
} from "../../store/jotai/atoms/VisualAtom.js"
import OptionsTableSection from "../../components/OptionsTableSection.jsx"

const Index = () => {
   const [opened, setOpened] = useState(false)
   const [openDrawerDoctor, setOpenDrawerDoctor] = useState(false)
   const [doctorForDrawer, setDoctorForDrawer] = useState({})
   const [valueSearch, setValueSearch] = useState("")
   const [columnSearch, setColumnSearch] = useState("name")
   const [pageSize, setPageSize] = useState(10)
   const [pageNumber, setPageNumber] = useState(1)
   const [columnVisibleValue, setColumnVisibleValue] = useState([])

   // const iconSizeButtons = useAtomValue(iconSizeButtonsAtom)

   const { doctorsData, headerData } = useDoctors(
      pageNumber,
      pageSize,
      columnSearch,
      valueSearch.length > 2 ? valueSearch : ""
   )
   const { columnsTableDoctor, columnsForSearchDoctor } =
      useColumnsDoctor(columnVisibleValue)

   const handlePageChange = (page) => {
      setPageNumber(page)
   }

   const handlePerRowsChange = async (newPerPage, page) => {
      setPageSize(newPerPage)
      setPageNumber(page)
   }

   const handleRowSelect = ({ allSelected, selectedCount, selectedRows }) => {
      if (selectedRows.length > 0) {
         setDoctorForDrawer(selectedRows[0])
         setOpenDrawerDoctor(true)
      }
   }

   return (
      <>
         <ModalCreateDoctor opened={opened} setOpened={setOpened} />
         {/*<ModalUpdateDoctor />*/}
         <ModalDeleteDoctor />
         <DrawerDetailsDoctor
            doctor={doctorForDrawer}
            openDrawerDoctor={openDrawerDoctor}
            setOpenDrawerDoctor={setOpenDrawerDoctor}
         />
         <Card>
            <Card.Section inheritPadding py="sm" withBorder>
               <OptionsTableSection
                  setOpened={setOpened}
                  columnSearch={columnSearch}
                  setColumnSearch={setColumnSearch}
                  columnsForSearchData={columnsForSearchDoctor}
                  columnVisibleValue={columnVisibleValue}
                  setColumnVisibleValue={setColumnVisibleValue}
                  valueSearch={valueSearch}
                  setValueSearch={setValueSearch}
               />
            </Card.Section>
            <Card.Section inheritPadding mih={200}>
               <DataTable
                  data={doctorsData}
                  columns={columnsTableDoctor}
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
