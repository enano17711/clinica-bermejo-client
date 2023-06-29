import React from "react"
import { useForm } from "react-hook-form"
import { Button, Group, Modal, Stack } from "@mantine/core"
import { useCreateModel } from "../../../hooks/useCreateModel.jsx"
import TextInputForCreation from "../../../components/TextInputForCreation.jsx"

const ModalCreateBrand = ({ opened, setOpened }) => {
   const createBrand = useCreateModel("Brand")

   const {
      handleSubmit,
      control,
      reset,
      formState: { errors },
   } = useForm({
      defaultValues: { name: "" },
   })
   const onSubmit = (data) => {
      setOpened(false)
      createBrand(data)
      reset()
   }
   return (
      <Modal
         centered
         opened={opened}
         onClose={() => setOpened(false)}
         title="Crear Marca"
      >
         <form onSubmit={handleSubmit(onSubmit)}>
            <Stack>
               <TextInputForCreation
                  name="Name"
                  model="Brand"
                  control={control}
                  errors={errors}
               />
               <TextInputForCreation
                  name="Description"
                  model="Brand"
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

export default ModalCreateBrand
