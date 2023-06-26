import axiosInstance from "../../../api/axiosInstance.js"
import { useQuery } from "@tanstack/react-query"

async function getAllUnitBases() {
   const { data } = await axiosInstance.get(`/UnitBase/GetAllUnitBases`)
   return { data }
}

export function useAllUnitBases() {
   const { data: unitBases, isLoading } = useQuery({
      queryKey: ["getAllUnitBases"],
      queryFn: () => getAllUnitBases(),
   })
   return {
      unitBasesData: unitBases?.data,
      isLoadingUnitBases: isLoading,
   }
}
