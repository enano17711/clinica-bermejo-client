import { Button, Drawer, Group, Stack, Title } from "@mantine/core"
import React, { useEffect, useState } from "react"
import { IconDeviceFloppy, IconPencil, IconTrash } from "@tabler/icons-react"
import { Link } from "react-router-dom"
import { useAtomValue, useSetAtom } from "jotai"
import {
   deleteCategoryItemDataAtom,
   openCategoryItemDeleteModalAtom,
} from "../../../store/jotai/atoms/CategoryItemAtoms.js"
import { iconSizeButtonsAtom } from "../../../store/jotai/atoms/VisualAtom.js"
import { useUpdateModel } from "../../../hooks/useUpdateModel.jsx"
import TextInputForUpdate from "../../../components/TextInputForUpdate.jsx"

const DrawerDetailsCategoryItem = ({
   openDrawerCategoryItem,
   categoryItem,
   setOpenDrawerCategoryItem,
}) => {
   const [inputsEnabled, setInputsEnabled] = useState(false)
   const [categoryItemUpdateData, setCategoryItemUpdateData] = useState({})

   const {
      mutate: updateCategoryItem,
      updateModelIsLoading: updateCategoryItemIsLoading,
   } = useUpdateModel("CategoryItem")

   const setDeleteCategoryItemData = useSetAtom(deleteCategoryItemDataAtom)
   const setOpenDeleteModal = useSetAtom(openCategoryItemDeleteModalAtom)
   const iconSizeButtons = useAtomValue(iconSizeButtonsAtom)

   const handleSubmit = (e) => {
      e.stopPropagation()
      e.preventDefault()
      if ([categoryItemUpdateData.name].includes("")) return

      updateCategoryItem({ ...categoryItemUpdateData })
      setOpenDrawerCategoryItem(false)
      setInputsEnabled(false)
   }

   const handleEnableInputs = (e) => {
      e.stopPropagation()
      setInputsEnabled(true)
   }

   const handleCloseDrawer = () => {
      setOpenDrawerCategoryItem(false)
      setInputsEnabled(false)
   }

   const deleteCategoryItemHandler = () => {
      setDeleteCategoryItemData(categoryItemUpdateData)
      setOpenDrawerCategoryItem(false)
      setInputsEnabled(false)
      setOpenDeleteModal(true)
   }

   useEffect(() => {
      setCategoryItemUpdateData({
         id: categoryItem?.id,
         name: categoryItem?.name,
         description: categoryItem?.description,
      })
   }, [categoryItem, inputsEnabled])

   return (
      <Drawer
         position="right"
         opened={openDrawerCategoryItem}
         onClose={handleCloseDrawer}
         title={
            <Title order={4}>{`${categoryItem?.name?.split(" ")[0]}`}</Title>
         }
      >
         <Stack>
            <TextInputForUpdate
               name="Name"
               model="CategoryItem"
               enabled={!inputsEnabled}
               state={categoryItemUpdateData.name}
               setState={setCategoryItemUpdateData}
               error
            />
            <TextInputForUpdate
               name="Description"
               model="CategoryItem"
               enabled={!inputsEnabled}
               state={categoryItemUpdateData.description}
               setState={setCategoryItemUpdateData}
            />

            {inputsEnabled === false ? (
               <Group position="right">
                  <Button
                     leftIcon={<IconPencil size={iconSizeButtons} />}
                     onClick={handleEnableInputs}
                  >
                     Editar
                  </Button>
                  <Link to={`/categoryItem/${categoryItem.id}`}>
                     <Button>Detalles</Button>
                  </Link>
                  <Button
                     color="red"
                     leftIcon={<IconTrash size={iconSizeButtons} />}
                     onClick={deleteCategoryItemHandler}
                  >
                     Eliminar
                  </Button>
               </Group>
            ) : (
               <Group position="right">
                  <Button
                     leftIcon={<IconDeviceFloppy size={iconSizeButtons} />}
                     onClick={handleSubmit}
                     disabled={updateCategoryItemIsLoading}
                  >
                     Guardar
                  </Button>
                  <Button
                     onClick={() => setInputsEnabled(false)}
                     disabled={updateCategoryItemIsLoading}
                  >
                     Cancelar
                  </Button>
                  <Button
                     color="red"
                     leftIcon={<IconTrash size={iconSizeButtons} />}
                     onClick={deleteCategoryItemHandler}
                  >
                     Eliminar
                  </Button>
               </Group>
            )}
         </Stack>
      </Drawer>
   )
}

export default DrawerDetailsCategoryItem
