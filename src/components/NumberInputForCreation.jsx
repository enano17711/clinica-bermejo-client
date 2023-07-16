import { firstLetterToLower } from "../utils/index.js"
import React from "react"
import { Controller } from "react-hook-form"
import { NumberInput } from "@mantine/core"
import { IconSignature } from "@tabler/icons-react"
import { useTranslation } from "react-i18next"

const NumberInputForCreation = ({
   name,
   model,
   control,
   errors = null,
   decimals = 0,
}) => {
   const { t } = useTranslation()
   const fieldName = firstLetterToLower(name)
   const isRequired = errors !== null
   return (
      <Controller
         name={fieldName}
         control={control}
         rules={isRequired ? { required: true } : undefined}
         render={({ field }) => (
            <NumberInput
               {...field}
               label={t(`labelInput${name}`)}
               placeholder={t(`placeholderInput${name}${model}`)}
               icon={<IconSignature size={14} />}
               precision={decimals}
               min={0}
               max={4294967295}
               withAsterisk={isRequired}
               error={
                  isRequired &&
                  errors[fieldName]?.type === "required" &&
                  t(`errorInput${name}`)
               }
               parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
               formatter={(value) =>
                  !Number.isNaN(parseFloat(value))
                     ? `${value}`.replace(
                          /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                          ","
                       )
                     : ""
               }
            />
         )}
      />
   )
}
export default NumberInputForCreation
