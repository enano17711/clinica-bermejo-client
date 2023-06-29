import { Button, Drawer, Group, Stack, Title } from "@mantine/core"
import React, { useEffect, useState } from "react"
import { IconDeviceFloppy, IconPencil, IconTrash } from "@tabler/icons-react"
import { Link } from "react-router-dom"
import { useAtomValue, useSetAtom } from "jotai"
import {
   deleteUnitDataAtom,
   openUnitDeleteModalAtom,
} from "../../../store/jotai/atoms/UnitAtoms.js"
import { iconSizeButtonsAtom } from "../../../store/jotai/atoms/VisualAtom.js"
import { useAllUnitBases } from "../../unitBaseViews/hooks/useGetAllUnitBases.jsx"
import { useUpdateModel } from "../../../hooks/useUpdateModel.jsx"
import TextInputForUpdate from "../../../components/TextInputForUpdate.jsx"
import NumberInputForUpdate from "../../../components/NumberInputForUpdate.jsx"
import SelectInputForUpdate from "../../../components/SelectInputForUpdate.jsx"

const DrawerDetailsUnit = ({ openDrawerUnit, unit, setOpenDrawerUnit }) => {
   const [inputsEnabled, setInputsEnabled] = useState(false)
   const [unitUpdateData, setUnitUpdateData] = useState({})

   const { mutate: updateUnit, updateModelIsLoading: updateUnitIsLoading } =
      useUpdateModel("Unit")
   const { isLoadingUnitBases, unitBasesData } = useAllUnitBases()

   const setDeleteUnitData = useSetAtom(deleteUnitDataAtom)
   const setOpenDeleteModal = useSetAtom(openUnitDeleteModalAtom)
   const iconSizeButtons = useAtomValue(iconSizeButtonsAtom)

   const handleSubmit = (e) => {
      e.stopPropagation()
      e.preventDefault()
      if ([unitUpdateData.name, unitUpdateData.shortName].includes("")) return
      if (
         unitUpdateData.value === 0 ||
         unitUpdateData.unitBaseId === "00000000-0000-0000-0000-000000000000"
      )
         return
      updateUnit({ ...unitUpdateData })
      setOpenDrawerUnit(false)
      setInputsEnabled(false)
   }

   const handleEnableInputs = (e) => {
      e.stopPropagation()
      setInputsEnabled(true)
   }

   const handleCloseDrawer = () => {
      setOpenDrawerUnit(false)
      setInputsEnabled(false)
   }

   const deleteUnitHandler = () => {
      setDeleteUnitData(unitUpdateData)
      setOpenDrawerUnit(false)
      setInputsEnabled(false)
      setOpenDeleteModal(true)
   }

   useEffect(() => {
      setUnitUpdateData({
         id: unit?.id,
         name: unit?.name,
         description: unit?.description,
         shortName: unit?.shortName,
         value: unit?.value,
         operation: unit?.operation,
         unitBaseId: unit?.unitBase?.id,
      })
   }, [unit, inputsEnabled])

   return (
      <Drawer
         position="right"
         opened={openDrawerUnit}
         onClose={handleCloseDrawer}
         title={<Title order={4}>{`${unit?.name?.split(" ")[0]}`}</Title>}
      >
         <Stack>
            <TextInputForUpdate
               name="Name"
               model="Unit"
               enabled={!inputsEnabled}
               state={unitUpdateData.name}
               setState={setUnitUpdateData}
               error
            />
            <TextInputForUpdate
               name="ShortName"
               model="Unit"
               enabled={!inputsEnabled}
               state={unitUpdateData.shortName}
               setState={setUnitUpdateData}
               error
            />
            <SelectInputForUpdate
               name="UnitBaseId"
               model="Unit"
               enabled={!inputsEnabled}
               state={unitUpdateData.unitBaseId}
               setState={setUnitUpdateData}
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
               error
            />
            <Group position="apart" grow>
               <SelectInputForUpdate
                  name="Operation"
                  model="Unit"
                  enabled={!inputsEnabled}
                  state={unitUpdateData.operation}
                  setState={setUnitUpdateData}
                  data={["+", "-", "*", "/"]}
                  error
               />
               <NumberInputForUpdate
                  name="Value"
                  model="Unit"
                  enabled={!inputsEnabled}
                  state={unitUpdateData.value}
                  setState={setUnitUpdateData}
                  error
               />
            </Group>
            <TextInputForUpdate
               name="Description"
               model="Unit"
               enabled={!inputsEnabled}
               state={unitUpdateData.description}
               setState={setUnitUpdateData}
            />

            {inputsEnabled === false ? (
               <Group position="right">
                  <Button
                     leftIcon={<IconPencil size={iconSizeButtons} />}
                     onClick={handleEnableInputs}
                  >
                     Editar
                  </Button>
                  <Link to={`/unit/${unit.id}`}>
                     <Button>Detalles</Button>
                  </Link>
                  <Button
                     color="red"
                     leftIcon={<IconTrash size={iconSizeButtons} />}
                     onClick={deleteUnitHandler}
                  >
                     Eliminar
                  </Button>
               </Group>
            ) : (
               <Group position="right">
                  <Button
                     leftIcon={<IconDeviceFloppy size={iconSizeButtons} />}
                     onClick={handleSubmit}
                     disabled={updateUnitIsLoading}
                  >
                     Guardar
                  </Button>
                  <Button
                     onClick={() => setInputsEnabled(false)}
                     disabled={updateUnitIsLoading}
                  >
                     Cancelar
                  </Button>
                  <Button
                     color="red"
                     leftIcon={<IconTrash size={iconSizeButtons} />}
                     onClick={deleteUnitHandler}
                  >
                     Eliminar
                  </Button>
               </Group>
            )}
         </Stack>
      </Drawer>
   )
}

export default DrawerDetailsUnit
