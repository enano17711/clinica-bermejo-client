import React from "react"
import { Controller } from "react-hook-form"
import { NumberInput } from "@mantine/core"
import { IconSignature } from "@tabler/icons-react"
import { useTranslation } from "react-i18next"
import { firstLetterToLower } from "../utils/index.js"

const NumberInputForCreation = ({ name, model, control, errors = null }) => {
   const { t } = useTranslation()
   return (
      <>
         {errors === null ? (
            <Controller
               name={firstLetterToLower(name)}
               control={control}
               render={({ field }) => (
                  <NumberInput
                     {...field}
                     label={t(`labelInput${name}`)}
                     description={t(`descriptionInput${name}`)}
                     placeholder={t(`placeholderInput${name}${model}`)}
                     icon={<IconSignature size={14} />}
                     min={1}
                     max={4294967295}
                  />
               )}
            />
         ) : (
            <Controller
               name={firstLetterToLower(name)}
               control={control}
               rules={{ required: true }}
               render={({ field }) => (
                  <NumberInput
                     {...field}
                     label={t(`labelInput${name}`)}
                     description={t(`descriptionInput${name}`)}
                     placeholder={t(`placeholderInput${name}${model}`)}
                     icon={<IconSignature size={14} />}
                     withAsterisk
                     error={
                        errors[firstLetterToLower(name)]?.type === "required" &&
                        t(`errorInput${name}`)
                     }
                     min={1}
                     max={4294967295}
                  />
               )}
            />
         )}
      </>
   )
}

export default NumberInputForCreation
