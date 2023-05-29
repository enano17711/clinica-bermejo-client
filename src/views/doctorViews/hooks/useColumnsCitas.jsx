import { useMemo } from "react"
import dayjs from "dayjs"

export const useColumnsCitas = () => {
   const columnsTableCitas = useMemo(
      () => [
         {
            name: "Inicio",
            selector: (row) => row.dateInit,
            sortable: true,
            format: (row) =>
               `${dayjs(row.dateInit).format("HH:mm")} ${dayjs(
                  row.dateInit
               ).format("DD/MM/YYYY")}`,
         },
         {
            name: "Fin",
            selector: (row) => row.dateEnd,
            sortable: true,
            format: (row) =>
               `${dayjs(row.dateEnd).format("HH:mm")} ${dayjs(
                  row.dateEnd
               ).format("DD/MM/YYYY")}`,
         },
         {
            name: "Costo",
            selector: (row) => row.price,
         },
         {
            name: "H.C. Paciente",
            selector: (row) => row.patient.clinicHistory,
            sortable: true,
         },
         {
            name: "Paciente",
            selector: (row) => `${row.patient.name} ${row.patient.surname}`,
            sortable: true,
         },
         {
            name: "Enfermera",
            selector: (row) => `${row.nurse.name} ${row.nurse.surname}`,
            sortable: true,
         },
      ],
      []
   )

   return { columnsTableCitas }
}
