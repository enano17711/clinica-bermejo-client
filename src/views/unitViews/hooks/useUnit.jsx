import axiosInstance from "../../../api/axiosInstance.js"
import { useQuery } from "@tanstack/react-query"

async function getUnit(id) {
   const { data } = await axiosInstance.get(`/Unit/${id}`)
   return { data }
}

export function useUnit(id) {
   const { data, isLoading } = useQuery({
      queryKey: ["getUnit", id],
      queryFn: () => getUnit(id),
      enabled: !!id,
   })

   return { unitData: data?.data, isLoading }
}
