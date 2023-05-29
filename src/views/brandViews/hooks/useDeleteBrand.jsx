import { useMutation, useQueryClient } from "@tanstack/react-query"
import { notifications } from "@mantine/notifications"
import { IconCheck } from "@tabler/icons-react"
import axiosInstance from "../../../api/axiosInstance.js"

async function deleteBrand(id) {
   const response = await axiosInstance.delete(`/Brand/${id}`)
   return response.data
}

export function useDeleteBrand() {
   const queryClient = useQueryClient()
   const { mutate } = useMutation((id) => deleteBrand(id), {
      onSuccess: () => {
         queryClient.invalidateQueries(["getAllBrands"])
         notifications.show({
            title: "Operación Exitosa",
            message: "La Marca se elimino con éxito",
            color: "teal",
            icon: <IconCheck size={20} />,
         })
      },
   })
   return mutate
}
