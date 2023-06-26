import React from "react"
import { Controller } from "react-hook-form"
import { NumberInput } from "@mantine/core"

const NumberInputForCreation = ({
   name,
   control,
   label,
   description = "",
   placeholder = "",
   icon,
   errors = null,
   defaultValue,
   min = 0,
   max = 1000000000,
}) => {
   return (
      <>
         {errors === null ? (
            <Controller
               name={name}
               control={control}
               render={({ field }) => (
                  <NumberInput
                     {...field}
                     label={label}
                     description={description}
                     placeholder={placeholder}
                     icon={icon}
                     defaultValue={defaultValue}
                     min={min}
                     max={max}
                  />
               )}
            />
         ) : (
            <Controller
               name={name}
               control={control}
               rules={{ required: true }}
               render={({ field }) => (
                  <NumberInput
                     {...field}
                     label={label}
                     description={description}
                     placeholder={placeholder}
                     icon={icon}
                     withAsterisk
                     error={
                        errors[name]?.type === "required" &&
                        `El ${label} es obligatorio`
                     }
                     defaultValue={defaultValue}
                     min={min}
                     max={max}
                  />
               )}
            />
         )}
      </>
   )
}

export default NumberInputForCreation
