import React from "react"
import { useAtom, useAtomValue } from "jotai"
import {
   deleteUnitBaseDataAtom,
   openUnitBaseDeleteModalAtom,
} from "../../../store/jotai/atoms/UnitBaseAtoms.js"
import { Button, Group, Modal, Stack, Text, Title } from "@mantine/core"
import { useDeleteModel } from "../../../hooks/useDeleteModel.jsx"

const ModalDeleteUnitBase = () => {
   const [opened, setOpened] = useAtom(openUnitBaseDeleteModalAtom)
   const deleteUnitBaseData = useAtomValue(deleteUnitBaseDataAtom)
   const deleteUnitBase = useDeleteModel("UnitBase")

   const handleDeleteUnitBase = () => {
      deleteUnitBase(deleteUnitBaseData.id)
      setOpened(false)
   }

   return (
      <Modal
         centered
         opened={opened}
         onClose={() => setOpened(false)}
         title={<Title order={4}>Eliminar Unidad Base</Title>}
      >
         <Stack>
            <Text>
               Se eliminara la Unidad Base {deleteUnitBaseData.name} -{" "}
               {deleteUnitBaseData.shortName}
            </Text>
            <Group position="right">
               <Button color="red" onClick={() => handleDeleteUnitBase()}>
                  Eliminar
               </Button>
               <Button onClick={() => setOpened(false)}>Cerrar</Button>
            </Group>
         </Stack>
      </Modal>
   )
}

export default ModalDeleteUnitBase
