import React from "react"
import { useForm } from "react-hook-form"
import { Button, Group, Modal, Stack } from "@mantine/core"
import TextInputForCreation from "../../../components/TextInputForCreation.jsx"
import NumberInputForCreation from "../../../components/NumberInputForCreation.jsx"
import SelectInputForCreation from "../../../components/SelectInputForCreation.jsx"
import { useCreateModel } from "../../../hooks/useCreateModel.jsx"
import { useGetAllModels } from "../../../hooks/useGetAllModels.jsx"

const ModalCreateUnit = ({ opened, setOpened }) => {
   const {
      isLoadingAllModelsData: isLoadingUnitBases,
      allModelsData: unitBasesData,
   } = useGetAllModels("UnitBase", "GetAllUnitBases")
   const createUnit = useCreateModel("Unit")

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
                  name="Name"
                  model="Unit"
                  control={control}
                  errors={errors}
               />
               <TextInputForCreation
                  name={"ShortName"}
                  model="Unit"
                  control={control}
                  errors={errors}
               />
               <SelectInputForCreation
                  name="UnitBaseId"
                  model="Unit"
                  control={control}
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
                  name="Operation"
                  model="Unit"
                  control={control}
                  errors={errors}
                  data={["+", "-", "*", "/"]}
               />
               <NumberInputForCreation
                  name="Value"
                  model="Unit"
                  control={control}
                  errors={errors}
               />
               <TextInputForCreation
                  name="Description"
                  model="Unit"
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

export default ModalCreateUnit
