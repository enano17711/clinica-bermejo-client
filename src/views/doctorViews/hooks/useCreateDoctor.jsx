import axiosInstance from "../../../api/axiosInstance.js"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { notifications } from "@mantine/notifications"
import { IconCheck } from "@tabler/icons-react"
import React from "react"

async function createDoctor(doctorData) {
   const response = await axiosInstance.post("/Doctor", doctorData)
   return response.data
}

export function useCreateDoctor() {
   const queryClient = useQueryClient()
   const { mutate } = useMutation((doctorData) => createDoctor(doctorData), {
      onSuccess: () => {
         queryClient.invalidateQueries(["getAllDoctors"])
         notifications.show({
            title: "Operación Exitosa",
            message: "El Doctor se creo con éxito",
            color: "teal",
            icon: <IconCheck size={20} />,
         })
      },
   })
   return mutate
}