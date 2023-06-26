import React from "react"
import { Controller } from "react-hook-form"
import { TextInput } from "@mantine/core"

const TextInputForCreation = ({
   name,
   control,
   label,
   description = "",
   placeholder = "",
   icon,
   errors = null,
}) => {
   return (
      <>
         {errors === null ? (
            <Controller
               name={name}
               control={control}
               render={({ field }) => (
                  <TextInput
                     {...field}
                     label={label}
                     description={description}
                     placeholder={placeholder}
                     icon={icon}
                  />
               )}
            />
         ) : (
            <Controller
               name={name}
               control={control}
               rules={{ required: true }}
               render={({ field }) => (
                  <TextInput
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
                  />
               )}
            />
         )}
      </>
   )
}

export default TextInputForCreation
