import { Button, Drawer, Group, Stack, Title } from "@mantine/core"
import { useEffect, useState } from "react"
import { IconDeviceFloppy, IconPencil, IconTrash } from "@tabler/icons-react"
import { Link } from "react-router-dom"
import { useAtomValue, useSetAtom } from "jotai"
import {
   deleteBrandDataAtom,
   openBrandDeleteModalAtom,
} from "../../../store/jotai/atoms/BrandAtoms.js"
import { iconSizeButtonsAtom } from "../../../store/jotai/atoms/VisualAtom.js"
import { useUpdateModel } from "../../../hooks/useUpdateModel.jsx"
import TextInputForUpdate from "../../../components/TextInputForUpdate.jsx"

const DrawerDetailsBrand = ({ openDrawerBrand, brand, setOpenDrawerBrand }) => {
   const [inputsEnabled, setInputsEnabled] = useState(false)
   const [brandUpdateData, setBrandUpdateData] = useState({})

   const { mutate: updateBrand, updateModelIsLoading: updateBrandIsLoading } =
      useUpdateModel("Brand")

   const setDeleteBrandData = useSetAtom(deleteBrandDataAtom)
   const setOpenDeleteModal = useSetAtom(openBrandDeleteModalAtom)
   const iconSizeButtons = useAtomValue(iconSizeButtonsAtom)

   const handleSubmit = (e) => {
      e.stopPropagation()
      e.preventDefault()
      if ([brandUpdateData.name].includes("")) return

      updateBrand({ ...brandUpdateData })
      setOpenDrawerBrand(false)
      setInputsEnabled(false)
   }

   const handleEnableInputs = (e) => {
      e.stopPropagation()
      setInputsEnabled(true)
   }

   const handleCloseDrawer = () => {
      setOpenDrawerBrand(false)
      setInputsEnabled(false)
   }

   const deleteBrandHandler = () => {
      setDeleteBrandData(brandUpdateData)
      setOpenDrawerBrand(false)
      setInputsEnabled(false)
      setOpenDeleteModal(true)
   }

   useEffect(() => {
      setBrandUpdateData(brand)
   }, [brand, inputsEnabled])

   return (
      <Drawer
         position="right"
         opened={openDrawerBrand}
         onClose={handleCloseDrawer}
         title={<Title order={4}>{`${brand?.name?.split(" ")[0]}`}</Title>}
      >
         <Stack>
            <TextInputForUpdate
               name="Name"
               model="Brand"
               enabled={!inputsEnabled}
               state={brandUpdateData.name}
               setState={setBrandUpdateData}
               error
            />
            <TextInputForUpdate
               name="Description"
               model="Brand"
               enabled={!inputsEnabled}
               state={brandUpdateData.description}
               setState={setBrandUpdateData}
            />
            {inputsEnabled === false ? (
               <Group position="right">
                  <Button
                     leftIcon={<IconPencil size={iconSizeButtons} />}
                     onClick={handleEnableInputs}
                  >
                     Editar
                  </Button>
                  <Link to={`/brand/${brand.id}`}>
                     <Button>Detalles</Button>
                  </Link>
                  <Button
                     color="red"
                     leftIcon={<IconTrash size={iconSizeButtons} />}
                     onClick={deleteBrandHandler}
                  >
                     Eliminar
                  </Button>
               </Group>
            ) : (
               <Group position="right">
                  <Button
                     leftIcon={<IconDeviceFloppy size={iconSizeButtons} />}
                     onClick={handleSubmit}
                     disabled={updateBrandIsLoading}
                  >
                     Guardar
                  </Button>
                  <Button
                     onClick={() => setInputsEnabled(false)}
                     disabled={updateBrandIsLoading}
                  >
                     Cancelar
                  </Button>
                  <Button
                     color="red"
                     leftIcon={<IconTrash size={iconSizeButtons} />}
                     onClick={deleteBrandHandler}
                  >
                     Eliminar
                  </Button>
               </Group>
            )}
         </Stack>
      </Drawer>
   )
}

export default DrawerDetailsBrand
