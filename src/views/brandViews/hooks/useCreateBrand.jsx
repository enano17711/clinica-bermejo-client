import axiosInstance from "../../../api/axiosInstance.js"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { notifications } from "@mantine/notifications"
import { IconCheck } from "@tabler/icons-react"
import React from "react"

async function createBrand(brandData) {
   const response = await axiosInstance.post("/Brand", brandData)
   return response.data
}

export function useCreateBrand() {
   const queryClient = useQueryClient()
   const { mutate } = useMutation((brandData) => createBrand(brandData), {
      onSuccess: () => {
         queryClient.invalidateQueries(["getAllBrands"])
         notifications.show({
            title: "Operación Exitosa",
            message: "La Marca se creo con éxito",
            color: "teal",
            icon: <IconCheck size={20} />,
         })
      },
   })
   return mutate
}
