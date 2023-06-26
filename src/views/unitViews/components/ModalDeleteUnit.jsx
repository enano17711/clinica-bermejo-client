import React from "react"
import { useAtom, useAtomValue } from "jotai"
import {
   deleteUnitDataAtom,
   openUnitDeleteModalAtom,
} from "../../../store/jotai/atoms/UnitAtoms.js"
import { useDeleteUnit } from "../hooks/useDeleteUnit.jsx"
import { Button, Group, Modal, Stack, Text, Title } from "@mantine/core"

const ModalDeleteUnit = () => {
   const [opened, setOpened] = useAtom(openUnitDeleteModalAtom)
   const deleteUnitData = useAtomValue(deleteUnitDataAtom)
   const deleteUnit = useDeleteUnit()

   const handleDeleteUnit = () => {
      deleteUnit(deleteUnitData.id)
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
               Se eliminara la Unidad {deleteUnitData.name} -{" "}
               {deleteUnitData.shortName}
            </Text>
            <Group position="right">
               <Button color="red" onClick={() => handleDeleteUnit()}>
                  Eliminar
               </Button>
               <Button onClick={() => setOpened(false)}>Cerrar</Button>
            </Group>
         </Stack>
      </Modal>
   )
}

export default ModalDeleteUnit
