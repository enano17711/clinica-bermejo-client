import React from "react"
import { TextInput } from "@mantine/core"
import { useTranslation } from "react-i18next"
import { IconSignature } from "@tabler/icons-react"
import { firstLetterToLower } from "../utils/index.js"

const TextInputForUpdate = ({
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
            <TextInput
               label={t(`labelInput${name}`)}
               description={t(`descriptionInput${name}`)}
               placeholder={t(`placeHolderInput${name}${model}`)}
               icon={<IconSignature size={14} />}
               disabled={enabled}
               value={state}
               onChange={(e) =>
                  setState((prevState) => {
                     return {
                        ...prevState,
                        [firstLetterToLower(name)]: e.target.value,
                     }
                  })
               }
            />
         ) : (
            <TextInput
               label={t(`labelInput${name}`)}
               description={t(`descriptionInput${name}`)}
               placeholder={t(`placeholderInput${name}${model}`)}
               icon={<IconSignature size={14} />}
               withAsterisk
               disabled={enabled}
               error={state === "" ? t(`errorInput${name}`) : false}
               value={state}
               onChange={(e) =>
                  setState((prevState) => {
                     return {
                        ...prevState,
                        [firstLetterToLower(name)]: e.target.value,
                     }
                  })
               }
            />
         )}
      </>
   )
}

export default TextInputForUpdate
