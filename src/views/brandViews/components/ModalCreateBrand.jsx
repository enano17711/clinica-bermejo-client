import React from "react"
import { Controller, useForm } from "react-hook-form"
import { IconListDetails, IconSignature } from "@tabler/icons-react"
import { Button, Group, Modal, Stack, TextInput } from "@mantine/core"
import { useCreateModel } from "../../../hooks/useCreateModel.jsx"

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
               <Controller
                  name="name"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                     <TextInput
                        {...field}
                        label="Nombre"
                        description="Ingresa el nombre"
                        placeholder="Ej: Dentol"
                        icon={<IconSignature size={14} />}
                        withAsterisk
                        error={
                           errors.name?.type === "required" &&
                           "El nombre es obligatorio"
                        }
                     />
                  )}
               />
               <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                     <TextInput
                        {...field}
                        label="Descripcion"
                        description="Ingresa la descripcion"
                        placeholder="Ej: Marca para las caries"
                        icon={<IconListDetails size={14} />}
                     />
                  )}
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
