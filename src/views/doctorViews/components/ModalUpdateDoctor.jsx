import { IconListDetails, IconSignature } from "@tabler/icons-react"
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
import { useAtom } from "jotai"
import {
   doctorUpdateDataAtom,
   openDoctorEditModalAtom,
} from "../../../store/jotai/atoms/DoctorAtoms.js"
import { useUpdateDoctor } from "../hooks/useUpdateDoctor.jsx"

const ModalUpdateDoctor = () => {
   const [opened, setOpened] = useAtom(openDoctorEditModalAtom)
   const [doctorUpdateData, setDoctorUpdateData] = useAtom(doctorUpdateDataAtom)

   const updateDoctor = useUpdateDoctor()

   const handleSubmit = (e) => {
      e.preventDefault()
      if (
         [
            doctorUpdateData.name,
            doctorUpdateData.surname,
            doctorUpdateData.ci,
            doctorUpdateData.registerNumber,
            doctorUpdateData.specialty,
         ].includes("")
      ) {
         return
      }

      const convertDate =
         doctorUpdateData.date !== undefined || doctorUpdateData !== null
            ? new Date(doctorUpdateData.date)
            : null

      setOpened(false)
      updateDoctor({
         ...doctorUpdateData,
         date: convertDate.toISOString(),
      })
   }

   return (
      <Modal
         centered
         opened={opened}
         onClose={() => setOpened(false)}
         title="Modificar Doctor"
      >
         <form onSubmit={handleSubmit}>
            <Stack>
               <TextInput
                  label="Nombre"
                  description="Ingresa el nombre"
                  placeholder="Ej: Juan Jesus"
                  icon={<IconSignature size={14} />}
                  withAsterisk
                  error={
                     doctorUpdateData.name === ""
                        ? "El nombre es obligatorio"
                        : false
                  }
                  value={doctorUpdateData.name}
                  onChange={(e) =>
                     setDoctorUpdateData({
                        ...doctorUpdateData,
                        name: e.target.value,
                     })
                  }
               />
               <TextInput
                  label="Apellido/s"
                  description="Ingresa los apellidos"
                  placeholder="Ej: Peres Torrez"
                  icon={<IconListDetails size={14} />}
                  withAsterisk
                  error={
                     doctorUpdateData.surname === ""
                        ? "El apellido es obligatorio"
                        : false
                  }
                  value={doctorUpdateData.surname}
                  onChange={(e) =>
                     setDoctorUpdateData({
                        ...doctorUpdateData,
                        surname: e.target.value,
                     })
                  }
               />
               <TextInput
                  label="Carnet de Identidad"
                  description="Ingresa tus datos de carnet"
                  placeholder="Ej: 7206525"
                  icon={<IconListDetails size={14} />}
                  withAsterisk
                  error={
                     doctorUpdateData.ci === ""
                        ? "El carnet es obligatorio"
                        : false
                  }
                  value={doctorUpdateData.ci}
                  onChange={(e) =>
                     setDoctorUpdateData({
                        ...doctorUpdateData,
                        ci: e.target.value,
                     })
                  }
               />

               <TextInput
                  label="Numero de Matricula"
                  description="Ingresa tus datos de matricula"
                  placeholder="Ej: 123456789"
                  icon={<IconListDetails size={14} />}
                  withAsterisk
                  error={
                     doctorUpdateData.registerNumber === ""
                        ? "La matricula es obligatoria"
                        : false
                  }
                  value={doctorUpdateData.registerNumber}
                  onChange={(e) =>
                     setDoctorUpdateData({
                        ...doctorUpdateData,
                        registerNumber: e.target.value,
                     })
                  }
               />
               <NativeSelect
                  label="Especialidad"
                  data={specialTyTypes}
                  description="Elige la especialidad"
                  icon={<IconListDetails size={14} />}
                  withAsterisk
                  error={
                     doctorUpdateData.specialty === ""
                        ? "La especialidad es obligatoria"
                        : false
                  }
                  value={specialTyTypes[doctorUpdateData.specialty]}
                  onChange={(e) =>
                     setDoctorUpdateData({
                        ...doctorUpdateData,
                        specialty: specialTyTypes.indexOf(e.target.value),
                     })
                  }
               />
               <TextInput
                  label="Telefono/Celular"
                  description="Ingresa tu numero de celular/telefono"
                  placeholder="Ej: 68193206"
                  icon={<IconListDetails size={14} />}
                  withAsterisk
                  value={doctorUpdateData.phoneNumber}
                  onChange={(e) =>
                     setDoctorUpdateData({
                        ...doctorUpdateData,
                        phoneNumber: e.target.value,
                     })
                  }
               />
               <TextInput
                  label="Correo electronico"
                  description="Ingresa tu correo electronico"
                  placeholder="Ej: tucorreo@gmail.com"
                  icon={<IconListDetails size={14} />}
                  value={doctorUpdateData.email}
                  onChange={(e) =>
                     setDoctorUpdateData({
                        ...doctorUpdateData,
                        email: e.target.value,
                     })
                  }
               />
               <Textarea
                  label="Dirección de vivienda"
                  description="Ingresa tu direccion actual"
                  placeholder="Ej: Calle falsa 123 entre calle falsa 123 y calle falsa 123"
                  value={doctorUpdateData.address}
                  onChange={(e) =>
                     setDoctorUpdateData({
                        ...doctorUpdateData,
                        address: e.target.value,
                     })
                  }
               />
               <DatePickerInput
                  label="Fecha de nacimiento"
                  placeholder="Ej: Selecciona una fecha"
                  value={new Date(doctorUpdateData.date)}
                  onChange={(e) =>
                     setDoctorUpdateData({
                        ...doctorUpdateData,
                        date: e,
                     })
                  }
               />
               <Group position="right">
                  <Button type="submit">Registrar</Button>
               </Group>
            </Stack>
         </form>
      </Modal>
   )
}

export default ModalUpdateDoctor
