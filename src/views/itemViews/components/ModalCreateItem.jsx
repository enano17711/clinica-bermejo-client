import React from "react"
import { useForm } from "react-hook-form"
import { Button, Group, Modal, Stack } from "@mantine/core"
import TextInputForCreation from "../../../components/TextInputForCreation.jsx"
import { useCreateModel } from "../../../hooks/useCreateModel.jsx"
import SelectInputForCreation from "../../../components/SelectInputForCreation.jsx"
import { useGetAllModels } from "../../../hooks/useGetAllModels.jsx"
import { formatForSelectInput } from "../../../utils/index.js"
import MultiSelectInputForCreation from "../../../components/MultiSelectInputForCreation.jsx"

const ModalCreateItem = ({ opened, setOpened }) => {
   const { isLoadingAllModelsData: isLoadingBrand, allModelsData: brandsData } =
      useGetAllModels("Brand", "GetAllBrands")

   const { isLoadingAllModelsData: isLoadingUnit, allModelsData: unitsData } =
      useGetAllModels("Unit", "GetAllUnits")

   const {
      isLoadingAllModelsData: isLoadingCategoryItem,
      allModelsData: categoryItemsData,
   } = useGetAllModels("CategoryItem", "GetAllCategoryItems")

   const createItem = useCreateModel("Item")

   const {
      handleSubmit,
      control,
      reset,
      formState: { errors },
   } = useForm({
      defaultValues: {
         name: "",
         code: "",
         description: "",
         stockItem: 0,
         allotment: "",
      },
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
               <Group position="apart" grow>
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
                           : formatForSelectInput(brandsData)
                     }
                  />
               </Group>
               <MultiSelectInputForCreation
                  name="UnitIds"
                  model="Item"
                  control={control}
                  errors={errors}
                  data={
                     isLoadingUnit
                        ? ["Cargando"]
                        : formatForSelectInput(unitsData)
                  }
               />
               <MultiSelectInputForCreation
                  name="CategoryItemIds"
                  model="Item"
                  control={control}
                  errors={errors}
                  data={
                     isLoadingCategoryItem
                        ? ["Cargando"]
                        : formatForSelectInput(categoryItemsData)
                  }
               />
               <TextInputForCreation
                  name="Description"
                  model="Item"
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

export default ModalCreateItem
