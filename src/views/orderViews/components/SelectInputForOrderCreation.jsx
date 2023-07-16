import React, { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { Controller, useWatch } from "react-hook-form"
import { firstLetterToLower } from "../../../utils/index.js"
import { Select } from "@mantine/core"
import { useSetAtom } from "jotai"
import { detailOrderItemDataAtom } from "../../../store/jotai/atoms/OrderAtoms.js"

const SelectInputForOrderCreation = ({
   name,
   control,
   errors = null,
   data = ["Cargando"],
}) => {
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
                  <Select
                     {...field}
                     data={data}
                     searchable
                     nothingFound="No se encontraron resultados"
                     maxDropdownHeight={120}
                     maw={140}
                     miw={140}
                  />
               )}
            />
         ) : (
            <Controller
               name={fieldName}
               control={control}
               rules={{ required: true }}
               render={({ field }) => (
                  <Select
                     {...field}
                     data={data}
                     withAsterisk
                     error={
                        errors[fieldName]?.type === "required" &&
                        t(`errorInput${name}`)
                     }
                     searchable
                     nothingFound="No se encontraron resultados"
                     maxDropdownHeight={120}
                     maw={140}
                     miw={140}
                  />
               )}
            />
         )}
      </>
   )
}

export default SelectInputForOrderCreation
