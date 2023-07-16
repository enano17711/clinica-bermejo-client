import React from "react"
import { useTranslation } from "react-i18next"
import { Controller } from "react-hook-form"
import { firstLetterToLower } from "../utils/index.js"
import { Textarea } from "@mantine/core"
import { IconSignature } from "@tabler/icons-react"

const TextAreaInputForCreation = ({ name, model, control, errors = null }) => {
   const { t } = useTranslation()
   return (
      <>
         {errors === null ? (
            <Controller
               name={firstLetterToLower(name)}
               control={control}
               render={({ field }) => (
                  <Textarea
                     {...field}
                     label={t(`labelInput${name}`)}
                     placeholder={t(`placeHolderInput${name}${model}`)}
                     icon={<IconSignature size={14} />}
                     autosize
                     minRows={5}
                     maxRows={8}
                  />
               )}
            />
         ) : (
            <Controller
               name={firstLetterToLower(name)}
               control={control}
               rules={{ required: true }}
               render={({ field }) => (
                  <Textarea
                     {...field}
                     label={t(`labelInput${name}`)}
                     placeholder={t(`placeholderInput${name}${model}`)}
                     icon={<IconSignature size={14} />}
                     withAsterisk
                     error={
                        errors[firstLetterToLower(name)]?.type === "required" &&
                        t(`errorInput${name}`)
                     }
                     minRows={2}
                     maxRows={5}
                  />
               )}
            />
         )}
      </>
   )
}
export default TextAreaInputForCreation
