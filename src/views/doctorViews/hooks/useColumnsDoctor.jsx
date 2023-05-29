import React, { useMemo } from "react"
import { ActionIcon, Menu } from "@mantine/core"
import {
   IconAdjustments,
   IconNotes,
   IconPencil,
   IconTrash,
} from "@tabler/icons-react"
import SpecialtyCustomCellForTableDoctor from "../components/SpecialtyCustomCellForTableDoctor.jsx"
import { useSetAtom } from "jotai"
import {
   deleteDoctorDataAtom,
   doctorUpdateDataAtom,
   openDoctorDeleteModalAtom,
   openDoctorEditModalAtom,
} from "../../../store/jotai/atoms/DoctorAtoms.js"

export const useColumnsDoctor = (columnVisibleValue) => {
   const setOpenEditModal = useSetAtom(openDoctorEditModalAtom)
   const setDoctorUpdateData = useSetAtom(doctorUpdateDataAtom)
   const setDeleteDoctorData = useSetAtom(deleteDoctorDataAtom)
   const setOpenDeleteModal = useSetAtom(openDoctorDeleteModalAtom)

   const detailsDoctorHandler = (data) => {}
   const updateDoctorHandler = (data) => {
      setDoctorUpdateData(data)
      setOpenEditModal(true)
   }

   const deleteDoctorHandler = (data) => {
      setDeleteDoctorData(data)
      setOpenDeleteModal(true)
   }

   const columnsTableDoctor = useMemo(
      () => [
         {
            name: "Id",
            selector: (row) => row.id,
            sortable: true,
            omit: columnVisibleValue.includes("id"),
         },
         {
            name: "Nombre",
            selector: (row) => row.name,
            sortable: true,
            omit: columnVisibleValue.includes("name"),
         },
         {
            name: "Apellido",
            selector: (row) => row.surname,
            sortable: true,
            omit: columnVisibleValue.includes("surname"),
         },
         {
            name: "Matricula",
            selector: (row) => row.registerNumber,
            omit: columnVisibleValue.includes("registerNumber"),
         },
         {
            name: "Especialidad",
            selector: (row) => row.specialty,
            sortable: true,
            cell: (row) => <SpecialtyCustomCellForTableDoctor row={row} />,
            omit: columnVisibleValue.includes("specialty"),
         },
         {
            name: "Telefono/Celular",
            selector: (row) => row.phoneNumber,
            sortable: true,
            omit: columnVisibleValue.includes("phoneNumber"),
         },
         {
            name: "C.I.",
            selector: (row) => row.ci,
            sortable: true,
            omit: columnVisibleValue.includes("ci"),
         },
         {
            name: "Correro Elec.",
            selector: (row) => row.email,
            sortable: true,
            omit: columnVisibleValue.includes("email"),
         },
         {
            name: "Nacimiento",
            selector: (row) => row.date,
            sortable: true,
            omit: columnVisibleValue.includes("date"),
            format: (row) => new Date(row.date).toLocaleDateString(),
         },
         {
            name: "Dirección",
            selector: (row) => row.address,
            sortable: true,
            omit: columnVisibleValue.includes("address"),
         },
         /*         {
            name: "Opciones",
            ignoreRowClick: true,
            grow: 0,
            omit: true,
            cell: (row) => (
               <Menu shadow="md" width={100}>
                  <Menu.Target>
                     <ActionIcon>
                        <IconAdjustments size={14} />
                     </ActionIcon>
                  </Menu.Target>

                  <Menu.Dropdown>
                     <Menu.Item
                        icon={<IconNotes size={14} />}
                        onClick={() => detailsDoctorHandler(row)}
                     >
                        Detalles
                     </Menu.Item>
                     <Menu.Item
                        icon={<IconPencil size={14} />}
                        onClick={() => updateDoctorHandler(row)}
                     >
                        Editar
                     </Menu.Item>
                     <Menu.Item
                        icon={<IconTrash size={14} />}
                        onClick={() => deleteDoctorHandler(row)}
                     >
                        Eliminar
                     </Menu.Item>
                  </Menu.Dropdown>
               </Menu>
            ),
         },*/
      ],
      [columnVisibleValue]
   )

   const columnsForSearchDoctor = useMemo(
      () => [
         { value: "id", label: "Id" },
         { value: "name", label: "Nombre" },
         { value: "surname", label: "Apellido" },
         { value: "registerNumber", label: "Matricula" },
         { value: "specialty", label: "Especialidad" },
         { value: "phoneNumber", label: "Telefono/Celular" },
         { value: "ci", label: "C.I." },
         { value: "email", label: "Correro Elec." },
         { value: "date", label: "Nacimiento" },
         { value: "address", label: "Dirección" },
      ],
      []
   )
   return { columnsTableDoctor, columnsForSearchDoctor }
}
