import axiosInstance from "../../../api/axiosInstance.js"
import { useQuery } from "@tanstack/react-query"

async function getBrand(id) {
   const { data } = await axiosInstance.get(`/Brand/${id}`)
   return { data }
}

export function useBrand(id) {
   const { data } = useQuery({
      queryKey: ["getBrand", id],
      queryFn: () => getBrand(id),
   })

   return { brandData: data?.data }
}
