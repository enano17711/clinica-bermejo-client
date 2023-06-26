import axiosInstance from "../../../api/axiosInstance.js"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { notifications } from "@mantine/notifications"
import { IconCheck } from "@tabler/icons-react"
import React from "react"

async function createUnit(unitData) {
   const response = await axiosInstance.post("/Unit", unitData)
   return response.data
}

export function useCreateUnit() {
   const queryClient = useQueryClient()
   const { mutate } = useMutation((unitData) => createUnit(unitData), {
      onSuccess: () => {
         queryClient.invalidateQueries(["getAllUnits"])
         notifications.show({
            title: "Operación Exitosa",
            message: "La Unidad se creo con éxito",
            color: "teal",
            icon: <IconCheck size={20} />,
         })
      },
   })
   return mutate
}
