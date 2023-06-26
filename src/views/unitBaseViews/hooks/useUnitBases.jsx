import axiosInstance from "../../../api/axiosInstance.js"
import { useQuery } from "@tanstack/react-query"
import { strToObj } from "../../../utils/index.js"

async function getUnitBases(
   pageNumber = 1,
   pageSize = 50,
   searchColumn,
   searchText
) {
   if (searchText !== "") {
      const { data, headers } = await axiosInstance.get(
         `/UnitBase?SearchColumn=${searchColumn}&SearchTerm=${searchText}&PageNumber=${pageNumber}&PageSize=${pageSize}`
      )
      return { data, headers }
   } else {
      const { data, headers } = await axiosInstance.get(
         `/UnitBase?PageNumber=${pageNumber}&PageSize=${pageSize}`
      )
      return { data, headers }
   }
}

export function useUnitBases(
   pageNumber = 1,
   pageSize = 50,
   searchColumn,
   searchText
) {
   const { data: unitBases, isLoading } = useQuery({
      queryKey: [
         "getAllUnitBases",
         pageNumber,
         pageSize,
         searchColumn,
         searchText,
      ],
      queryFn: () =>
         getUnitBases(pageNumber, pageSize, searchColumn, searchText),
   })

   const headerData = strToObj(unitBases?.headers.get("x-pagination"))

   return {
      unitBasesData: unitBases?.data,
      headerData,
      isLoadingUnitBases: isLoading,
   }
}
