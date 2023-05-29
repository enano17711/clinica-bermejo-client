import axiosInstance from "../../../api/axiosInstance.js"
import { useQuery } from "@tanstack/react-query"
import { strToObj } from "../../../utils/index.js"

async function getDoctors(
   pageNumber = 1,
   pageSize = 50,
   searchColumn,
   searchText
) {
   if (searchText !== "") {
      const { data, headers } = await axiosInstance.get(
         `/Doctor?SearchColumn=${searchColumn}&SearchTerm=${searchText}&PageNumber=${pageNumber}&PageSize=${pageSize}`
      )
      return { data, headers }
   } else {
      const { data, headers } = await axiosInstance.get(
         `/Doctor?PageNumber=${pageNumber}&PageSize=${pageSize}`
      )
      return { data, headers }
   }
}

export function useDoctors(
   pageNumber = 1,
   pageSize = 50,
   searchColumn,
   searchText
) {
   const { data: doctors } = useQuery({
      queryKey: [
         "getAllDoctors",
         pageNumber,
         pageSize,
         searchColumn,
         searchText,
      ],
      queryFn: () => getDoctors(pageNumber, pageSize, searchColumn, searchText),
   })

   const headerData = strToObj(doctors?.headers.get("x-pagination"))

   return { doctorsData: doctors?.data, headerData }
}
