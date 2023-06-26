import React from "react"
import { Button, Group, Modal, Stack, Text, Title } from "@mantine/core"
import { useAtom, useAtomValue } from "jotai"
import {
   deleteBrandDataAtom,
   openBrandDeleteModalAtom,
} from "../../../store/jotai/atoms/BrandAtoms.js"
import { useDeleteBrand } from "../hooks/useDeleteBrand.jsx"

const ModalDeleteBrand = () => {
   const [opened, setOpened] = useAtom(openBrandDeleteModalAtom)
   const deleteBrandData = useAtomValue(deleteBrandDataAtom)
   const deleteBrand = useDeleteBrand()

   const handleDeleteBrand = () => {
      deleteBrand(deleteBrandData.id)
      setOpened(false)
   }

   return (
      <Modal
         centered
         opened={opened}
         onClose={() => setOpened(false)}
         title={<Title order={4}>Eliminar Marca</Title>}
      >
         <Stack>
            <Text>Se eliminara la Marca {deleteBrandData.name}</Text>
            <Group position="right">
               <Button color="red" onClick={() => handleDeleteBrand()}>
                  Eliminar
               </Button>
               <Button onClick={() => setOpened(false)}>Cerrar</Button>
            </Group>
         </Stack>
      </Modal>
   )
}

export default ModalDeleteBrand
