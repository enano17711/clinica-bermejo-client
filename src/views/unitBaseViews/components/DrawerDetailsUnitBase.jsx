import { Button, Drawer, Group, Stack, Title } from "@mantine/core"
import React, { useEffect, useState } from "react"
import { IconDeviceFloppy, IconPencil, IconTrash } from "@tabler/icons-react"
import { Link } from "react-router-dom"
import { useAtomValue, useSetAtom } from "jotai"
import {
   deleteUnitBaseDataAtom,
   openUnitBaseDeleteModalAtom,
} from "../../../store/jotai/atoms/UnitBaseAtoms.js"
import { iconSizeButtonsAtom } from "../../../store/jotai/atoms/VisualAtom.js"
import { useUpdateModel } from "../../../hooks/useUpdateModel.jsx"
import TextInputForUpdate from "../../../components/TextInputForUpdate.jsx"

const DrawerDetailsUnitBase = ({
   openDrawerUnitBase,
   unitBase,
   setOpenDrawerUnitBase,
}) => {
   const [inputsEnabled, setInputsEnabled] = useState(false)
   const [unitBaseUpdateData, setUnitBaseUpdateData] = useState({})

   const {
      mutate: updateUnitBase,
      updateModelIsLoading: updateUnitBaseIsLoading,
   } = useUpdateModel("UnitBase")

   const setDeleteUnitBaseData = useSetAtom(deleteUnitBaseDataAtom)
   const setOpenDeleteModal = useSetAtom(openUnitBaseDeleteModalAtom)
   const iconSizeButtons = useAtomValue(iconSizeButtonsAtom)

   const handleSubmit = (e) => {
      e.stopPropagation()
      e.preventDefault()
      if ([unitBaseUpdateData.name, unitBaseUpdateData.shortName].includes(""))
         return
      updateUnitBase({ ...unitBaseUpdateData })
      setOpenDrawerUnitBase(false)
      setInputsEnabled(false)
   }

   const handleEnableInputs = (e) => {
      e.stopPropagation()
      setInputsEnabled(true)
   }

   const handleCloseDrawer = () => {
      setOpenDrawerUnitBase(false)
      setInputsEnabled(false)
   }

   const deleteUnitBaseHandler = () => {
      setDeleteUnitBaseData(unitBaseUpdateData)
      setOpenDrawerUnitBase(false)
      setInputsEnabled(false)
      setOpenDeleteModal(true)
   }

   useEffect(() => {
      setUnitBaseUpdateData({
         id: unitBase?.id,
         name: unitBase?.name,
         description: unitBase?.description,
         shortName: unitBase?.shortName,
      })
   }, [unitBase, inputsEnabled])

   return (
      <Drawer
         position="right"
         opened={openDrawerUnitBase}
         onClose={handleCloseDrawer}
         title={<Title order={4}>{`${unitBase?.name?.split(" ")[0]}`}</Title>}
      >
         <Stack>
            <TextInputForUpdate
               name="Name"
               model="UnitBase"
               enabled={!inputsEnabled}
               state={unitBaseUpdateData.name}
               setState={setUnitBaseUpdateData}
               error
            />
            <TextInputForUpdate
               name="ShortName"
               model="UnitBase"
               enabled={!inputsEnabled}
               state={unitBaseUpdateData.shortName}
               setState={setUnitBaseUpdateData}
               error
            />
            <TextInputForUpdate
               name="Description"
               model="UnitBase"
               enabled={!inputsEnabled}
               state={unitBaseUpdateData.description}
               setState={setUnitBaseUpdateData}
            />
            {inputsEnabled === false ? (
               <Group position="right">
                  <Button
                     leftIcon={<IconPencil size={iconSizeButtons} />}
                     onClick={handleEnableInputs}
                  >
                     Editar
                  </Button>
                  <Link to={`/unitBase/${unitBase.id}`}>
                     <Button>Detalles</Button>
                  </Link>
                  <Button
                     color="red"
                     leftIcon={<IconTrash size={iconSizeButtons} />}
                     onClick={deleteUnitBaseHandler}
                  >
                     Eliminar
                  </Button>
               </Group>
            ) : (
               <Group position="right">
                  <Button
                     leftIcon={<IconDeviceFloppy size={iconSizeButtons} />}
                     onClick={handleSubmit}
                     disabled={updateUnitBaseIsLoading}
                  >
                     Guardar
                  </Button>
                  <Button
                     onClick={() => setInputsEnabled(false)}
                     disabled={updateUnitBaseIsLoading}
                  >
                     Cancelar
                  </Button>
                  <Button
                     color="red"
                     leftIcon={<IconTrash size={iconSizeButtons} />}
                     onClick={deleteUnitBaseHandler}
                  >
                     Eliminar
                  </Button>
               </Group>
            )}
         </Stack>
      </Drawer>
   )
}

export default DrawerDetailsUnitBase
