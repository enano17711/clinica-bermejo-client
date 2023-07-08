import axiosInstance from "../api/axiosInstance.js"
import { useQuery } from "@tanstack/react-query"

async function getAllModels(path1 = null, path2 = null) {
   const { data } = await axiosInstance.get(`/${path1}/${path2}`)
   return { data }
}

export function useGetAllModels(path1 = null, path2 = null) {
   const { data, isLoading } = useQuery({
      queryKey: ["getAllModels", path1, path2],
      queryFn: () => getAllModels(path1, path2),
   })
   return {
      allModelsData: data?.data,
      isLoadingAllModelsData: isLoading,
   }
}
