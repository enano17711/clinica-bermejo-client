import axiosInstance from "../../../api/axiosInstance.js"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { notifications } from "@mantine/notifications"
import { IconCheck } from "@tabler/icons-react"

async function updateUnit(unitData) {
   const response = await axiosInstance.put(`/Unit/${unitData.id}`, unitData)
   return response.data
}

export function useUpdateUnit() {
   const queryClient = useQueryClient()
   const { mutate, isLoading } = useMutation(
      (unitData) => updateUnit(unitData),
      {
         onSuccess: () => {
            queryClient.invalidateQueries(["getAllUnits"])
            notifications.show({
               title: "Operación Exitosa",
               message: "La Unidad se modifico con exito",
               color: "teal",
               icon: <IconCheck size={20} />,
            })
         },
      }
   )
   return { mutate, updateUnitIsLoading: isLoading }
}
