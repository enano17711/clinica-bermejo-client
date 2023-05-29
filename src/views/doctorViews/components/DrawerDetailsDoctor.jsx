import {
   Badge,
   Button,
   Drawer,
   Grid,
   Group,
   NativeSelect,
   Space,
   Stack,
   Textarea,
   TextInput,
   Title,
} from "@mantine/core"
import { useEffect, useState } from "react"
import { specialTyTypes } from "../../../utils/index.js"
import {
   IconDeviceFloppy,
   IconListDetails,
   IconPencil,
   IconSignature,
   IconTrash,
} from "@tabler/icons-react"
import { DatePickerInput } from "@mantine/dates"
import { Link } from "react-router-dom"
import { useUpdateDoctor } from "../hooks/useUpdateDoctor.jsx"
import { useAtomValue, useSetAtom } from "jotai"
import {
   deleteDoctorDataAtom,
   openDoctorDeleteModalAtom,
} from "../../../store/jotai/atoms/DoctorAtoms.js"
import { iconSizeButtonsAtom } from "../../../store/jotai/atoms/VisualAtom.js"

const DrawerDetailsDoctor = ({
   openDrawerDoctor,
   doctor,
   setOpenDrawerDoctor,
}) => {
   const [inputsEnabled, setInputsEnabled] = useState(false)
   const [doctorUpdateData, setDoctorUpdateData] = useState({})

   const { mutate: updateDoctor, updateDoctorIsLoading } = useUpdateDoctor()

   const setDeleteDoctorData = useSetAtom(deleteDoctorDataAtom)
   const setOpenDeleteModal = useSetAtom(openDoctorDeleteModalAtom)
   const iconSizeButtons = useAtomValue(iconSizeButtonsAtom)

   const handleSubmit = (e) => {
      e.stopPropagation()
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
         doctorUpdateData.date !== undefined || true
            ? new Date(doctorUpdateData.date)
            : null

      updateDoctor({
         ...doctorUpdateData,
         date: convertDate.toISOString(),
      })
      setOpenDrawerDoctor(false)
      setInputsEnabled(false)
   }

   const handleEnableInputs = (e) => {
      e.stopPropagation()
      setInputsEnabled(true)
   }

   const handleCloseDrawer = () => {
      setOpenDrawerDoctor(false)
      setInputsEnabled(false)
   }

   const deleteDoctorHandler = () => {
      setDeleteDoctorData(doctorUpdateData)
      setOpenDrawerDoctor(false)
      setInputsEnabled(false)
      setOpenDeleteModal(true)
   }

   useEffect(() => {
      setDoctorUpdateData(doctor)
   }, [doctor])

   return (
      <Drawer
         position="right"
         opened={openDrawerDoctor}
         onClose={handleCloseDrawer}
         title={
            <Title order={4}>
               {`${doctor?.name?.split(" ")[0]} ${
                  doctor?.surname?.split(" ")[0]
               }`}{" "}
               <Badge component="span" variant="dot">
                  {specialTyTypes[doctor.specialty]}
               </Badge>
            </Title>
         }
      >
         <Stack>
            <TextInput
               label="Nombre"
               description="Ingresa el nombre"
               placeholder="Ej: Juan Jesus"
               icon={<IconSignature size={14} />}
               withAsterisk
               disabled={!inputsEnabled}
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
               disabled={!inputsEnabled}
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
            <Group position="apart" grow>
               <TextInput
                  label="Carnet de Identidad"
                  description="Ingresa tus datos de carnet"
                  placeholder="Ej: 7206525"
                  icon={<IconListDetails size={14} />}
                  withAsterisk
                  disabled={!inputsEnabled}
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
                  disabled={!inputsEnabled}
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
            </Group>
            <Group position="apart" grow>
               <NativeSelect
                  label="Especialidad"
                  data={specialTyTypes}
                  description="Elige la especialidad"
                  icon={<IconListDetails size={14} />}
                  withAsterisk
                  disabled={!inputsEnabled}
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
               <DatePickerInput
                  label="Fecha de nacimiento"
                  placeholder="Ej: Selecciona una fecha"
                  description="Selecciona la fecha"
                  value={new Date(doctorUpdateData.date)}
                  disabled={!inputsEnabled}
                  onChange={(e) =>
                     setDoctorUpdateData({
                        ...doctorUpdateData,
                        date: e,
                     })
                  }
               />
            </Group>
            <TextInput
               label="Telefono/Celular"
               description="Ingresa tu numero de celular/telefono"
               placeholder="Ej: 68193206"
               icon={<IconListDetails size={14} />}
               withAsterisk
               disabled={!inputsEnabled}
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
               disabled={!inputsEnabled}
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
               disabled={!inputsEnabled}
               onChange={(e) =>
                  setDoctorUpdateData({
                     ...doctorUpdateData,
                     address: e.target.value,
                  })
               }
            />
            {inputsEnabled === false ? (
               <Group position="right">
                  <Button
                     leftIcon={<IconPencil size={iconSizeButtons} />}
                     onClick={handleEnableInputs}
                  >
                     Editar
                  </Button>
                  <Link to={`/doctor/${doctor.id}`}>
                     <Button>Detalles</Button>
                  </Link>
                  <Button
                     color="red"
                     leftIcon={<IconTrash size={iconSizeButtons} />}
                     onClick={deleteDoctorHandler}
                  >
                     Eliminar
                  </Button>
               </Group>
            ) : (
               <Group position="right">
                  <Button
                     leftIcon={<IconDeviceFloppy size={iconSizeButtons} />}
                     onClick={handleSubmit}
                     disabled={updateDoctorIsLoading}
                  >
                     Guardar
                  </Button>
                  <Button
                     onClick={() => setInputsEnabled(false)}
                     disabled={updateDoctorIsLoading}
                  >
                     Cancelar
                  </Button>
                  <Button
                     color="red"
                     leftIcon={<IconTrash size={iconSizeButtons} />}
                     onClick={deleteDoctorHandler}
                  >
                     Eliminar
                  </Button>
               </Group>
            )}
         </Stack>
      </Drawer>
   )
}

export default DrawerDetailsDoctor
