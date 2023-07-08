import React from "react"
import { useAtom, useAtomValue } from "jotai"
import {
   deleteCustomerDataAtom,
   openCustomerDeleteModalAtom,
} from "../../../store/jotai/atoms/CustomerAtoms.js"
import { Button, Group, Modal, Stack, Text, Title } from "@mantine/core"
import { useDeleteModel } from "../../../hooks/useDeleteModel.jsx"

const ModalDeleteCustomer = () => {
   const [opened, setOpened] = useAtom(openCustomerDeleteModalAtom)
   const deleteCustomerData = useAtomValue(deleteCustomerDataAtom)
   const deleteCustomer = useDeleteModel("Customer")

   const handleDeleteCustomer = () => {
      deleteCustomer(deleteCustomerData.id)
      setOpened(false)
   }

   return (
      <Modal
         centered
         opened={opened}
         onClose={() => setOpened(false)}
         title={<Title order={4}>Eliminar Cliente</Title>}
      >
         <Stack>
            <Text>
               Se eliminara el Cliente {deleteCustomerData.name} -{" "}
               {deleteCustomerData.surname}
            </Text>
            <Group position="right">
               <Button color="red" onClick={() => handleDeleteCustomer()}>
                  Eliminar
               </Button>
               <Button onClick={() => setOpened(false)}>Cerrar</Button>
            </Group>
         </Stack>
      </Modal>
   )
}

export default ModalDeleteCustomer
