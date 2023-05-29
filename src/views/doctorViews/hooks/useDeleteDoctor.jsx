import { useMutation, useQueryClient } from "@tanstack/react-query"
import { notifications } from "@mantine/notifications"
import { IconCheck } from "@tabler/icons-react"
import axiosInstance from "../../../api/axiosInstance.js"

async function deleteDoctor(id) {
   const response = await axiosInstance.delete(`/Doctor/${id}`)
   return response.data
}

export function useDeleteDoctor() {
   const queryClient = useQueryClient()
   const { mutate } = useMutation((id) => deleteDoctor(id), {
      onSuccess: () => {
         queryClient.invalidateQueries(["getAllDoctors"])
         notifications.show({
            title: "Operación Exitosa",
            message: "El Doctor se elimino con éxito",
            color: "teal",
            icon: <IconCheck size={20} />,
         })
      },
   })
   return mutate
}
