import React from "react"
import { useAtom, useAtomValue } from "jotai"
import {
   deleteCategoryItemDataAtom,
   openCategoryItemDeleteModalAtom,
} from "../../../store/jotai/atoms/CategoryItemAtoms.js"
import { Button, Group, Modal, Stack, Text, Title } from "@mantine/core"
import { useDeleteModel } from "../../../hooks/useDeleteModel.jsx"

const ModalDeleteCategoryItem = () => {
   const [opened, setOpened] = useAtom(openCategoryItemDeleteModalAtom)
   const deleteCategoryItemData = useAtomValue(deleteCategoryItemDataAtom)
   const deleteCategoryItem = useDeleteModel("CategoryItem")

   const handleDeleteCategoryItem = () => {
      deleteCategoryItem(deleteCategoryItemData.id)
      setOpened(false)
   }

   return (
      <Modal
         centered
         opened={opened}
         onClose={() => setOpened(false)}
         title={<Title order={4}>Eliminar Unidad</Title>}
      >
         <Stack>
            <Text>
               Se eliminara la Categoria de Items -{" "}
               {deleteCategoryItemData.name}
            </Text>
            <Group position="right">
               <Button color="red" onClick={() => handleDeleteCategoryItem()}>
                  Eliminar
               </Button>
               <Button onClick={() => setOpened(false)}>Cerrar</Button>
            </Group>
         </Stack>
      </Modal>
   )
}

export default ModalDeleteCategoryItem
