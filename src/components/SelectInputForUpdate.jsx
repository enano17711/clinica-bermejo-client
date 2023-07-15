import React from "react"
import { Select } from "@mantine/core"
import { IconClick } from "@tabler/icons-react"
import { useTranslation } from "react-i18next"
import { firstLetterToLower } from "../utils/index.js"

const SelectInputForUpdate = ({
   name,
   model,
   error = null,
   enabled,
   state,
   setState,
   data,
}) => {
   const { t } = useTranslation()

   return (
      <>
         {error === null ? (
            <Select
               data={data}
               label={t(`labelInput${name}`)}
               placeholder={t(`placeHolderInput${name}${model}`)}
               disabled={enabled}
               value={state}
               icon={<IconClick size={14} />}
               onChange={(e) =>
                  setState((prevState) => {
                     return {
                        ...prevState,
                        [firstLetterToLower(name)]: e,
                     }
                  })
               }
               searchable
               nothingFound="No se encontraron resultados"
               maxDropdownHeight={120}
               clearable
            />
         ) : (
            <Select
               data={data}
               label={t(`labelInput${name}`)}
               placeholder={t(`placeHolderInput${name}${model}`)}
               disabled={enabled}
               value={state}
               icon={<IconClick size={14} />}
               onChange={(e) =>
                  setState((prevState) => {
                     return {
                        ...prevState,
                        [firstLetterToLower(name)]: e,
                     }
                  })
               }
               withAsterisk
               error={
                  state === "" ||
                  state === "00000000-0000-0000-0000-000000000000"
                     ? t(`errorInput${name}`)
                     : false
               }
               searchable
               nothingFound="No se encontraron resultados"
               maxDropdownHeight={120}
               clearable
            />
         )}
      </>
   )
}

export default SelectInputForUpdate
