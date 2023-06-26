import React from "react"
import { useCreateUnit } from "../hooks/useCreateUnit.jsx"
import { useForm } from "react-hook-form"
import { Button, Group, Modal, Stack } from "@mantine/core"
import {
   IconCalculator,
   IconClick,
   IconDna,
   IconListDetails,
   IconMathSymbols,
   IconSignature,
} from "@tabler/icons-react"
import TextInputForCreation from "../../../components/TextInputForCreation.jsx"
import NumberInputForCreation from "../../../components/NumberInputForCreation.jsx"
import SelectInputForCreation from "../../../components/SelectInputForCreation.jsx"
import { useAllUnitBases } from "../../unitBaseViews/hooks/useGetAllUnitBases.jsx"

const ModalCreateUnit = ({ opened, setOpened }) => {
   const { isLoadingUnitBases, unitBasesData } = useAllUnitBases()
   const createUnit = useCreateUnit()

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
      createUnit(data)
      reset()
   }

   return (
      <Modal
         centered
         opened={opened}
         onClose={() => setOpened(false)}
         title="Crear Unidad"
      >
         <form onSubmit={handleSubmit(onSubmit)}>
            <Stack>
               <TextInputForCreation
                  name={"name"}
                  control={control}
                  label={"Nombre"}
                  description={"Ingresa el nombre"}
                  placeholder={"Ej: Metro"}
                  icon={<IconSignature size={14} />}
                  errors={errors}
               />
               <TextInputForCreation
                  name={"shortName"}
                  control={control}
                  label={"Código"}
                  description={"Ingresa el código"}
                  placeholder={"Ej: M"}
                  icon={<IconDna size={14} />}
                  errors={errors}
               />
               <SelectInputForCreation
                  name={"unitBaseId"}
                  control={control}
                  label={"Unidad Base"}
                  description={"Selecciona la unidad base"}
                  placeholder={"click para seleccionar"}
                  icon={<IconClick size={14} />}
                  errors={errors}
                  data={
                     isLoadingUnitBases
                        ? ["Cargando"]
                        : unitBasesData.map((unitBase) => {
                             return {
                                label: `${unitBase.name} - ${unitBase.shortName}`,
                                value: unitBase.id,
                             }
                          })
                  }
               />
               <SelectInputForCreation
                  name={"operation"}
                  control={control}
                  label={"Operación"}
                  description={"Selecciona la operación"}
                  icon={<IconMathSymbols size={14} />}
                  errors={errors}
                  data={["+", "-", "*", "/"]}
               />
               <NumberInputForCreation
                  name={"value"}
                  control={control}
                  label={"Valor"}
                  description={"Ingresa el valor (1 al 4.294.967.295)"}
                  placeholder={"Ej: 1"}
                  icon={<IconCalculator size={14} />}
                  errors={errors}
                  min={1}
                  max={4294967295}
               />{" "}
               <TextInputForCreation
                  name={"description"}
                  control={control}
                  label={"Descripción"}
                  description={"Ingresa la descripción"}
                  placeholder={"Ej: Unidad para las fracturas"}
                  icon={<IconListDetails size={14} />}
               />
               <Group position="right">
                  <Button type="submit">Registrar</Button>
               </Group>
            </Stack>
         </form>
      </Modal>
   )
}

export default ModalCreateUnit
