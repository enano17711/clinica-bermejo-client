import axiosInstance from "../../../api/axiosInstance.js"
import { useQuery } from "@tanstack/react-query"
import { strToObj } from "../../../utils/index.js"

async function getBrands(
   pageNumber = 1,
   pageSize = 50,
   searchColumn,
   searchText
) {
   if (searchText !== "") {
      const { data, headers } = await axiosInstance.get(
         `/Brand?SearchColumn=${searchColumn}&SearchTerm=${searchText}&PageNumber=${pageNumber}&PageSize=${pageSize}`
      )
      return { data, headers }
   } else {
      const { data, headers } = await axiosInstance.get(
         `/Brand?PageNumber=${pageNumber}&PageSize=${pageSize}`
      )
      return { data, headers }
   }
}

export function useBrands(
   pageNumber = 1,
   pageSize = 50,
   searchColumn,
   searchText
) {
   const { data: brands } = useQuery({
      queryKey: [
         "getAllBrands",
         pageNumber,
         pageSize,
         searchColumn,
         searchText,
      ],
      queryFn: () => getBrands(pageNumber, pageSize, searchColumn, searchText),
   })

   const headerData = strToObj(brands?.headers.get("x-pagination"))

   return { brandsData: brands?.data, headerData }
}
