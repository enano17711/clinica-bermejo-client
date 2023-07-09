import React from "react"
import { useTranslation } from "react-i18next"
import { NumberInput } from "@mantine/core"
import { IconSignature } from "@tabler/icons-react"
import { firstLetterToLower } from "../utils/index.js"

const NumberInputForUpdate = ({
   name,
   model,
   error = null,
   enabled,
   state,
   setState,
}) => {
   const { t } = useTranslation()

   return (
      <>
         {error === null ? (
            <NumberInput
               label={t(`labelInput${name}`)}
               placeholder={t(`placeHolderInput${name}${model}`)}
               icon={<IconSignature size={14} />}
               disabled={enabled}
               min={1}
               max={4294967295}
               value={state}
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
            <NumberInput
               label={t(`labelInput${name}`)}
               placeholder={t(`placeholderInput${name}${model}`)}
               icon={<IconSignature size={14} />}
               withAsterisk
               disabled={enabled}
               error={
                  state === "" || state === 0 ? t(`errorInput${name}`) : false
               }
               value={state}
               onChange={(e) =>
                  setState((prevState) => {
                     return {
                        ...prevState,
                        [firstLetterToLower(name)]: e,
                     }
                  })
               }
            />
         )}
      </>
   )
}

export default NumberInputForUpdate
