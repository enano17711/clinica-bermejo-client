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

const DrawerDetailsItem = ({ openDrawerItem, item, setOpenDrawerItem }) => {
   const [inputsEnabled, setInputsEnabled] = useState(false)
   const [itemUpdateData, setItemUpdateData] = useState({})

   const { mutate: updateItem, updateModelIsLoading: updateItemIsLoading } =
      useUpdateModel("Item")

   const { isLoadingAllModelsData: isLoadingBrand, allModelsData: brandsData } =
      useGetAllModels("Brand", "GetAllBrands")

   const setDeleteItemData = useSetAtom(deleteItemDataAtom)
   const setOpenDeleteModal = useSetAtom(openItemDeleteModalAtom)
   const iconSizeButtons = useAtomValue(iconSizeButtonsAtom)

   const handleSubmit = (e) => {
      e.stopPropagation()
      e.preventDefault()
      if ([itemUpdateData.name, itemUpdateData.code].includes("")) return

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
         description: item?.description,
         brandId: item?.brand?.id,
      })
   }, [item, inputsEnabled])

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
