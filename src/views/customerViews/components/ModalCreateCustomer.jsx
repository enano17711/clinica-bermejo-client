import React from "react"
import { useForm } from "react-hook-form"
import { Button, Group, Modal, Stack } from "@mantine/core"
import TextInputForCreation from "../../../components/TextInputForCreation.jsx"
import { useCreateModel } from "../../../hooks/useCreateModel.jsx"
import DatePickerInputForCreation from "../../../components/DatePickerInputForCreation.jsx"

const ModalCreateCustomer = ({ opened, setOpened }) => {
   const createCustomer = useCreateModel("Customer")

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
      createCustomer(data)
      reset()
   }

   return (
      <Modal
         centered
         opened={opened}
         onClose={() => setOpened(false)}
         title="Crear Cliente"
      >
         <form onSubmit={handleSubmit(onSubmit)}>
            <Stack>
               <TextInputForCreation
                  name="Name"
                  model="Customer"
                  control={control}
                  errors={errors}
               />
               <TextInputForCreation
                  name="Surname"
                  model="Customer"
                  control={control}
                  errors={errors}
               />
               <TextInputForCreation
                  name="Ci"
                  model="Customer"
                  control={control}
                  errors={errors}
               />
               <TextInputForCreation
                  name="Email"
                  model="Customer"
                  control={control}
               />
               <DatePickerInputForCreation
                  name="Date"
                  model="Customer"
                  control={control}
               />
               <TextInputForCreation
                  name="PhoneNumber"
                  model="Customer"
                  control={control}
                  errors={errors}
               />
               <TextInputForCreation
                  name="Address"
                  model="Customer"
                  control={control}
               />
               <TextInputForCreation
                  name="Nit"
                  model="Customer"
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

export default ModalCreateCustomer
