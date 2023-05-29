import React from "react"
import {
   Button,
   Group,
   List,
   Modal,
   Stack,
   Text,
   ThemeIcon,
   Title,
} from "@mantine/core"
import { useAtom, useAtomValue } from "jotai"
import {
   deleteDoctorDataAtom,
   openDoctorDeleteModalAtom,
} from "../../../store/jotai/atoms/DoctorAtoms.js"
import { useDeleteDoctor } from "../hooks/useDeleteDoctor.jsx"
import { specialTyTypes } from "../../../utils/index.js"
import { IconCircleCheck } from "@tabler/icons-react"

const ModalDeleteDoctor = () => {
   const [opened, setOpened] = useAtom(openDoctorDeleteModalAtom)
   const deleteDoctorData = useAtomValue(deleteDoctorDataAtom)
   const deleteDoctor = useDeleteDoctor()

   const handleDeleteDoctor = () => {
      deleteDoctor(deleteDoctorData.id)
      setOpened(false)
   }

   return (
      <Modal
         centered
         opened={opened}
         onClose={() => setOpened(false)}
         title={<Title order={4}>Eliminar Doctor</Title>}
      >
         <Stack>
            <Text>
               Se eliminara al Doctor {deleteDoctorData.name}{" "}
               {deleteDoctorData.surname} con:
            </Text>
            <List
               icon={
                  <ThemeIcon color="teal" radius="xl">
                     <IconCircleCheck />
                  </ThemeIcon>
               }
            >
               <List.Item>
                  <Title order={5}>
                     C.I: <Text span>{deleteDoctorData.ci}</Text>
                  </Title>
               </List.Item>
               <List.Item>
                  <Title order={5}>
                     Matricula:{" "}
                     <Text span>{deleteDoctorData.registerNumber}</Text>
                  </Title>
               </List.Item>
               <List.Item>
                  <Title order={5}>
                     Especialidad:{" "}
                     <Text span>
                        {specialTyTypes[deleteDoctorData.specialty]}
                     </Text>
                  </Title>
               </List.Item>
            </List>
            <Group position="right">
               <Button color="red" onClick={() => handleDeleteDoctor()}>
                  Eliminar
               </Button>
               <Button onClick={() => setOpened(false)}>Cerrar</Button>
            </Group>
         </Stack>
      </Modal>
   )
}

export default ModalDeleteDoctor
