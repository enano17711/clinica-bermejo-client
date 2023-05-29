import axiosInstance from "../../../api/axiosInstance.js"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { notifications } from "@mantine/notifications"
import { IconCheck } from "@tabler/icons-react"

async function updateDoctor(doctorData) {
   const response = await axiosInstance.put(
      `/Doctor/${doctorData.id}`,
      doctorData
   )
   return response.data
}

export function useUpdateDoctor() {
   const queryClient = useQueryClient()
   const { mutate, isLoading } = useMutation(
      (doctorData) => updateDoctor(doctorData),
      {
         onSuccess: () => {
            queryClient.invalidateQueries(["getAllDoctors"])
            notifications.show({
               title: "Operación Exitosa",
               message: "El Doctor se modifico con éxito",
               color: "teal",
               icon: <IconCheck size={20} />,
            })
         },
      }
   )
   return { mutate, updateDoctorIsLoading: isLoading }
}
