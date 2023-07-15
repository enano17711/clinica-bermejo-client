import React from "react"
import { useTranslation } from "react-i18next"
import { Controller } from "react-hook-form"
import { firstLetterToLower } from "../utils/index.js"
import { MultiSelect } from "@mantine/core"
import { IconSignature } from "@tabler/icons-react"

const MultiSelectInputForCreation = ({
   name,
   model,
   control,
   errors = null,
   data = ["Cargando"],
}) => {
   const { t } = useTranslation()
   return (
      <>
         {errors === null ? (
            <Controller
               name={firstLetterToLower(name)}
               control={control}
               render={({ field }) => (
                  <MultiSelect
                     {...field}
                     data={data}
                     label={t(`labelInput${name}`)}
                     placeholder={t(`placeholderInput${name}${model}`)}
                     icon={<IconSignature size={14} />}
                     maxDropdownHeight={120}
                     searchable
                     nothingFound="No se encontraron resultados"
                     error={
                        errors[firstLetterToLower(name)]?.type === "required" &&
                        t(`errorInput${name}`)
                     }
                     clearable
                  />
               )}
            />
         ) : (
            <Controller
               name={firstLetterToLower(name)}
               control={control}
               rules={{ required: true }}
               render={({ field }) => (
                  <MultiSelect
                     {...field}
                     data={data}
                     label={t(`labelInput${name}`)}
                     placeholder={t(`placeholderInput${name}${model}`)}
                     icon={<IconSignature size={14} />}
                     withAsterisk
                     error={
                        errors[firstLetterToLower(name)]?.type === "required" &&
                        t(`errorInput${name}`)
                     }
                     clearable
                  />
               )}
            />
         )}
      </>
   )
}
export default MultiSelectInputForCreation
