import React, { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { Controller, useWatch } from "react-hook-form"
import { firstLetterToLower } from "../../../utils/index.js"
import { TextInput } from "@mantine/core"
import { useSetAtom } from "jotai"
import { detailOrderItemDataAtom } from "../../../store/jotai/atoms/OrderAtoms.js"

const TextInputForOrderCreation = ({ name, control, errors = null }) => {
   const { t } = useTranslation()
   const fieldName = firstLetterToLower(name)
   const setDetailOrderItemData = useSetAtom(detailOrderItemDataAtom)

   const inputValue = useWatch({ name: fieldName, control })

   useEffect(() => {
      setDetailOrderItemData((prev) => {
         return {
            ...prev,
            [fieldName]: inputValue,
         }
      })
   }, [inputValue])

   return (
      <>
         {errors === null ? (
            <Controller
               name={fieldName}
               control={control}
               render={({ field }) => (
                  <TextInput {...field} maw={140} miw={140} />
               )}
            />
         ) : (
            <Controller
               name={fieldName}
               control={control}
               rules={{ required: true }}
               render={({ field }) => (
                  <TextInput
                     {...field}
                     maw={140}
                     miw={140}
                     withAsterisk
                     error={
                        errors[fieldName]?.type === "required" &&
                        t(`errorInput${name}`)
                     }
                  />
               )}
            />
         )}
      </>
   )
}
export default TextInputForOrderCreation
