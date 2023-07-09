import React from "react"
import { useTranslation } from "react-i18next"
import { MultiSelect } from "@mantine/core"
import { IconClick } from "@tabler/icons-react"
import { firstLetterToLower } from "../utils/index.js"

const MultiSelectInputForUpdate = ({
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
            <MultiSelect
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
            />
         ) : (
            <MultiSelect
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
                  state === "00000000-0000-0000-0000-000000000000" ||
                  state.length === 0
                     ? t(`errorInput${name}`)
                     : false
               }
            />
         )}
      </>
   )
}

export default MultiSelectInputForUpdate
