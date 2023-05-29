import { Button, Drawer, Group, Stack, TextInput, Title } from "@mantine/core"
import { useEffect, useState } from "react"
import {
   IconDeviceFloppy,
   IconListDetails,
   IconPencil,
   IconSignature,
   IconTrash,
} from "@tabler/icons-react"
import { Link } from "react-router-dom"
import { useUpdateBrand } from "../hooks/useUpdateBrand.jsx"
import { useAtomValue, useSetAtom } from "jotai"
import {
   deleteBrandDataAtom,
   openBrandDeleteModalAtom,
} from "../../../store/jotai/atoms/BrandAtoms.js"
import { iconSizeButtonsAtom } from "../../../store/jotai/atoms/VisualAtom.js"

const DrawerDetailsBrand = ({ openDrawerBrand, brand, setOpenDrawerBrand }) => {
   const [inputsEnabled, setInputsEnabled] = useState(false)
   const [brandUpdateData, setBrandUpdateData] = useState({})

   const { mutate: updateBrand, updateBrandIsLoading } = useUpdateBrand()

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
   }, [brand])

   return (
      <Drawer
         position="right"
         opened={openDrawerBrand}
         onClose={handleCloseDrawer}
         title={<Title order={4}>{`${brand?.name?.split(" ")[0]}`}</Title>}
      >
         <Stack>
            <TextInput
               label="Nombre"
               description="Ingresa el nombre"
               placeholder="Ej: Solutech"
               icon={<IconSignature size={14} />}
               withAsterisk
               disabled={!inputsEnabled}
               error={
                  brandUpdateData.name === ""
                     ? "El nombre es obligatorio"
                     : false
               }
               value={brandUpdateData.name}
               onChange={(e) =>
                  setBrandUpdateData({
                     ...brandUpdateData,
                     name: e.target.value,
                  })
               }
            />
            <TextInput
               label="Descripcion"
               description="Ingresa la descripcion"
               placeholder="Ej: Marca para las muelas"
               icon={<IconListDetails size={14} />}
               disabled={!inputsEnabled}
               value={brandUpdateData.description}
               onChange={(e) =>
                  setBrandUpdateData({
                     ...brandUpdateData,
                     description: e.target.value,
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
