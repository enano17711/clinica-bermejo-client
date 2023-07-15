import React from "react"
import { Controller } from "react-hook-form"
import { Select } from "@mantine/core"
import { IconSignature } from "@tabler/icons-react"
import { useTranslation } from "react-i18next"
import { firstLetterToLower } from "../utils/index.js"

const SelectInputForCreation = ({
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
                  <Select
                     {...field}
                     data={data}
                     label={t(`labelInput${name}`)}
                     placeholder={t(`placeholderInput${name}${model}`)}
                     icon={<IconSignature size={14} />}
                     searchable
                     nothingFound="No se encontraron resultados"
                     maxDropdownHeight={120}
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
                  <Select
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
                     searchable
                     nothingFound="No se encontraron resultados"
                     maxDropdownHeight={120}
                     clearable
                  />
               )}
            />
         )}
      </>
   )
}

export default SelectInputForCreation
