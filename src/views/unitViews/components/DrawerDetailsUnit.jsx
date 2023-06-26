import {
   Button,
   Drawer,
   Group,
   NativeSelect,
   NumberInput,
   Stack,
   TextInput,
   Title,
} from "@mantine/core"
import React, { useEffect, useState } from "react"
import {
   IconCalculator,
   IconClick,
   IconDeviceFloppy,
   IconDna,
   IconListDetails,
   IconMathSymbols,
   IconPencil,
   IconSignature,
   IconTrash,
} from "@tabler/icons-react"
import { Link } from "react-router-dom"
import { useUpdateUnit } from "../hooks/useUpdateUnit.jsx"
import { useAtomValue, useSetAtom } from "jotai"
import {
   deleteUnitDataAtom,
   openUnitDeleteModalAtom,
} from "../../../store/jotai/atoms/UnitAtoms.js"
import { iconSizeButtonsAtom } from "../../../store/jotai/atoms/VisualAtom.js"
import { useAllUnitBases } from "../../unitBaseViews/hooks/useGetAllUnitBases.jsx"

const DrawerDetailsUnit = ({ openDrawerUnit, unit, setOpenDrawerUnit }) => {
   const [inputsEnabled, setInputsEnabled] = useState(false)
   const [unitUpdateData, setUnitUpdateData] = useState({})

   const { mutate: updateUnit, updateUnitIsLoading } = useUpdateUnit()
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
         name: unit?.name,
         description: unit?.description,
         shortName: unit?.shortName,
         value: unit?.value,
         operation: unit?.operation,
         unitBaseId: unit?.unitBase?.id,
      })
   }, [unit])

   return (
      <Drawer
         position="right"
         opened={openDrawerUnit}
         onClose={handleCloseDrawer}
         title={<Title order={4}>{`${unit?.name?.split(" ")[0]}`}</Title>}
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
                  unitUpdateData.name === ""
                     ? "El nombre es obligatorio"
                     : false
               }
               value={unitUpdateData.name}
               onChange={(e) =>
                  setUnitUpdateData({
                     ...unitUpdateData,
                     name: e.target.value,
                  })
               }
            />
            <TextInput
               label={"Código"}
               description={"Ingresa el código"}
               placeholder={"Ej: M"}
               icon={<IconDna size={14} />}
               disabled={!inputsEnabled}
               withAsterisk
               error={
                  unitUpdateData.shortName === ""
                     ? "El código es obligatorio"
                     : false
               }
               value={unitUpdateData.shortName}
               onChange={(e) =>
                  setUnitUpdateData({
                     ...unitUpdateData,
                     shortName: e.target.value,
                  })
               }
            />
            <NativeSelect
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
               label={"Unidad Base"}
               description={"Selecciona la unidad base"}
               placeholder={"click para seleccionar"}
               disabled={!inputsEnabled}
               value={unitUpdateData.unitBaseId}
               icon={<IconClick size={14} />}
               withAsterisk
               error={
                  unitUpdateData.unitBaseId === "" ||
                  unitUpdateData.unitBaseId ===
                     "00000000-0000-0000-0000-000000000000"
                     ? "El código es obligatorio"
                     : false
               }
               onChange={(e) =>
                  setUnitUpdateData({
                     ...unitUpdateData,
                     unitBaseId: e.target.value,
                  })
               }
            />
            <NativeSelect
               data={["+", "-", "*", "/"]}
               label="Operación"
               description="Selecciona la operación"
               placeholder="click para seleccionar"
               disabled={!inputsEnabled}
               value={unitUpdateData.operation}
               icon={<IconMathSymbols size={14} />}
               withAsterisk
               error={
                  unitUpdateData.operation === ""
                     ? "El código es obligatorio"
                     : false
               }
               onChange={(e) =>
                  setUnitUpdateData({
                     ...unitUpdateData,
                     operation: e.target.value,
                  })
               }
            />
            <NumberInput
               label={"Valor"}
               description={"Ingresa el valor (1 al 4.294.967.295)"}
               placeholder={"Ej: 1"}
               icon={<IconCalculator size={14} />}
               min={1}
               max={4294967295}
               disabled={!inputsEnabled}
               value={unitUpdateData.value}
               onChange={(e) =>
                  setUnitUpdateData({
                     ...unitUpdateData,
                     value: e,
                  })
               }
               withAsterisk
               error={
                  unitUpdateData.value === 0 ||
                  unitUpdateData.value === "" ||
                  false
                     ? "El valor es obligatorio"
                     : false
               }
            />
            <TextInput
               label="Descripcion"
               description="Ingresa la descripcion"
               placeholder="Ej: Marca para las muelas"
               icon={<IconListDetails size={14} />}
               disabled={!inputsEnabled}
               value={unitUpdateData.description}
               onChange={(e) =>
                  setUnitUpdateData({
                     ...unitUpdateData,
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
