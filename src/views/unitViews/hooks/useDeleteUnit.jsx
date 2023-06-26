import { useMutation, useQueryClient } from "@tanstack/react-query"
import { notifications } from "@mantine/notifications"
import { IconCheck } from "@tabler/icons-react"
import axiosInstance from "../../../api/axiosInstance.js"

async function deleteUnit(id) {
   const response = await axiosInstance.delete(`/Unit/${id}`)
   return response.data
}

export function useDeleteUnit() {
   const queryClient = useQueryClient()
   const { mutate } = useMutation((id) => deleteUnit(id), {
      onSuccess: () => {
         queryClient.invalidateQueries(["getAllUnits"])
         notifications.show({
            title: "Operación Exitosa",
            message: "La Unidad se elimino con exito",
            color: "teal",
            icon: <IconCheck size={20} />,
         })
      },
   })
   return mutate
}
