import { Button, Drawer, Group, Stack, Title } from "@mantine/core"
import React, { useEffect, useState } from "react"
import { IconDeviceFloppy, IconPencil, IconTrash } from "@tabler/icons-react"
import { Link } from "react-router-dom"
import { useAtomValue, useSetAtom } from "jotai"
import {
   deleteSupplierDataAtom,
   openSupplierDeleteModalAtom,
} from "../../../store/jotai/atoms/SupplierAtoms.js"
import { iconSizeButtonsAtom } from "../../../store/jotai/atoms/VisualAtom.js"
import { useUpdateModel } from "../../../hooks/useUpdateModel.jsx"
import TextInputForUpdate from "../../../components/TextInputForUpdate.jsx"
import DatePickerInputForUpdate from "../../../components/DatePickerInputForUpdate.jsx"

const DrawerDetailsSupplier = ({
   openDrawerSupplier,
   supplier,
   setOpenDrawerSupplier,
}) => {
   const [inputsEnabled, setInputsEnabled] = useState(false)
   const [supplierUpdateData, setSupplierUpdateData] = useState({})

   const {
      mutate: updateSupplier,
      updateModelIsLoading: updateSupplierIsLoading,
   } = useUpdateModel("Supplier")

   const setDeleteSupplierData = useSetAtom(deleteSupplierDataAtom)
   const setOpenDeleteModal = useSetAtom(openSupplierDeleteModalAtom)
   const iconSizeButtons = useAtomValue(iconSizeButtonsAtom)

   const handleSubmit = (e) => {
      e.stopPropagation()
      e.preventDefault()
      if (
         [
            supplierUpdateData.name,
            supplierUpdateData.surname,
            supplierUpdateData.ci,
            supplierUpdateData.phoneNumber,
         ].includes("")
      )
         return

      const convertDate =
         supplierUpdateData.date !== undefined || true
            ? new Date(supplierUpdateData.date)
            : null

      updateSupplier({ ...supplierUpdateData, date: convertDate.toISOString() })
      setOpenDrawerSupplier(false)
      setInputsEnabled(false)
   }

   const handleEnableInputs = (e) => {
      e.stopPropagation()
      setInputsEnabled(true)
   }

   const handleCloseDrawer = () => {
      setOpenDrawerSupplier(false)
      setInputsEnabled(false)
   }

   const deleteSupplierHandler = () => {
      setDeleteSupplierData(supplierUpdateData)
      setOpenDrawerSupplier(false)
      setInputsEnabled(false)
      setOpenDeleteModal(true)
   }

   useEffect(() => {
      setSupplierUpdateData({
         id: supplier?.id,
         name: supplier?.name,
         surname: supplier?.surname,
         ci: supplier?.ci,
         email: supplier?.email,
         phoneNumber: supplier?.phoneNumber,
         date: supplier?.date,
         address: supplier?.address,
         nit: supplier?.nit,
         orders: supplier?.orders,
      })
   }, [supplier, inputsEnabled])

   return (
      <Drawer
         position="right"
         opened={openDrawerSupplier}
         onClose={handleCloseDrawer}
         title={<Title order={4}>{`${supplier?.name?.split(" ")[0]}`}</Title>}
      >
         <Stack>
            <TextInputForUpdate
               name="Name"
               model="Supplier"
               enabled={!inputsEnabled}
               state={supplierUpdateData.name}
               setState={setSupplierUpdateData}
               error
            />
            <TextInputForUpdate
               name="Surname"
               model="Supplier"
               enabled={!inputsEnabled}
               state={supplierUpdateData.surname}
               setState={setSupplierUpdateData}
               error
            />
            <TextInputForUpdate
               name="Ci"
               model="Supplier"
               enabled={!inputsEnabled}
               state={supplierUpdateData.ci}
               setState={setSupplierUpdateData}
               error
            />
            <TextInputForUpdate
               name="Email"
               model="Supplier"
               enabled={!inputsEnabled}
               state={supplierUpdateData.email}
               setState={setSupplierUpdateData}
               error
            />
            <TextInputForUpdate
               name="PhoneNumber"
               model="Supplier"
               enabled={!inputsEnabled}
               state={supplierUpdateData.phoneNumber}
               setState={setSupplierUpdateData}
               error
            />
            <DatePickerInputForUpdate
               name="Date"
               model="Supplier"
               enabled={!inputsEnabled}
               state={supplierUpdateData.date}
               setState={setSupplierUpdateData}
            />
            <TextInputForUpdate
               name="Address"
               model="Supplier"
               enabled={!inputsEnabled}
               state={supplierUpdateData.address}
               setState={setSupplierUpdateData}
               error
            />
            <TextInputForUpdate
               name="Nit"
               model="Supplier"
               enabled={!inputsEnabled}
               state={supplierUpdateData.nit}
               setState={setSupplierUpdateData}
               error
            />

            {inputsEnabled === false ? (
               <Group position="right">
                  <Button
                     leftIcon={<IconPencil size={iconSizeButtons} />}
                     onClick={handleEnableInputs}
                  >
                     Editar
                  </Button>
                  <Link to={`/supplier/${supplier.id}`}>
                     <Button>Detalles</Button>
                  </Link>
                  <Button
                     color="red"
                     leftIcon={<IconTrash size={iconSizeButtons} />}
                     onClick={deleteSupplierHandler}
                  >
                     Eliminar
                  </Button>
               </Group>
            ) : (
               <Group position="right">
                  <Button
                     leftIcon={<IconDeviceFloppy size={iconSizeButtons} />}
                     onClick={handleSubmit}
                     disabled={updateSupplierIsLoading}
                  >
                     Guardar
                  </Button>
                  <Button
                     onClick={() => setInputsEnabled(false)}
                     disabled={updateSupplierIsLoading}
                  >
                     Cancelar
                  </Button>
                  <Button
                     color="red"
                     leftIcon={<IconTrash size={iconSizeButtons} />}
                     onClick={deleteSupplierHandler}
                  >
                     Eliminar
                  </Button>
               </Group>
            )}
         </Stack>
      </Drawer>
   )
}

export default DrawerDetailsSupplier
