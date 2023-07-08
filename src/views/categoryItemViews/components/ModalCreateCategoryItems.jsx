import React from "react"
import { useForm } from "react-hook-form"
import { Button, Group, Modal, Stack } from "@mantine/core"
import TextInputForCreation from "../../../components/TextInputForCreation.jsx"
import { useCreateModel } from "../../../hooks/useCreateModel.jsx"

const ModalCreateCategoryItem = ({ opened, setOpened }) => {
   const createCategoryItem = useCreateModel("CategoryItem")

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
      createCategoryItem(data)
      reset()
   }

   return (
      <Modal
         centered
         opened={opened}
         onClose={() => setOpened(false)}
         title="Crear Categoria de Items"
      >
         <form onSubmit={handleSubmit(onSubmit)}>
            <Stack>
               <TextInputForCreation
                  name="Name"
                  model="CategoryItem"
                  control={control}
                  errors={errors}
               />
               <TextInputForCreation
                  name="Description"
                  model="CategoryItem"
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

export default ModalCreateCategoryItem
