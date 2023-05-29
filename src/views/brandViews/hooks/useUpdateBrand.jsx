import axiosInstance from "../../../api/axiosInstance.js"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { notifications } from "@mantine/notifications"
import { IconCheck } from "@tabler/icons-react"

async function updateBrand(brandData) {
   const response = await axiosInstance.put(`/Brand/${brandData.id}`, brandData)
   return response.data
}

export function useUpdateBrand() {
   const queryClient = useQueryClient()
   const { mutate, isLoading } = useMutation(
      (brandData) => updateBrand(brandData),
      {
         onSuccess: () => {
            queryClient.invalidateQueries(["getAllBrands"])
            notifications.show({
               title: "Operación Exitosa",
               message: "La Marca se modifico con éxito",
               color: "teal",
               icon: <IconCheck size={20} />,
            })
         },
      }
   )
   return { mutate, updateBrandIsLoading: isLoading }
}
