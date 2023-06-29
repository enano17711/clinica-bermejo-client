import React from "react"
import { Controller } from "react-hook-form"
import { NativeSelect } from "@mantine/core"
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
                  <NativeSelect
                     {...field}
                     data={data}
                     label={t(`labelInput${name}`)}
                     description={t(`descriptionInput${name}`)}
                     placeholder={t(`placeholderInput${name}${model}`)}
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
                  <NativeSelect
                     {...field}
                     data={data}
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

export default SelectInputForCreation
