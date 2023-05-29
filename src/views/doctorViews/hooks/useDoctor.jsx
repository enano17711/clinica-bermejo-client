import axiosInstance from "../../../api/axiosInstance.js"
import { useQuery } from "@tanstack/react-query"

async function getDoctor(id) {
   const { data } = await axiosInstance.get(`/Doctor/${id}`)
   return { data }
}

export function useDoctor(id) {
   const { data } = useQuery({
      queryKey: ["getDoctor", id],
      queryFn: () => getDoctor(id),
   })

   return { doctorData: data?.data }
}
