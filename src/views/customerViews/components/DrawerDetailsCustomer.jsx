import { Button, Drawer, Group, Stack, Title } from "@mantine/core"
import React, { useEffect, useState } from "react"
import { IconDeviceFloppy, IconPencil, IconTrash } from "@tabler/icons-react"
import { Link } from "react-router-dom"
import { useAtomValue, useSetAtom } from "jotai"
import {
   deleteCustomerDataAtom,
   openCustomerDeleteModalAtom,
} from "../../../store/jotai/atoms/CustomerAtoms.js"
import { iconSizeButtonsAtom } from "../../../store/jotai/atoms/VisualAtom.js"
import { useUpdateModel } from "../../../hooks/useUpdateModel.jsx"
import TextInputForUpdate from "../../../components/TextInputForUpdate.jsx"
import DatePickerInputForUpdate from "../../../components/DatePickerInputForUpdate.jsx"

const DrawerDetailsCustomer = ({
   openDrawerCustomer,
   customer,
   setOpenDrawerCustomer,
}) => {
   const [inputsEnabled, setInputsEnabled] = useState(false)
   const [customerUpdateData, setCustomerUpdateData] = useState({})

   const {
      mutate: updateCustomer,
      updateModelIsLoading: updateCustomerIsLoading,
   } = useUpdateModel("Customer")

   const setDeleteCustomerData = useSetAtom(deleteCustomerDataAtom)
   const setOpenDeleteModal = useSetAtom(openCustomerDeleteModalAtom)
   const iconSizeButtons = useAtomValue(iconSizeButtonsAtom)

   const handleSubmit = (e) => {
      e.stopPropagation()
      e.preventDefault()
      if (
         [
            customerUpdateData.name,
            customerUpdateData.surname,
            customerUpdateData.ci,
            customerUpdateData.phoneNumber,
         ].includes("")
      )
         return

      const convertDate =
         customerUpdateData.date !== undefined || true
            ? new Date(customerUpdateData.date)
            : null

      updateCustomer({ ...customerUpdateData, date: convertDate.toISOString() })
      setOpenDrawerCustomer(false)
      setInputsEnabled(false)
   }

   const handleEnableInputs = (e) => {
      e.stopPropagation()
      setInputsEnabled(true)
   }

   const handleCloseDrawer = () => {
      setOpenDrawerCustomer(false)
      setInputsEnabled(false)
   }

   const deleteCustomerHandler = () => {
      setDeleteCustomerData(customerUpdateData)
      setOpenDrawerCustomer(false)
      setInputsEnabled(false)
      setOpenDeleteModal(true)
   }

   useEffect(() => {
      setCustomerUpdateData({
         id: customer?.id,
         name: customer?.name,
         surname: customer?.surname,
         ci: customer?.ci,
         email: customer?.email,
         phoneNumber: customer?.phoneNumber,
         date: customer?.date,
         address: customer?.address,
         nit: customer?.nit,
         sales: customer?.sales,
      })
   }, [customer, inputsEnabled])

   return (
      <Drawer
         position="right"
         opened={openDrawerCustomer}
         onClose={handleCloseDrawer}
         title={<Title order={4}>{`${customer?.name?.split(" ")[0]}`}</Title>}
      >
         <Stack>
            <TextInputForUpdate
               name="Name"
               model="Customer"
               enabled={!inputsEnabled}
               state={customerUpdateData.name}
               setState={setCustomerUpdateData}
               error
            />
            <TextInputForUpdate
               name="Surname"
               model="Customer"
               enabled={!inputsEnabled}
               state={customerUpdateData.surname}
               setState={setCustomerUpdateData}
               error
            />
            <TextInputForUpdate
               name="Ci"
               model="Customer"
               enabled={!inputsEnabled}
               state={customerUpdateData.ci}
               setState={setCustomerUpdateData}
               error
            />
            <TextInputForUpdate
               name="Email"
               model="Customer"
               enabled={!inputsEnabled}
               state={customerUpdateData.email}
               setState={setCustomerUpdateData}
               error
            />
            <TextInputForUpdate
               name="PhoneNumber"
               model="Customer"
               enabled={!inputsEnabled}
               state={customerUpdateData.phoneNumber}
               setState={setCustomerUpdateData}
               error
            />
            <DatePickerInputForUpdate
               name="Date"
               model="Customer"
               enabled={!inputsEnabled}
               state={customerUpdateData.date}
               setState={setCustomerUpdateData}
            />
            <TextInputForUpdate
               name="Address"
               model="Customer"
               enabled={!inputsEnabled}
               state={customerUpdateData.address}
               setState={setCustomerUpdateData}
               error
            />
            <TextInputForUpdate
               name="Nit"
               model="Customer"
               enabled={!inputsEnabled}
               state={customerUpdateData.nit}
               setState={setCustomerUpdateData}
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
                  <Link to={`/customer/${customer.id}`}>
                     <Button>Detalles</Button>
                  </Link>
                  <Button
                     color="red"
                     leftIcon={<IconTrash size={iconSizeButtons} />}
                     onClick={deleteCustomerHandler}
                  >
                     Eliminar
                  </Button>
               </Group>
            ) : (
               <Group position="right">
                  <Button
                     leftIcon={<IconDeviceFloppy size={iconSizeButtons} />}
                     onClick={handleSubmit}
                     disabled={updateCustomerIsLoading}
                  >
                     Guardar
                  </Button>
                  <Button
                     onClick={() => setInputsEnabled(false)}
                     disabled={updateCustomerIsLoading}
                  >
                     Cancelar
                  </Button>
                  <Button
                     color="red"
                     leftIcon={<IconTrash size={iconSizeButtons} />}
                     onClick={deleteCustomerHandler}
                  >
                     Eliminar
                  </Button>
               </Group>
            )}
         </Stack>
      </Drawer>
   )
}

export default DrawerDetailsCustomer
