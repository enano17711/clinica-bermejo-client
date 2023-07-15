import React, { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { Controller, useWatch } from "react-hook-form"
import { firstLetterToLower } from "../../../utils/index.js"
import { DatePickerInput } from "@mantine/dates"
import { useSetAtom } from "jotai"
import { detailOrderItemDataAtom } from "../../../store/jotai/atoms/OrderAtoms.js"

const DatePickerInputForOrderCreation = ({ name, control, errors = null }) => {
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
      <Controller
         name={fieldName}
         control={control}
         rules={{ required: true }}
         render={({ field }) => (
            <DatePickerInput
               {...field}
               withAsterisk
               error={
                  errors[fieldName]?.type === "required" &&
                  t(`errorInput${name}`)
               }
               maw={140}
               miw={140}
               dropdownType="modal"
            />
         )}
      />
   )
}
export default DatePickerInputForOrderCreation
