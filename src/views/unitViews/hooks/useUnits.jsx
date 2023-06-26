import axiosInstance from "../../../api/axiosInstance.js"
import { useQuery } from "@tanstack/react-query"
import { strToObj } from "../../../utils/index.js"

async function getUnits(
   pageNumber = 1,
   pageSize = 50,
   searchColumn,
   searchText
) {
   if (searchText !== "") {
      const { data, headers } = await axiosInstance.get(
         `/Unit?SearchColumn=${searchColumn}&SearchTerm=${searchText}&PageNumber=${pageNumber}&PageSize=${pageSize}`
      )
      return { data, headers }
   } else {
      const { data, headers } = await axiosInstance.get(
         `/Unit?PageNumber=${pageNumber}&PageSize=${pageSize}`
      )
      return { data, headers }
   }
}

export function useUnits(
   pageNumber = 1,
   pageSize = 50,
   searchColumn,
   searchText
) {
   const { data: units } = useQuery({
      queryKey: ["getAllUnits", pageNumber, pageSize, searchColumn, searchText],
      queryFn: () => getUnits(pageNumber, pageSize, searchColumn, searchText),
   })

   const headerData = strToObj(units?.headers.get("x-pagination"))

   return { unitsData: units?.data, headerData }
}
