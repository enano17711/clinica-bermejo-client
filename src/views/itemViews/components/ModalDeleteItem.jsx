import React from "react"
import { useAtom, useAtomValue } from "jotai"
import {
   deleteItemDataAtom,
   openItemDeleteModalAtom,
} from "../../../store/jotai/atoms/ItemAtoms.js"
import { Button, Group, Modal, Stack, Text, Title } from "@mantine/core"
import { useDeleteModel } from "../../../hooks/useDeleteModel.jsx"

const ModalDeleteItem = () => {
   const [opened, setOpened] = useAtom(openItemDeleteModalAtom)
   const deleteItemData = useAtomValue(deleteItemDataAtom)
   const deleteItem = useDeleteModel("Item")

   const handleDeleteItem = () => {
      deleteItem(deleteItemData.id)
      setOpened(false)
   }

   return (
      <Modal
         centered
         opened={opened}
         onClose={() => setOpened(false)}
         title={<Title order={4}>Eliminar Item</Title>}
      >
         <Stack>
            <Text>
               Se eliminara el Item {deleteItemData.name} -{" "}
               {deleteItemData.code}
            </Text>
            <Group position="right">
               <Button color="red" onClick={() => handleDeleteItem()}>
                  Eliminar
               </Button>
               <Button onClick={() => setOpened(false)}>Cerrar</Button>
            </Group>
         </Stack>
      </Modal>
   )
}

export default ModalDeleteItem
