import axiosInstance from "../api/axiosInstance.js"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { notifications } from "@mantine/notifications"
import { IconCheck } from "@tabler/icons-react"
import React from "react"

async function createModel(data, model) {
   const response = await axiosInstance.post(`/${model}`, data)
   return response.data
}

export function useCreateModel(model) {
   const queryClient = useQueryClient()
   const { mutate } = useMutation((data) => createModel(data, model), {
      onSuccess: () => {
         queryClient.invalidateQueries({ refetchType: "all" })
         notifications.show({
            title: "Operación Exitosa",
            message: `El/La ${model} se creo con éxito`,
            color: "teal",
            icon: <IconCheck size={20} />,
         })
      },
      onError: (error) => {
         notifications.show({
            title: "Operación Fallida",
            message: `${Object.keys(error.response.data).map(
               (key) => `${key}: ${error.response.data[key]}`
            )}`,
            color: "red",
            icon: <IconCheck size={20} />,
         })
      },
   })
   return mutate
}
