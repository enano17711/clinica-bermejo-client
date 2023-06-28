import axiosInstance from "../api/axiosInstance.js"
import { useQuery } from "@tanstack/react-query"

async function getModel(id, model) {
   const { data } = await axiosInstance.get(`/${model}/${id}`)
   return { data }
}

export function useGetSingleModel(id, model) {
   const { data, isLoading } = useQuery({
      queryKey: [`get${model}`, id, model],
      queryFn: () => getModel(id, model),
      enabled: !!id,
   })

   return { modelData: data?.data, modelIsLoading: isLoading }
}
