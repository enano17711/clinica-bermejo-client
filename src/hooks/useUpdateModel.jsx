import axiosInstance from "../api/axiosInstance.js"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { notifications } from "@mantine/notifications"
import { IconCheck } from "@tabler/icons-react"

async function updateModel(data, model) {
   const response = await axiosInstance.put(`/${model}/${data.id}`, data)
   return response.data
}

export function useUpdateModel(model) {
   const queryClient = useQueryClient()
   const { mutate, isLoading } = useMutation(
      (data) => updateModel(data, model),
      {
         onSuccess: () => {
            queryClient.invalidateQueries({ refetchType: "all" })
            notifications.show({
               title: "Operación Exitosa",
               message: `La ${model} se modifico con exito`,
               color: "teal",
               icon: <IconCheck size={20} />,
            })
         },
      }
   )
   return { mutate, updateModelIsLoading: isLoading }
}
