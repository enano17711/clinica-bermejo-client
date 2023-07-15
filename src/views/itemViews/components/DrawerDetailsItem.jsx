import { Button, Drawer, Group, Stack, Title } from "@mantine/core"
import React, { useEffect, useState } from "react"
import { IconDeviceFloppy, IconPencil, IconTrash } from "@tabler/icons-react"
import { Link } from "react-router-dom"
import { useAtomValue, useSetAtom } from "jotai"
import {
   deleteItemDataAtom,
   openItemDeleteModalAtom,
} from "../../../store/jotai/atoms/ItemAtoms.js"
import { iconSizeButtonsAtom } from "../../../store/jotai/atoms/VisualAtom.js"
import { useUpdateModel } from "../../../hooks/useUpdateModel.jsx"
import TextInputForUpdate from "../../../components/TextInputForUpdate.jsx"
import SelectInputForUpdate from "../../../components/SelectInputForUpdate.jsx"
import { useGetAllModels } from "../../../hooks/useGetAllModels.jsx"
import MultiSelectInputForUpdate from "../../../components/MultiSelectInputForUpdate.jsx"

const DrawerDetailsItem = ({ openDrawerItem, item, setOpenDrawerItem }) => {
   const [inputsEnabled, setInputsEnabled] = useState(false)
   const [itemUpdateData, setItemUpdateData] = useState({})

   const {
      isSuccess: isSuccessItemUpdate,
      mutate: updateItem,
      updateModelIsLoading: updateItemIsLoading,
   } = useUpdateModel("Item")

   const { isLoadingAllModelsData: isLoadingBrand, allModelsData: brandsData } =
      useGetAllModels("Brand", "GetAllBrands")

   const { isLoadingAllModelsData: isLoadingUnit, allModelsData: unitsData } =
      useGetAllModels("Unit", "GetAllUnits")

   const {
      isLoadingAllModelsData: isLoadingCategoryItem,
      allModelsData: categoryItemsData,
   } = useGetAllModels("CategoryItem", "GetAllCategoryItems")

   const setDeleteItemData = useSetAtom(deleteItemDataAtom)
   const setOpenDeleteModal = useSetAtom(openItemDeleteModalAtom)
   const iconSizeButtons = useAtomValue(iconSizeButtonsAtom)

   const handleSubmit = async (e) => {
      e.stopPropagation()
      e.preventDefault()
      if (
         [
            itemUpdateData.name,
            itemUpdateData.code,
            itemUpdateData.brandId,
         ].includes("")
      )
         return

      if (itemUpdateData.brandId === "00000000-0000-0000-0000-000000000000")
         return

      if (
         itemUpdateData.unitIds.length === 0 ||
         itemUpdateData.categoryItemIds.length === 0
      )
         return

      console.log(itemUpdateData)

      updateItem({ ...itemUpdateData })

      setOpenDrawerItem(false)
      setInputsEnabled(false)
   }

   const handleEnableInputs = (e) => {
      e.stopPropagation()
      setInputsEnabled(true)
   }

   const handleCloseDrawer = () => {
      setOpenDrawerItem(false)
      setInputsEnabled(false)
   }

   const deleteItemHandler = () => {
      setDeleteItemData(itemUpdateData)
      setOpenDrawerItem(false)
      setInputsEnabled(false)
      setOpenDeleteModal(true)
   }

   useEffect(() => {
      setItemUpdateData({
         id: item?.id,
         name: item?.name,
         code: item?.code,
         stockItem: item?.stockItem,
         allotment: "",
         description: item?.description,
         brandId: item?.brand?.id,
         unitIds: item?.units?.map((unit) => unit.id),
         categoryItemIds: item?.categoryItems?.map(
            (categoryItem) => categoryItem.id
         ),
      })
   }, [item, inputsEnabled])

   useEffect(() => {
      if (isSuccessItemUpdate) {
         itemUpdateData.unitIds.map
      }
   })

   return (
      <Drawer
         position="right"
         opened={openDrawerItem}
         onClose={handleCloseDrawer}
         title={<Title order={4}>{`${item?.name?.split(" ")[0]}`}</Title>}
      >
         <Stack>
            <TextInputForUpdate
               name="Name"
               model="Item"
               enabled={!inputsEnabled}
               state={itemUpdateData.name}
               setState={setItemUpdateData}
               error
            />
            <Group position="apart" grow>
               <TextInputForUpdate
                  name="Code"
                  model="Item"
                  enabled={!inputsEnabled}
                  state={itemUpdateData.shortName}
                  setState={setItemUpdateData}
                  error
               />
               <SelectInputForUpdate
                  name="BrandId"
                  model="Item"
                  enabled={!inputsEnabled}
                  state={itemUpdateData.brandId}
                  setState={setItemUpdateData}
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
                  error
               />
            </Group>
            <MultiSelectInputForUpdate
               name="UnitIds"
               model="Item"
               enabled={!inputsEnabled}
               state={itemUpdateData.unitIds}
               setState={setItemUpdateData}
               data={
                  isLoadingUnit
                     ? ["Cargando"]
                     : unitsData.map((unit) => {
                          return {
                             label: `${unit.name}`,
                             value: unit.id,
                          }
                       })
               }
               error
            />
            <MultiSelectInputForUpdate
               name="CategoryItemIds"
               model="Item"
               enabled={!inputsEnabled}
               state={itemUpdateData.categoryItemIds}
               setState={setItemUpdateData}
               data={
                  isLoadingCategoryItem
                     ? ["Cargando"]
                     : categoryItemsData.map((categoryItem) => {
                          return {
                             label: `${categoryItem.name}`,
                             value: categoryItem.id,
                          }
                       })
               }
               error
            />
            <TextInputForUpdate
               name="Description"
               model="Item"
               enabled={!inputsEnabled}
               state={itemUpdateData.description}
               setState={setItemUpdateData}
            />

            {inputsEnabled === false ? (
               <Group position="right">
                  <Button
                     leftIcon={<IconPencil size={iconSizeButtons} />}
                     onClick={handleEnableInputs}
                  >
                     Editar
                  </Button>
                  <Link to={`/item/${item.id}`}>
                     <Button>Detalles</Button>
                  </Link>
                  <Button
                     color="red"
                     leftIcon={<IconTrash size={iconSizeButtons} />}
                     onClick={deleteItemHandler}
                  >
                     Eliminar
                  </Button>
               </Group>
            ) : (
               <Group position="right">
                  <Button
                     leftIcon={<IconDeviceFloppy size={iconSizeButtons} />}
                     onClick={handleSubmit}
                     disabled={updateItemIsLoading}
                  >
                     Guardar
                  </Button>
                  <Button
                     onClick={() => setInputsEnabled(false)}
                     disabled={updateItemIsLoading}
                  >
                     Cancelar
                  </Button>
                  <Button
                     color="red"
                     leftIcon={<IconTrash size={iconSizeButtons} />}
                     onClick={deleteItemHandler}
                  >
                     Eliminar
                  </Button>
               </Group>
            )}
         </Stack>
      </Drawer>
   )
}

export default DrawerDetailsItem
