import React from "react"
import { useForm } from "react-hook-form"
import { Button, Group, Modal, Stack } from "@mantine/core"
import TextInputForCreation from "../../../components/TextInputForCreation.jsx"
import { useCreateModel } from "../../../hooks/useCreateModel.jsx"
import DatePickerInputForCreation from "../../../components/DatePickerInputForCreation.jsx"

const ModalCreateSupplier = ({ opened, setOpened }) => {
   const createSupplier = useCreateModel("Supplier")

   const {
      handleSubmit,
      control,
      reset,
      formState: { errors },
   } = useForm({
      defaultValues: { name: "", surname: "" },
   })
   const onSubmit = (data) => {
      setOpened(false)
      createSupplier(data)
      reset()
   }

   return (
      <Modal
         centered
         opened={opened}
         onClose={() => setOpened(false)}
         title="Crear Proveedor"
      >
         <form onSubmit={handleSubmit(onSubmit)}>
            <Stack>
               <TextInputForCreation
                  name="Name"
                  model="Supplier"
                  control={control}
                  errors={errors}
               />
               <TextInputForCreation
                  name="Surname"
                  model="Supplier"
                  control={control}
                  errors={errors}
               />
               <TextInputForCreation
                  name="Ci"
                  model="Supplier"
                  control={control}
                  errors={errors}
               />
               <TextInputForCreation
                  name="Email"
                  model="Supplier"
                  control={control}
               />
               <DatePickerInputForCreation
                  name="Date"
                  model="Supplier"
                  control={control}
               />
               <TextInputForCreation
                  name="PhoneNumber"
                  model="Supplier"
                  control={control}
                  errors={errors}
               />
               <TextInputForCreation
                  name="Address"
                  model="Supplier"
                  control={control}
               />
               <TextInputForCreation
                  name="Nit"
                  model="Supplier"
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

export default ModalCreateSupplier
