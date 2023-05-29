import React from "react"
import {
   ActionIcon,
   Button,
   Group,
   MultiSelect,
   NativeSelect,
   Popover,
   TextInput,
} from "@mantine/core"
import { IconFileDownload, IconPlus, IconSearch } from "@tabler/icons-react"
import { useAtomValue } from "jotai"
import { iconSizeButtonsAtom } from "../store/jotai/atoms/VisualAtom.js"

const OptionsTableSection = ({
   setOpened,
   columnSearch,
   setColumnSearch,
   columnsForSearchData,
   valueSearch,
   setValueSearch,
   columnVisibleValue,
   setColumnVisibleValue,
}) => {
   const iconSizeButtons = useAtomValue(iconSizeButtonsAtom)

   return (
      <Group>
         <Button
            leftIcon={<IconPlus size={iconSizeButtons} />}
            onClick={() => setOpened(true)}
         >
            Nuevo
         </Button>
         <Popover trapFocus position="bottom" withArrow shadow="md">
            <Popover.Target>
               <ActionIcon variant="subtle" color="blue" size="lg">
                  <IconSearch />
               </ActionIcon>
            </Popover.Target>
            <Popover.Dropdown>
               <NativeSelect
                  label="Columna"
                  description="Elige una columna"
                  value={columnSearch}
                  onChange={(e) => setColumnSearch(e.currentTarget.value)}
                  data={columnsForSearchData}
               />
               <TextInput
                  mt="sm"
                  label="Dato"
                  description="Colocar mas de 3 caracteres"
                  value={valueSearch}
                  onChange={(e) => setValueSearch(e.target.value)}
                  placeholder="Termino de busqueda"
                  icon={<IconSearch />}
               />
            </Popover.Dropdown>
         </Popover>
         <ActionIcon variant="subtle" color="blue" size={"lg"}>
            <IconFileDownload />
         </ActionIcon>
         <MultiSelect
            data={columnsForSearchData}
            placeholder="Elegir Columnas"
            value={columnVisibleValue}
            onChange={setColumnVisibleValue}
         />
      </Group>
   )
}

export default OptionsTableSection
