import { QueryClient } from "@tanstack/react-query"
import { notifications } from "@mantine/notifications"

const queryErrorHandler = (error) => {
   const title = error?.message ?? "Error de conexión al servidor"

   notifications.clean()
   notifications.show({
      title,
      color: "red",
      message: "Por favor intente más tarde",
   })
}

export function generateQueryClient() {
   return new QueryClient({
      logger: {
         log: console.log,
         warn: console.warn,
         error: console.error,
      },
      defaultOptions: {
         queries: {
            onError: queryErrorHandler,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            staleTime: 1000 * 60 * 10, // 10 minutes
            cacheTime: 1000 * 60 * 15, // 15 minutes
            retry: 2,
         },
      },
   })
}

export const queryClient = generateQueryClient()