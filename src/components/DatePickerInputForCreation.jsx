import React from "react"
import { useTranslation } from "react-i18next"
import { Controller } from "react-hook-form"
import { firstLetterToLower } from "../utils/index.js"
import { IconSignature } from "@tabler/icons-react"
import { DatePickerInput } from "@mantine/dates"

const DatePickerInputForCreation = ({
   name,
   model,
   control,
   errors = null,
}) => {
   const { t } = useTranslation()
   return (
      <>
         {errors === null ? (
            <Controller
               name={firstLetterToLower(name)}
               control={control}
               render={({ field }) => (
                  <DatePickerInput
                     {...field}
                     label={t(`labelInput${name}`)}
                     placeholder={t(`placeHolderInput${name}${model}`)}
                     icon={<IconSignature size={14} />}
                  />
               )}
            />
         ) : (
            <Controller
               name={firstLetterToLower(name)}
               control={control}
               rules={{ required: true }}
               render={({ field }) => (
                  <DatePickerInput
                     {...field}
                     label={t(`labelInput${name}`)}
                     placeholder={t(`placeholderInput${name}${model}`)}
                     icon={<IconSignature size={14} />}
                     withAsterisk
                     error={
                        errors[firstLetterToLower(name)]?.type === "required" &&
                        t(`errorInput${name}`)
                     }
                  />
               )}
            />
         )}
      </>
   )
}
export default DatePickerInputForCreation
