import React from "react"
import { useTranslation } from "react-i18next"
import { IconSignature } from "@tabler/icons-react"
import { firstLetterToLower } from "../utils/index.js"
import { DatePickerInput } from "@mantine/dates"

const DatePickerInputForUpdate = ({
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
            <DatePickerInput
               label={t(`labelInput${name}`)}
               description={t(`descriptionInput${name}`)}
               placeholder={t(`placeHolderInput${name}${model}`)}
               icon={<IconSignature size={14} />}
               disabled={enabled}
               value={new Date(state)}
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
            <DatePickerInput
               label={t(`labelInput${name}`)}
               description={t(`descriptionInput${name}`)}
               placeholder={t(`placeholderInput${name}${model}`)}
               icon={<IconSignature size={14} />}
               withAsterisk
               disabled={enabled}
               error={state === "" ? t(`errorInput${name}`) : false}
               value={new Date(state)}
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
export default DatePickerInputForUpdate
