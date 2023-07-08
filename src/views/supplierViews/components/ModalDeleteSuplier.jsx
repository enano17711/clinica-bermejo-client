import React from "react"
import { useAtom, useAtomValue } from "jotai"
import {
   deleteSupplierDataAtom,
   openSupplierDeleteModalAtom,
} from "../../../store/jotai/atoms/SupplierAtoms.js"
import { Button, Group, Modal, Stack, Text, Title } from "@mantine/core"
import { useDeleteModel } from "../../../hooks/useDeleteModel.jsx"

const ModalDeleteSupplier = () => {
   const [opened, setOpened] = useAtom(openSupplierDeleteModalAtom)
   const deleteSupplierData = useAtomValue(deleteSupplierDataAtom)
   const deleteSupplier = useDeleteModel("Supplier")

   const handleDeleteSupplier = () => {
      deleteSupplier(deleteSupplierData.id)
      setOpened(false)
   }

   return (
      <Modal
         centered
         opened={opened}
         onClose={() => setOpened(false)}
         title={<Title order={4}>Eliminar Proveedor</Title>}
      >
         <Stack>
            <Text>
               Se eliminara el Proveedor {deleteSupplierData.name} -{" "}
               {deleteSupplierData.surname}
            </Text>
            <Group position="right">
               <Button color="red" onClick={() => handleDeleteSupplier()}>
                  Eliminar
               </Button>
               <Button onClick={() => setOpened(false)}>Cerrar</Button>
            </Group>
         </Stack>
      </Modal>
   )
}

export default ModalDeleteSupplier
