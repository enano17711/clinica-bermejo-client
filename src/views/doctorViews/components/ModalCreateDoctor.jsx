import React from "react"
import { Controller, useForm } from "react-hook-form"
import { showNotification } from "@mantine/notifications"
import { IconCheck, IconListDetails, IconSignature } from "@tabler/icons-react"
import {
   Button,
   Group,
   Modal,
   NativeSelect,
   Stack,
   Textarea,
   TextInput,
} from "@mantine/core"
import { DatePickerInput } from "@mantine/dates"
import { specialTyTypes } from "../../../utils/index.js"
import { useCreateDoctor } from "../hooks/useCreateDoctor.jsx"

const ModalCreateDoctor = ({ opened, setOpened }) => {
   const createDoctor = useCreateDoctor()

   const {
      handleSubmit,
      control,
      reset,
      formState: { errors },
   } = useForm({
      defaultValues: { name: "", specialty: "General" },
   })
   const onSubmit = (data) => {
      data.date = data.date !== undefined ? data.date.toISOString() : null
      data.specialty = specialTyTypes.indexOf(data.specialty)
      setOpened(false)
      createDoctor(data)
      reset()
   }
   return (
      <Modal
         centered
         opened={opened}
         onClose={() => setOpened(false)}
         title="Crear Doctor"
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
                        placeholder="Ej: Juan Jesus"
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
                  name="surname"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                     <TextInput
                        {...field}
                        label="Apellido/s"
                        description="Ingresa los apellidos"
                        placeholder="Ej: Peres Torrez"
                        icon={<IconListDetails size={14} />}
                        withAsterisk
                        error={
                           errors.surname?.type === "required" &&
                           "El apellido es obligatorio"
                        }
                     />
                  )}
               />
               <Controller
                  name="ci"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                     <TextInput
                        {...field}
                        label="Carnet de Identidad"
                        description="Ingresa tus datos de carnet"
                        placeholder="Ej: 7206525"
                        icon={<IconListDetails size={14} />}
                        withAsterisk
                        error={
                           errors.ci?.type === "required" &&
                           "El numero de carnet es obligatorio"
                        }
                     />
                  )}
               />
               <Controller
                  name="registerNumber"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                     <TextInput
                        {...field}
                        label="Numero de Matricula"
                        description="Ingresa tus datos de matricula"
                        placeholder="Ej: 123456789"
                        icon={<IconListDetails size={14} />}
                        withAsterisk
                        error={
                           errors.registerNumber?.type === "required" &&
                           "La mtricula es obligatoria"
                        }
                     />
                  )}
               />
               <Controller
                  name="specialty"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                     <NativeSelect
                        {...field}
                        label="Especialidad"
                        data={specialTyTypes}
                        description="Elige la especialidad"
                        icon={<IconListDetails size={14} />}
                        withAsterisk
                        error={
                           errors.specialty?.type === "required" &&
                           "La especialidad es obligatoria"
                        }
                     />
                  )}
               />
               <Controller
                  name="phoneNumber"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                     <TextInput
                        {...field}
                        label="Telefono/Celular"
                        description="Ingresa tu numero de celular/telefono"
                        placeholder="Ej: 68193206"
                        icon={<IconListDetails size={14} />}
                        withAsterisk
                        error={
                           errors.phoneNumber?.type === "required" &&
                           "El numero de telefono/celular es obligatorio"
                        }
                     />
                  )}
               />
               <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                     <TextInput
                        {...field}
                        label="Correo electronico"
                        description="Ingresa tu correo electronico"
                        placeholder="Ej: tucorreo@gmail.com"
                        icon={<IconListDetails size={14} />}
                     />
                  )}
               />
               <Controller
                  name="address"
                  control={control}
                  render={({ field }) => (
                     <Textarea
                        {...field}
                        label="Dirección de vivienda"
                        description="Ingresa tu direccion actual"
                        placeholder="Ej: Calle falsa 123 entre calle falsa 123 y calle falsa 123"
                     />
                  )}
               />
               <Controller
                  name="date"
                  control={control}
                  render={({ field }) => (
                     <DatePickerInput
                        {...field}
                        label="Fecha de nacimiento"
                        placeholder="Ej: Selecciona una fecha"
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

export default ModalCreateDoctor
