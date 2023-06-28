import axiosInstance from "../api/axiosInstance.js"
import { useQuery } from "@tanstack/react-query"
import { strToObj } from "../utils/index.js"

async function getModels(
   pageNumber = 1,
   pageSize = 50,
   searchColumn,
   searchText,
   model
) {
   if (searchText !== "") {
      const { data, headers } = await axiosInstance.get(
         `/${model}?SearchColumn=${searchColumn}&SearchTerm=${searchText}&PageNumber=${pageNumber}&PageSize=${pageSize}`
      )
      return { data, headers }
   } else {
      const { data, headers } = await axiosInstance.get(
         `/${model}?PageNumber=${pageNumber}&PageSize=${pageSize}`
      )
      return { data, headers }
   }
}

export function useGetArrayModel(
   pageNumber = 1,
   pageSize = 50,
   searchColumn,
   searchText,
   model
) {
   const { data } = useQuery({
      queryKey: [
         `getAll${model}s`,
         pageNumber,
         pageSize,
         searchColumn,
         searchText,
         model,
      ],
      queryFn: () =>
         getModels(pageNumber, pageSize, searchColumn, searchText, model),
   })

   const headerData = strToObj(data?.headers.get("x-pagination"))

   return { modelsData: data?.data, headerData }
}
