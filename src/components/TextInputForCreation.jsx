import React from "react"
import { Controller } from "react-hook-form"
import { TextInput } from "@mantine/core"
import { firstLetterToLower } from "../utils/index.js"
import { IconSignature } from "@tabler/icons-react"
import { useTranslation } from "react-i18next"

const TextInputForCreation = ({ name, model, control, errors = null }) => {
   const { t } = useTranslation()
   return (
      <>
         {errors === null ? (
            <Controller
               name={firstLetterToLower(name)}
               control={control}
               render={({ field }) => (
                  <TextInput
                     {...field}
                     label={t(`labelInput${name}`)}
                     description={t(`descriptionInput${name}`)}
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
                  <TextInput
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
                  />
               )}
            />
         )}
      </>
   )
}

export default TextInputForCreation
