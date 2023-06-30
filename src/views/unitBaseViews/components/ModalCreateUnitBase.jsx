import React from "react"
import { useForm } from "react-hook-form"
import { Button, Group, Modal, Stack } from "@mantine/core"
import TextInputForCreation from "../../../components/TextInputForCreation.jsx"
import { useCreateModel } from "../../../hooks/useCreateModel.jsx"

const ModalCreateUnitBase = ({ opened, setOpened }) => {
   const createUnitBase = useCreateModel("UnitBase")

   const {
      handleSubmit,
      control,
      reset,
      formState: { errors },
   } = useForm({
      defaultValues: { name: "", description: "", value: 1 },
   })
   const onSubmit = (data) => {
      setOpened(false)
      createUnitBase(data)
      reset()
   }

   return (
      <Modal
         centered
         opened={opened}
         onClose={() => setOpened(false)}
         title="Crear Unidad Base"
      >
         <form onSubmit={handleSubmit(onSubmit)}>
            <Stack>
               <TextInputForCreation
                  name="Name"
                  model="UnitBase"
                  control={control}
                  errors={errors}
               />
               <TextInputForCreation
                  name={"ShortName"}
                  model="UnitBase"
                  control={control}
                  errors={errors}
               />
               <TextInputForCreation
                  name="Description"
                  model="UnitBase"
                  control={control}
               />
               <Group position="right">
                  <Button type="submit">Registrar</Button>
               </Group>
            </Stack>
         </form>
      </Modal>
   )
}

export default ModalCreateUnitBase
