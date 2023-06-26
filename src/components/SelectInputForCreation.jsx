import React from "react"
import { Controller } from "react-hook-form"
import { NativeSelect } from "@mantine/core"

const SelectInputForCreation = ({
   name,
   control,
   label,
   description = "",
   placeholder = "",
   icon,
   errors = null,
   data = ["Cargando"],
}) => {
   return (
      <Controller
         name={name}
         control={control}
         rules={{ required: true }}
         render={({ field }) => (
            <NativeSelect
               {...field}
               label={label}
               data={data}
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
   )
}

export default SelectInputForCreation
