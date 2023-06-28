import { useMutation, useQueryClient } from "@tanstack/react-query"
import { notifications } from "@mantine/notifications"
import { IconCheck } from "@tabler/icons-react"
import axiosInstance from "../api/axiosInstance.js"

async function deleteModel(id, model) {
   const response = await axiosInstance.delete(`/${model}/${id}`)
   return response.data
}

export function useDeleteModel(model) {
   const queryClient = useQueryClient()
   const { mutate } = useMutation((id) => deleteModel(id, model), {
      onSuccess: () => {
         queryClient.invalidateQueries({ refetchType: "all" })
         notifications.show({
            title: "Operación Exitosa",
            message: `El/La ${model} se elimino con exito`,
            color: "teal",
            icon: <IconCheck size={20} />,
         })
      },
   })
   return mutate
}
