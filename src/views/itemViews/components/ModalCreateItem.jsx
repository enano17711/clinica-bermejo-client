import React from "react"
import { useForm } from "react-hook-form"
import { Button, Group, Modal, Stack } from "@mantine/core"
import TextInputForCreation from "../../../components/TextInputForCreation.jsx"
import { useCreateModel } from "../../../hooks/useCreateModel.jsx"
import SelectInputForCreation from "../../../components/SelectInputForCreation.jsx"
import { useGetAllModels } from "../../../hooks/useGetAllModels.jsx"

const ModalCreateItem = ({ opened, setOpened }) => {
   const { isLoadingAllModelsData: isLoadingBrand, allModelsData: brandsData } =
      useGetAllModels("Brand", "GetAllBrands")

   const createItem = useCreateModel("Item")

   const {
      handleSubmit,
      control,
      reset,
      formState: { errors },
   } = useForm({
      defaultValues: { name: "", code: "", description: "" },
   })
   const onSubmit = (data) => {
      setOpened(false)
      createItem(data)
      reset()
   }

   return (
      <Modal
         centered
         opened={opened}
         onClose={() => setOpened(false)}
         title="Crear Item"
      >
         <form onSubmit={handleSubmit(onSubmit)}>
            <Stack>
               <TextInputForCreation
                  name="Name"
                  model="Item"
                  control={control}
                  errors={errors}
               />
               <TextInputForCreation
                  name="Code"
                  model="Item"
                  control={control}
                  errors={errors}
               />
               <SelectInputForCreation
                  name="BrandId"
                  model="Item"
                  control={control}
                  errors={errors}
                  data={
                     isLoadingBrand
                        ? ["Cargando"]
                        : brandsData.map((brand) => {
                             return {
                                label: `${brand.name}`,
                                value: brand.id,
                             }
                          })
                  }
               />
               <TextInputForCreation
                  name="Description"
                  model="Item"
                  control={control}
                  errors={errors}
               />
               <Group position="right">
                  <Button type="submit">Registrar</Button>
               </Group>
            </Stack>
         </form>
      </Modal>
   )
}

export default ModalCreateItem
